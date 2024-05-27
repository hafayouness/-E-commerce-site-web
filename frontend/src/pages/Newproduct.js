import React from "react";
import { useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import toast from "react-hot-toast";

function Newproduct() {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const { name, category, description, price, image } = data;
    if (name && category && description && price && image) {
      try {
        const response = await fetch("http://localhost:8080/uploadProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Correction ici
          },
          body: JSON.stringify({
            name,
            category,
            description,
            price,
            image,
          }),
        });

        console.log(response);
        const fetchRes = await response.json();
        console.log(fetchRes);
        toast.success(fetchRes.message);

        setData(() => {
          return {
            name: "",
            category: "",
            image: "",
            price: "",
            description: "",
          };
        });
      } catch (error) {
        toast.error("Error:", error);
      }
    } else {
      toast("Enter required Fields");
    }
  };
  return (
    <div className="p-4">
      <form
        className="m-auto w-full shadow max-w-md flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-2xl pb-5 text-blue-500 text-bold">
          New Product
        </h2>
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          id="name"
          name="name"
          className="bg-slate-200 my-1 p-0.5"
          onChange={handleChange}
          value={data.name}
        />

        <label htmlFor="category">Category :</label>
        <select
          className="bg-slate-200 my-1 p-1"
          id="category"
          name="category"
          onChange={handleChange}
          value={data.category}
        >
          <option value={"other"}>select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icream"}>Icream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"panner"}>Panner</option>
          <option value={"sandwich"}>Sandwich</option>
        </select>
        <label htmlFor="image" className="my-1">
          Image :
          <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} alt="" className="h-full" />
            ) : (
              <span>
                <LuUploadCloud className="text-5xl" />
              </span>
            )}

            <input
              type={"file"}
              id="image"
              accept="image/*"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="price" className="my-1">
          Price :
        </label>
        <input
          type="text"
          className="bg-slate-200 my-1 p-1"
          name="price"
          id="price"
          onChange={handleChange}
          value={data.price}
        />
        <label htmlFor="description">Description : </label>
        <textarea
          id="description"
          row={2}
          name="description"
          className="bg-slate-200 p-1 my-1 resize-none"
          onChange={handleChange}
          value={data.description}
        ></textarea>
        <button className="text-white text-lg font-meduim bg-blue-500 my-2 hover:bg-red-600 drop-shadow">
          Save
        </button>
      </form>
    </div>
  );
}

export default Newproduct;
