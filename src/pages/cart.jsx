import React, { useEffect, useState } from "react";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getCart,
  deleteEntireCart,
  deleteOneProduct,
  applyCoupon,
  incrementCount,
  decrementCount,
} from "../redux/actions/user/cartActions";
import { calculateTotalPrice } from "../redux/reducers/user/cartSlice";
import { EmptyCart } from "../assets/index";
import ConfirmBox from "../components/admin/ConfrimBox";
import { GoPlus } from "react-icons/go";
import { BarLoader } from "react-spinners";
import axios from "axios";
import { URL } from "../Common/api";
import { config } from "../Common/configurations";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, loading, cartId, couponCode } = useSelector((state) => state.cart);

  const [inputCouponCode, setInputCouponCode] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showProductConfirm, setShowProductConfirm] = useState(false);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(calculateTotalPrice());
    setInputCouponCode(couponCode);
  }, [cart]);

  const dispatchApplyCoupon = () => {
    if (inputCouponCode.trim() !== "") {
      dispatch(applyCoupon(inputCouponCode.trim()));
    }
  };

  const toggleConfirm = () => {
    if (cart.length > 0) {
      setShowConfirm(!showConfirm);
    } else {
      toast.error("Nothing in the cart");
    }
  };

  const deleteCart = () => {
    toggleConfirm();
    dispatch(deleteEntireCart(cartId));
  };

  const toggleProductConfirm = (id) => {
    setProductId(id);
    setShowProductConfirm(!showProductConfirm);
  };

  const dispatchDeleteProduct = () => {
    console.log("CartId", cartId)
    console.log("productId", productId)
    toggleProductConfirm("");
    dispatch(deleteOneProduct({ cartId, id: productId }))
      .unwrap()
      .then(() => {
        dispatch(getCart());
      })
      .catch((err) => {
        toast.error("Failed to remove product");
      });

  };



  const subtotal = cart?.reduce(
    (total, product) => total + product.product.price * product.quantity,
    0
  );

  const shippingCost = subtotal > 0 ? 15 : 0;
  const total = subtotal + shippingCost;





  return (
    <div className="w-[95%] md:w-11/12 mx-auto py-8">
      {showConfirm && (
        <ConfirmBox
          isOpen={showConfirm}
          title="Confirm Clearing Cart?"
          onConfirm={deleteCart}
          onClose={toggleConfirm}
          confirmText="Clear"

        />
      )}
      {showProductConfirm && (
        <ConfirmBox
          isOpen={showProductConfirm}
          title="Confirm Delete?"
          onConfirm={dispatchDeleteProduct}
          onClose={() => toggleProductConfirm("")}
          confirmText="Delete"
        />
      )}
      <h1 className="text-xl md:text-2xl font-semibold mb-8">Your Shopping Cart</h1>

      {cart?.length === 0 && !loading ? (
        <div className=" text-center py-12 min-h-[50vh]">
          <img src={EmptyCart} alt="Empty Cart" className="mx-auto w-60" />
          <h2 className="text-lg font-semibold mt-4">Your cart is empty</h2>
          <Link
            to="/"
            className="inline-block mt-4 bg-mainclr text-white px-6 py-3 rounded-md hover:bg-mainhvr"
          >
            Continue Shopping
          </Link>
        </div>
      ) : loading ? (
        <p>
          Loading
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Table Headers for Desktop */}
              <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 border-b font-medium text-sm">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Cart Items */}
              {cart?.map((item) => (
                <div
                  key={item._id}
                  className="p-4 border-b last:border-b-0 md:grid md:grid-cols-12 flex flex-col gap-4"
                >
                  {/* Product Info */}
                  <div className="col-span-5 flex items-center">
                    <img
                      src={item.product.imageURL || "https://via.placeholder.com/100"}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-sm">{item.product.name}</h3>
                      <button
                        onClick={() => toggleProductConfirm(item._id)}
                        className="text-red-500 hover:text-red-700 flex items-center mt-1 text-xs"
                      >
                        <FiTrash2 className="mr-1" size={14} /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 flex items-center justify-center md:justify-center text-sm">
                    ₹{item.product.offer.toFixed(2)}
                  </div>

                  {/* Quantity */}
                  <div className="col-span-3 flex items-center justify-center">
                    <QuantityUpdateBar item={item} />
                  </div>

                  {/* Total */}
                  <div className="col-span-2 flex items-center justify-end text-sm font-medium">
                    ₹{(item.product.offer * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={toggleConfirm}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Clear Cart
              </button>
              <Link
                to="/"
                className="ml-4 text-mainclr hover:text-mainhvr font-medium"
              >
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
                  <span>{shippingCost > 0 ? `₹${shippingCost}` : "Free"}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Link to="/checkout">
                <button className="w-full bg-mainclr text-white py-3 rounded-md hover:bg-mainhvr font-medium">
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


const QuantityUpdateBar = ({ item }) => {
  const { cartId } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [buttonLoading, setButtonLoading] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(item.quantity);

  // ✅ Keep tempQuantity in sync with Redux cart updates
  useEffect(() => {
    setTempQuantity(item.quantity);
  }, [item.quantity]);

  // ✅ Direct update handler
  const updateQuantity = async (newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;
    setButtonLoading(true);

    try {
      await axios.post(
        `${URL}/user/cart`,
        {
          product: item.product._id,
          quantity: newQuantity,
          size: item.size,
        },
        { ...config, withCredentials: true }
      );

      dispatch(getCart()); // refresh Redux cart
    } catch (error) {
      const err =
        error?.response?.data?.error || error?.message || "Something went wrong";
      toast.error(err);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div
      className={`flex h-fit items-center border border-black rounded-lg overflow-hidden text-sm ${
        buttonLoading && "!border-0"
      }`}
    >
      {buttonLoading ? (
        <BarLoader color="#00756b" width={"72px"} height={"24px"} />
      ) : (
        <>
          {/* Decrement */}
          <button
            className={`w-6 grid place-items-center h-6 ${
              tempQuantity === 1
                ? "bg-black text-white cursor-not-allowed"
                : "bg-black hover:bg-white text-white hover:text-black cursor-pointer"
            } duration-200`}
            disabled={tempQuantity === 1 || buttonLoading}
            onClick={() => updateQuantity(tempQuantity - 1)}
          >
            <FiMinus />
          </button>

          {/* Editable input */}
          <input
            type="number"
            min="1"
            value={tempQuantity}
            onChange={(e) => setTempQuantity(Number(e.target.value))}
            onBlur={() => updateQuantity(Number(tempQuantity))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateQuantity(Number(tempQuantity));
                e.target.blur();
              }
            }}
            className="w-10 text-center outline-none"
          />

          {/* Increment */}
          <button
            className="w-6 grid place-items-center h-6 bg-black hover:bg-white text-white hover:text-black cursor-pointer duration-200"
            onClick={() => updateQuantity(tempQuantity + 1)}
            disabled={buttonLoading}
          >
            <GoPlus />
          </button>
        </>
      )}
    </div>
  );
};

