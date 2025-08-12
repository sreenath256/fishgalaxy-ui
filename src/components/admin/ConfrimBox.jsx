// components/ConfirmModal.jsx
import React from "react";
import { FiX } from "react-icons/fi";

const ConfirmBox = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    message ,
    confirmText = "Confirm",
}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                >
                    <FiX className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
                {
                    message && <p className="text-gray-600 mb-4">{message}</p>
                }
                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        onClick={() => {
                            onConfirm();
                            onClose(); // Optional: close modal after confirming
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBox;
