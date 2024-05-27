import React, { useRef } from "react";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeatures";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";
import { Link } from "react-router-dom";

export default function Home() {
  const productData = useSelector((state) => state.product.productList);

  const HomeProductCard = productData.slice(0, 4);
  const homeProductCardListVegetbles = productData.filter(
    (el) => el.category === "vegetable"
  );
  console.log(homeProductCardListVegetbles);
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeatures = new Array(15).fill(null);
  const sildeProductRef = useRef();
  const nextProduct = () => {
    sildeProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    sildeProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4 ">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full ">
            <p className="text-sm font-meduim text-slate-900"> bike delevery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              alt=""
              className="h-7 bg-slate-300"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            the Fastest Delevery in{" "}
            <span className="text-red-500 ">Your Home</span>
          </h2>
          <p className="py-3 text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries.
          </p>
          <Link to="/cartbutton">
            <button className="font-bold bg-yellow-500 text-slate-200 my-2 px-9 py-2 rounded-md hover:bg-yellow-600">
              Order Now
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {HomeProductCard[0]
            ? HomeProductCard.map((el) => {
                return (
                  <HomeCard
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
            : loadingArray.map((el, index) => {
                return (
                  <HomeCard key={index + "loading"} loading={"loanding..."} />
                );
              })}
        </div>
      </div>
      <div className="">
        <div className=" flex w-full justify-between items-center mb-3">
          <h2 className="font-bold text-2xl text-slate-800 mb-2 ">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              className="bg-slate-200 hover:bg-slate-300 text-lg p-1 rounded"
              onClick={preveProduct}
            >
              <GrPrevious />
            </button>
            <button
              className="bg-slate-200 hover:bg-slate-300 text-lg p-1 rounded"
              onClick={nextProduct}
            >
              <GrNext />
            </button>
          </div>
        </div>

        <div
          className="flex gap-5  overflow-scroll scrollbar-none scroll-smooth transition-all pb-2"
          ref={sildeProductRef}
        >
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
        </div>
      </div>
      <AllProduct heading={"Your Product"} />
    </div>
  );
}
