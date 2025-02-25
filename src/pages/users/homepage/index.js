import { memo, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./style.scss";

import cat1Img from "assets/users/images/categories/cat1.jpg";
import cat2Img from "assets/users/images/categories/cat2.jpg";
import cat3Img from "assets/users/images/categories/cat3.jpg";
import cat4Img from "assets/users/images/categories/cat4.jpg";
import cat5Img from "assets/users/images/categories/cat5.jpg";

import banner1 from "assets/users/images/banner/banner1.jpg";
import banner2 from "assets/users/images/banner/banner2.jpg";
import ProductCard from "component/ProductCard";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const sliderItem = [
    { bgImg: cat1Img, name: "Cam tươi" },
    { bgImg: cat2Img, name: "Hoa quả khô" },
    { bgImg: cat3Img, name: "Rau củ tươi" },
    { bgImg: cat4Img, name: "Sữa hộp" },
    { bgImg: cat5Img, name: "Thịt bò" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const renderProducts = () => {
    return (
      <div className="row">
        {products.map((item) => (
          <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={item._id}>
            <ProductCard
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Categories Begin */}
      <div className="container container_categories_slider">
        <Carousel responsive={responsive} className="categories_slider">
          {sliderItem.map((items, key) => (
            <div
              className="categories_slider_item"
              style={{ backgroundImage: `url(${items.bgImg})` }}
              key={key}
            >
              <p>{items.name}</p>
            </div>
          ))}
        </Carousel>
      </div>
      {/* Categories End */}

      {/* Products Begin */}
      <div className="container">
        <div className="featured">
          <div className="section-title">
            <h2>Tất cả sản phẩm</h2>
          </div>
          {renderProducts()}
        </div>
      </div>
      {/* Products End */}

      {/* Banner Begin */}
      <div className="container">
        <div className="banner">
          <div className="banner_pic">
            <img src={banner1} alt="banner" />
          </div>
          <div className="banner_pic">
            <img src={banner2} alt="banner" />
          </div>
        </div>
      </div>
      {/* Banner End */}
    </>
  );
};

export default memo(HomePage);
