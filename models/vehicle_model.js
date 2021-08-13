const mongoose = require("mongoose");

const vehicleModelSchema = new mongoose.Schema(
  {
    carModel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "car_models",
    },
    number_plate: {
      type: String,
      required: true,
    },
    county_location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const VehicleModel = mongoose.model("vehicle", vehicleModelSchema);
module.exports = VehicleModel;
