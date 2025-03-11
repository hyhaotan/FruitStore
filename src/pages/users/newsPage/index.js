// component/NewsPage.js
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";

const NewsPage = () => {
  // Lấy id tin tức từ URL (ví dụ: /news/123)
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch chi tiết tin tức dựa trên id
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/news/${id}`
        );
        setNewsItem(response.data);
      } catch (err) {
        console.error("Failed to fetch news detail:", err);
        setError("Không thể tải tin tức chi tiết.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  // Hiển thị loading, lỗi hoặc thông báo nếu không có tin tức
  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!newsItem) {
    return <div>Không có tin tức.</div>;
  }

  return (
    <>
      {/* Breadcrumb hiển thị tiêu đề tin tức */}
      <Breadcrumb name={newsItem.title} />
      <div className="container news-detail">
        <h1>{newsItem.title}</h1>
        {/* Hiển thị hình ảnh nếu có */}
        {newsItem.image && (
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="news-image"
          />
        )}
        {/* Nội dung tin tức. Nếu content có chứa HTML, sử dụng dangerouslySetInnerHTML */}
        <div className="news-content">
          <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
        </div>
      </div>
    </>
  );
};

export default memo(NewsPage);
