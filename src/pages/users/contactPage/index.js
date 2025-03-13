import React, { memo, useState } from "react";
import emailjs from "emailjs-com";
import "react-multi-carousel/lib/styles.css";
import "./style.scss";
import Breadcrumb from "../theme/breadcrumb";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_e9q2vf6",
        "template_qvsdrvd",
        formData,
        "8W02oXbuHcUCbk7cN"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Gửi liên hệ thành công!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.log(error.text);
          alert("Gửi liên hệ thất bại, vui lòng thử lại!");
        }
      );
  };

  return (
    <>
      <Breadcrumb name="Liên hệ" />
      <div className="contact-page">
        <div className="contact-card">
          {/* Form Liên Hệ */}
          <div className="contact-form">
            <h1>Liên Hệ</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Lời nhắn:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Gửi</button>
            </form>
          </div>

          {/* Thông Tin Địa Chỉ */}
          <div className="contact-info">
            <h2>Địa chỉ liên hệ</h2>
            <p>
              <strong>Email:</strong> hyhaotan@gmail.com
            </p>
            <p>
              <strong>Số điện thoại:</strong> 0123 456 789
            </p>
            <p>
              <strong>Địa chỉ:</strong> Số 123, Đường Trịnh Đình Thảo, Thành phố
              Hồ Chí Minh
            </p>
            <div className="map">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4734811371477!2d106.63185107586864!3d10.775001859218305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ea144839ef1%3A0x798819bdcd0522b0!2sInformation%20Technology%20College%20HoChiMinh%20City!5e0!3m2!1sen!2s!4v1741183773441!5m2!1sen!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ContactPage);
