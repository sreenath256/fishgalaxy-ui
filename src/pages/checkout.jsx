import React, { useState } from "react";
import { FiTrash2, FiTruck } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { pr1 } from "../assets";

const Checkout = () => {
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [products, setProducts] = useState([
    {
      image: pr1,
      price: 100,
      name: "Product 1",
      quantity: 1,
      id: 1,
    },
    {
      image: pr1,
      price: 100,
      name: "Product 2",
      quantity: 1,
      id: 2,
    },
    {
      image: pr1,
      price: 100,
      name: "Product 3",
      quantity: 1,
      id: 3,
    },
    {
      image: pr1,
      price: 100,
      name: "Product 4",
      quantity: 1,
      id: 4,
    },
  ]);

  

  // Sample cart items
  const cartItems = [
    { id: 1, name: "Premium Fish Food", price: 24.99, quantity: 2, image: pr1 },
    { id: 2, name: "Aquarium Filter", price: 39.99, quantity: 1, image: pr1 },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    // Simulate processing delay
    setTimeout(() => {
      navigate("/success");
    }, 2000);
  };

  return (
    <div className="w-[95%] md:w-11/12 mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-5 md:mb-8">Checkout</h1>

      <Link to="/cart" className="text-mainclr hover:text-mainhvr text-sm">
        ← Back to cart
      </Link>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Shipping Form */}
        <div className="lg:w-2/3">
          <div className="pt-5">
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 border-b">
                <div className="col-span-5 font-medium">Product</div>
                <div className="col-span-2 font-medium text-center">Price</div>
                <div className="col-span-3 font-medium text-center">
                  Quantity
                </div>
                <div className="col-span-2 font-medium text-right">Total</div>
              </div>

              {/* Cart Items */}
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border-b last:border-b-0 flex flex-col md:grid md:grid-cols-12 gap-4"
                >
                  {/* Product Info */}
                  <div className="flex items-center col-span-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                     
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

                    <span className="px-4 py-1">
                      {product.quantity}
                    </span>
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

      
            
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg border shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-4 mb-6">
             

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
              <button className="bg-mainclr text-white w-full py-2 rounded-md capitalize">place order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
