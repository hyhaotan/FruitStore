const express = require("express");
const {
  loginUser,
  registerUser,
  getUserProfile,
  editPassword,
  editUsername,
  editEmail,
} = require("../controllers/user");
const router = express.Router();

router.post("/api/users/login", loginUser);
router.post("/api/users/register", registerUser);
router.get("/api/users/profile/:id", getUserProfile);
router.put("/api/users/editPassword/:id", editPassword);
router.put("/api/users/editUsername/:id", editUsername);
router.put("/api/users/editEmail/:id", editEmail);
module.exports = router;
