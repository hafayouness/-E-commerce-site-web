import React from "react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { LuUserCircle2 } from "react-icons/lu";
import { BsCart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handelShow = () => {
    setShowMenu((preve) => !preve);
  };
  const handlLogout = () => {
    dispatch(logoutRedux());
    toast("Logout Succesfully");
  };
  const CartItemNumber = useSelector((state) => state.product.CartItems);
  console.log(CartItemNumber);
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white ">
      {/* desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10">
            <img className="h-full" src={logo} alt="" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7  ">
          <nav className=" gap-4 md:gap-6 text-base md:text-lg hidden md:flex ">
            <Link to={""}>Home</Link>
            <Link to={"menu/657331383eb07575fd8ef204"}>Menu</Link>

            <Link to={"contact"}>Contact</Link>
          </nav>

          <div className="text-2xl text-slate-600 relative">
            <Link to="/cart">
              <BsCart />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full text-xs text-center">
                {CartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className=" text-slate-600" onClick={handelShow}>
            <div className="text-2xl cursor-pointer ">
              {userData.image ? (
                <img
                  src={userData.image}
                  alt=""
                  className=" w-10 h-10  rounded-full overflow-hidden Sticky-cover"
                />
              ) : (
                <LuUserCircle2 />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer"
                  >
                    New Product
                  </Link>
                )}

                {userData.image ? (
                  <p className="cursor-pointer " onClick={handlLogout}>
                    logout
                    <span className="font-bold text-blue-500">
                      ({userData.firstname})
                    </span>
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg  flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"menu/657331383eb07575fd8ef204"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                  <Link to={"About"} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
}
