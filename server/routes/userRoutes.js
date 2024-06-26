const express = require("express");
const { registerController } = require("../controllers/userController");

// router object
const router = express.Router();

// routes
router.post("/register", registerController);

module.exports = router;
