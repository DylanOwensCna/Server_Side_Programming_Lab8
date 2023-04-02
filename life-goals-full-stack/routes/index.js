// This file contains all of the routes for the application. It is required in app.js and used to define all the routes of the application.
const isAuthenticated = require("./authMiddleware").isAuthenticated;
var express = require('express');
var router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

// Require controller modules.
var goal_controller = require('../controllers/goalsController');



/* GET home page. */
// router.get('/', goal_controller.goal_list);
router.get("/", (req, res) => {
    res.render("index", { user: req.user })
});
/* GET goal detail page. */
router.get('/goals/:id', goal_controller.goal_detail);


/* GET create goal page. */
router.get("/create", goal_controller.goal_create_get);

/* POST create goal page. */
router.post("/create", goal_controller.create_goal);

// POST request to delete Post.
router.post("/goals/:id/delete", goal_controller.delete_goal);

// POST request to update Post.
router.post("/goals/:id/update", goal_controller.update_goal);

// sign up page
router.get("/sign-up", (req, res) => res.render("sign-up-form"));

router.post("/sign-up", async (req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10, async function(err, hash) {
            if (err) {
                return next(err);
            }
            
            // Store hash in your password DB.
            const user = new User({
                username: req.body.username,
                password: hash
            });

            const result = await user.save();
            res.redirect("/");
        }); 
    } catch(err) {
        return next(err);
    };
});

// // /* GET login page. */
// router.get("/secret", isAuthenticated, (req, res, next) => res.render("secret"));

router.get("/log-out", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

// log in page
router.post("/log-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

module.exports = router;
