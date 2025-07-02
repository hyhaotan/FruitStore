import { memo, useEffect, useState } from "react";
import "./style.scss";

const NewsAdminPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    _id: null,
  });

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
        setMessage({
          type: "error",
          content: "Không thể tải danh sách tin tức",
        });
      }
    };

    fetchNews();
  }, []);

  const handleDelete = async (newsId) => {
    if (window.confirm("Bạn có thực sự muốn xóa tin tức này không?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/news/${newsId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Error deleting news");
        }
        setNewsList(newsList.filter((item) => item._id !== newsId));
        alert("Xóa sản phẩm thành công");
      } catch (error) {
        console.error("Error deleting news:", error);
        alert("Xóa sản phẩm thất bại");
      }
    }
  };

  // Xử lý thêm tin tức
  const handleAddNews = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      setMessage({
        type: "error",
        content: "Tiêu đề và Nội dung không được để trống",
      });
      return;
    }

    const payload = {
      title: formData.title,
      content: formData.content,
      image: formData.image,
    };

    try {
      const response = await fetch("http://localhost:5000/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Error creating news");
      }
      const newNews = await response.json();
      setNewsList([...newsList, newNews]);
      setIsAddModalOpen(false);
      setFormData({ title: "", content: "", image: null, _id: null });
      alert("Thêm tin tức thành công");
    } catch (error) {
      console.error("Error adding news:", error);
      alert("Thêm tin tức thất bại");
    }
  };

  const openEditModal = (news) => {
    setFormData({
      title: news.title,
      content: news.content,
      image: news.image,
      _id: news._id,
    });
    setIsEditModalOpen(true);
  };

  // Xử lý cập nhật tin tức
  const handleUpdateNews = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      setMessage({
        type: "error",
        content: "Tiêu đề và Nội dung không được để trống",
      });
      return;
    }

    const payload = {
      title: formData.title,
      content: formData.content,
      image: formData.image,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/news/${formData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("Error updating news");
      }
      const updatedNews = await response.json();
      const updatedNewsList = newsList.map((item) =>
        item._id === updatedNews._id ? updatedNews : item
      );
      setNewsList(updatedNewsList);
      setIsEditModalOpen(false);
      setFormData({ title: "", content: "", image: null, _id: null });
      alert("Cập nhật tin tức thành công");
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  // Hàm xử lý đọc file và kiểm tra kích thước
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Kiểm tra kích thước file (1MB = 1024 * 1024 bytes)
      if (file.size > 1024 * 1024) {
        setMessage({
          type: "error",
          content: "Kích thước ảnh không được vượt quá 1MB",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFormData((prev) => ({
            ...prev,
            image: reader.result,
          }));
        }
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <div className="news">
        <h2>Quản lý Tin tức</h2>
        {message.content && (
          <div className={`message ${message.type}`}>{message.content}</div>
        )}
        <div className="news__actions">
          <button
            className="btn btn--primary"
            onClick={() => {
              setIsAddModalOpen(true);
              setMessage({ type: "", content: "" });
            }}
          >
            Thêm Tin tức
          </button>
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
                  <button className="btn" onClick={() => openEditModal(item)}>
                    Cập nhật
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

      {/* Modal xem chi tiết tin tức */}
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

      {/* Modal thêm tin tức */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__content__header">
              <h3>Thêm Tin tức</h3>
              <button
                className="modal__content__header__close"
                onClick={() => setIsAddModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddNews} className="modal__content__body">
              <label>
                Tiêu đề:
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Nội dung:
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                ></textarea>
              </label>
              <label>
                Hình ảnh:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                )}
              </label>
              <button type="submit" className="btn btn--primary">
                Thêm
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal cập nhật tin tức */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__content__header">
              <h3>Cập nhật Tin tức</h3>
              <button
                className="modal__content__header__close"
                onClick={() => setIsEditModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdateNews} className="modal__content__body">
              <label>
                Tiêu đề:
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Nội dung:
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                ></textarea>
              </label>
              <label>
                Hình ảnh:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                )}
              </label>
              <button type="submit" className="btn btn--primary">
                Cập nhật
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(NewsAdminPage);
