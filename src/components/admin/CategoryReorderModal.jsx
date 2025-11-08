import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { URL } from "../../Common/api";
import { config } from "../../Common/configurations";

const CategoryReorderModal = ({ categories, onClose, onReorderSuccess }) => {
    const [orderedCategories, setOrderedCategories] = useState(categories);

    // Handle drag end
    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(orderedCategories);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setOrderedCategories(items);
    };

    // Save new order to backend
    const handleSave = async () => {
        try {
            const orderedIds = orderedCategories.map((cat) => cat._id);
            await axios.patch(`${URL}/admin/categories-reorder`, { orderedIds }, config);
            toast.success("Category order updated!");
            onReorderSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to reorder categories");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[400px] p-5 shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg">Arrange Category Order</h2>
                    <button onClick={onClose}>
                        <AiOutlineClose className="text-gray-500 hover:text-black" />
                    </button>
                </div>

                {/* Draggable List */}
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="categories">
                        {(provided) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-2 max-h-[300px] overflow-y-auto"
                            >
                                {orderedCategories.map((category, index) => (
                                    <Draggable
                                        key={category._id}
                                        draggableId={category._id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <li
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                className={`p-3 border rounded-md bg-gray-50 ${snapshot.isDragging
                                                    ? "bg-blue-100 border-blue-400"
                                                    : "hover:bg-gray-100"
                                                    }`}
                                            >
                                                <span className="font-medium">{category.name}</span>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>

                {/* Buttons */}
                <div className="flex justify-end mt-5 gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border border-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white"
                    >
                        Save Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryReorderModal;
