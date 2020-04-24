const express = require("express");
const router = new express.Router();
const User = require("../models/User");
// const upload = require("../config/cloudinaryUpload");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/signup", (req, res) => {
    console.log("abc")
    res.render("signup.hbs");
});

router.post("/signup", (req, res) => {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
    const myUser = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPass
    }
    
    User.create(myUser)
        .then((self) => {
            res.redirect('/signin')
        })
        .catch((dbError) => {
            console.log("c'est nuuuuul")
        });
});







// router.post("/signup", (req, res) => {
//     const { name, lastname, email, password } = req.body;
//     console.log(req.body)
//     User.findOne({ email: email })
//         .then((dbResult) => {
//             if (dbResult) {
//                 res.redirect('/signup')
//             }
//             else {
//                 const salt = 10;
//                 const passwordCrypte = bcrypt.hashSync(password, salt);
//                 const newUser = { name, lastname, email, password: passwordCrypte }
//             }
//             User.create(newUser)
//                 // User.create({name, lastname, email, password})
//                 .then((newUser) => {
//                     console.log(newUser)
//                     res.redirect('/signin')
//                 })
//                 .catch((dbError) => {
//                     console.log(dbError)
//                 });
//         })
//         .catch((dbError) => {
//             console.log(dbError)
//         });
// });








//   router.post("/signup", upload.single("avatar"), (req, res) => {
//     // console.log(req.file);
//     // console.log(req.body);
//     //
//     const { email, password } = req.body;
//     // Check if user with that email already exists in the Database.
//     User.findOne({ email: email })
//       .then((foundUser) => {
//         // If a user was found, it means the email is already used.
//         if (foundUser) {
//           req.flash("error", "The email is already taken...");
//           res.redirect("/auth/signup");
//         } else {
//           // Hash the password !
//           const salt = 10;
//           const hashedPassword = bcrypt.hashSync(password, salt);

//           const newUser = {
//             email,
//             password: hashedPassword,
//           };

//           if (req.file) {
//             newUser.avatar = req.file.secure_url;
//           }

//           User.create(newUser)
//             .then((createdUser) => {
//               // User created !
//               console.log("here");
//               res.redirect("/auth/signin"); // Redirect to signin !
//             })
//             .catch((dbErr) => {
//               console.log(dbErr);
//             });
//         }
//       })
//       .catch((dbErr) => {
//         console.log(dbErr);
//       });
//   });




router.get("/signin", (req, res) => {
    res.render("signin.hbs");
});







// // This route only renders the view.
// router.get("/signin", (req, res) => {
//     res.render("auth/signin.hbs", {
//       error: req.flash("error"),
//     });
//   });

//   // This one is for receiving post data.
//   router.post("/signin", (req, res) => {
//     const { email, password } = req.body;
//     // Check if user already exists with email.
//     User.findOne({ email: email })
//       .then((foundUser) => {
//         // If a user is not found, redirect to get("/signin") with an error message.
//         if (!foundUser) {
//           req.flash("error", "Invalid credentials....");
//           res.redirect("/auth/signin");
//         } else {
//           // If we're here, it means a user was found, we compare the password
//           // coming from the form with the password of the foundUser.
//           if (bcrypt.compareSync(password, foundUser.password)) {
//             req.session.currentUser = foundUser; // <== This is what allows us to have our user logged in !
//             res.redirect("/"); // Redirect to home
//             // Matching passwords...
//             // Login user...
//           } else {
//             // If the password didn't match, redirect to signin with an error message.
//             req.flash("error", "Invalid credentials...");
//             res.redirect("/auth/signin");
//           }
//         }
//       })
//       .catch((dbErr) => {
//         console.log(dbErr);
//       });
//   });

//   // Render signup form.
//   router.get("/signup", (req, res) => {
//     res.render("auth/signup.hbs", {
//       error: req.flash("error"),
//     });
//   });

//   router.post("/signup", upload.single("avatar"), (req, res) => {
//     // console.log(req.file);
//     // console.log(req.body);
//     //
//     const { email, password } = req.body;
//     // Check if user with that email already exists in the Database.
//     User.findOne({ email: email })
//       .then((foundUser) => {
//         // If a user was found, it means the email is already used.
//         if (foundUser) {
//           req.flash("error", "The email is already taken...");
//           res.redirect("/auth/signup");
//         } else {
//           // Hash the password !
//           const salt = 10;
//           const hashedPassword = bcrypt.hashSync(password, salt);

//           const newUser = {
//             email,
//             password: hashedPassword,
//           };

//           if (req.file) {
//             newUser.avatar = req.file.secure_url;
//           }

//           User.create(newUser)
//             .then((createdUser) => {
//               // User created !
//               console.log("here");
//               res.redirect("/auth/signin"); // Redirect to signin !
//             })
//             .catch((dbErr) => {
//               console.log(dbErr);
//             });
//         }
//       })
//       .catch((dbErr) => {
//         console.log(dbErr);
//       });
//   });

//   router.get("/logout", (req, res) => {
//     // Destroys the session.
//     // Makes the user logged out.
//     req.session.destroy((err) => {
//       res.redirect("/");
//     });
//   });


module.exports = router;