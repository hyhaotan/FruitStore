import { memo } from "react";
import "react-multi-carousel/lib/styles.css";
import "./style.scss";
import Breadcrumb from "../theme/breadcrumb";

const couponPage = () => {
  return (
    <>
      <Breadcrumb name="Mã giảm giá" />
    </>
  );
};

export default memo(couponPage);
