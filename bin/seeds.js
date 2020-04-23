require('dotenv').config();
const mongoose = require("mongoose");
const Sneaker = require('../models/Sneaker');

const sneakers = [
    {
        name: "Nike",
        ref: "1235",
        size: "43",
        description:"Super shoes",
        price:103,
        category: "men",
    },
    {
        name: "Addidas",
        ref: "87985",
        size: "42",
        description: "Good shoes",
        price: 54,
        category: "women",
    },
    {
        name: "Reebok",
        ref: "4658",
        size: "30",
        description: "Nice shoes",
        price: 67,
        category: "kids",
    },
];

mongoose
    .connect(process.env.MONGO_URI)
    .then((self) => {
        console.log(`Connected to ${self.connection.name}`);

        // Seeds
        Sneaker.create(sneakers)
            .then((sneakers) => {
                sneakers.forEach((element) => {
                    console.log(element.name);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch((err) => {
        console.log(`Error occured while connecting to the Database ${err}`);
    });
