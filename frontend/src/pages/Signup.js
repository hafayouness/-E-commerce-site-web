import React, { useState } from "react";
import LoginAnimate from "../assets/login-animation.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    Confirmpassword: "",
    image: "",
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

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };
  const handleProfileImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    console.log(data);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  console.log(process.env.REACT_APP_SERVER_DOMIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, Confirmpassword } = data;

    console.log(data);
    if (firstname && lastname && email && password && Confirmpassword) {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);

      if (response.status === 409) {
        // Afficher un toast d'erreur si l'e-mail existe déjà
        toast.error("Email id is already registered");
        return; // Arrêter la fonction ici pour éviter d'aller plus loin en cas d'erreur 409
      }

      const dataRes = await response.json();

      if (dataRes.isNewEmail) {
        // Si l'inscription réussit et que l'e-mail est nouveau, afficher un toast de succès
        toast.success(dataRes.message);

        // Déclencher la navigation
        if (dataRes.alert) {
          navigate("/login");
        } // Remplacez '/accueil' par votre chemin de page d'accueil
      }

      if (!response.ok) {
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
      }

      if (password === Confirmpassword) {
        toast.success(dataRes.message);
        navigate("/login");
      } else {
        toast.error("password and confirm password not equal");
      }
    } else {
      toast.error("Please Enter required fields");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm m-auto bg-white  flex flex-col  p-4 rounded-sm">
        {/* <h1 className="text-center text-2xl font-bold "> sign up </h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md  m-auto relative ">
          <img
            src={data.image ? data.image : LoginAnimate}
            alt=""
            className="w-full "
          />
          <label htmlFor="profileImage">
            <div className=" absolute bottom-0 h-1/3 w-full bg-opacity-50 bg-slate-500 text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type={"file"}
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImage}
            />
          </label>
        </div>
        <form className=" w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name :</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className=" w-full mt-1 mb-2  bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.firstname}
            onChange={handlechange}
          />
          <label htmlFor="lastname">Last Name :</label>
          <input
            type={"text"}
            id="lastname"
            name="lastname"
            className=" w-full mt-1 mb-2  bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.lastname}
            onChange={handlechange}
          />
          <label htmlFor="email"> E-mail :</label>
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
              className=" w-full   bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handlechange}
            />
            <span className="flex text-xl " onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <label htmlFor="Confirmpassword"> Confirm Password :</label>
          <div className="flex px-2 py-1  bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="Confirmpassword"
              name="Confirmpassword"
              className=" w-full   bg-slate-200 border-none outline-none"
              value={data.Confirmpassword}
              onChange={handlechange}
            />
            <span className="flex text-xl " onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button className="w-full max-w-[150px] m-auto bg-blue-600 cursor-pointer text-white font-medium text-xl  text-center py-1 rounded-full mt-2">
            Sign up
          </button>
        </form>
        <p className="text-left text-sm mt-3">
          Already have account ?
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
