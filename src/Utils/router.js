const { Router } = require("express");

const UserController = require("../Controllers/UserController");

const router = Router();

// Create user
router.post("/users", UserController.createUser);

// List all users (not going to be used in the application)
router.get("/users", UserController.listAllUsers);
// Login user

// Logout user

// Profile user

// What are you searching for (options = movie, tv series, books, surprise me)

// option movie

// option tv series

// option books

// rating book, tv series, movie

// option Preferences (change username, change preferences)
module.exports = router;
