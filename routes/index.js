// TEST GITHUB


const express = require("express");
const router = express.Router();
const Sneaker = require("../models/Sneaker");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/", (req, res) => {
  res.render("index.hbs");
});

router.get("/one-product/:id", (req, res) => {
  Sneaker.findById(req.params.id)
    .then((dbResult) => {
      res.render("one_product.hbs", {
        sneaker: dbResult
      });
    })
    .catch((dbErr) => {
      console.log(dbErr)
    })

});

router.get("/sneakers/collection", (req, res) => {
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


router.get("/sneakers/men", (req, res) => {
  Sneaker.find({
      category: 'men'
    })
    .then((dbResult) => {
      res.render("products.hbs", {
        menSneakers: dbResult,
      })
    })
    .catch((err) => {
      console.log(err);
    })
});

router.get("/sneakers/women", (req, res) => {
  Sneaker.find({
      category: 'women'
    })
    .then((dbResult) => {
      res.render("products.hbs", {
        womenSneakers: dbResult,
      })
    })
    .catch((err) => {
      console.log(err);
    })
});

router.get("/sneakers/kids", (req, res) => {
  Sneaker.find({
      category: 'kids'
    })
    .then((dbResult) => {
      res.render("products.hbs", {
        kidsSneakers: dbResult,
      })
    })
    .catch((err) => {
      console.log(err);
    })
});


module.exports = router;