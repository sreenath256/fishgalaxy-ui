import React, { useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { pr1 } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEntireCart, deleteOneProduct, getCart } from "../../redux/actions/user/cartActions";
import { calculateTotalPrice } from "../../redux/reducers/user/cartSlice";
import toast from "react-hot-toast";
import ProductQuantityButton from "./ProductQuantityButton";
import ConfirmBox from "../admin/ConfrimBox";

const CartModal = ({ isOpen, onClose, children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error, cartId, totalPrice } = useSelector(
    (state) => state.cart
  );

  // Fetching entire cart on page load
  useEffect(() => {
    dispatch(getCart());
  }, []);

  // Calculating the total with the data and updating it when ever there is a change
  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [cart]);

  // Deleting entire cart
  const deleteCart = () => {
    toggleConfirm();
    dispatch(deleteEntireCart(cartId));
  };

  // Modal for deleting entire cart
  const [showConfirm, setShowConfirm] = useState(false);
  const toggleConfirm = () => {
    if (cart?.length > 0) {
      setShowConfirm(!showConfirm);
    } else {
      toast.error("Nothing in the cart");
    }
  };

  // Deleting one product
  const [productId, setProductId] = useState("");
  const dispatchDeleteProduct = (id) => {
    dispatch(deleteOneProduct({ cartId, id }))
      .unwrap()
      .then(() => {
        dispatch(getCart());
      })
      .catch((err) => {
        toast.error("Failed to remove product");
      });
  };

  // Modal for deleting one product from cart
  const [showProductConfirm, setShowProductConfirm] = useState(false);
  const toggleProductConfirm = (id) => {
    setProductId(id);
    dispatchDeleteProduct(id);
    setShowProductConfirm(!showProductConfirm);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      {showConfirm && (
        <ConfirmBox
          title="Confirm Clearing Cart?"
          onConfirm={deleteCart}
          onClose={toggleConfirm}
          confirmText="Clear"
        />
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
            {cart?.length > 0 ? (
              cart.map((product) => (
                <div
                  key={product._id}
                  className="flex items-start py-4 border-b last:border-b-0"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border rounded-md overflow-hidden">
                    <img
                      src={product.product.imageURL}
                      alt={product.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">
                        {product.product.name}
                      </h3>
                      <div className="flex">
                        <p className="text-sm font-medium">
                          ₹{product.product.offer * product.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">
                      ₹{product.product.offer}
                    </p>
                    <ProductQuantityButton
                      toggleProductConfirm={toggleProductConfirm}
                      item={product}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Looks like you haven't added anything to your cart yet
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-mainclr text-white rounded-md hover:bg-mainhvr"
                >
                  Continue Shopping
                </button>
              </div>
            )}

            {children}
          </div>

          {/* Cart footer - only shown when cart has items */}
          {cart?.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span className="font-medium">₹{totalPrice}</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Shipping and taxes calculated at checkout
              </p>
              <Link to={"/checkout"} onClick={onClose}>
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
          )}
        </div>
      </div>
    </>
  );
};

export default CartModal;