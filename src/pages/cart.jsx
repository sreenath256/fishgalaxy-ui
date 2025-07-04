import React, { useState } from 'react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { pr1 } from '../assets';

// Assuming you have these images imported
// import pr1 from './path-to-your-image.jpg';

const CartPage = () => {
    const [products, setProducts] = useState([
        {
          image: pr1,
          price: 100,
          name: "Product 1",
          quantity: 1,
          id: 1
        },
        {
          image: pr1,
          price: 100,
          name: "Product 2",
          quantity: 1,
          id: 2
        },
        {
          image: pr1,
          price: 100,
          name: "Product 3",
          quantity: 1,
          id: 3
        },
        {
          image: pr1,
          price: 100,
          name: "Product 4",
          quantity: 1,
          id: 4
        },
       
      ]);
    
      // Increment quantity
      const incrementQuantity = (productId) => {
        setProducts(products.map(product => 
          product.id === productId 
            ? { ...product, quantity: product.quantity + 1 } 
            : product
        ));
      };
    
      // Decrement quantity (minimum 1)
      const decrementQuantity = (productId) => {
        setProducts(products.map(product => 
          product.id === productId && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 } 
            : product
        ));
      };
    
      // Remove product
      const removeProduct = (productId) => {
        setProducts(products.filter(product => product.id !== productId));
      };
    
      // Calculate subtotal
      const subtotal = products.reduce(
        (total, product) => total + (product.price * product.quantity), 
        0
      );

      // Shipping cost (you can make this dynamic)
      const shippingCost = subtotal > 0 ? 15 : 0;
      const total = subtotal + shippingCost;

  return (
    <div className="w-[95%] md:w-11/12 mx-auto py-8 ">
      <h1 className="text-2xl font-semibold mb-8">Your Shopping Cart</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <Link 
            to="/shop" 
            className="inline-block bg-mainclr text-white px-6 py-3 rounded-md hover:bg-mainhvr transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 border-b">
                <div className="col-span-5 font-medium">Product</div>
                <div className="col-span-2 font-medium text-center">Price</div>
                <div className="col-span-3 font-medium text-center">Quantity</div>
                <div className="col-span-2 font-medium text-right">Total</div>
              </div>
              
              {/* Cart Items */}
              {products.map((product) => (
                <div key={product.id} className="p-4 border-b last:border-b-0 flex flex-col md:grid md:grid-cols-12 gap-4">
                  {/* Product Info */}
                  <div className="flex items-center col-span-5">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <button 
                        onClick={() => removeProduct(product.id)}
                        className="text-red-500 hover:text-red-700 flex items-center mt-1 text-sm"
                      >
                        <FiTrash2 className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center col-span-2 justify-center">
                    <span className="md:hidden mr-2 font-medium">Price:</span>
                    <span>₹{product.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center col-span-3 justify-center">
                    <span className="md:hidden mr-2 font-medium">Qty:</span>
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={() => decrementQuantity(product.id)}
                        className="px-3 py-1 h-full text-gray-600 hover:bg-gray-100"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4 py-1 border-x">{product.quantity}</span>
                      <button 
                        onClick={() => incrementQuantity(product.id)}
                        className="px-3 py-1 h-full  text-gray-600 hover:bg-gray-100"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="flex items-center col-span-2 justify-end">
                    <span className="md:hidden mr-2 font-medium">Total:</span>
                    <span className="font-medium">
                      ₹{(product.price * product.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Continue Shopping */}
            <div className="mt-6">
              <Link 
                to="/shop" 
                className="text-mainclr hover:text-mainhvr flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg border shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost > 0 ? `₹${shippingCost.toFixed(2)}` : 'Free'}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              
                <Link to={'/checkout'}>
              <button className="w-full bg-mainclr text-white py-3 rounded-md hover:bg-mainhvr transition-colors font-medium">
                Proceed to Checkout
              </button>
                </Link>
              
             
            </div>
            
         
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;