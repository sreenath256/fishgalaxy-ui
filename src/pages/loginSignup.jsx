import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[85vh] py-10 bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-4 px-6 font-medium text-center ${
              activeTab === "login"
                ? "text-mainclr border-b-2 border-mainclr"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-4 px-6 font-medium text-center ${
              activeTab === "signup"
                ? "text-mainclr border-b-2 border-mainclr"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-6">
          {activeTab === "login" && <LoginForm setActiveTab={setActiveTab} />}
          {activeTab === "signup" && (
            <SignupForm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}
          {activeTab === "otp" && (
            <OTPVerification setActiveTab={setActiveTab} />
          )}
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ setActiveTab }) => {
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the OTP
    setActiveTab("otp");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl md:text-2xl text-center font-medium text-gray-800 mb-6">
        Login to your account
      </h2>

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
          inputMode="numeric"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr focus:border-transparent transition"
          placeholder="Enter your mobile number"
          required
        />
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
      >
        Send OTP
      </button>
    </form>
  );
};

const SignupForm = ({ showPassword, setShowPassword }) => {
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

const OTPVerification = ({ setActiveTab }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
    console.log("OTP:", otp.join(""));
  };

  return (
    <form onSubmit={handleSubmit}>
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
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr focus:border-transparent transition"
            required
          />
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-mainclr text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-mainclr focus:ring-offset-2 transition mb-4"
      >
        Verify OTP
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
    </form>
  );
};

export default LoginSignup;
