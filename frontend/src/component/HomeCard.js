import React from "react";
import { Link } from "react-router-dom";

function HomeCard({ image, name, category, price, description, loading, id }) {
  return (
    <div className=" bg-white shadow-md p-2 rounded min-w-[150px]  ">
      {name ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-40 min-h-[150px]">
              <img src={image} alt="" className="h-full w-full" />
            </div>
            <h2 className="font-semibold text-slate-600 text-center capitalize whitespace-nowrap text-lg">
              {name}
            </h2>
            <p className="text-center text-slate-500 font-meduim">{category}</p>
            <p className="text-center font-bold">
              <span>{price}</span>
              <span className=" text-red-500">DH</span>
            </p>
          </Link>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
}

export default HomeCard;
