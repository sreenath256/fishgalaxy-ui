import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { aquariumProducts } from '../components/Data';

const ProductPage = () => {
  const { id } = useParams();
  const product = aquariumProducts.find(p => p.id === parseInt(id));
  const [mainImage, setMainImage] = useState(product?.images[0] || '');
  const [zoomStyle, setZoomStyle] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  if (!product) {
    return (
      <div className="w-11/12 mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Product not found</h1>
      </div>
    );
  }

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

  return (
    <div className="w-11/12 mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails - Vertical */}
          <div className="flex md:flex-col gap-2 ">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(image)}
                className={`bg-gray-100 rounded-md overflow-hidden aspect-square cursor-pointer transition-all duration-200 ${
                  mainImage === image ? 'ring-2 ring-mainclr' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image with Reduced Zoom */}
          <div className="flex-1 relative overflow-hidden rounded-lg">
            <div
              className={`bg-gray-100 rounded-lg overflow-hidden aspect-square relative ${
                isHovering ? 'cursor-zoom-in' : 'cursor-default'
              }`}
              style={{ backgroundImage: `url(${mainImage})`, backgroundSize: 'cover' }}
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

        {/* Right Column - Product Details */}
        <div className="space-y-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">{product.name.toUpperCase()}</h1>
          
          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-gray-900">₹{product.offerPrice}</span>
            {product.offerPrice < product.price && (
              <span className="text-lg text-gray-500 line-through">₹{product.price}</span>
            )}
          </div>
          
          {/* Stock Status */}
          <div className={`text-sm font-medium ${
            product.stock > 10 ? 'text-green-600' : 
            product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {product.stock > 10 ? 'In Stock' : 
             product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
          </div>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button 
              className="bg-mainclr hover:bg-mainhvr text-white px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-50"
              disabled={product.stock <= 0}
            >
              ADD TO CART
            </button>
            
          </div>
          
          {/* Description */}
          <div className="space-y-4 text-gray-700">
            <p>{product.description}</p>
            
            <div className="border-t border-gray-200 pt-4">
              <p className="font-medium">Shipping Information:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>All orders are shipped within 2-3 business days.</li>
                <li>All updates of your order will be shared on WhatsApp and email.</li>
              </ul>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row">
                <span className="font-medium w-32">Categories:</span>
                <span>{product.categories.join(', ')}</span>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;