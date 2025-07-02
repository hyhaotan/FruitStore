const Product = require("../models/product");

// const getProduct = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


const getProducts = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.type = req.query.category;
    }
    
    if (req.query.minPrice) {
      filter.price = { ...filter.price, $gte: Number(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      filter.price = { ...filter.price, $lte: Number(req.query.maxPrice) };
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    // Destructure từ body, bao gồm expiryDate
    const {
      name,
      image,
      price,
      quantity,
      status,
      description,
      type,
      expiryDate,
    } = req.body;

    const updateData = {
      name,
      image,
      price,
      quantity,
      status,
      description,
      type,
    };

    // Chỉ thêm expiryDate nếu client truyền
    if (expiryDate) {
      updateData.expiryDate = new Date(expiryDate);
    } else {
      // Nếu muốn xóa hạn sử dụng khi không truyền thì uncomment:
      // updateData.expiryDate = null;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      price,
      quantity = 0,
      status = "Có sẵn",
      description,
      type,
      expiryDate,
    } = req.body;

    const product = new Product({
      name,
      image,
      price,
      quantity,
      status,
      description,
      type,
      // Chỉ thêm expiryDate nếu có
      ...(expiryDate && { expiryDate: new Date(expiryDate) }),
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const findProducts = async (req, res) => {
  try {
    const { name } = req.query; // nhận tham số tên sản phẩm từ query string
    if (name) {
      // Tìm sản phẩm có tên khớp gần đúng và không phân biệt chữ hoa, chữ thường
      const products = await Product.find({
        name: { $regex: new RegExp(name, "i") },
      });
      if (products.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
      // Trả về danh sách sản phẩm nếu tìm thấy
      return res.status(200).json(products);
    } else {
      // Nếu không có tham số tìm kiếm thì trả về toàn bộ sản phẩm
      const products = await Product.find();
      return res.status(200).json(products);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTypeProducts = async (req, res) => {
  try {
    const { type, name } = req.query;
    let filter = {};
    if (name) {
      filter.name = new RegExp(name, "i");
    }
    if (type) {
      filter.type = type;
    }
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by type:", error);
    res.status(500).json({ error: "Error fetching products by type" });
  }
};

const applyPriceProduct = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const filter = {};

    // Kiểm tra và chuyển đổi minPrice và maxPrice sang số
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    if ((minPrice && isNaN(min)) || (maxPrice && isNaN(max))) {
      return res
        .status(400)
        .json({ error: "Giá trị minPrice hoặc maxPrice không hợp lệ" });
    }

    if (min !== null || max !== null) {
      filter.price = {};
      if (min !== null) filter.price.$gte = min;
      if (max !== null) filter.price.$lte = max;
    }

    const products = await Product.find(filter);
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error in applyPriceProduct:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  // getProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProduct,
  findProducts,
  getTypeProducts,
  applyPriceProduct,
  getProducts,
};
