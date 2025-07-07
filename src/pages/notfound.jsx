import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="min-h-[80vh] grid place-items-center">
      <div className="text-center py-20">
        <h1 className="text-5xl xl:text-9xl font-bold text-mainclr mb-4">404</h1>
        <p className="text-xl">Page not found</p>
        <Link
          to="/"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
