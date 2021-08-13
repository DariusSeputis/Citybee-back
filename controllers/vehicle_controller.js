const VehicleModel = require("../models/vehicle_model.js");

// GET - get all vehicles populate with models and count how many vehicles has every model
const countHowManyCarsEveryModelHas = (req, res) => {
  VehicleModel.find({})
    .populate("carModel_id")
    .then((data) => {
      const arrayFromCarNames = data.reduce((total, item) => {
        total.push(item.carModel_id.car_name);
        return total.sort();
      }, []);

      // const uniqueModels = new Set(dataToSendToFrontend);
      let uniqueCarNames = new Set(arrayFromCarNames);
      let uniqueCarNamesArray = [...uniqueCarNames];
      let dataToSendToFrontEnd = [];

      for (let i = 0; i < uniqueCarNamesArray.length; i++) {
        let carName = uniqueCarNamesArray[i];
        let howMany = arrayFromCarNames.filter(
          (item) => item === carName
        ).length;
        dataToSendToFrontEnd.push({ how_many: howMany });
      }
      for (let i = 0; i < uniqueCarNamesArray.length; i++) {
        dataToSendToFrontEnd[i].car_name = uniqueCarNamesArray[i];
      }
      res.json(dataToSendToFrontEnd);
    })
    .catch((err) => console.log(err));
};

// GET - get all vehicles and populate with models
const getAllFromBouthCollections = (req, res) => {
  VehicleModel.find({})
    .populate("carModel_id")
    .then((data) => {
      const dataToSendToFrontend = data.reduce((total, item) => {
        total.push({
          car_name: item.carModel_id.car_name,
          hour_price: item.carModel_id.hour_price,
          number_plate: item.number_plate,
          county_location: item.county_location,
        });
        return total;
      }, []);
      res.json(dataToSendToFrontend);
    })
    .catch((err) => console.log(err));
};

// GET - get vehicles by country
const getAllFromBouthCollectionsByCountry = (req, res) => {
  VehicleModel.find({ county_location: req.params.country })
    .populate("carModel_id")
    .then((data) => {
      const dataToSendToFrontend = data.reduce((total, item) => {
        total.push({
          car_name: item.carModel_id.car_name,
          hour_price: item.carModel_id.hour_price,
          number_plate: item.number_plate,
          county_location: item.county_location,
        });
        return total;
      }, []);
      res.json(dataToSendToFrontend);
    })
    .catch((err) => console.log(err));
};

// POST - add new model to carModel collection in database

const postNewVehicle = (req, res) => {
  const newVehicle = new VehicleModel(req.body);
  newVehicle
    .save()
    .then((data) => res.json({ message: "Vehicle saved" }))
    .catch((err) => console.log(err));
};

module.exports = {
  postNewVehicle,
  countHowManyCarsEveryModelHas,
  getAllFromBouthCollections,
  getAllFromBouthCollectionsByCountry,
};
