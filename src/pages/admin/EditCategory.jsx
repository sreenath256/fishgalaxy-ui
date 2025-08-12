import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../redux/actions/admin/categoriesAction";
import CustomSingleFileInput from "../../components/admin/CustomSingleFileInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ConfirmModal from "../../components/admin/ConfrimBox";
import axios from "axios";
import { URL } from "@common/api";
import { config } from "../../Common/configurations";

const EditCategory = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const navigate = useNavigate();
    const formikRef = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const toggleModel = () => {
        setShowModal(!showModal);
    };

    const [formData, setFormData] = useState(new FormData());
    const showConfirm = (value) => {
        toggleModel();

        const updatedFormData = new FormData();
        updatedFormData.append("name", value.title);
        updatedFormData.append("imgURL", value.imageURL);
        updatedFormData.append("isActive", value.isActive);
        setFormData(updatedFormData);
    };

    const saveCategory = () => {
        dispatch(updateCategory({ id, formData }));
        toggleModel();
        navigate(-1);
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        imageURL: Yup.mixed().required("File is required"),
    });

    const [initialValues, setInitialValues] = useState({
        title: "",
        description: "",
        imageURL: null,
        isActive: "",
    });

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const response = await axios.get(`${URL}/admin/category/${id}`, config);
                console.log(response)
                const categoryData = response.data.category;
                setInitialValues({
                    title: categoryData.name,
                    description: categoryData.description,
                    imageURL: categoryData.imgURL,
                    isActive: categoryData.isActive,
                });
            } catch (error) {
                console.error(error);
            }
        };
        loadInitialData();
    }, [id]);

    return (
        <>
            {showModal && (
                <ConfirmModal
                    isOpen={showModal}
                    onClose={toggleModel}
                    onConfirm={saveCategory}
                    title="Confirm Update?"
                    confirmText="Save"
                />
            )}
            <div className="p-5 w-full overflow-y-scroll text-sm">
                {/* Top Bar */}
                <div className="flex justify-between items-center font-semibold">
                    <div>
                        <h1 className="font-bold text-2xl">Edit Category</h1>
                        {/* Bread Crumbs */}

                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            className="flex items-center gap-2 p-2 rounded-lg bg-gray-200 text-mainclr"
                            onClick={() => navigate(-1)}
                        >
                            <AiOutlineClose />
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-2 p-2 rounded-lg bg-mainclr text-white"
                            onClick={() => {
                                formikRef.current.submitForm();
                            }}
                        >
                            <AiOutlineSave />
                            Save
                        </button>
                    </div>
                </div>
                {/* Category Information */}
                <div className="bg-white p-5 rounded-lg mb-5">
                    <Formik
                        innerRef={formikRef}
                        initialValues={initialValues}
                        onSubmit={showConfirm}
                        validationSchema={validationSchema}
                        enableReinitialize
                    >
                        {({ values, setFieldValue }) => (
                            <Form className="lg:flex gap-5">
                                <div className="lg:w-1/3 mb-3 lg:mb-0">
                                    <h1 className="font-bold mb-3">Category Thumbnail</h1>
                                    {values.imageURL && typeof values.imageURL === "string" ? (
                                        <div className="bg-gray-100 py-5 rounded-lg text-center border-dashed border-2 h-80">
                                            <div className="h-56">
                                                <img
                                                    src={`${values.imageURL}`}
                                                    alt="asfa"
                                                    className="h-full w-full object-contain"
                                                />
                                                <button
                                                    className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => setFieldValue("imageURL", null)}
                                                >
                                                    Delete this
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <CustomSingleFileInput
                                            onChange={(file) => {
                                                setFieldValue("imageURL", file);
                                            }}
                                        />
                                    )}
                                    <ErrorMessage
                                        className="text-sm text-red-500"
                                        name="imageURL"
                                        component="span"
                                    />
                                </div>
                                <div className="lg:w-2/3">
                                    <p>
                                        <label htmlFor="isActive" className="text-sm mt-2 font-semibold text-gray-700">
                                            Is Active
                                        </label>
                                    </p>
                                    <Field
                                        as="select"
                                        name="isActive"
                                        className="capitalize  w-full bg-white rounded-md mt-2 py-2 px-3 text-sm outline-none border border-gray-200"
                                    >
                                        <option value={true}>active</option>
                                        <option value={false}>block</option>
                                    </Field>
                                    <ErrorMessage
                                        name="isActive"
                                        component="div"
                                        className="text-red-500"
                                    />
                                    <p>
                                        <label htmlFor="title" className="text-sm mt-2 font-semibold text-gray-700">
                                            Category Title
                                        </label>
                                    </p>
                                    <Field
                                        name="title"
                                        placeholder="Type the category title here"
                                        className="w-full bg-white rounded-md mt-2 py-2 px-3 text-sm outline-none border border-gray-200"
                                    />
                                    <ErrorMessage
                                        className="text-sm text-red-500"
                                        name="title"
                                        component="span"
                                    />


                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default EditCategory;
