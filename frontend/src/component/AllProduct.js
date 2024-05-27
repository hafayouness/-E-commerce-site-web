import React, { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import CardFeature from "./CardFeatures";
import { useSelector } from "react-redux";

function AllProduct({ heading }) {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  const [filterBy, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  const laodingArrayFeature = new Array(10).fill(null);
  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };
  return (
    <div className="py-5">
      <div>
        <h2 className="font-bold text-2xl text-slate-800 mb-2 ">{heading}</h2>
        <div className=" flex justify-center gap-4 overflow-scroll scrollbar-none">
          {categoryList[0] &&
            categoryList.map((el) => {
              return (
                <FilterProduct
                  category={el}
                  isActive={el.toLowerCase() === filterBy.toLowerCase()}
                  onClick={() => handleFilterProduct(el)}
                />
              );
            })}
        </div>
        <div className="flex flex-wrap justify-center gap-3 my-5 overflow-scroll scrollbar-none pb-2 ">
          {dataFilter[0]
            ? dataFilter.map((el) => {
                return (
                  <CardFeature
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                  />
                );
              })
            : laodingArrayFeature.map((el, index) => {
                return (
                  <CardFeature
                    loading="Loading..."
                    key={index + "allProduct"}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default AllProduct;
