const CarModel = require("../models/carModel_model.js");

// GET - get all from car_model collection in database
const getAllFromCarModelCollection = (req, res) => {
  CarModel.find()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

// POST - add new model to carModel collection in database

const postNewCarModel = (req, res) => {
  const newCarModel = new CarModel(req.body);
  newCarModel
    .save()
    .then((data) => res.json({ message: "Car model saved" }))
    .catch((err) => console.log(err));
};

module.exports = { getAllFromCarModelCollection, postNewCarModel };
