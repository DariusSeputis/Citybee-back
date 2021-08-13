const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

// connecting mongoDB
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((response) => {
    console.log("MongoDB connected..");

    // Staring server
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((err) => console.log(err));

// Middlewares
app.use(cors());
app.use(express.json());

// Controllers
const {
  getAllFromCarModelCollection,
  postNewCarModel,
} = require("./controllers/carModel_controller.js");
const {
  postNewVehicle,
  countHowManyCarsEveryModelHas,
  getAllFromBouthCollections,
  getAllFromBouthCollectionsByCountry,
} = require("./controllers/vehicle_controller.js");
// Routes
// -- GET
// ---- GET all from car_models collection in db
app.get("/models", getAllFromCarModelCollection);
// ---- GET all models from car_models collection and count of theus models cars in vehicle collection
app.get("/modelscount", countHowManyCarsEveryModelHas);
// ---- GET get all cars in vehicle collection and populate with data from car_models collection
app.get("/vehicles", getAllFromBouthCollections);
// ---- GET get data from vehicle collection by country and populate with data from car_models collection
app.get("/vehicles/:country", getAllFromBouthCollectionsByCountry);
// -- POST
// ---- POST new car model to car_model collection
app.post("/models", postNewCarModel);
// ---- POST new vehicle to vehicle collection
app.post("/vehicles", postNewVehicle);
