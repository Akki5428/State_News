import React from 'react'
import '../css/style.css'

export const Home = () => {
    return (
        <>
            {/* Top News Slider Start */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="owl-carousel owl-carousel-2 carousel-item-3 position-relative">
                        <div className="d-flex">
                            <img
                                src="/img/news-100x100-1.jpg"
                                style={{ width: 80, height: 80, objectFit: "cover" }}
                            />
                            <div
                                className="d-flex align-items-center bg-light px-3"
                                style={{ height: 80 }}
                            >
                                <a className="text-secondary font-weight-semi-bold" href="">
                                    Lorem ipsum dolor sit amet consec adipis elit
                                </a>
                            </div>
                        </div>
                        <div className="d-flex">
                            <img
                                src="/img/news-100x100-2.jpg"
                                style={{ width: 80, height: 80, objectFit: "cover" }}
                            />
                            <div
                                className="d-flex align-items-center bg-light px-3"
                                style={{ height: 80 }}
                            >
                                <a className="text-secondary font-weight-semi-bold" href="">
                                    Lorem ipsum dolor sit amet consec adipis elit
                                </a>
                            </div>
                        </div>
                        <div className="d-flex">
                            <img
                                src="/img/news-100x100-3.jpg"
                                style={{ width: 80, height: 80, objectFit: "cover" }}
                            />
                            <div
                                className="d-flex align-items-center bg-light px-3"
                                style={{ height: 80 }}
                            >
                                <a className="text-secondary font-weight-semi-bold" href="">
                                    Lorem ipsum dolor sit amet consec adipis elit
                                </a>
                            </div>
                        </div>
                        <div className="d-flex">
                            <img
                                src="/img/news-100x100-4.jpg"
                                style={{ width: 80, height: 80, objectFit: "cover" }}
                            />
                            <div
                                className="d-flex align-items-center bg-light px-3"
                                style={{ height: 80 }}
                            >
                                <a className="text-secondary font-weight-semi-bold" href="">
                                    Lorem ipsum dolor sit amet consec adipis elit
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Top News Slider End */}
            {/* Main News Slider Start */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="owl-carousel owl-carousel-2 carousel-item-1 position-relative mb-3 mb-lg-0">
                                <div
                                    className="position-relative overflow-hidden"
                                    style={{ height: 435 }}
                                >
                                    <img
                                        className="img-fluid h-100"
                                        src="/img/news-700x435-1.jpg"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="overlay">
                                        <div className="mb-1">
                                            <a className="text-white" href="">
                                                Technology
                                            </a>
                                            <span className="px-2 text-white">/</span>
                                            <a className="text-white" href="">
                                                January 01, 2045
                                            </a>
                                        </div>
                                        <a className="h2 m-0 text-white font-weight-bold" href="">
                                            Sanctus amet sed amet ipsum lorem. Dolores et erat et elitr
                                            sea sed
                                        </a>
                                    </div>
                                </div>
                                <div
                                    className="position-relative overflow-hidden"
                                    style={{ height: 435 }}
                                >
                                    <img
                                        className="img-fluid h-100"
                                        src="/img/news-700x435-2.jpg"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="overlay">
                                        <div className="mb-1">
                                            <a className="text-white" href="">
                                                Technology
                                            </a>
                                            <span className="px-2 text-white">/</span>
                                            <a className="text-white" href="">
                                                January 01, 2045
                                            </a>
                                        </div>
                                        <a className="h2 m-0 text-white font-weight-bold" href="">
                                            Sanctus amet sed amet ipsum lorem. Dolores et erat et elitr
                                            sea sed
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                                <h3 className="m-0">Categories</h3>
                                <a
                                    className="text-secondary font-weight-medium text-decoration-none"
                                    href=""
                                >
                                    View All
                                </a>
                            </div>
                            <div
                                className="position-relative overflow-hidden mb-3"
                                style={{ height: 80 }}
                            >
                                <img
                                    className="img-fluid w-100 h-100"
                                    src="/img/cat-500x80-1.jpg"
                                    style={{ objectFit: "cover" }}
                                />
                                <a
                                    href=""
                                    className="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none"
                                >
                                    Business
                                </a>
                            </div>
                            <div
                                className="position-relative overflow-hidden mb-3"
                                style={{ height: 80 }}
                            >
                                <img
                                    className="img-fluid w-100 h-100"
                                    src="/img/cat-500x80-2.jpg"
                                    style={{ objectFit: "cover" }}
                                />
                                <a
                                    href=""
                                    className="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none"
                                >
                                    Technology
                                </a>
                            </div>
                            <div
                                className="position-relative overflow-hidden mb-3"
                                style={{ height: 80 }}
                            >
                                <img
                                    className="img-fluid w-100 h-100"
                                    src="/img/cat-500x80-3.jpg"
                                    style={{ objectFit: "cover" }}
                                />
                                <a
                                    href=""
                                    className="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none"
                                >
                                    Entertainment
                                </a>
                            </div>
                            <div
                                className="position-relative overflow-hidden"
                                style={{ height: 80 }}
                            >
                                <img
                                    className="img-fluid w-100 h-100"
                                    src="/img/cat-500x80-4.jpg"
                                    style={{ objectFit: "cover" }}
                                />
                                <a
                                    href=""
                                    className="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none"
                                >
                                    Sports
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main News Slider End */}
        </>

    )
}
