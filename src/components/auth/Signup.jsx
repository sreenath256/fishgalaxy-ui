import React, { useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { updateError } from "../../redux/reducers/userSlice";
import toast from "react-hot-toast";
import { commonRequest } from "../../Common/api";
import { appJson } from "../../Common/configurations";
import PhoneInput from "react-phone-input-2";
import { FaArrowLeft } from "react-icons/fa";
import { getUserDataFirst } from "../../redux/actions/userActions";
import { set } from "date-fns/set";

const SignupForm = ({ showPassword, setShowPassword, setActiveTab }) => {
    const { user, loading, error } = useSelector((state) => state.user);
    const [OTPLoading, setOTPLoading] = useState(false);
    const [showOTPForm, setShowOTPForm] = useState(false);
    const [mobile, setMobile] = useState("");
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [successSignUp, setSuccessSignUp] = useState(false);

    useEffect(() => {
        if (user) navigate("/");
        return () => dispatch(updateError(""));
    }, [user]);

    const initialValues = {
        name: "",
        shopName: "",
        email: "",
        mobile: "",
        pincode: "",
        address: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Full name is required"),
        shopName: Yup.string().required("Shop name is required"),
        email: Yup.string().email("Invalid email").required("Pincode is required"),
        mobile: Yup.string()
            .required("Mobile number is required")
            .matches(/^\+?[1-9]\d{7,14}$/, "Enter a valid phone number"),
        pincode: Yup.string()
            .required("Pincode is required")
            .matches(/^\d{6}$/, "Enter a valid 6-digit pincode"),
        address: Yup.string()
            .required("Address is required")
            .min(10, "Please provide a valid address"),
    });

    const handleRegister = async (values) => {
        setOTPLoading(true);
        if (values.mobile.trim() === "") {
            toast.error("Enter a mobile number to continue");
            setOTPLoading(false);
            return;
        }

        // Save form data for later use
        setFormData(values);
        setMobile(values.mobile);

        const res = await commonRequest(
            "POST",
            "/auth/send-otp-register",
            { mobile: values.mobile },
            appJson
        );

        if (res.success) {
            toast.success("OTP Sent successfully");
            setShowOTPForm(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            dispatch(updateError(res.response?.data?.error || "OTP send failed"));
            // toast.error(res.response?.data?.error || "OTP send failed");
        }
        setOTPLoading(false);
    };

    const handleOTPVerification = async (otp) => {
        try {
            setOTPLoading(true);

            // First verify the OTP
            const verificationRes = await commonRequest(
                "POST",
                "/auth/validate-otp-register",
                { mobile, otp },
                appJson
            );

            if (!verificationRes.success) {
                throw new Error(verificationRes.response?.data?.error || "OTP verification failed");
            }

            console.log("OTP Verification Response:", verificationRes);

            // If OTP is valid, proceed with registration
            const registrationRes = await commonRequest(
                "POST",
                "/auth/signup",
                formData,
                appJson
            );

            console.log("Registration Response:", registrationRes);

            if (registrationRes.success) {
                toast.success("Registration successful!");
                // You might want to login the user automatically here
                setShowOTPForm(false)
                setSuccessSignUp(true);
                dispatch(getUserDataFirst())
                // navigate("/");
            } else {
                throw new Error(registrationRes.response?.data?.error || "Registration failed");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setOTPLoading(false);
        }
    };

    if (showOTPForm) {
        return (
            <OTPVerification
                setActiveTab={setActiveTab}
                mobile={mobile}
                handleOTPVerification={handleOTPVerification}
                loading={OTPLoading}
                setShowOTPForm={setShowOTPForm}
            />
        );
    }

    return (
        <>
            {
                successSignUp ? (
                    <div className="max-w-md mx-auto text-center mt-8">
                        <h2 className="text-2xl font-semibold text-green-600 mb-4">Registration Successful!</h2>
                        <p className="text-gray-700 mb-6">Your account has been created successfully. Please contact the Fish Galaxy admin to grant access.</p>
                        {/* <button
                            onClick={() => navigate("/login")}
                            className="bg-mainclr text-white py-2 px-4 rounded-md hover:bg-mainhvr focus:outline-none focus:ring-2 focus:ring-mainclr transition"
                        >
                            Go to Login
                        </button> */}
                    </div>
                ) :
                    (

                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleRegister}
                            validationSchema={validationSchema}
                        >
                            {() => (
                                <Form className="space-y-4">
                                    <h2 className="text-xl md:text-2xl text-center font-medium text-gray-800 mb-6">
                                        Create your account
                                    </h2>

                                    {/* Full Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
                                            Full Name
                                        </label>
                                        <Field
                                            name="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr"
                                        />
                                        <ErrorMessage name="name" component="span" className="text-sm text-red-500" />
                                    </div>

                                    {/* Shop Name */}
                                    <div>
                                        <label htmlFor="shopName" className="block text-gray-700 text-sm font-medium mb-1">
                                            Shop Name
                                        </label>
                                        <Field
                                            name="shopName"
                                            type="text"
                                            placeholder="Enter your shop name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr"
                                        />
                                        <ErrorMessage name="shopName" component="span" className="text-sm text-red-500" />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                                            Email
                                        </label>
                                        <Field
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr"
                                        />
                                        <ErrorMessage name="email" component="span" className="text-sm text-red-500" />
                                    </div>

                                    {/* Mobile */}
                                    <div>
                                        <label htmlFor="mobile" className="block text-gray-700 text-sm font-medium mb-1">
                                            Mobile Number
                                        </label>
                                        <Field name="mobile">
                                            {({ field, form }) => (
                                                <PhoneInput
                                                    country={'in'}
                                                    value={field.value}
                                                    onChange={(mobile) => form.setFieldValue('mobile', mobile)}
                                                    inputClass="!w-full !py-2 !px-4 !rounded-md !border !border-gray-300"
                                                    inputStyle={{ width: '100%' }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            form.submitForm();
                                                        }
                                                    }}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="mobile" component="span" className="text-sm text-red-500" />
                                    </div>

                                    {/* Pincode */}
                                    <div>
                                        <label htmlFor="pincode" className="block text-gray-700 text-sm font-medium mb-1">
                                            Pincode
                                        </label>
                                        <Field
                                            name="pincode"
                                            type="text"
                                            placeholder="Enter your pincode"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr"
                                        />
                                        <ErrorMessage name="pincode" component="span" className="text-sm text-red-500" />
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-1">
                                            Address
                                        </label>
                                        <Field
                                            name="address"
                                            as="textarea"
                                            placeholder="Enter your address"
                                            rows="3"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainclr"
                                        />
                                        <ErrorMessage name="address" component="span" className="text-sm text-red-500" />
                                    </div>

                                    {error && <p className="my-1 text-red-400">{error}</p>}


                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={OTPLoading}
                                        className="w-full bg-mainclr text-white py-2 px-4 rounded-md hover:bg-mainhvr focus:outline-none focus:ring-2 focus:ring-mainclr focus:ring-offset-2 transition"
                                    >
                                        {OTPLoading ? "Sending OTP..." : "Create Account"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    )
            }
        </>

    );
};

const OTPVerification = ({ setActiveTab, mobile, handleOTPVerification, loading, setShowOTPForm }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [resendSeconds, setResendSeconds] = useState(30);
    const [resendLoading, setResendLoading] = useState(false);

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
        const newOtp = [...otp];

        for (let i = 0; i < otp.length; i++) {
            if (pastedData[i] && !isNaN(pastedData[i])) {
                document.getElementById(`otp-input-${i}`).value = pastedData[i];
                newOtp[i] = pastedData[i];
            }
        }

        setOtp(newOtp);
        document.getElementById(`otp-input-${otp.length - 1}`).focus();
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpNumber = otp.join("");

        if (otpNumber.length !== 6) {
            setError("Please enter a 6-digit OTP");
            return;
        }

        setError("");
        handleOTPVerification(otpNumber);
    };

    const handleResendOTP = async () => {
        setResendLoading(true);
        try {
            const res = await commonRequest(
                "POST",
                "/auth/resend-otp",
                { mobile },
                appJson
            );

            if (res.success) {
                toast.success("OTP resent successfully");
                setResendSeconds(30);
            } else {
                throw new Error(res.response?.data?.error || "Failed to resend OTP");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setResendLoading(false);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (resendSeconds > 0) {
                setResendSeconds(resendSeconds - 1);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [resendSeconds]);

    return (
        <div className="max-w-md mx-auto">
            <div className="flex items-center mb-2">
                <button
                    type="button"
                    onClick={() => setShowOTPForm(null)}
                    className="text-mainclr hover:text-blue-800 mr-2"
                >
                    <FaArrowLeft size={18} />
                </button>
                <h2 className="text-xl md:text-2xl text-center font-medium text-gray-800">
                    OTP Verification
                </h2>
            </div>
            <p className="text-gray-600 mb-6">
                We've sent a verification code to {mobile}
            </p>

            <form onSubmit={handleSubmit}>
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
                            onPaste={handlePaste}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && index === otp.length - 1) {
                                    handleSubmit(e);
                                }
                            }}
                        />
                    ))}
                </div>
                {error && <p className="my-2 text-red-400">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-mainclr text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-mainclr focus:ring-offset-2 transition mb-4"
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <div className="text-center">
                    {resendSeconds > 0 ? (
                        <p className="text-gray-500 text-sm">
                            Resend OTP in {resendSeconds} seconds
                        </p>
                    ) : (
                        <button
                            type="button"
                            onClick={handleResendOTP}
                            disabled={resendLoading}
                            className="text-mainclr hover:text-blue-800 text-sm font-medium"
                        >
                            {resendLoading ? "Sending..." : "Resend OTP"}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default SignupForm;