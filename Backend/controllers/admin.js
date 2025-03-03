// controllers/admin.js
const Admin = require("../models/admin");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu" });
  }

  try {
    // Tìm admin theo email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không chính xác" });
    }

    // So sánh mật khẩu trực tiếp (nên dùng bcrypt trong sản xuất)
    if (password !== admin.password) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không chính xác" });
    }

    // Loại bỏ trường password trước khi trả về
    const { password: pwd, ...adminWithoutPassword } = admin.toObject();

    res.json({ message: "Đăng nhập thành công", admin: adminWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginAdmin };
