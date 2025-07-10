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
      if (!user.isEmailVerified) {
        navigate("/otp");
      } else {
        navigate("/");
      }
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the OTP
    setActiveTab("otp");
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

            {/* <input
            type="number"
            id="mobile"
            inputMode="numeric"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr focus:border-transparent transition"
            placeholder="Enter your mobile number"
            required
          /> */}
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

const SignupForm = ({ showPassword, setShowPassword, setMobile }) => {
  const [formData, setFormData] = useState({
    name: "",
    shopName: "",
    email: "",
    mobile: "",
    pincode: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl md:text-2xl text-center font-medium text-gray-800 mb-6">
        Create your account
      </h2>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr focus:border-transparent transition"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="shopName"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Shop Name
        </label>
        <input
          type="text"
          id="shopName"
          name="shopName"
          value={formData.shopName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr focus:border-transparent transition"
          placeholder="Enter your shop name"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr focus:border-transparent transition"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="mobile"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Mobile Number
        </label>
        <input
          type="number"
          id="mobile"
          name="mobile"
          inputMode="numeric"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr focus:border-transparent transition"
          placeholder="Enter your mobile number"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="pincode"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Pincode
        </label>
        <input
          type="number"
          id="pincode"
          name="pincode"
          inputMode="numeric"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr focus:border-transparent transition"
          placeholder="Enter your pincode"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr focus:border-transparent transition"
          placeholder="Enter your address"
          rows="3"
          required
        />
      </div>

      <div className="mb-6 relative">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr focus:border-transparent transition pr-10"
          placeholder="Enter your password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-mainclr text-white py-2 px-4 rounded-md hover:bg-mainhvr focus:outline-none focus:ring-2 focus:ring-mainclr focus:ring-offset-2 transition"
      >
        Create Account
      </button>
    </form>
  );
};

const OTPVerification = ({ setActiveTab, mobile }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);

  const [resendSeconds, setResendSeconds] = useState(30);
  const [resendLoading, setResendLoading] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e, index) => {
    const updatedOtp = [...otp];
    const value = e.target.value;

    if (value === "") {
      // If backspace is pressed, remove the number and move back to the previous box
      updatedOtp[index] = "";
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    } else if (!isNaN(value) && value.length <= 1) {
      // Check if the input is a number
      updatedOtp[index] = value;

      if (index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }

    setOtp(updatedOtp);
  };


  // Copy pasting otp
  // Handle paste event
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text/plain");

    // Distribute the pasted content across input boxes
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

    // Set focus on the last input box
    document.getElementById(`otp-input-${otp.length - 1}`).focus();

    e.preventDefault();
  };


  // OTP Submission function
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
      console.log("Login successful:", res.data);
      setLoading(false);

      dispatch(getUserDataFirst());
      navigate("/");
    } else {
      toast.error(res.response.data.error);
      setError(res.response.data.error);
      setLoading(false);

    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
    console.log("OTP:", otp.join(""));
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
        <h2 className="text-xl md:text-2xl text-center font-medium text-gray-800">OTP Verification</h2>
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

export default LoginSignup;
