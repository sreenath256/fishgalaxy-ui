import React, { useEffect, useState } from "react";
import { FiTrash2, FiTruck } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { pr1 } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../Common/api";
import { config } from "../Common/configurations";
import toast from "react-hot-toast";
import { clearCartOnOrderPlaced } from "../redux/reducers/user/cartSlice";
import { ClipLoader } from "react-spinners";

const Checkout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cart from Redux
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { totalPrice, shipping, discount, tax, couponType } = useSelector(
    (state) => state.cart
  );

  console.log(cart)

  const [orderPlacedLoading, setOrderPlacedLoading] = useState(false);
  const [orderData, setOrderData] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);



  const navigateToOrderConfirmation = (orderD) => {
    if (orderD) {
      navigate("/order-confirmation", { state: orderD });
    }
  };

  const handleConfirmOrder = async () => {
    setShowConfirmation(false);
    setOrderPlacedLoading(true);

    try {
      const order = await axios.post(`${URL}/user/order`, {}, config);
      setOrderData(true);
      toast.success("Order Placed");
      navigateToOrderConfirmation(order.data.order);
      dispatch(clearCartOnOrderPlaced());
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setOrderPlacedLoading(false);
    }
  };

  const saveOrder = () => {
    if (cart.length === 0) {
      toast.error("Add product to cart");
      return;
    }
    setShowConfirmation(true);
  };



  const shippingCost = 0;


  useEffect(() => {

    if (cart.length === 0) {
      navigate('/')
    }

    if (orderData) {
      navigate(-1);
    }
  }, [orderData]);

  return (
    <div className="w-[95%] md:w-11/12 mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-5 md:mb-8">Checkout</h1>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Order</h3>
            <p className="mb-6">Are you sure you want to place this order?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className="px-4 py-2 bg-mainclr text-white rounded-md"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
      <Link to="/cart" className="text-mainclr hover:text-mainhvr text-sm">
        ← Back to cart
      </Link>

      {
        orderPlacedLoading ?
          <div className="h-[50vh] flex justify-center items-center text-mainclr">
            <ClipLoader />
          </div> :
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
                  {cart.map((item) => (
                    <div
                      key={item.product._id}
                      className="p-4 border-b last:border-b-0 flex flex-col md:grid md:grid-cols-12 gap-4"
                    >
                      {/* Product Info */}
                      <div className="flex items-center col-span-5">
                        <img
                          src={item.product.imageURL}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded mr-4"
                        />
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>

                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center col-span-2 justify-center">
                        <span className="md:hidden mr-2 font-medium">Price:</span>
                        <span>₹{item.product.offer.toFixed(2)}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center col-span-3 justify-center">
                        <span className="md:hidden mr-2 font-medium">Qty:</span>

                        <span className="px-4 py-1">
                          {item.quantity}
                        </span>
                      </div>

                      {/* Total */}
                      <div className="flex items-center col-span-2 justify-end">
                        <span className="md:hidden mr-2 font-medium">Total:</span>
                        <span className="font-medium">
                          ₹{(item.product.offer * item.quantity).toFixed(2)}
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
                      <span>₹{totalPrice.toFixed(2)}</span>
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
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button onClick={saveOrder} className="bg-mainclr text-white w-full py-2 rounded-md capitalize">place order</button>
              </div>
            </div>
          </div>
      }

    </div>
  );
};

export default Checkout;
