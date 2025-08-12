import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateError } from "../redux/reducers/userSlice";
import { getUserDataFirst, loginUser } from "../redux/actions/userActions";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // You can also try 'bootstrap.css' or 'material.css'
import { commonRequest } from "../Common/api";
import { appJson } from "../Common/configurations";
import toast from "react-hot-toast";
import SignupForm from "../components/auth/Signup";


const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState("");

  return (
    <div className="min-h-[85vh] py-10 bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-4 px-6 font-medium text-center ${activeTab === "login"
              ? "text-mainclr border-b-2 border-mainclr"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-4 px-6 font-medium text-center ${activeTab === "signup"
              ? "text-mainclr border-b-2 border-mainclr"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-6">
          {activeTab === "login" && <LoginForm setActiveTab={setActiveTab}
            setMobile={setMobile}
          />}
          {activeTab === "signup" && (
            <SignupForm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              setMobile={setMobile}
            />
          )}
          {activeTab === "otp" && (
            <OTPVerification setActiveTab={setActiveTab} mobile={mobile} />
          )}
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ setActiveTab, setMobile }) => {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otpLoading, setOTPLoading] = useState(false);
  const [data, setData] = useState([])

  const initialValues = {
    mobile: "",
  };

  const validationSchema = Yup.object().shape({
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^\+?[1-9]\d{7,14}$/, "Enter a valid phone number"),
  });



  useEffect(() => {
    if (user) {
      navigate("/");
    }
    return () => {
      dispatch(updateError(""));
    };
  }, [user]);

  const handleLoginSubmit = async (values) => {
    console.log("Submitted Phone:", values.mobile); // already includes +91

    setOTPLoading(true);
    setData(values);


    const res = await commonRequest(
      "POST",
      "/auth/send-otp",
      { mobile: values.mobile },
      appJson
    );
    console.log(res)
    if (res.success) {
      // Update state to show OTP section
      setActiveTab("otp");
      setOTPLoading(false);
      toast.success("OTP Sent successfully");
      setMobile(values.mobile);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      dispatch(updateError(""));
    } else {
      // Handle OTP request failure
      // toast.error(res.response.data.error);
      setOTPLoading(false);
      dispatch(updateError(res.response.data.error));
    }


    // dispatch(loginUser(values.mobile));
  };


  return (
    <>
      <h2 className="text-xl md:text-2xl text-center font-medium text-gray-800 mb-6">
        Login to your account
      </h2>

      <Formik
        initialValues={initialValues}
        onSubmit={handleLoginSubmit}
        validationSchema={validationSchema}
      >
        <Form className="w-full">

          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Mobile Number
            </label>

            <Field name="mobile">
              {({ field, form }) => (
                <PhoneInput
                  country={'in'}
                  value={field.value}
                  onChange={(phone) => form.setFieldValue('mobile', phone)}
                  inputClass="!w-full !py-2 !px-4 !rounded-md !border !border-gray-300"
                  inputStyle={{ width: '100%' }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // Optional if needed
                      form.submitForm(); // Triggers Formik submit
                    }
                  }}

                />
              )}
            </Field>
            {error && <p className="my-2 text-red-400">{error}</p>}


          </div>
          <div className="mb-4">

            <button
              type="button"
              onClick={() => setActiveTab("signup")}
              className="text-mainclr hover:text-blue-800 text-sm font-medium flex items-center justify-center"
            >
              Don't have an Account ? SignUp

            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-mainclr text-white py-2 px-4 rounded-md hover:bg-mainhvr focus:outline-none focus:ring-2 focus:ring-mainclr focus:ring-offset-2 transition"
            disabled={otpLoading}
          >
            {otpLoading ? "Sending..." : "Send OTP"}
          </button>

        </Form>

      </Formik>
    </>


  );
};




const OTPVerification = ({ setActiveTab, mobile }) => {
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
      "/auth/validate-otp",
      { mobile, otp: otpNumber },
      appJson
    );

    if (res.success) {
      console.log("Login successful:", res);
      setLoading(false);
      dispatch(getUserDataFirst());
      navigate("/");
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
    setResendCooldown(30);
    setIsResendDisabled(true);

    const res = await commonRequest(
      "POST",
      "/auth/resend-otp",
      { mobile },
      appJson
    );

    if (res.success) {
      toast.success("OTP resent successfully!");
    } else {
      toast.error(res.response?.data?.error || "Failed to resend OTP");
    }
  };

  return (
    <>
      <div className="flex items-center mb-2">
        <button
          type="button"
          onClick={() => setActiveTab("login")}
          className="text-mainclr hover:text-blue-800 mr-2"
        >
          <FaArrowLeft size={18} />
        </button>
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

      <div className="text-center mt-2">
        <button
          type="button"
          onClick={() => setActiveTab("login")}
          className="text-mainclr hover:text-blue-800 text-sm font-medium flex items-center justify-center"
        >
          <FaArrowLeft className="mr-1" size={14} />
          Back to Login
        </button>
      </div>
    </>
  );
};

export default LoginSignup