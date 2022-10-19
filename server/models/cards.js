const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  adress: {
    type: String,
    require: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

exports.Card = Card;
