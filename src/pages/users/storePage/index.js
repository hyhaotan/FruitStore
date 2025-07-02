import React, { memo } from "react";
import "./style.scss";
import Breadcrumb from "../theme/breadcrumb";
import team1 from "assets/users/images/banner/banner1.jpg";
import team2 from "assets/users/images/banner/banner1.jpg";
import team3 from "assets/users/images/banner/banner2.jpg";

const AboutStorePage = () => {
  return (
    <>
      <Breadcrumb name="Cửa hàng" />

      <section className="about-hero">
        <div className="container">
          <h1>Chào mừng đến với FreshNature Store</h1>
          <p>Cam kết mang đến thực phẩm hữu cơ, tươi ngon và dinh dưỡng nhất.</p>
          <button className="btn-primary">Khám phá sản phẩm</button>
        </div>
      </section>

      <section className="about-mission container">
        <div className="mission-text">
          <h2>Sứ mệnh</h2>
          <p>
            FreshNature Store ra đời với mục tiêu nâng cao chất lượng cuộc sống
            qua việc cung cấp thực phẩm sạch, an toàn và giàu dinh dưỡng. Chúng
            tôi kết nối nông trại hữu cơ và người tiêu dùng để xây dựng cộng đồng
            khỏe mạnh.
          </p>
        </div>
        <div className="mission-image">
          <img src="/assets/users/images/mission.jpg" alt="Sứ mệnh" />
        </div>
      </section>

      <section className="about-history container">
        <h2>Lịch sử phát triển</h2>
        <p>
          Thành lập năm 2015, FreshNature bắt đầu từ một quầy rau sạch nhỏ tại
          chợ địa phương và nhanh chóng trở thành chuỗi cửa hàng uy tín khắp cả
          nước. Đến nay, chúng tôi đã phục vụ hơn 50.000 khách hàng.
        </p>
      </section>

      <section className="about-values container">
        <h2>Giá trị cốt lõi</h2>
        <div className="values-list">
          <div className="value-item">
            <h3>Chân thành</h3>
            <p>Minh bạch về nguồn gốc, chất lượng sản phẩm và giá cả.</p>
          </div>
          <div className="value-item">
            <h3>Chất lượng</h3>
            <p>Sản phẩm đạt chuẩn hữu cơ và kiểm định an toàn tuyệt đối.</p>
          </div>
          <div className="value-item">
            <h3>Cộng đồng</h3>
            <p>Hợp tác và nâng đỡ nông dân địa phương để phát triển bền vững.</p>
          </div>
        </div>
      </section>

      <section className="about-team container">
        <h2>Đội ngũ của chúng tôi</h2>
        <div className="team-list">
          {[
            { img: team1, name: "An Nguyễn", role: "Giám đốc điều hành" },
            { img: team2, name: "Bình Trần", role: "Trưởng phòng chất lượng" },
            { img: team3, name: "Cẩm Phương", role: "Chuyên gia dinh dưỡng" }
          ].map((member, idx) => (
            <div key={idx} className="team-item">
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-cta container">
        <h2>Đăng ký nhận tin</h2>
        <p>Nhanh tay để không bỏ lỡ ưu đãi và tin tức hữu ích về dinh dưỡng!</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Email của bạn" required />
          <button type="submit" className="btn-secondary">Đăng ký</button>
        </form>
      </section>
    </>
  );
};

export default memo(AboutStorePage);