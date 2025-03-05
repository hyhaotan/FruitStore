const express = require("express");
const { loginAdmin } = require("../controllers/admin");

const router = express.Router();

router.post("/api/admins/login", loginAdmin);

module.exports = router;
