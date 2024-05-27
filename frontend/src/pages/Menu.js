import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { AddCartItem } from "../redux/productSlide";

function Menu() {
  const { filterBy } = useParams();
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData.filter((el) => el._id === filterBy)[0];
  console.log(productDisplay);
  const dispatch = useDispatch();
  const handleAddProduct = (e) => {
    dispatch(AddCartItem(productDisplay));
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white gap-5">
        <div className="max-w-sm  overflow-hidden w-full p-5">
          <img
            src={productDisplay.image}
            alt=""
            className="hover:scale-105 transition-all h-full "
          />
        </div>
        <div className="flex flex-col gap-3 pt-9  ">
          <h2 className="font-semibold capitalize text-2xl ">
            <span className=" text-black ">Name</span>:{" "}
            <span className=" text-slate-600   ">{productDisplay.name}</span>
          </h2>
          <p className="  text-slate-500 capitalize font-medium text-2xl">
            <span className="  text-black  capitalize font-semibold">
              Category
            </span>
            : <span className="">{productDisplay.category}</span>
          </p>
          <p className=" font-bold md:text-2xl">
            <span className="text-black capitalize font-semibold">Price :</span>
            <span className="text-slate-500 "> {productDisplay.price}</span>
            <span className=" text-red-400">DH</span>
          </p>
          <div className="flex gap-3">
            <button className="bg-yellow-400 py-1   mt-2 rounded hover:bg-yellow-500 min-w-[150px] ">
              Buy
            </button>
            <button
              className="bg-yellow-400 py-1 mt-2 rounded hover:bg-yellow-500 min-w-[150px]"
              onClick={handleAddProduct}
            >
              Add Cart
            </button>
          </div>
          <div className="pt-2 mb-3">
            <p className="text-black  font-semibold  capitalize text-2xl">
              Descriptions :
            </p>
            <p className=" font-thin text-base">
              -{productDisplay.description}.
            </p>
          </div>
        </div>
      </div>
      <AllProduct heading={"Related Product"} />
    </div>
  );
}

export default Menu;
