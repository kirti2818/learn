const express = require("express");
const AdminSignupController = require("../../controllers/Admin/AdminSignup.Controller");
const AdminLoginController = require("../../controllers/Admin/AdminLogin.Controller");
const ApprovedUser = require("../../controllers/Admin/ApprovedUser.Controller");
const IsAuth = require("../../middleware/IsAuth");
const GetAllUsers = require("../../controllers/Users/getAllUsers");
const AddWareHouse = require("../../controllers/Admin/AddWarehouse");
const AddProductsToWareHouse = require("../../controllers/Admin/AddProduct");
const GetAllWareHouse = require("../../controllers/Admin/GetAllWareHouses");
const GetUsersOrderList = require("../../controllers/Admin/GetUsersOrderList");
const ApproveOrder = require("../../controllers/Admin/ApproveOrder");
const GetAllNotifications = require("../../controllers/Notification/GetNotifications");
const UpdateNotification = require("../../controllers/Notification/UpdateNotification");
const AdminRoutes = express.Router();

AdminRoutes.post("/signup",AdminSignupController)
// AdminRoutes.post("/login",AdminLoginController)

AdminRoutes.use(IsAuth)
AdminRoutes.patch("/updateUser/:id",ApprovedUser)
AdminRoutes.post("/add_warehouse",AddWareHouse)
AdminRoutes.post("/add_product",AddProductsToWareHouse)
AdminRoutes.get("/getAllWareHouse",GetAllWareHouse)
AdminRoutes.get("/getUsersOrderList/:id",GetUsersOrderList)
AdminRoutes.patch("/updateOrder/:id",ApproveOrder)
AdminRoutes.get("/getNotifications",GetAllNotifications)
AdminRoutes.patch("/updateNotification",UpdateNotification)

module.exports = AdminRoutes;
