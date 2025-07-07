import React from "react";
import { Link } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";

const header = () => {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <svg
                className="h-8 w-8 text-mainclr"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                  fill="currentColor"
                />
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  fill="white"
                />
              </svg>
              <span className="ml-2 text-xl font-medium text-gray-900">
                Fish Galaxy
              </span>
            </Link>
          </div>

          {/* Login button and mobile menu button */}
        
            <button className="flex gap-2 items-center w-fit px-2 md:px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mainclr hover:bg-mainhvr focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainclr">
              <p className="capitalize">Login</p>
              <IoLogInOutline className="text-xl"/>
            </button>
      
        </div>
      </div>
    </header>
  );
};

export default header;
