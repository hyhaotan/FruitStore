import React, { useEffect, useState, memo } from "react";
import "react-multi-carousel/lib/styles.css";
import "./style.scss";

const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    name: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  // Lấy danh sách bài viết từ API
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/articles");
      const data = await res.json();
      if (res.ok) {
        setArticles(data.articles);
      } else {
        setError(data.message || "Lỗi khi lấy bài viết");
      }
    } catch (err) {
      setError("Lỗi khi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý gửi bài viết mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setForm({ title: "", name: "", content: "" });
        fetchArticles();
        setModalOpen(false);
      } else {
        setError(data.message || "Lỗi khi thêm bài viết");
      }
    } catch (err) {
      setError("Lỗi khi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="article-page">
      <h1>Danh sách bài viết</h1>
      {error && <div className="error">{error}</div>}
      {loading && <div>Đang tải...</div>}

      {/* Nút mở modal để viết bài */}
      <button className="open-modal-btn" onClick={() => setModalOpen(true)}>
        Viết bài
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setModalOpen(false)}
            >
              X
            </button>
            <h2>Thêm bài viết mới</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Tiêu đề:</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Tác giả:</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Nội dung:</label>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  required
                ></textarea>
              </div>
              <button type="submit" disabled={loading}>
                Gửi bài
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Hiển thị danh sách bài viết */}
      <div className="article-list">
        {articles.map((article) => (
          <div key={article._id} className="article">
            <h2>{article.title}</h2>
            <p className="author">Tác giả: {article.name}</p>
            <p className="content">{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ArticlePage);
