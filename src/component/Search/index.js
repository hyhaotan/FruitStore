import { useState } from "react";
import axios from "axios";
import { useNavigate, generatePath } from "react-router-dom";
import { ROUTER } from "utils/router";
import "./style.scss";

const SearchComponent = ({
  className = "",
  placeholder = "Tìm kiếm sản phẩm...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  return (
    <form className={className} onSubmit={handleSearch}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn_search" type="submit">
        Tìm kiếm
      </button>
    </form>
  );
};

export default SearchComponent;
