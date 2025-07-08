const express = require("express");
const {
  loginUser,
  registerUser,
  getUserProfile,
  editPassword,
  editUsername,
  editEmail,
  editRole,
  getAllUsers,
  deleteUser,
  loginAdmin,
  adminAuth,
} = require("../controllers/user");
const router = express.Router();

router.get("/api/users", adminAuth, getAllUsers);
router.delete("/api/users/:id", adminAuth, deleteUser);
router.post("/api/users/login", loginUser);
router.post("/api/users/login", loginAdmin);
router.patch("/api/users/:id/:role", adminAuth, editRole);
router.post("/api/users/register", registerUser);
router.get("/api/users/profile/:id", getUserProfile);
router.put("/api/users/editPassword/:id", editPassword);
router.put("/api/users/editUsername/:id", editUsername);
router.put("/api/users/editEmail/:id", editEmail);

module.exports = router;
