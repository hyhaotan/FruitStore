const User = require("../models/user");
const mongoose = require("mongoose");

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
    return res.status(200).json({ user });
  } catch (error) {
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

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
  editUsername,
  editPassword,
  editEmail,
};
