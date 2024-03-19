const express = require("express");
const UserSignupController = require("../../controllers/Users/UserSignupController");
const UserLoginController = require("../../controllers/Users/UserLoginController");
const GetAllUsers = require("../../controllers/Users/getAllUsers");
const IsAuth = require("../../middleware/IsAuth");
const UserDelete = require("../../controllers/Users/UserDeleteByAdmin");
const UserRoutes = express.Router();

UserRoutes.post("/signup",UserSignupController)
UserRoutes.post("/login",UserLoginController)

UserRoutes.use(IsAuth)
UserRoutes.get("/getAllUsers",GetAllUsers)
UserRoutes.delete("/deleteUser/:id",UserDelete)



module.exports = UserRoutes;
