import { memo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./style.scss";

import cat1Img from "assets/users/images/categories/cat1.jpg";
import cat2Img from "assets/users/images/categories/cat2.jpg";
import cat3Img from "assets/users/images/categories/cat3.jpg";
import cat4Img from "assets/users/images/categories/cat4.jpg";
import cat5Img from "assets/users/images/categories/cat5.jpg";

import banner1 from "assets/users/images/banner/banner1.jpg";
import banner2 from "assets/users/images/banner/banner2.jpg";
import { ProductCard } from "component";
import { featProducts } from "utils/common";

const HomePage = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const sliderItem = [
        {
            bgImg: cat1Img,
            name: "Cam tươi",
        },
        {
            bgImg: cat2Img,
            name: "Hoa quả khô",
        },
        {
            bgImg: cat3Img,
            name: "Rau củ tươi",
        },
        {
            bgImg: cat4Img,
            name: "Sữa hộp",
        },
        {
            bgImg: cat5Img,
            name: "thịt bò",
        },
    ];

    const renderFeaturedProducts = (data) => {
        const tabList = [];
        const tabPanels = [];

        Object.keys(data).forEach((key, index) => {
            tabList.push(<Tab key={index}>{data[key].title}</Tab>);

            const tabPanel = [];
            data[key].products.forEach((item, j) => {
                tabPanel.push(
                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={j}>
                        <ProductCard name={item.name} img={item.img} price={item.price} />
                    </div>
                )
            })
            tabPanels.push(tabPanel);
        })

        return (
            <Tabs>
                <TabList>
                    {tabList}
                </TabList>
                {
                    tabPanels.map((item, key) => (
                        <TabPanel key={key}>
                            <div className="row">
                                {item}
                            </div>
                        </TabPanel>
                    ))
                }
            </Tabs>
        )
    }

    return (
        <>
            {/*Categories Begin*/}
            < div className="container container_categories_slider" >
                <Carousel responsive={responsive} className="categories_slider">
                    {
                        sliderItem.map((items, key) => (
                            <div
                                className="categories_slider_item"
                                style={{ backgroundImage: `url(${items.bgImg})` }}
                                key={key}>
                                <p>{items.name}</p>
                            </div>
                        ))
                    }

                </Carousel>
            </div >
            {/*Categories End*/}

            {/*Featured Begin*/}
            <div className="container">
                <div className="featured">
                    <div className="section-title">
                        <h2>Sản phẩm nổi bật</h2>
                    </div>
                    {renderFeaturedProducts(featProducts)}
                </div>
            </div>
            {/*Featured End*/}

            {/*Banner Begin*/}
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
            {/*Banner End*/}
        </>
    );
};

export default memo(HomePage);