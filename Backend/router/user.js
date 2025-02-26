const express = require("express");
const { loginUser, registerUser } = require("../controllers/user");
const router = express.Router();

router.post("/api/users/login", loginUser);
router.post("/api/users/register", registerUser);

module.exports = router;
