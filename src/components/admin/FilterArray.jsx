import React, { useEffect, useState } from "react";

const FilterArray = ({ list, handleClick }) => {
  const [activeStatusFilter, setActiveStatusFilter] = useState(list[0]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stat = params.get("status");
    if (stat) {
      setActiveStatusFilter(stat);
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setActiveStatusFilter(value);
    handleClick("page", "");

    if (value === "all") {
      handleClick("status", "");
    } else {
      handleClick("status", value);
    }
  };

  return (
    <div className="">
      <select
        value={activeStatusFilter}
        onChange={handleChange}
        className="p-2 rounded-md shadow text-sm text-gray-700 bg-white border border-gray-300 focus:outline-none"
      >
        {list.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterArray;
