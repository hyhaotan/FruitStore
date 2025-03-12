import { memo, useEffect, useState } from "react";
import "./style.scss";
import { formater } from "utils/formater";

const initialProductForm = {
  name: "",
  image: "",
  price: 0,
  quantity: 0,
  type: "",
  status: "Có sẵn",
  description: "",
};

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productForm, setProductForm] = useState(initialProductForm);

  // Khi mở modal (thêm/sửa), cập nhật dữ liệu form từ selectedProduct
  useEffect(() => {
    if (selectedProduct && Object.keys(selectedProduct).length > 0) {
      // Trường hợp chỉnh sửa sản phẩm
      setProductForm({
        name: selectedProduct.name || "",
        image: selectedProduct.image || "",
        price: selectedProduct.price || 0,
        quantity: selectedProduct.quantity || 0,
        type: selectedProduct.type || "",
        status: selectedProduct.status || "Có sẵn",
        description: selectedProduct.description || "",
        _id: selectedProduct._id,
      });
    } else {
      // Trường hợp thêm sản phẩm mới hoặc khi đóng modal
      setProductForm(initialProductForm);
    }
  }, [selectedProduct]);

  // Lấy danh sách sản phẩm khi component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Xóa sản phẩm
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting product");
      }
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Mở modal chỉnh sửa sản phẩm
  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  // Mở modal thêm sản phẩm mới
  const handleAdd = () => {
    // Đặt selectedProduct thành {} để kích hoạt trường hợp thêm mới
    setSelectedProduct({});
  };

  // Xử lý lưu (update hoặc create)
  const handleSave = async () => {
    try {
      let response;
      // Nếu productForm có _id thì cập nhật, ngược lại tạo mới
      if (productForm._id) {
        console.log("Updating product with ID:", productForm._id);
        response = await fetch(
          `http://localhost:5000/api/products/${productForm._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productForm),
          }
        );
      } else {
        response = await fetch("http://localhost:5000/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productForm),
        });
      }
      if (!response.ok) {
        throw new Error("Error saving product");
      }
      // Refresh danh sách sản phẩm
      fetchProducts();
      // Đóng modal
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Cập nhật giá trị form khi người dùng nhập (cho các input text, number,...)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  // Xử lý chọn file ảnh và chuyển đổi sang Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm((prevForm) => ({
          ...prevForm,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <div className="products">
        <h2>Quản lý sản phẩm</h2>
        <div className="products__actions">
          <button
            className="products__add-button btn btn--primary"
            onClick={handleAdd}
          >
            Thêm sản phẩm
          </button>
        </div>
        <div className="products__content">
          <table className="products__table">
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Loại</th>
                <th>Trạng thái</th>
                <th>Mô tả</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        width="50"
                        height="50"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{formater(product.price)}</td>
                    <td>{product.quantity}</td>
                    <td>{product.type}</td>
                    <td>{product.status}</td>
                    <td>{product.description}</td>
                    <td>
                      <button
                        className="btn btn--edit"
                        onClick={() => handleEdit(product)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn--delete"
                        onClick={() => handleDelete(product._id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">Không có sản phẩm nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Thêm/Sửa sản phẩm */}
      {selectedProduct !== null && (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__content__header">
              <h3>{productForm._id ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h3>
              <button
                className="modal__content__header__close"
                onClick={() => setSelectedProduct(null)}
              >
                ×
              </button>
            </div>
            <div className="modal__content__body">
              <form>
                <div className="form-group">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    name="name"
                    value={productForm.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Ảnh</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {productForm.image && (
                    <img
                      src={productForm.image}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </div>
                <div className="form-group">
                  <label>Giá</label>
                  <input
                    type="number"
                    name="price"
                    value={productForm.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Số lượng</label>
                  <input
                    type="number"
                    name="quantity"
                    value={productForm.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Loại</label>
                  <input
                    type="text"
                    name="type"
                    value={productForm.type}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    name="status"
                    value={productForm.status}
                    onChange={handleChange}
                  >
                    <option value="Có sẵn">Có sẵn</option>
                    <option value="Không có sẵn">Không có sẵn</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Mô tả</label>
                  <textarea
                    name="description"
                    value={productForm.description}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <button
              className="modal__content__button btn btn--primary"
              onClick={handleSave}
            >
              Lưu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ProductManagement);
