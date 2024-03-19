const express = require("express");
const AdminSignupController = require("../../controllers/Admin/AdminSignup.Controller");
const AdminLoginController = require("../../controllers/Admin/AdminLogin.Controller");
const ApprovedUser = require("../../controllers/Admin/ApprovedUser.Controller");
const IsAuth = require("../../middleware/IsAuth");
const GetAllUsers = require("../../controllers/Users/getAllUsers");
const AdminRoutes = express.Router();

AdminRoutes.post("/signup",AdminSignupController)
// AdminRoutes.post("/login",AdminLoginController)

AdminRoutes.use(IsAuth)
AdminRoutes.patch("/updateUser/:id",ApprovedUser)

module.exports = AdminRoutes;
