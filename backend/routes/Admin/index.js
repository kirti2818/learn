const express = require("express");
const AdminSignupController = require("../../controllers/Admin/AdminSignup.Controller");
const AdminLoginController = require("../../controllers/Admin/AdminLogin.Controller");
const AdminRoutes = express.Router();

AdminRoutes.post("/signup",AdminSignupController)
AdminRoutes.post("/login",AdminLoginController)

module.exports = AdminRoutes;
