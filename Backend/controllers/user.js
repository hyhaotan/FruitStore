const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "Xóa người dùng thành công!" });
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    return res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Mật khẩu xác nhận không khớp" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const user = await User.create({
      email,
      username,
      password,
      role:"user",
    });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Tạo token JWT cho cả user và admin
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'secret-key',
      { expiresIn: '2h' }
    );
    return res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        token // trả về token cho frontend
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminUser = await User.findOne({
      email,
      password,
      role: { $in: ["admin", "employee"] }
    });
    if (!adminUser) {
      return res.status(401).json({
        message: "Email/mật khẩu không đúng hoặc bạn không có quyền truy cập"
      });
    }
    // Tạo token JWT
    const token = jwt.sign(
      {
        _id: adminUser._id,
        email: adminUser.email,
        role: adminUser.role
      },
      process.env.JWT_SECRET || 'secret-key',
      { expiresIn: '2h' }
    );
    return res.status(200).json({
      message: "Đăng nhập thành công",
      user: {
        _id: adminUser._id,
        email: adminUser.email,
        role: adminUser.role,
        token // trả về token cho frontend
      }
    });
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  const { id } = req.params; // giả sử đường dẫn là /api/users/profile/:id

  // Kiểm tra tính hợp lệ của id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  try {
    // Tìm user theo id và loại bỏ trường password
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    return res.status(500).json({ message: error.message });
  }
};

const editUsername = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  try {
    const user = await User.findByIdAndUpdate(id, { username }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Lỗi khi cập nhật tên người dùng:", error);
    return res.status(500).json({ message: error.message });
  }
};

const editEmail = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  try {
    const user = await User.findByIdAndUpdate(id, { email }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Lỗi khi cập nhật email:", error);
    return res.status(500).json({ message: error.message });
  }
};

const editPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  try {
    const user = await User.findByIdAndUpdate(id, { password }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Lỗi khi cập nhật mật khẩu:", error);
    return res.status(500).json({ message: error.message });
  }
};

const editRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  if (!["user","employee","admin"].includes(role)) {
    return res.status(400).json({ message: "Role không hợp lệ" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Lỗi khi cập nhật role:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Middleware xác thực JWT và kiểm tra quyền admin
const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key');
    if (decoded.role !== 'admin' && decoded.role !== 'employee') {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập!' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ!' });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
  editUsername,
  editPassword,
  editEmail,
  getAllUsers,
  deleteUser,
  editRole,
  loginAdmin,
  adminAuth, // export middleware mới
};
