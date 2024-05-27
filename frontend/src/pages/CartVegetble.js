import React from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeatures";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function CartVegetble() {
  const productData = useSelector((state) => state.product.productList);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const homeProductCardListFruits = productData.filter(
    (el) => el.category === "fruits"
  );
  const homeProductCardListVegetbles = productData.filter(
    (el) => el.category === "vegetable"
  );
  const loadingArrayFeatures = new Array(17).fill(null);
  return (
    <div className="relative">
      <h2 className="text-center m-10 text-2xl text-green-500 cursor-pointer hover:text-green-600">
        The Fresh Vegetables{" "}
        <span className="text-green-600  hover:text-green-500">&</span> Fruits
      </h2>
      <div className=" absolute top-0 left-3">
        <button
          className="text-green-500 text-3xl  hover:text-green-600"
          onClick={handleBack}
        >
          <MdOutlineArrowBack />
        </button>
      </div>
      <div className="flex flex-wrap  justify-center gap-2 my-5 overflow-scroll scrollbar-none pb-2">
        {homeProductCardListVegetbles[0]
          ? homeProductCardListVegetbles.map((el) => {
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
        {homeProductCardListFruits[0]
          ? homeProductCardListFruits.map((el) => {
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

export default CartVegetble;
