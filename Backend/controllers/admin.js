const Admin = require("../models/admin");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      return res.status(404).json({
        message: "Admin không tồn tại hoặc thông tin đăng nhập không chính xác",
      });
    }
    return res.status(200).json({ message: "Đăng nhập thành công", admin });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { loginAdmin };
