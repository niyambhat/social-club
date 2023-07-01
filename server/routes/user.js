const express = require("express");
const {
  register,
  activateAccount,
  login,
  auth,
} = require("../controller/user");
const { authUser } = require("../middleware/auth");
// Create Express router
const router = express.Router();

// Define a dummy route for the user
router.post("/register", register);
router.post("/activate", authUser, activateAccount);
router.post("/login", login);
router.get("/test", authUser, (req, res) => {
  return res.send("this is un authenticated route");
});
module.exports = router;
