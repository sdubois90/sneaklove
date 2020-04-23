
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SneakerSchema = new Schema({
    name : String,
    ref : String,
    sizes : String,
    description : String,
    price : Number,
    category: ["men", "women", "kids"], 
    id_tags: Schema.ObjectId,
});

const Sneaker = mongoose.model("Sneaker", SneakerSchema);

module.exports = Sneaker;

