import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-8">
         
          <div className="x-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Copyright */}
              <div className="text-gray-600 mb-4 md:mb-0 text-sm md:text-base">
                &copy; {new Date().getFullYear()} - Fish galaxy. All rights
                reserved.
              </div>
    
              {/* Social Media Icons */}
              <div className="flex space-x-5">
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
  )
}

export default Footer
