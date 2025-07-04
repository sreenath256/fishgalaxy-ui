import React, { useState } from "react";
import { VscClose } from "react-icons/vsc";
import { pr1 } from "../../assets";
import { Link } from "react-router-dom";

const CartModal = ({ isOpen, onClose, children }) => {
  // Initialize products with quantity
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

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* Modal - slides in from right */}
      <div
        className={`fixed top-0 right-0 h-full w-[90%] max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Header with close button */}
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              <VscClose />
            </button>
          </div>

          {/* Cart content */}
          <div className="flex-1 overflow-y-auto py-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-start py-4 border-b last:border-b-0">
                <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border rounded-md overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">{product.name}</h3>
                    <p className="text-sm font-medium">₹{product.price * product.quantity}</p>
                  </div>
                  <div className="mt-2 flex text-xs md:text-base justify-between items-center">
                    <div className="flex items-center border rounded">
                      <button 
                        onClick={() => decrementQuantity(product.id)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-2">{product.quantity}</span>
                      <button 
                        onClick={() => incrementQuantity(product.id)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeProduct(product.id)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {children}
          </div>

          {/* Cart footer */}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span className="font-medium">₹{subtotal}</span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Shipping and taxes calculated at checkout
            </p>
            <Link to={'/checkout'}  onClick={onClose}>
            <button className="w-full bg-mainclr hover:bg-mainhvr text-white py-2 rounded-md">
              Checkout
            </button>
            </Link>
            <button
              onClick={onClose}
              className="w-full mt-2 text-mainclr hover:text-mainhvr py-2"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;