const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker");

router.get("/collection", (req, res) => {
    Sneaker.find({})
        .then((dbResult) => {
            res.render("products.hbs", {
                sneakers: dbResult,
            })   
        })
        .catch((err) => {
            console.log(err);
    })
});


router.get("/men", (req, res) => {
    Sneaker.find({category:'men'})
        .then((dbResult) => {
            res.render("products.hbs", {
                menSneakers: dbResult,
            })   
        })
        .catch((err) => {
            console.log(err);
    })
});

router.get("/women", (req, res) => {
    Sneaker.find({category:'women'})
        .then((dbResult) => {
            res.render("products.hbs", {
                womenSneakers: dbResult,
            })   
        })
        .catch((err) => {
            console.log(err);
    })
});

router.get("/kids", (req, res) => {
    Sneaker.find({ category: 'kids' })
        .then((dbResult) => {
            res.render("products.hbs", {
                kidsSneakers: dbResult,
            })
        })
        .catch((err) => {
            console.log(err);
        })
});

// router.get("/sneakers/:cat", (req, res) => {
//   res.send("bar");
// });

module.exports = router;
