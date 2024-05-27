import React from "react";
import { Link } from "react-router-dom";

function CartButton() {
  // const imageUrl =
  //   "https://thumbs.dreamstime.com/b/pasta-tomatoes-ingredients-cooking-rustic-background-top-view-border-italian-food-concept-63780985.jpg?w=1600";
  // const dynamicStyles = {
  //   backgroundImage: `url("${imageUrl}")`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   height: "100vh",
  // };
  return (
    <div className=" bg-cover bg-center h-screen   scrollbar-none ">
      <h2 className="text-center p-4 font-bold text-4xl space-x-1 capitalize text-blue-600">
        Select Order Now
      </h2>
      <div className="flex justify-between items-center mt-40">
        <div className="w-full max-w-lg min-w-[100px] cursor-pointer  ml-20">
          <div className="max-w-lg  overflow-hidden w-full relative ">
            <Link to="/cartburger">
              <img
                alt=""
                className="min-w-[340px] object-cover h-40 hover:scale-105 transition-all rounded-md "
                src="https://img.freepik.com/premium-photo/close-up-tall-tasty-burger-with-cheese-tomatoes-omelet_215274-417.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699833600&semt=ais"
              />
              <p className="absolute bottom-6 left-5 capitalize font-bold text-white text-2xl">
                The Burger Bar
              </p>
            </Link>
          </div>
        </div>
        <div className="w-full max-w-lg min-w-[100px]  cursor-pointer rounded">
          <div className="max-w-lg  overflow-hidden w-full relative">
            <Link to="/cartvegetbales">
              <img
                alt=""
                className=" min-w-[340px] object-cover h-40 hover:scale-105 transition-all rounded-md"
                src="https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg"
              />
              <p className="absolute bottom-6 left-1 capitalize font-bold text-white text-2xl">
                the Fresh Vegetables <span className="text-slate-400">&</span>
                Fruits
              </p>
            </Link>
          </div>
        </div>

        <div className="w-full max-w-lg min-w-[100px] cursor-pointer rounded   ">
          <div className="w-full max-w-lg min-w-[100px]   overflow-hidden relative ">
            <Link to="/cartpizza">
              <img
                alt=""
                className="min-w-[340px] object-cover h-40 hover:scale-105 transition-all rounded-md"
                src="https://img.freepik.com/premium-photo/pizza-with-melted-mozzarella_168058-1227.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1702944000&semt=ais"
              />
              <p className="absolute bottom-6 left-5 capitalize font-bold text-white text-2xl">
                the Delecious Pizza
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartButton;
