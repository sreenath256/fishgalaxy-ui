import React, { useState, useEffect } from "react";
import { CiCreditCard1, CiDeliveryTruck } from "react-icons/ci";
import { IoTimerOutline } from "react-icons/io5";
import { TfiAnnouncement } from "react-icons/tfi";
import ban1 from '../assets/images/fishban2 (1).jpg'; // Update with correct path and extension

const Welcome = () => {
  return (
    <div className="relative overflow-hidden">
      {/* about */}
      <div className="w-[95%] md:w-11/12 mx-auto px-4 py-5 "> <img className="h-[60vh] w-full rounded-xl overflow-hidden object-cover" src={ban1} alt="" /></div>
      <section className="py-10  bg-gray-50">
        <div className="w-[95%] md:w-11/12 mx-auto px-4">
          <div className="flex flex-col gap-10 gap-x-12">
            {/* Content Section (Right on desktop, bottom on mobile) */}
            <div className="w-full ">
              <h2 className="text-2xl md:text-4xl font-medium text-gray-800 mb-6">
                About Our Fish Galaxy
              </h2>

              <p className=" text-gray-600 mb-6">
                Since 2010, we've been providing premium aquarium supplies and
                healthy aquatic life to enthusiasts and professionals alike. Our
                passion for underwater ecosystems drives everything we do. We
                specialize in freshwater and saltwater fish, corals, live
                plants, and complete aquarium setups. Our inventory includes
                high-quality filtration systems, LED lighting, protein skimmers,
                and aquarium decor from trusted brands. Our knowledgeable staff
                offers personalized consultations for beginners and advanced
                aquarists, covering tank maintenance, water chemistry, and fish
                compatibility. We source livestock ethically and quarantine all
                specimens to ensure health. From nano tanks to massive reef
                systems, we provide everything needed to create thriving aquatic
                environments. Visit our 5,000 sq ft showroom featuring stunning
                display tanks that inspire hobbyists at every level.{" "}
              </p>

              <div className=" mb-8 text-sm xl:text-base">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">
                    <span className="font-medium">200+ Species</span> of
                    healthy, ethically-sourced fish
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">
                    <span className="font-medium">Premium Equipment</span> from
                    trusted brands worldwide
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">
                    <span className="font-medium">Expert Advice</span> from our
                    passionate aquarium specialists
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium">
                  Visit Our Store
                </button>
                <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors font-medium">
                 Talk to us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  */}
      <section className="bg-white py-10 xl:py-20 px-4">
        <div className="w-[95%] md:w-11/12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* SPEED DELIVERY */}
            <div className="flex items-center gap-5 justify-center text-center p-4 border border-gray-200 rounded-lg">
              <CiDeliveryTruck className="text-5xl text-indigo-600" />
              <div>
                <div className=" font-medium mb-2">SPEED DELIVERY</div>
                <div className="text-sm text-gray-400">
                  Surface And Air Delivery
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5 justify-center text-center p-4 border border-gray-200 rounded-lg">
              <IoTimerOutline className="text-4xl text-indigo-600" />
              <div>
                <div className=" font-medium mb-2">24X7 SERVICE</div>
                <div className="text-sm text-gray-400">
                  Online Service For 24 X 7
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5 justify-center text-center p-4 border border-gray-200 rounded-lg">
              <TfiAnnouncement className="text-4xl -rotate-12 text-indigo-600" />
              <div>
                <div className=" font-medium mb-2">NEW STOCKS DAILY</div>
                <div className="text-sm text-gray-400">
                  New Updates Every Day
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5 justify-center text-center p-4 border border-gray-200 rounded-lg">
              <CiCreditCard1 className="text-4xl text-indigo-600" />
              <div>
                <div className=" font-medium mb-2">BEST PRICES & OFFERS</div>
                <div className="text-sm text-gray-400">
                  Lowest Price In The Market
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
