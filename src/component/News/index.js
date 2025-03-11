//component/News.js
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";

const NewsSection = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/news");
        setNews(response.data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-section">
      <h2>Tin tức mới</h2>
      <div className="news-list">
        {news.map((item) => (
          <div key={item._id} className="news-item">
            {item.image && <img src={item.image} alt={item.title} />}
            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.content.substring(0, 100)}...</p>
              <a href={`/news/${item._id}`}>Xem thêm</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
