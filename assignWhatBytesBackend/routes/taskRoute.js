var express = require("express");
var user_route = express();

const isLogin = require("../middleware/isLogin");

const userController = require("../controllers/User/userController");
const taskController = require("../controllers/Task/taskController");

const validateForm = require("../validation/validation");

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

// api for register user

user_route.post("/registerUser", validateForm, userController.registerUser);

// api for login

user_route.post("/login", userController.loginUser);

// api for getting user details

user_route.get("/getUserDetails", isLogin, userController.getUserDetails);

// api for getting all user details

user_route.get("/getAllUserDetails", isLogin, userController.getAllUserDetails);

// api for adding task

user_route.post("/addTask", isLogin, taskController.addTask);

// api for getting a question

user_route.get("/getTasks", isLogin, taskController.getUserTasks);

// api for getting all questions

user_route.get("/getAllTaskByID", isLogin, taskController.getUserTaskByID);

// api for adding user response to database(db)

user_route.patch("/updateTask", isLogin, taskController.updateTask);

// api for getting question by id

user_route.delete("/deleteTask", isLogin, taskController.deleteTask);

// api for logout

user_route.post("/logout", isLogin, userController.logout);

module.exports = user_route;
