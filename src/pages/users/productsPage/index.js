import { memo, useState, useEffect } from "react";
import { useNavigate, generatePath, useLocation } from "react-router-dom";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import { Link } from "react-router-dom";
import { categories } from "../theme/header";
import { ROUTER } from "utils/router";
import ProductCard from "component/ProductCard";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy giá trị query parameter 'category' từ URL (nếu bạn có sử dụng cho các mục đích khác)
  const searchParams = new URLSearchParams(location.search);
  const productType = searchParams.get("category");

  // Các tùy chọn sắp xếp (nếu cần)
  const sorts = [
    "Giá thấp đến cao",
    "Giá cao đến thấp",
    "Mới đến cũ",
    "Cũ đến mới",
    "Bán chạy nhất",
    "Giảm giá",
  ];

  // Khi component mount hoặc khi productType thay đổi, lấy toàn bộ sản phẩm ban đầu
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: productType ? { type: productType } : {},
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [productType]);

  // Xử lý tìm kiếm sản phẩm theo tên
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        params: { name: searchTerm },
      });
      const results = response.data;
      if (results.length === 0) {
        alert("Không tìm thấy sản phẩm");
      } else {
        const exactProduct = results.find(
          (item) => item.name.toLowerCase() === searchTerm.toLowerCase()
        );
        if (exactProduct) {
          navigate(generatePath(ROUTER.USER.PRODUCT, { id: exactProduct._id }));
        } else {
          alert("Không tìm thấy sản phẩm có tên chính xác");
        }
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // Xử lý lọc sản phẩm theo mức giá
  const handlePriceFilter = async () => {
    try {
      // Gọi API với minPrice và maxPrice lấy từ state
      const response = await axios.get("http://localhost:5000/api/products", {
        params: {
          minPrice: minPrice,
          maxPrice: maxPrice,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Price filter failed:", error);
    }
  };

  const renderProducts = () => {
    return (
      <div className="row">
        {products.map((item) => (
          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12" key={item._id}>
            <ProductCard
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Breadcrumb name="Danh sách sản phẩm" />
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
            <div className="sidebar">
              <div className="sidebar_item">
                <h2>Tìm kiếm</h2>
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </form>
              </div>
              <div className="sidebar_item">
                <h2>Mức giá</h2>
                <div className="price-range-wrap">
                  <div>
                    <p>Từ:</p>
                    <input
                      type="number"
                      min={0}
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <p>Đến:</p>
                    <input
                      type="number"
                      min={0}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
                <button className="btn_applyPrice" onClick={handlePriceFilter}>Áp dụng</button>
              </div>
              <div className="sidebar_item">
                <h2>Sắp xếp</h2>
                <div className="tags">
                  {sorts.map((item, key) => (
                    <div
                      className={`tag ${key === 0 ? "active" : ""}`}
                      key={key}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="sidebar_item">
                <h2>Thể loại khác</h2>
                <ul>
                  {categories.map((name, key) => (
                    <li key={key}>
                      <Link
                        to={`${
                          ROUTER.USER.PRODUCTS
                        }?category=${encodeURIComponent(name)}`}
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
            {renderProducts()}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProductsPage);
