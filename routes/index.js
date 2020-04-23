const express = require("express");
const router = express.Router();
const Sneaker = require("../models/Sneaker");

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


// router.get('/recipes/:id', (req, res) => {
// 	//                  ^
// 	//                  |
// 	// Request parameter accessible through req.params.id
// 	recipesModel
// 		.findById(req.params.id)
// 		.then((dbResult) => {
// 			// Display a view with only one recipe
// 			console.log(dbResult);
// 			res.render('recipes/oneRecipe.hbs', {
// 				recipe: dbResult
// 			});
// 		})
// 		.catch((dbErr) => {
// 			res.render('fourOhFour.hbs');
// 		});
// });




router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});


module.exports = router;