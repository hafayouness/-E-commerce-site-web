import React from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeatures";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function CartBurger() {
  const productData = useSelector((state) => state.product.productList);
  const navigate = useNavigate();

  const homeProductCardBurger = productData.filter(
    (el) => el.category === "burger"
  );
  const loadingArrayFeatures = new Array(16).fill(null);
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative">
      <h2 className="text-center m-10 text-3xl text-yellow-500 cursor-pointer hover:text-yellow-600">
        The burgers
      </h2>
      <div className=" absolute top-0 left-3">
        <button
          className="text-yellow-500 text-3xl  hover:text-yellow-600"
          onClick={handleBack}
        >
          <MdOutlineArrowBack />
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-3 my-5 overflow-scroll scrollbar-none pb-2 ">
        {homeProductCardBurger[0]
          ? homeProductCardBurger.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  description={el.description}
                />
              );
            })
          : loadingArrayFeatures.map((el, index) => {
              return (
                <CardFeature
                  loading="loanding..."
                  key={index + "cartLoading"}
                />
              );
            })}
      </div>
    </div>
  );
}
export default CartBurger;
