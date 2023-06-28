const express = require("express");

const { addUser,findUser } = require("../controller/userController");

// Create a router object
const router = express.Router();

// Route for adding a new user
router.post("/addUser", addUser);

router.post("/findUser", findUser);

module.exports = router;
