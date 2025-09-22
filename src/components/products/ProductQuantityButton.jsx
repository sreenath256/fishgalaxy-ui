import React, { useState, useEffect } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import BarLoader from "react-spinners/BarLoader";
import { getCart } from "../../redux/actions/user/cartActions";
import axios from "axios";
import { URL } from "../../Common/api";
import { config } from "../../Common/configurations";
import toast from "react-hot-toast";

const ProductQuantityButton = ({ item, toggleProductConfirm }) => {
  const { cartId } = useSelector((state) => state.cart);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(item.quantity);

  const dispatch = useDispatch();

  // ✅ Keep tempQuantity in sync with Redux item
  useEffect(() => {
    setTempQuantity(item.quantity);
  }, [item.quantity]);

  // ✅ Directly update quantity in cart
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

      dispatch(getCart()); // redux will bring updated item.quantity
    } catch (error) {
      const err =
        error?.response?.data?.error || error?.message || "Something went wrong";
      toast.error(err);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-5">
      <div
        className={`flex border border-black rounded-lg overflow-hidden text-sm ${buttonLoading && "!border-0"
          }`}
      >
        {buttonLoading ? (
          <BarLoader color="#00756b" width={"72px"} height={"24px"} />
        ) : (
          <>
            {/* Decrement */}
            <button
              className={`w-6 grid place-items-center h-6 ${tempQuantity === 1
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

      {/* Delete */}
      <button>
        <BsFillTrash3Fill
          onClick={() => toggleProductConfirm(item._id)}
          className="text-xl text-black hover:text-red-500 duration-300"
        />
      </button>
    </div>
  );
};

export default ProductQuantityButton;
