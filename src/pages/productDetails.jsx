import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { URL } from '../Common/api';
import { config } from '../Common/configurations';
import toast from 'react-hot-toast';
import { getCart } from '../redux/actions/user/cartActions';
import ProductPageSkeleton from '../components/products/ProductPageSkeleton';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const [count, setCount] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(null); // track quantity from cart
  const [cartLoading, setCartLoading] = useState(false);

  const [mainImage, setMainImage] = useState('');
  const [zoomStyle, setZoomStyle] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  // ✅ Load product
  const loadProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${URL}/user/product/${id}`, {
        withCredentials: true,
      });

      if (data) {
        setProduct(data.product);
        setMainImage(data.product.imageURL);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // ✅ Sync with cart
  useEffect(() => {
    loadProduct();
  }, [id]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const foundItem = cart.find((item) => item.product._id === id);
      if (foundItem) {
        setCartQuantity(foundItem.quantity);
        setCount(foundItem.quantity); // pre-fill with cart qty
      } else {
        setCartQuantity(null);
        setCount(1);
      }
    }
  }, [cart, id]);

  // ✅ Update/Add to Cart
  const addToCart = async () => {
    setCartLoading(true);
    try {
      await axios.post(
        `${URL}/user/cart`,
        {
          product: id,
          quantity: count,
        },
        { ...config, withCredentials: true }
      );

      toast.success(cartQuantity ? 'Cart updated!' : 'Added to cart');
      dispatch(getCart());
      setCartLoading(false);
    } catch (error) {
      const err =
        error?.response?.data?.error || error?.message || 'Something went wrong';
      toast.error(err);
      setCartLoading(false);
    }
  };

  // Quantity Controls
  const increment = () => setCount((c) => c + 1);
  const decrement = () => {
    if (count > 1) setCount((c) => c - 1);
  };


  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      backgroundImage: `url(${mainImage})`,
      backgroundPosition: `${x}% ${y}%`,
      transform: 'scale(1.2)',
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    document.body.style.cursor = 'zoom-in';
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: 'scale(1)',
      transition: 'transform 0.2s ease-out'
    });
    setTimeout(() => {
      setZoomStyle({});
    }, 200);
    setIsHovering(false);
    document.body.style.cursor = 'default';
  };




  if (!product) {
    return (
      <div className="w-11/12 mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto px-4 py-10 min-h-screen">
      {loading ? (
        <ProductPageSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2">
              {[product?.imageURL, ...(product?.moreImageURL || [])].map(
                (image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`bg-gray-100 rounded-md overflow-hidden aspect-square cursor-pointer transition-all duration-200 ${mainImage === image
                      ? 'ring-2 ring-mainclr'
                      : 'opacity-70 hover:opacity-100'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover"
                    />
                  </button>
                )
              )}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative overflow-hidden rounded-lg">
              <div
                className={`bg-gray-100 rounded-lg overflow-hidden aspect-square relative bg-center bg-no-repeat ${isHovering ? 'cursor-zoom-in' : 'cursor-default'
                  }`}
                style={{ backgroundImage: `url(${mainImage})`, backgroundSize: 'contain' }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="absolute inset-0"
                  style={zoomStyle}
                ></div>
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-contain opacity-0"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 capitalize">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold text-gray-900">
                ₹{product.offer}
              </span>
              {product.offer < product.price && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{product.price}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="text-sm font-medium text-green-600">In Stock</div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={decrement}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                  disabled={count <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={count}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setCount(!isNaN(value) && value >= 1 ? value : 1);
                  }}
                  className="w-16 text-center py-1 border-l border-r border-gray-300 outline-none"
                />
                <button
                  onClick={increment}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={addToCart}
                disabled={cartLoading || count === cartQuantity} // ✅ disable if same qty
                className={`text-white px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-50 uppercase ${cartLoading
                  ? 'bg-gray-500'
                  : 'bg-mainclr hover:bg-mainhvr'
                  }`}
              >
                {cartLoading
                  ? 'Updating...'
                  : cartQuantity
                    ? count === cartQuantity
                      ? `Already in Cart (${cartQuantity})`
                      : 'Update Cart'
                    : `Add to Cart (${count})`}
              </button>
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-700">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;