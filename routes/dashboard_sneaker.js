const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

router.get("/collection", (req, res) => {
    res.render("products.hbs");
});

router.get("/men", (req, res) => {
    res.render("products.hbs");
});

router.get("/women", (req, res) => {
    res.render("products.hbs");
});

router.get("/kids", (req, res) => {
    res.render("products.hbs");
});

// router.get("/sneakers/:cat", (req, res) => {
//   res.send("bar");
// });

module.exports = router;
