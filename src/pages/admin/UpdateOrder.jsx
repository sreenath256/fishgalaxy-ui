import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { updateOrderStatus } from "../../redux/actions/admin/ordersAction";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getTodayDate } from "../../Common/functions"; // Assuming you have or can create this function

const UpdateOrder = ({ toggleModal, data }) => {
    const { id, status } = data;
    const dispatch = useDispatch();

    const initialValues = {
        status: status,
    };

    const validationSchema = Yup.object().shape({
        status: Yup.string().required("Status is required"),
    });

    const handleSubmit = (values) => {
        // Add today's date automatically when submitting
        const formData = {
            ...values,
            date: getTodayDate() // This should return current date in the required format
        };
        
        dispatch(updateOrderStatus({ id, formData })).then(() => {
            toggleModal({});
        });
    };

    return (
        <div className="w-2/6 bg-white p-5 rounded-lg">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form>
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-semibold">Update Order</h1>
                            <AiOutlineClose
                                className="text-2xl cursor-pointer hover:text-gray-500"
                                onClick={() => toggleModal({})}
                            />
                        </div>

                        <div className="py-2">
                            <p>Status</p>
                            <Field
                                as="select"
                                name="status"
                                className="capitalize px-5 py-2 w-full bg-gray-300 rounded-lg"
                            >
                                <option
                                    value="pending"
                                    disabled={
                                        status === "pending" ||
                                        status === "processing" ||
                                        status === "shipped" ||
                                        status === "delivered"
                                    }
                                >
                                    Pending
                                </option>
                                <option
                                    value="processing"
                                    disabled={
                                        status === "processing" ||
                                        status === "shipped" ||
                                        status === "delivered"
                                    }
                                >
                                    Processing
                                </option>
                                <option
                                    value="shipped"
                                    disabled={status === "shipped" || status === "delivered"}
                                >
                                    Shipped
                                </option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </Field>
                            <ErrorMessage
                                name="status"
                                component="div"
                                className="text-red-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  mt-2 sm:text-sm"
                        >
                            Save
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateOrder;