import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { URL } from '../../Common/api';
import { config } from '../../Common/configurations';
import toast from 'react-hot-toast';
import { IoMdCart } from 'react-icons/io';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getCart } from '../../redux/actions/user/cartActions';
import { NoImage } from '../../assets';

const ProductCard = ({ product, key, isLatestProduct = false, isOfferProduct = false }) => {
    const [cartLoading, setCartLoading] = useState(false);
    const dispatch = useDispatch()

    const addToCart = async () => {
        setCartLoading(true);
        await axios
            .post(
                `${URL}/user/cart`,
                {
                    product: product._id,
                    quantity: 1,
                },
                { ...config }
            )
            .then((data) => {
                toast.success("Added to cart");
                setCartLoading(false);
                dispatch(getCart())
            })
            .catch((error) => {
                const err = error.response.data.error;
                toast.error(err);
                setCartLoading(false);
            });
    };

    return (
        <Link to={`/shop/${product._id}`} key={key}>
            <div className="bg-white rounded-sm overflow-hidden hover:shadow-sm transition-shadow duration-300 h-full flex flex-col border border-gray-100 group">
                {/* Product Image */}
                <div className="aspect-square overflow-hidden relative">
                    <img
                        src={product.imageURL || NoImage}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      
                    />

                    {/* Discount Badge */}
                    {product.offer < product.price && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {Math.round((1 - product.offer / product.price) * 100)}% OFF
                        </span>
                    )}
                    {isLatestProduct && (
                        <div className="mt-2">
                            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded text-nowrap">
                                NEW ARRIVAL
                            </span>
                        </div>
                    )}
                    {/* Special Offer Badge */}
                    {isOfferProduct && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            HOT DEAL
                        </span>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-medium text-sm text-center text-gray-800 group-hover:text-mainclr transition-colors">
                        {product.name}
                    </h3>

                    {/* Pricing */}
                    <div className="mt-2 text-center">
                        <div className="flex justify-center items-center gap-2">
                            <span className="font-medium text-mainclr">
                                ₹{product.offer}
                            </span>
                            {product.offer < product.price && (
                                <span className="text-gray-500 line-through text-sm">
                                    ₹{product.price}
                                </span>
                            )}
                        </div>

                        {/* Latest Product Tag */}


                        {/* Add to Cart Button */}
                        <button
                            className="mt-3 w-full text-sm bg-mainclr hover:bg-mainhvr text-white py-2 px-4 rounded-sm transition-colors flex items-center justify-center gap-2"
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart()
                            }}
                            disabled={cartLoading}
                        >
                            <IoMdCart />
                            {cartLoading ? "Adding..." : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard