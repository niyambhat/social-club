const express = require("express");
const { register, activateAccount, login } = require("../controller/user");
// Create Express router
const router = express.Router();

// Define a dummy route for the user
router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
module.exports = router;
