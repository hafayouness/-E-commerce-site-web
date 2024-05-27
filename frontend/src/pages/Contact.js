import React, { useState } from "react";
import toast from "react-hot-toast";

function Contact() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, message } = formData;
    if (username && email && message) {
      const response = await fetch("http://localhost:8080/contact", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });
      console.log(response);
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        toast.success("The message has been received ");
        setFormData(() => {
          return {
            username: "",
            email: "",
            message: "",
          };
        });
      } else {
        toast.error("An error occurred while sending the message.");
      }
    } else {
      toast.error("Please complete all fields on the form.");
    }
  };

  return (
    <div className="p-2 md:p-4 ">
      <form
        className="w-full  max-w-xl  flex flex-col m-auto  py-3 "
        onSubmit={handleSubmit}
      >
        <h2 className=" font-bold py-4 text-center text-3xl">Contact Us</h2>
        <div className="flex flex-col ml-4 py-2">
          <label htmlFor="username" className="font-semibold p-1">
            Name :
          </label>
          <input
            name="username"
            type="text"
            onChange={handleChange}
            value={formData.username}
            id="username"
            className="w-full mt-1 mb-2  bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />
        </div>
        <div className="flex flex-col ml-4 py-2">
          <label htmlFor="email" className="font-semibold p-1 ">
            Adress Email:
          </label>

          <input
            name="email"
            type="text"
            onChange={handleChange}
            value={formData.email}
            id="email"
            className="w-full mt-1 mb-2  bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />
        </div>
        <div className="flex flex-col ml-4 py-2">
          <label htmlFor="comments" className="font-semibold p-1">
            Ur suggestions !
          </label>

          <textarea
            name="message"
            onChange={handleChange}
            value={formData.message}
            className="w-full mt-1 mb-2  bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          ></textarea>
        </div>

        <button className=" min-w-[150px] m-auto py-1 px-10 mt-2 rounded bg-blue-500 text-white hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
