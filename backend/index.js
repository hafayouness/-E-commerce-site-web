const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// schemauser
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  Confirmpassword: String,
  image: String,
});

const userModel = new mongoose.model("user", userSchema);

// routes
app.get("/", (req, res) => {
  res.send("server is running");
});

// SIGNUP
const checkIfUserExists = async (email) => {
  try {
    const existingUser = await userModel.findOne({ email: email });
    return existingUser !== null;
  } catch (error) {
    throw error;
  }
};

const signUpUser = async (req, res) => {
  const { email } = req.body;
  try {
    const emailExists = await checkIfUserExists(email);

    if (emailExists) {
      return res.status(409).json({
        message: "Email id is already registered",
        alert: false,
      });
    } else {
      const data = new userModel(req.body);
      const savedUser = await data.save();
      res.status(201).json({ message: "Successfully signed up", alert: true });
      console.log(savedUser);
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
app.post("/signup", signUpUser);

//login
app.post("/login", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      const dataSend = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        Confirmpassword: user.Confirmpassword,
        image: user.image,
      };
      // const passwordMatch = await bcrypt.compare(password, user.password);

      console.log(dataSend);
      res.json({ message: "Login successful", alert: true, data: dataSend });
    } else {
      res.status(401).json({
        message: "Email is not available,Please sign up ",
        alert: false,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// schemaProduct

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  image: String,
  price: String,
});

const productModel = new mongoose.model("product", ProductSchema);

// api
app.post("/uploadProduct", async (req, res) => {
  try {
    console.log(req.body);

    // Créer une nouvelle instance du modèle
    const productInstance = new productModel(req.body);

    // Sauvegarder le produit dans la base de données et attendre la résolution
    const savedProduct = await productInstance.save();

    console.log(savedProduct);
    res.send({ message: "upload successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});
// contact us
const ContactSchema = mongoose.Schema({
  username: String,
  email: String,
  message: String,
});
const ContactModel = mongoose.model("contact", ContactSchema);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/contact", async (req, res) => {
  try {
    const { username, email, message } = req.body;
    // Créer une nouvelle instance du modèle
    const contactInstance = new ContactModel({ username, email, message });

    // Sauvegarder le produit dans la base de données et attendre la résolution
    const savedContact = await contactInstance.save();
    console.log("donnes de formulaire recus", { username, email, message });
    res.status(200).json({ success: true, message: "donnes reue avec succes" });
  } catch (err) {
    console.error(
      "Erreur lors de l'enregistrement dans la base de données :",
      err
    );
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'enregistrement dans la base de données",
    });
  }
});
const Port = process.env.PORT || 8080;
// mongodb connect
console.log(process.env.MONGODB_URL);
// mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connect to database"))
  .catch((err) => console.log(err));

// api

app.listen(Port, () => {
  console.log("Server is running on port:" + Port);
});
