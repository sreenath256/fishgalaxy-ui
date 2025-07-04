import React, { useState } from 'react';
import { FiTruck } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { pr1 } from '../assets';

const Checkout = () => {
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Sample cart items
  const cartItems = [
    { id: 1, name: 'Premium Fish Food', price: 24.99, quantity: 2, image: pr1 },
    { id: 2, name: 'Aquarium Filter', price: 39.99, quantity: 1, image: pr1 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);
    
    // Simulate processing delay
    setTimeout(() => {
      navigate('/success');
    }, 2000);
  };

  return (
    <div className="w-[95%] md:w-11/12 mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-5 md:mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Shipping Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handlePlaceOrder} className="bg-white rounded-lg border shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <FiTruck className="mr-2" /> Shipping Information
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name*</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full border rounded-md px-4 py-2 focus:ring-mainclr focus:border-mainclr" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name*</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full border rounded-md px-4 py-2 focus:ring-mainclr focus:border-mainclr" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address*</label>
                <input 
                  type="text" 
                  required 
                  className="w-full border rounded-md px-4 py-2 focus:ring-mainclr focus:border-mainclr" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address 2 (Optional)</label>
                <input 
                  type="text" 
                  className="w-full border rounded-md px-4 py-2 focus:ring-mainclr focus:border-mainclr" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City*</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full border rounded-md px-4 py-2 focus:ring-mainclr focus:border-mainclr" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State*</label>
                  <select 
                    required 
                    className="w-full border rounded-md px-4 py-2 focus:ring-mainclr focus:border-mainclr"
                  >
                    <option value="">Select</option>
                    <option>Calicut</option>
                    <option>Malappuram</option>
                    <option>Kollam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ZIP/Postal Code*</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full border rounded-md px-4 py-2 focus:ring-mainclr focus:border-mainclr" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Country*</label>
                <select 
                  required 
                  className="w-full border rounded-md px-4 py-2 focus:ring-mainclr focus:border-mainclr"
                >
                  <option value="">Select</option>
                  <option selected>India</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email*</label>
                <input 
                  type="email" 
                  required 
                  className="w-full border rounded-md px-4 py-2 focus:ring-mainclr focus:border-mainclr" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number*</label>
                <input 
                  type="tel" 
                  required 
                  className="w-full border rounded-md px-4 py-2 focus:ring-mainclr focus:border-mainclr" 
                />
              </div>
            </div>

            <div className="mt-8">
              <button 
                type="submit"
                disabled={isPlacingOrder}
                className={`w-full bg-mainclr text-white py-3 rounded-md hover:bg-mainhvr transition-colors font-medium ${
                  isPlacingOrder ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isPlacingOrder ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg border shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded mr-2" />
                    <span>{item.name} × {item.quantity}</span>
                  </div>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link to="/cart" className="text-mainclr hover:text-mainhvr text-sm">
              ← Back to cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;