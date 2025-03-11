import { memo, useEffect, useState } from "react";
import "./style.scss";

const NewsAdminPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/news");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNewsList(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleDelete = async (newsId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/news/${newsId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting news");
      }
      setNewsList(newsList.filter((item) => item._id !== newsId));
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className="container">
      <div className="news">
        <h2>Quản lý Tin tức</h2>
        <div className="news__actions">
          <button className="btn btn--primary">Thêm Tin tức</button>
        </div>
        <table className="news__table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tiêu đề</th>
              <th>Nội dung</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="news-thumbnail"
                    />
                  ) : (
                    "Không có hình"
                  )}
                </td>
                <td>{item.title}</td>
                <td>{item.content.substring(0, 100)}...</td>
                <td>{new Date(item.createdAt).toLocaleDateString("vi-VN")}</td>
                <td>
                  <button className="btn" onClick={() => setSelectedNews(item)}>
                    Xem
                  </button>
                  <button
                    className="btn btn--danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal hiển thị chi tiết tin tức */}
      {selectedNews && (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__content__header">
              <h3>Chi tiết Tin tức</h3>
              <button
                className="modal__content__header__close"
                onClick={() => setSelectedNews(null)}
              >
                ×
              </button>
            </div>
            <div className="modal__content__body">
              {selectedNews.image && (
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="news-modal-image"
                />
              )}
              <h4>{selectedNews.title}</h4>
              <p>{selectedNews.content}</p>
            </div>
            <button
              className="modal__content__button"
              onClick={() => setSelectedNews(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(NewsAdminPage);
