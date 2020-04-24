const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const uploadCloud = require('../config/cloudinary.js');


// DASHBOARD


// ADD PRODUCT


router.get("/prod-add", (req, res) => {
  res.render("products_add.hbs");
});

router.post('/prod-add', uploadCloud.single('photo'), (req, res) => {
  // const {} = req.body
  // const newShoe = "";
  // if (req.file) {
  //   newShoe.avatar = req.file.secure_url;
  // }
  // const imgPath = req.file.url;


  Sneaker.create(req.body).then((dbResult) => {
      Sneaker.find({})
        .then((dbResult) => {
          const {
            name,
            ref,
            size,
            description,
            price,
            category
          } = req.body;
          const imgPath = req.file.url;
          const imgName = req.file.originalname;
          const newShoe = new Sneaker({
            name,
            ref,
            size,
            description,
            price,
            category,
            imgPath,
            imgName
          })
          newShoe.save()
            .then(dbResponse => {
              res.redirect("/sneakers/collection");
            })
            .catch(error => {
              console.log(error);
            })

        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});




// MANAGE PRODUCTS

router.get('/prod-manage', (req, res) => {
  Sneaker.find({})
    .then((dbResult) => {
      res.render("products_manage.hbs", {
        sneakers: dbResult,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});



// DELETE PRODUCTS


router.get("/product/delete/:id", (req, res) => {
  Sneaker.findByIdAndDelete(req.params.id)
    .then((dbResult) => {
      res.redirect("/prod-manage");
    })
    .catch((err) => {
      console.log(err);
    });
});



// EDIT PRODUCTS

router.get('/product/edit/:id', (req, res) => {
  Sneaker.findById(req.params.id)
    .then((dbResult) => {
      res.render('product_edit.hbs', {
        sneaker: dbResult,
        error: req.flash('error')
      });
    })
    .catch((dbError) => {
      console.log(dbError)
    });
});

router.post('/product/edit/:id', (req, res) => {
  if (req.body.name === "" || req.body.ref === "" || req.body.size === "" || req.body.description === "" || req.body.price === "") {
    req.flash("error", "Fill in everything please");
    res.redirect(`/product/edit/${req.params.id}`);
  } else {
    Sneaker.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      .then((dbResult) => {
        res.redirect("/prod-manage");
      })
      .catch((dbErr) => {
        console.log(dbErr);
      });
  }
});




//   router.post("/foods/edit/:id", requireAuth, (req, res) => {
//     // console.log(req.params.id);
//     // console.log(req.body);
//     if (req.body.name === "" || req.body.image === "" || req.body.price === "") {
//       req.flash("error", "Fill in everything please");
//       res.redirect(`/foods/edit/${req.params.id}`);
//     } else {
//       Food.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then((dbResult) => {
//           res.redirect("/foods/manage");
//         })
//         .catch((dbErr) => {
//           console.log(dbErr);
//         });
//     }
//   });



module.exports = router;