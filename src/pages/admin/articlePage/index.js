import { memo, useEffect, useState } from "react";
import "./style.scss";

const ArticleAdminPage = () => {
  const [articles, setArticles] = useState([]);

  // Fetch danh sách bài viết khi component được mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/articles");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Kiểm tra xem data trả về có chứa mảng articles không
        if (Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.error("Dữ liệu trả về không đúng định dạng:", data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  // Hàm xóa bài viết
  const handleDelete = async (articleId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/articles/${articleId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting article");
      }
      // Cập nhật lại danh sách sau khi xóa thành công
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== articleId)
      );
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <div className="container">
      <div className="articles">
        <h2>Quản lý bài viết</h2>
        <div className="articles__content">
          <table className="articles__table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tiêu đề</th>
                <th>Tác giả</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article._id}>
                  <td>
                    <img
                      src={article.image}
                      alt={article.title}
                      style={{ width: "80px", height: "auto" }}
                    />
                  </td>
                  <td>{article.title}</td>
                  <td>{article.name}</td>
                  <td>
                    <button
                      className="btn_delete"
                      onClick={() => handleDelete(article._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(ArticleAdminPage);
