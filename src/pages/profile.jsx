import React, { useEffect, useState } from "react";
import {
  FiEdit,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
} from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { RiChatHistoryLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import { pr1 } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { commonRequest } from "../Common/api";
import { appJson } from "../Common/configurations";
import { editUserProfile } from "../redux/actions/userActions";
import { FaArrowLeft } from "react-icons/fa";
import { Formik, Form, ErrorMessage, Field } from "formik";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import toast from "react-hot-toast";
import ProfileImage from "../components/user/ProfileImage";


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, loading } = useSelector((state) => state.user);
  const [mobileChanged, setMobileChanged] = useState(false);
  const [newMobile, setNewMobile] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();




  const handleEditClick = () => {
    setIsEditing(!isEditing);

  };



  const handleCancel = () => {
    setIsEditing(false);
  };




  const initialValues = {
    name: user.name || "",
    shopName: user.shopName || "",
    email: user.email || "",
    mobile: user.mobile || "",
    address: user.address || "",
    pincode: user.pincode || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    shopName: Yup.string().required("Shop  Name is required"),
    email: Yup.string().email(),
    mobile: Yup.number()
      .typeError("Phone number should be digits")
      .moreThan(999999999, "Not valid mobile number"),
    address: Yup.string()
      .required("Address is required")
      .min(10, "Please provide a valid address"),
    pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^[1-9][0-9]{5}$/, "Please enter a valid pincode"),
  });


  const handleSubmit = async (value) => {
    console.log("Data Submitted", value);
    if (user.mobile !== value.mobile) {
      if (!isOTPVerified) {
        setMobileChanged(true);
        setNewMobile(value.mobile);
        const data = await commonRequest(
          "POST",
          "/auth/send-otp-register",
          { mobile: value.mobile },
          appJson
        );

        // Check if OTP request was successful
        if (data.success) {
          // Update state to show OTP section
          alert("Hai")
          toast.success("OTP Sent successfully");
          setShowOTP(true);
          setIsOTPVerified(false);
          return
        } else {
          // Handle OTP request failure
          toast.error(data.response.data.error);
        }

      } else {
        const formData = new FormData();
        formData.append("name", value.name);
        formData.append("shopName", value.shopName);
        formData.append("mobile", value.mobile);
        formData.append("address", value.address);
        formData.append("pincode", value.pincode);

        dispatch(editUserProfile(formData));
        // closeToggle();
      }
    } else {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("shopName", value.shopName);
      formData.append("email", value.email);
      formData.append("address", value.address);
      formData.append("pincode", value.pincode);

      dispatch(editUserProfile(formData));
      // closeToggle();
    }
  };


  return (
    <>
      {showOTP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700"
              onClick={() => setShowOTP(false)}
            >
              &times;
            </button>
            <OTPVerification
              setActiveTab={setShowOTP}
              mobile={newMobile}
              setIsOTPVerified={setIsOTPVerified}
              setShowOTP={setShowOTP}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form >

              <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  {/* Profile Header */}
                  <ProfileImage />

                  {/* Profile Details */}
                  <div className="px-6 py-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-sm md:text-xl font-medium">
                        Personal Information
                      </h2>
                      <p
                        onClick={handleEditClick}
                        className="flex text-sm md:text-base items-center text-mainclr hover:text-mainclr"
                      >
                        <FiEdit className="mr-1" />
                        {isEditing ? "Save Changes" : "Edit Profile"}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name Field */}
                      <div className="flex items-center ">
                        <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                          <FiUser className="text-mainclr" size={20} />
                        </div>
                        <div className="ml-4 flex-1">
                          <label className="block text-sm font-medium text-gray-500">
                            Name
                          </label>
                          {isEditing ? (
                            <>
                              <Field
                                type="text"
                                name="name"
                                className="mt-1 block w-full border-b border-gray-300 focus:border-mainclr focus:outline-none py-1"
                              />
                              <ErrorMessage
                                className="text-sm text-red-500"
                                name="name"
                                component="span"
                              />
                            </>
                          ) : (
                            <p className="mt-1 text-gray-900">{user.name}</p>

                          )}
                        </div>
                      </div>

                      <div className="flex items-center ">
                        <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                          <FiUser className="text-mainclr" size={20} />
                        </div>
                        <div className="ml-4 flex-1">
                          <label className="block text-sm font-medium text-gray-500">
                            Shop Name
                          </label>
                          {isEditing ? (
                            <>
                              <Field
                                type="text"
                                name="shopName"
                                className="mt-1 block w-full border-b border-gray-300 focus:border-mainclr focus:outline-none py-1"
                              />
                              <ErrorMessage
                                className="text-sm text-red-500"
                                name="shopName"
                                component="span"
                              />
                            </>
                          ) : (
                            <p className="mt-1 text-gray-900">{user.shopName}</p>

                          )}
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="flex items-center ">
                        <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                          <FiMail className="text-mainclr" size={20} />
                        </div>
                        <div className="ml-4 flex-1">
                          <label className="block text-sm font-medium text-gray-500">
                            Email Address
                          </label>
                          {isEditing ? (
                            <>
                              <Field
                                type="email"
                                name="email"
                                className="mt-1 block w-full border-b border-gray-300 focus:border-mainclr focus:outline-none py-1"
                              />
                              <ErrorMessage
                                className="text-sm text-red-500"
                                name="email"
                                component="span"
                              />
                            </>
                          ) : (

                            <p className="mt-1 text-gray-900">{user.email}</p>

                          )}
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                          <FiPhone className="text-mainclr" size={20} />
                        </div>
                        <div className="ml-4 flex-1">
                          <label className="block text-sm font-medium text-gray-500">
                            Phone Number
                          </label>
                          {isEditing ? (
                            <>
                              <Field name="mobile">
                                {({ field, form }) => (
                                  <div className="w-full flex items-center gap-3">

                                    <PhoneInput
                                      // enableSearch={true}
                                      value={
                                        typeof field.value === 'string'
                                          ? field.value
                                          : field.value?.toString() || ''
                                      }
                                      onChange={(value) => {
                                        form.setFieldValue('mobile', value);
                                      }}
                                      inputClass="!w-full !py-2 !px-4 !rounded-md !border !border-gray-300"
                                      inputStyle={{ width: '100%' }}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault();
                                          form.submitForm();
                                        }
                                      }}
                                    />

                                    {mobileChanged && !isOTPVerified ? (
                                      <>
                                        <span className="flex items-center gap-1 text-red-500 text-xs"></span>
                                        <MdVerified className="text-gray-400" size={18} />
                                        Not Verified
                                      </>
                                    )
                                      : mobileChanged && isOTPVerified ? (
                                        <>
                                          <span className="flex items-center gap-1 text-red-500 text-xs"></span>
                                          <MdVerified className="text-green-500" size={18} />
                                          Verified
                                        </>
                                      ) : null

                                    }
                                  </div>

                                )}
                              </Field>


                              <ErrorMessage
                                className="text-sm text-red-500"
                                name="mobile"
                                component="span"
                              />
                            </>

                          ) : (
                            <p className="mt-1 text-gray-900">{user.mobile}</p>

                          )}
                        </div>
                      </div>

                      {/* Address Field */}
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                          <FiMapPin className="text-mainclr" size={20} />
                        </div>
                        <div className="ml-4 flex-1">
                          <label className="block text-sm font-medium text-gray-500">
                            Pincode
                          </label>
                          {isEditing ? (
                            <>
                              <Field
                                type="text"
                                name="pincode"
                                className="mt-1 block w-full border-b border-gray-300 focus:border-mainclr focus:outline-none py-1"
                              />
                              <ErrorMessage
                                className="text-sm text-red-500"
                                name="pincode"
                                component="span"
                              />
                            </>
                          ) : (
                            <p className="mt-1 text-gray-900">{user.pincode}</p>

                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                          <FiMapPin className="text-mainclr" size={20} />
                        </div>
                        <div className="ml-4 flex-1">
                          <label className="block text-sm font-medium text-gray-500">
                            Address
                          </label>
                          {isEditing ? (
                            <>
                              <Field
                                type="text"
                                name="address"
                                className="mt-1 block w-full border-b border-gray-300 focus:border-mainclr focus:outline-none py-1"
                              />
                              <ErrorMessage
                                className="text-sm text-red-500"
                                name="address"
                                component="span"
                              />
                            </>
                          ) : (
                            <p className="mt-1 text-gray-900">{user.address}</p>

                          )}
                        </div>
                      </div>

                      {/* Password Field */}

                    </div>

                    {/* Edit Controls */}
                    {isEditing && (
                      <div className="mt-8 flex justify-end space-x-4">
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-mainclr text-white rounded-md hover:bg-mainhvr"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Additional Sections */}
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium">Account Settings</h3>
                    <div className="mt-4 space-y-3">
                      <Link to={"/my-order"}>
                        <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-50 rounded-md">
                          My Order
                          <HiOutlineShoppingBag />
                        </button>
                      </Link>
                      <Link to={"/"}>
                        <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-50 rounded-md text-red-600">
                          Logout
                          <IoLogOutOutline />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </Form>
          )}
        </Formik>
      </div >
    </>
  );
};

export default Profile;



const OTPVerification = ({ setActiveTab, mobile, setShowOTP, setIsOTPVerified, handleSubmit }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const updatedOtp = [...otp];
    const value = e.target.value;

    if (value === "") {
      updatedOtp[index] = "";
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    } else if (!isNaN(value) && value.length <= 1) {
      updatedOtp[index] = value;
      if (index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }

    setOtp(updatedOtp);
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text/plain");
    for (let i = 0; i < otp.length; i++) {
      if (pastedData[i] && !isNaN(pastedData[i])) {
        document.getElementById(`otp-input-${i}`).value = pastedData[i];
        setOtp((prevOtp) => {
          const newOtp = [...prevOtp];
          newOtp[i] = pastedData[i];
          return newOtp;
        });
      }
    }
    document.getElementById(`otp-input-${otp.length - 1}`).focus();
    e.preventDefault();
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    let otpNumber = parseInt(otp.join(""));
    if (otpNumber.toString().split("").length < 6) {
      setError("OTP is not valid");
      return;
    } else {
      setError("");
    }

    setLoading(true);

    const res = await commonRequest(
      "POST",
      "/auth/validate-otp-mobile-change",
      { mobile, otp: otpNumber },
      appJson
    );

    if (res.success) {
      console.log("Login successful:", res);
      setLoading(false);
      setShowOTP(false);
      setIsOTPVerified(true);
      handleSubmit();
      toast.success("OTP verified successfully!");
      dispatch(getUserDataFirst());
    } else {
      toast.error(res.response.data.error);
      setError(res.response.data.error);
      setLoading(false);
    }
  };

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (isResendDisabled && resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    } else if (resendCooldown === 0) {
      setIsResendDisabled(false);
    }

    return () => clearTimeout(timer);
  }, [resendCooldown, isResendDisabled]);

  const handleResendOTP = async () => {

    const res = await commonRequest(
      "POST",
      "/auth/resend-otp",
      { mobile },
      appJson
    );

    if (res.success) {
      toast.success("OTP resent successfully!");
      setResendCooldown(30);
      setIsResendDisabled(true);
    } else {
      toast.error(res.response?.data?.error || "Failed to resend OTP");
    }
  };

  return (
    <>
      <div className="flex items-center mb-2">
        <h2 className="text-xl md:text-2xl text-center font-medium text-gray-800">
          OTP Verification
        </h2>
      </div>
      <p className="text-gray-600 mb-6">
        We've sent a verification code to your mobile number
      </p>

      <div className="flex justify-between mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr focus:border-transparent transition"
            maxLength="1"
            value={digit}
            placeholder="-"
            onChange={(e) => handleChange(e, index)}
            onPaste={(e) => handlePaste(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && index === otp.length - 1) {
                handleOTPSubmit(e);
              }
            }}
          />
        ))}
      </div>

      {error && <p className="my-2 text-red-400">{error}</p>}

      <button
        className="w-full bg-mainclr text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-mainclr focus:ring-offset-2 transition mb-4"
        onClick={handleOTPSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Validate OTP"}
      </button>

      <div className="text-center">
        {isResendDisabled ? (
          <p className="text-gray-500 text-sm">
            Resend OTP in {resendCooldown} seconds
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendOTP}
            className="text-mainclr hover:text-blue-800 text-sm font-medium"
          >
            Resend OTP
          </button>
        )}
      </div>


    </>
  );
};