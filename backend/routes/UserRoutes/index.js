const express = require("express");
const UserSignupController = require("../../controllers/Users/UserSignupController");
const UserLoginController = require("../../controllers/Users/UserLoginController");
const UserRoutes = express.Router();

UserRoutes.post("/signup",UserSignupController)
UserRoutes.post("/login",UserLoginController)


module.exports = UserRoutes;
