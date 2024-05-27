import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardFeature from "../component/CardFeatures";
import { MdOutlineArrowBack } from "react-icons/md";

function CartPizza() {
  const productData = useSelector((state) => state.product.productList);
  const navigate = useNavigate();

  const homeProductCardPizza = productData.filter(
    (el) => el.category === "pizza"
  );
  const loadingArrayFeatures = new Array(16).fill(null);
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative">
      <h2 className="text-center m-10 text-3xl text-red-500 cursor-pointer hover:text-red-600">
        The Pizza
      </h2>
      <div className=" absolute top-0 left-3">
        <button
          className="text-red-500 text-3xl  hover:text-red-600"
          onClick={handleBack}
        >
          <MdOutlineArrowBack />
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 my-5 overflow-scroll scrollbar-none pb-2 ">
        {homeProductCardPizza[0]
          ? homeProductCardPizza.map((el) => {
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

export default CartPizza;
