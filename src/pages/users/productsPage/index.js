import { memo, useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import { Link } from "react-router-dom";
import { categories } from "../theme/header";
import { ROUTER } from "utils/router";
import ProductCard from "component/ProductCard";
import axios from "axios";
import SearchComponent from "component/Search";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy query 'category'
  const searchParams = new URLSearchParams(location.search);
  const productType = searchParams.get("category");

  // Các tùy chọn sắp xếp
  const sorts = [
    "Giá thấp đến cao",
    "Giá cao đến thấp",
    "Mới đến cũ",
    "Cũ đến mới",
    "Bán chạy nhất",
    "Giảm giá",
  ];

  // Fetch sản phẩm theo loại
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: productType ? { category: productType } : {},
        });
        setProducts(response.data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
    setSortBy("");
  }, [productType]);

  // Lọc theo giá
  const handlePriceFilter = async () => {
    try {
      const min = document.getElementById("minPrice").value;
      const max = document.getElementById("maxPrice").value;
      const response = await axios.get("http://localhost:5000/api/products", {
        params: {
          ...(productType && { category: productType }),
          minPrice: min,
          maxPrice: max,
        },
      });
      setProducts(response.data);
      setSortBy("");
      setCurrentPage(1);
    } catch (error) {
      console.error("Price filter failed:", error);
    }
  };

  // Sắp xếp client-side
  const sortedProducts = useMemo(() => {
    if (!sortBy) return products;
    const list = [...products];
    switch (sortBy) {
      case "Giá thấp đến cao":
        return list.sort((a, b) => a.price - b.price);
      case "Giá cao đến thấp":
        return list.sort((a, b) => b.price - a.price);
      case "Mới đến cũ":
        return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "Cũ đến mới":
        return list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      default:
        return list;
    }
  }, [products, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const renderProducts = () => (
    <div className="row">
      {paginatedProducts.map((item) => (
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

  const renderPagination = () => (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <span
          key={page}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );

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
                <SearchComponent placeholder="Tìm kiếm sản phẩm..." />
              </div>
              <div className="sidebar_item">
                <h2>Mức giá</h2>
                <div className="price-range-wrap">
                  <div>
                    <p>Từ:</p>
                    <input type="number" id="minPrice" min={0} />
                  </div>
                  <div>
                    <p>Đến:</p>
                    <input type="number" id="maxPrice" min={0} />
                  </div>
                </div>
                <button className="btn_applyPrice" onClick={handlePriceFilter}>
                  Áp dụng
                </button>
              </div>
              <div className="sidebar_item">
                <h2>Sắp xếp</h2>
                <div className="tags">
                  {sorts.map((item, key) => (
                    <div
                      className={`tag ${sortBy === item ? "active" : ""}`}
                      key={key}
                      onClick={() => setSortBy(item)}
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
                      <Link to={`${ROUTER.USER.PRODUCTS}?category=${encodeURIComponent(name)}`}>
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 d-flex flex-column">
            <div className="flex-grow-1 products-content">
              {renderProducts()}
            </div>
            {totalPages > 1 && <div className="pagination-container">{renderPagination()}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProductsPage);