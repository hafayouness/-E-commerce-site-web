import React, { useState } from "react";
import LoginAnimate from "../assets/login-animation.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  // redux methode data
  const userData = useSelector((state) => state);
  console.log(userData);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      const dataRes = await response.json();
      console.log(dataRes);
      if (response.status === 401) {
        // Afficher un toast d'erreur si l'e-mail existe déjà
        toast.error(dataRes.message);
        return; // Arrêter la fonction ici pour éviter d'aller plus loin en cas d'erreur 409
      }

      toast.success(dataRes.message);

      // Déclencher la navigation
      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } else {
      toast.error(" please fill all the field");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white  m-auto   flex  flex-col p-4">
        {/* <h1 className="text-center text-2xl font-bold "> sign up </h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md  m-auto">
          <img src={LoginAnimate} alt="" className="w-full  " />
        </div>
        <form className=" w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Entry Ur E-mail :</label>
          <input
            type="email"
            id="email"
            name="email"
            className=" w-full mt-1 mb-2  bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handlechange}
          />
          <label htmlFor="password"> Password :</label>
          <div className="flex px-2 py-1  bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full  bg-slate-200  border-none outline-none"
              value={data.password}
              onChange={handlechange}
            />
            <span className="flex text-xl " onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto bg-blue-600 cursor-pointer text-white font-medium text-xl  text-center py-1 rounded-full mt-2">
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-3">
          don't have account ?
          <Link to={"/signup"} className="text-red-500 underline">
            signup
          </Link>
        </p>
      </div>
    </div>
  );
}
