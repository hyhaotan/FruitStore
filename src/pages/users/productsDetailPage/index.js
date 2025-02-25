import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import {
  AiOutlineCopy,
  AiOutlineEye,
  AiOutlineFacebook,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { formater } from "utils/formater";
import { ProductCard, Quantity } from "component";
import { featProducts } from "utils/common";

const ProductsDetailPage = () => {
  // Lấy id sản phẩm từ URL
  const { id } = useParams();

  // State để lưu thông tin sản phẩm, trạng thái loading và lỗi (nếu có)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dữ liệu sản phẩm khi component mount hoặc id thay đổi
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Hiển thị trạng thái loading hoặc lỗi nếu có
  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Không có thông tin sản phẩm.</div>;
  }

  // Nếu sản phẩm có thêm hình ảnh (có thể là một mảng, nếu API cung cấp),
  // nếu không thì dùng hình ảnh chính của sản phẩm
  const additionalImages = product.additionalImages || [product.image];

  return (
    <>
      <Breadcrumb name="Chi tiết sản phẩm" />
      <div className="container">
        <div className="row">
          {/* Phần hiển thị hình ảnh sản phẩm */}
          <div className="col-lg-6 col-xl-12 col-md-12 col-sm-12 col-xs-12 product_detail_pic">
            <img src={product.image} alt={product.name} />
            <div className="main">
              {additionalImages.map((img, key) => (
                <img src={img} alt="product-pic" key={key} />
              ))}
            </div>
          </div>
          {/* Phần hiển thị thông tin sản phẩm */}
          <div className="col-lg-6 col-xl-12 col-md-12 col-sm-12 col-xs-12 product_detail_text">
            <h2>{product.name}</h2>
            <div className="seen-icon">
              <AiOutlineEye /> {` 10 (lượt đã xem)`}
            </div>
            <h3>{formater(product.price)}</h3>
            <p>
              {product.description ||
                "Chưa có mô tả chi tiết cho sản phẩm này."}
            </p>
            {/* Component thay đổi số lượng mua */}
            <Quantity />
            <ul>
              <li>
                <b>Tình trạng:</b>{" "}
                <span>
                  {product.status === "active" ? "Còn hàng" : "Hết hàng"}
                </span>
              </li>
              <li>
                <b>Số lượng:</b> <span>{product.quantity}</span>
              </li>
              <li>
                <b>Chia sẻ:</b>{" "}
                <span>
                  <AiOutlineFacebook />
                  <AiOutlineLinkedin />
                  <AiOutlineCopy />
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tab thông tin chi tiết */}
        <div className="product_detail_tab">
          <h4>Thông tin chi tiết</h4>
          <div>
            {product.infomation_detail ? (
              // Nếu sản phẩm có thông tin chi tiết (có thể là HTML) thì render bằng dangerouslySetInnerHTML
              <div
                dangerouslySetInnerHTML={{ __html: product.infomation_detail }}
              />
            ) : (
              // Nếu không có thì hiển thị nội dung mặc định
              <div>
                <ul>
                  <li>
                    <p>
                      Rau củ chứa rất nhiều vitamin và chất dinh dưỡng nên mang
                      đến rất nhiều lợi ích cho sức khỏe con người.&nbsp;
                    </p>
                  </li>
                  <li>
                    <p>Hỗ trợ giảm cân</p>
                  </li>
                  <li>
                    <p>
                      Giảm nguy cơ mắc các bệnh về tim mạch, béo phì và cả ung
                      thư
                    </p>
                  </li>
                  <li>
                    <p>Tăng cường sức đề kháng của cơ thể</p>
                  </li>
                  <li>
                    <p>Cải thiện thị lực</p>
                  </li>
                  <li>
                    <p>Điều hòa đường huyết</p>
                  </li>
                  <li>
                    <p>Giảm cholesterol trong máu</p>
                  </li>
                  <li>
                    <p>Điều hòa huyết áp</p>
                  </li>
                </ul>
                <p>
                  <br />
                  <strong>Cách chọn rau củ tươi ngon</strong>
                </p>
                <ul>
                  <li>
                    <p>
                      Dựa vào hình dáng bên ngoài: Nên ưu tiên chọn các loại rau
                      củ có phần vỏ không có các vết sâu, cuống lá không bị
                      nhũn, thâm đen. Tránh chọn những loại quả có vẻ ngoài to
                      tròn, căng lớn, bởi đây có thể là những quả đã bị tiêm
                      thuốc, không an toàn cho sức khỏe.
                    </p>
                  </li>
                  <li>
                    <p>
                      Dựa vào màu sắc: Màu sắc của các loại rau củ thường tươi
                      mới, không có các vết xước, héo hay quá đậm màu. Các loại
                      củ có màu quá xanh hoặc quá bóng sẽ không hẳn là an toàn
                      cho sức khỏe người dùng.
                    </p>
                  </li>
                  <li>
                    <p>
                      Dựa vào mùi hương: Mùi hương tự nhiên của các loại rau củ
                      sẽ là mùi đặc trưng theo từng loại chứ không phải là mùi
                      hắc, nồng khó chịu. Nếu các loại củ bạn đang chọn có mùi
                      hóa chất hãy ngưng sử dụng ngay.
                    </p>
                  </li>
                  <li>
                    <p>
                      Dựa vào cảm nhận khi cầm: Những loại củ quả cầm chắc tay,
                      kích thước vừa phải, không quá to sẽ thường ngon hơn những
                      loại to lớn nhưng khối lượng nhẹ. Một số loại rau củ bạn
                      chỉ nên chọn những quả nhỏ, đều tay sẽ ngon hơn.
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Phần hiển thị sản phẩm tương tự */}
        <div className="section-title">
          <h2>Sản phẩm tương tự</h2>
        </div>
        <div className="row">
          {featProducts.all.products.map((item, key) => (
            <div key={key} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <ProductCard
                id={item.id}
                image={item.img}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default memo(ProductsDetailPage);
