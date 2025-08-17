import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductPageSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Left: Product Image */}
      <div className="w-full md:w-1/2 ">
        <Skeleton height={400} borderRadius={10} />
       
      </div>

      {/* Right: Product Details */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        {/* Title */}
        <Skeleton width={250} height={30} />

        {/* Price */}
        <div className="flex items-center gap-4">
          <Skeleton width={60} height={25} />
          <Skeleton width={80} height={20} />
        </div>

        {/* Stock status */}
        <Skeleton width={100} height={20} />

        {/* Quantity selector */}
        <div className="flex items-center gap-3">
          <Skeleton circle width={30} height={30} />
          <Skeleton width={50} height={30} />
          <Skeleton circle width={30} height={30} />
        </div>

        {/* Add to cart button */}
        <Skeleton width={150} height={45} borderRadius={8} />

        {/* Description */}
        <Skeleton count={2} />

        {/* Shipping info */}
        <Skeleton width={`80%`} height={20} />
        <Skeleton width={`70%`} height={20} />

        {/* Category */}
        <Skeleton width={120} height={20} />
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
