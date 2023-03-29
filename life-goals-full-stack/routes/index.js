// This file contains all of the routes for the application. It is required in app.js and used to define all the routes of the application.

var express = require('express');
var router = express.Router();

// Require controller modules.
var goal_controller = require('../controllers/goalsController');
var user_controller = require('../controllers/userController');


/* GET home page. */
router.get('/', goal_controller.goal_list);

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

/* GET sign-up page. */
router.get('/signup', user_controller.signup_get);

/* POST sign-up page. */
router.post('/signup', user_controller.signup_post);

/* GET login page. */
router.get('/login', user_controller.login_get);

/* POST login page. */
router.post('/login', user_controller.login_post);


module.exports = router;
