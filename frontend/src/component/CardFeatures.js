import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AddCartItem } from "../redux/productSlide";

function CardFeatures({
  image,
  name,
  price,
  category,
  description,
  loading,
  id,
}) {
  const dispatch = useDispatch();
  const handleAddProduct = (e) => {
    dispatch(
      AddCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white  hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer rounded flex flex-col ">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} alt="" className="h-full" />
            </div>
            <h2 className="font-semibold text-slate-600  text-center capitalize whitespace-nowrap text-lg mt-3">
              {name}
            </h2>
            <p className=" text-center text-slate-500 font-meduim mt-1">
              {category}
            </p>
            <p className=" text-center font-bold">
              <span>{price}</span>
              <span className=" text-red-500">DH</span>
            </p>
          </Link>
          <button
            className="bg-yellow-400 w-full py-1 rounded mt-2 hover:bg-yellow-500"
            onClick={handleAddProduct}
          >
            Add Card
          </button>
        </>
      ) : (
        <div className="min-h-[200px] flex justify-center items-center ">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
}

export default CardFeatures;
