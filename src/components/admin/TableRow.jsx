import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import date from "date-and-time";
import { useNavigate } from "react-router-dom";
import StatusComponent from "../../components/admin/StatusComponent";
import { URL } from "@common/api";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/actions/admin/productActions"; // Import your delete action

const TableRow = ({ index, length, product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const isLast = index === length - 1;
  const classes = isLast ? "p-4" : "p-4 border-b border-gray-200 ";

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(product._id));
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <tr
        className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
      >
        <td 
          className="admin-table-row flex items-center gap-2"
          onClick={() => navigate(`edit/${product._id}`)}
        >
          <div className="w-10 h-10 overflow-clip flex justify-center items-center shrink-0">
            {product.imageURL ? (
              <img
                src={`${product.imageURL}`}
                alt="img"
                className="object-contain w-full h-full"
              />
            ) : (
              <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
            )}
          </div>
          <p className="line-clamp-1">{product.name}</p>
        </td>
        <td 
          className="admin-table-row"
          onClick={() => navigate(`edit/${product._id}`)}
        >
          <div className="line-clamp-2">{product.description}</div>
        </td>
        <td 
          className="admin-table-row"
          onClick={() => navigate(`edit/${product._id}`)}
        >
          {product?.category?.name || ""}
        </td>
      
        <td 
          className="admin-table-row"
          onClick={() => navigate(`edit/${product._id}`)}
        >
          {product.price}
        </td>
        <td 
          className="admin-table-row capitalize shrink-0"
          onClick={() => navigate(`edit/${product._id}`)}
        >
          <StatusComponent status={product.status} />
        </td>
        <td 
          className="admin-table-row"
          onClick={() => navigate(`edit/${product._id}`)}
        >
          {product.createdAt
            ? date.format(new Date(product.createdAt), "MMM DD YYYY")
            : "No Data"}
        </td>
        <td className="admin-table-row">
          <div className="flex items-center gap-4 text-lg">
            <span
              className="hover:text-gray-500"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`edit/${product._id}`);
              }}
            >
              <AiOutlineEdit />
            </span>
            <span
              className="hover:text-red-500 text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <AiOutlineDelete />
            </span>
          </div>
        </td>
      </tr>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableRow;