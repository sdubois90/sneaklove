const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SneakerSchema = new Schema({
  name: String,
  ref: String,
  size: String,
  description: String,
  price: Number,
  image: {
    type: String,
    default: "/medias/img/shoe.png",
  },
  imgName: String,
  imgPath: String,
  category: ["men", "women", "kids"],
  id_tags: {
    type: Schema.Types.ObjectId,
    ref: "Tag"
  }

  // [{ type: Schema.Types.Object, ref: "id" }],
});

const Sneaker = mongoose.model("Sneaker", SneakerSchema);

module.exports = Sneaker;