import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

function FilterProduct({ category, onClick, isActive }) {
  return (
    <div className="" onClick={onClick}>
      <div
        className={`text-3xl  rounded-full p-5 cursor-pointer ${
          isActive ? "bg-red-500 text-white" : "bg-yellow-500"
        }`}
      >
        <CiForkAndKnife />
      </div>
      <p className="text-center my-1 font-semibold">{category}</p>
    </div>
  );
}

export default FilterProduct;
