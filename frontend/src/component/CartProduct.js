import React from "react";
import { TbPlus } from "react-icons/tb";
import { TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  DeleteCartItem,
  increaseQty,
  decreaseQty,
} from "../redux/productSlide";

function CartProduct({ id, image, name, category, qty, total, price }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(DeleteCartItem(id));
  };
  const handleplus = () => {
    dispatch(increaseQty(id));
  };
  const handleminus = () => {
    dispatch(decreaseQty(id));
  };

  return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border-2 my-1 border-slate-200 ">
      <div className="p-3 bg-white rounded overflow-hidden">
        <img src={image} alt="" className="h-28 w-36 object-cover" />
      </div>
      <div className="flex flex-col gap-1 w-full ">
        <div className="flex justify-between ">
          <h3 className="font-semibold  capitalize text-lg md:text-xl">
            <span className=" text-slate-500  ">Name</span>:
            <span className="  text-slate-600 ml-1">{name}</span>
          </h3>
          <div
            className="cursor-pointer text-slate-700 hover:text-red-500"
            onClick={handleDelete}
          >
            <AiFillDelete />
          </div>
        </div>

        <p className=" font-medium  text-lg md:text-xl">
          <span className="text-slate-500 ">Category</span>:
          <span className="text-slate-600 ml-1">{category}</span>
        </p>
        <p className="font-bold text-base">
          <span className=" text-slate-500">Price :</span>
          <span className=" text-slate-600 ml-1"> {price}</span>
          <span className="text-red-400">DH</span>
        </p>
        <div className=" flex justify-between ">
          <div className="flex gap-3 items-center  ">
            <button
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1"
              onClick={handleplus}
            >
              <TbPlus />
            </button>
            <p className="font-semibold p-1  text-lg ">{qty}</p>
            <button
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1"
              onClick={handleminus}
            >
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <p className="text-1xl font-bold capitalize">Total :</p>
            <p>
              {total}
              <span className="text-red-500 font-bold text-1xl">Dh</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
