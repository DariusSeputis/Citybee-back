const mongoose = require("mongoose");

const carModelSchema = new mongoose.Schema(
  {
    car_name: {
      type: String,
      required: true,
    },
    hour_price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CarModel = mongoose.model("car_models", carModelSchema);
module.exports = CarModel;
