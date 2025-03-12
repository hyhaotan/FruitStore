import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="news-section">
      <h2>Tin tức mới</h2>
      <Slider {...settings}>
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
      </Slider>
    </div>
  );
};

export default NewsSection;
