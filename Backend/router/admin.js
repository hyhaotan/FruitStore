// routes/admin.js
const express = require("express");
const { loginAdmin } = require("../controllers/admin");

const router = express.Router();

// Định nghĩa route cho login admin
router.post("api/admins/login", loginAdmin);

module.exports = router;
