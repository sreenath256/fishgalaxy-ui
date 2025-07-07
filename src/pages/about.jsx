import React from 'react';
import { pr1 } from '../assets';

const About = () => {
  return (
    <div className="w-full h-full">
      <div className="w-[95%] md:w-11/12 mx-auto py-10">
       

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Side */}
          <div className="lg:w-1/2">
            <img 
              src={pr1} 
              alt="About our company" 
              className="w-full h-auto rounded-lg shadow-xl object-cover"
            />
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Journey</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2010, we started as a small team with big dreams. Over the years, we've grown into a trusted 
              name in our industry, serving thousands of satisfied customers across the country.
            </p>
            
            <h3 className="text-xl font-medium text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              To provide exceptional service and innovative solutions that make a real difference in our customers' lives. 
              We believe in quality, integrity, and going the extra mile.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">10+ years of industry experience</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">1000+ satisfied customers</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">Award-winning customer service</p>
              </div>
            </div>

            <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Learn More About Our Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;