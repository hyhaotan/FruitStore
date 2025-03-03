const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const cartRoutes = require("./router/cart");
const productRoutes = require("./router/product");
const paymentRoutes = require("./router/payment");
const userRoutes = require("./router/user");
const adminRoutes = require("./router/admin");
const app = express();

app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Sử dụng các router với tiền tố "/api"
app.use(productRoutes);
app.use(cartRoutes);
app.use(paymentRoutes);
app.use(userRoutes);
app.use(adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
