import React, { useRef, useState } from "react";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewCategory } from "../../redux/actions/admin/categoriesAction";
import CustomSingleFileInput from "../../components/admin/CustomSingleFileInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ConfrimBox from "../../components/admin/ConfrimBox";

const CreateCategories = () => {
  const dispatch = useDispatch();

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
    setFormData(updatedFormData);
  };

  const saveCategory = () => {
    dispatch(createNewCategory(formData));
    toggleModel();
    navigate(-1);
  };

  const initialValues = {
    title: "",
    imageURL: null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    imageURL: Yup.mixed().required("File is required"),
  });

  return (
    <>
      {showModal && (
        <ConfrimBox
          isOpen={showModal}
          onClose={toggleModel}
          onConfirm={saveCategory}
          title="Confirm Creation?"
          confirmText="Save"
        />
      )}
      <div className="p-5 w-full overflow-y-scroll">


        {/* Category Information */}
        <div className="bg-white p-5 rounded-lg mb-5">
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              showConfirm(values);
              setSubmitting(false);
            }} validationSchema={validationSchema}
          >
            {({ values, setFieldValue }) => (
              <Form className="lg:flex gap-5">
                <div className="lg:w-1/3 mb-3 lg:mb-0">
                  <h1 className="font-bold mb-3">Product Thumbnail</h1>
                  <CustomSingleFileInput
                    onChange={(file) => {
                      setFieldValue("imageURL", file);
                    }}
                  />
                  <ErrorMessage
                    className="text-sm text-red-500"
                    name="imageURL"
                    component="span"
                  />
                </div>
                <div className="lg:w-2/3">
                  <p>
                    <label htmlFor="title" className="text-sm mt-2 font-semibold text-gray-700">
                      Category Title
                    </label>
                  </p>
                  <Field
                    name="title"
                    placeholder="Type the category title here"
                    className=" w-full bg-white rounded-md mt-2 py-2 px-3 text-sm outline-none border border-gray-200"
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
        <div className="w-full flex justify-end items-center text-sm font-semibold">

          <div className="flex gap-3">
            <button
              type="button"
              className="flex items-center gap-2 p-2 rounded-lg bg-gray-200 text-blue-700"
              onClick={() => navigate(-1)}
            >
              <AiOutlineClose />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 p-2 rounded-lg bg-blue-700 text-white"
              onClick={() => {
                formikRef.current.submitForm();
              }}
            >
              <AiOutlineSave />
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategories;
