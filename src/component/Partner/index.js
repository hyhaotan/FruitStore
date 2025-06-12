import { memo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import partner1 from "assets/users/images/partner/partner1.jpg";
import partner2 from "assets/users/images/partner/partner2.jpg";
import partner3 from "assets/users/images/partner/partner3.jpg";
import partner4 from "assets/users/images/partner/partner4.png";
import "./style.scss";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
};

const Partner = ({ onApplyDiscount }) => {
  const partners = [partner1, partner2, partner3, partner4];

  return (
    <section className="partner-section">
      <div className="container">
        <h2 className="section-title">Đối tác tin tưởng</h2>
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          className="partner-carousel"
        >
          {partners.map((src, idx) => (
            <div className="partner-item" key={idx}>
              <img
                src={src}
                alt={`Partner ${idx + 1}`}
                onClick={() => onApplyDiscount && onApplyDiscount(idx)}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default memo(Partner);