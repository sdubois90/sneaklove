const express = require("express");
const router = new express.Router();
const User = require("../models/User");
// const upload = require("../config/cloudinaryUpload");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


// SIGN UP

router.get("/signup", (req, res) => {
    res.render("signup.hbs", {
        error: req.flash("error")
    });
});



router.post("/signup", (req, res) => {
    const { name, lastname, email, password } = req.body;
    console.log(req.body)
    User.findOne( {email: email } )
        .then((dbResult) => {
            if (dbResult) {
                req.flash("error", "The email is already taken...");
                res.redirect('/signup')
            } else {
                const salt = 10;
                const passwordCrypte = bcrypt.hashSync(password, salt);
                const newUser = {
                    name,
                    lastname,
                    email,
                    password: passwordCrypte
                }

                User.create(newUser)
                    // User.create({name, lastname, email, password})
                    .then((newUser) => {
                        console.log(newUser)
                        res.redirect('/signin')
                    })
                    .catch((dbError) => {
                        console.log(dbError)
                    });
            }

        })
        .catch((dbError) => {
            console.log(dbError)
        });
});



// SIGN IN



router.get("/signin", (req, res) => {
    res.render("signin.hbs", {
        error: req.flash("error"),
    });
});



  // This one is for receiving post data.
  router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    // Check if user already exists with email.
    User.findOne({ email: email })
        .then((foundUser) => {
          console.log(foundUser)
        // If a user is not found, redirect to get("/signin") with an error message.
        if (!foundUser) {
          req.flash("error", "Invalid credentials....");
          res.redirect("/signin");
        } else {
          // If we're here, it means a user was found, we compare the password
          // coming from the form with the password of the foundUser.
          if (bcrypt.compareSync(password, foundUser.password)) {
            req.session.currentUser = foundUser; // <== This is what allows us to have our user logged in !
            res.redirect("/"); // Redirect to home
            // Matching passwords...
            // Login user...
          } else {
            // If the password didn't match, redirect to signin with an error message.
            req.flash("error", "Invalid credentials...");
            res.redirect("/signin");
          }
        }
      })
      .catch((dbErr) => {
        console.log(dbErr);
      });
  });


// LOG OUT

  router.get("/logout", (req, res) => {
    // Destroys the session.
    // Makes the user logged out.
    req.session.destroy((err) => {
      res.redirect("/");
    });
  });


module.exports = router;