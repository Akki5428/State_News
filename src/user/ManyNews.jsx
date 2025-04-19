import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FormatDate } from '../components/FormatDate'

export const ManyNews = () => {
    const [newsFirst, setNewsFirst] = useState([])
    const [newsSecond, setNewsSecond] = useState([])

    const {isTrend,isPop} = useParams()

    const fetchNews = async () => {
        const pop = await axios.get("http://127.0.0.1:8000/news/popular/")
        const trend = await axios.get("http://127.0.0.1:8000/news/trending/")
        $(".carousel-item-2").trigger("destroy.owl.carousel");
        console.log(pop.data)
        console.log(trend.data)
        console.log("isTrend:",isTrend)
        console.log("isPop:",isPop)
        // setTimeout(initOwlCarousel, 500);
        if(isTrend == "yes"){
            setNewsFirst(trend.data)
            setNewsSecond(pop.data)
        }
        else{
            setNewsFirst(pop.data)
            setNewsSecond(trend.data)
        }
    }

    useEffect(() => {
        fetchNews();

    }, [])

    return (
        <>
            {/* Breadcrumb Start */}
            <div className="container-fluid">
                <div className="container">
                    <nav className="breadcrumb bg-transparent m-0 p-0">
                        <Link className="breadcrumb-item" to="/home">
                            Home
                        </Link>
                        <span className="breadcrumb-item active">
                            {newsFirst.length > 0 ? (isPop == "yes" ? "Popular": "Trending" ): "Loading..."}
                        </span>

                    </nav>
                </div>
            </div>
            {/* Breadcrumb End */}
            {/* News With Sidebar Start */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                                        <h3 className="m-0">{newsFirst.length > 0 ? (isPop == "yes" ? "Popular": "Trending" ) : "Loading..."}</h3>
                                        <a
                                            className="text-secondary font-weight-medium text-decoration-none"
                                            href=""
                                        >
                                            View All
                                        </a>
                                    </div>
                                </div>
                                {/* <div className="col-lg-6">
                                    <div className="position-relative mb-3">
                                        <img
                                            className="img-fluid w-100"
                                            // src="img/news-500x280-1.jpg?v=1"
                                            src={`/img/news-500x280-1.jpg?v=${new Date().getTime()}`}
                                            style={{ objectFit: "cover" }}
                                        />
                                        <div className="overlay position-relative bg-light">
                                            <div className="mb-2" style={{ fontSize: 14 }}>
                                                <a href="">Technology</a>
                                                <span className="px-1">/</span>
                                                <span>January 01, 2045</span>
                                            </div>
                                            <a className="h4" href="">
                                                Est stet amet ipsum stet clita rebum duo
                                            </a>
                                            <p className="m-0">
                                                Rebum dolore duo et vero ipsum clita, est ea sed duo diam
                                                ipsum, clita at justo, lorem amet vero eos sed sit...
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                                {newsFirst.length > 0 ? (
                                    newsFirst.slice(0, 4).map((item, index) => (
                                        <div className="col-lg-6" key={index}>
                                            <div className="position-relative mb-3">
                                                <img
                                                    className="img-fluid w-100"
                                                    // src={item.image || "img/news-500x280-2.jpg?v=1"}
                                                    src={`/img/news-500x280-1.jpg?v=${new Date().getTime()}`}
                                                    style={{ objectFit: "cover" ,height: 170}}
                                                    alt="News"
                                                />
                                                <div className="overlay position-relative bg-light" style={{ height: 250  }}>
                                                    <div className="mb-2" style={{ fontSize: 14 }}>
                                                        <a href="">{item.category || "Technology"}</a>
                                                        <span className="px-1">/</span>
                                                        <span>{FormatDate(item.news_date) || "January 01, 2045"}</span>
                                                    </div>
                                                    <Link className="h4" to={`/single/category/${item._id}`} style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }} >
                                                        {item.title || "Est stet amet ipsum stet clita rebum duo"} 
                                                    </Link>
                                                    <p className="m-0" style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 4,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }}>
                                                        {item.content ||
                                                            "Rebum dolore duo et vero ipsum clita, est ea sed duo diam ipsum, clita at justo, lorem amet vero eos sed sit..."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-lg-6">
                                        <p>Loading news...</p>
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <a href="">
                                    <img
                                        className="img-fluid w-100"
                                        src="img/ads-700x70.jpg"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="d-flex mb-3">
                                        <img
                                            // src="img/news-100x100-1.jpg"
                                            src={`/img/news-100x100-1.jpg?v=${new Date().getTime()}`}
                                            style={{ width: 100, height: 100, objectFit: "cover" }}
                                        />
                                        <div
                                            className="w-100 d-flex flex-column justify-content-center bg-light px-3"
                                            style={{ height: 100 }}
                                        >
                                            <div className="mb-1" style={{ fontSize: 13 }}>
                                                <a href="">Technology</a>
                                                <span className="px-1">/</span>
                                                <span>January 01, 2045</span>
                                            </div>
                                            <a className="h6 m-0" href="">
                                                Lorem ipsum dolor sit amet consec adipis elit
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex mb-3">
                                        <img
                                            // src="img/news-100x100-1.jpg"
                                            src={`/img/news-100x100-1.jpg?v=${new Date().getTime()}`}
                                            style={{ width: 100, height: 100, objectFit: "cover" }}
                                        />
                                        <div
                                            className="w-100 d-flex flex-column justify-content-center bg-light px-3"
                                            style={{ height: 100 }}
                                        >
                                            <div className="mb-1" style={{ fontSize: 13 }}>
                                                <a href="">Technology</a>
                                                <span className="px-1">/</span>
                                                <span>January 01, 2045</span>
                                            </div>
                                            <a className="h6 m-0" href="">
                                                Lorem ipsum dolor sit amet consec adipis elit
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {newsFirst.length > 4 ? (
                                    newsFirst.slice(4, 12).map((item, index) => (
                                        <div className="col-lg-6" key={index + 4}>
                                            <div className="d-flex mb-3">
                                                <img
                                                    // src={item.image || "img/news-100x100-1.jpg"}
                                                    src={`/img/news-100x100-1.jpg?v=${new Date().getTime()}`}
                                                    style={{ width: 100, height: 100, objectFit: "cover" }}
                                                    alt="News"
                                                />
                                                <div
                                                    className="w-100 d-flex flex-column justify-content-center bg-light px-3"
                                                    style={{ height: 100 }}
                                                >
                                                    <div className="mb-1" style={{ fontSize: 13 }}>
                                                        <a href="">{item.category || "Technology"}</a>
                                                        <span className="px-1">/</span>
                                                        <span>{FormatDate(item.news_date) || "January 01, 2045"}</span>
                                                    </div>
                                                    <Link className="h6 m-0" to={`/single/category/${item._id}`}>
                                                        {item.title || "Lorem ipsum dolor sit amet consec adipis elit"}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-lg-6">
                                        <p>Loading news...</p>
                                    </div>
                                )}

                            </div>

                            {/* <div className="row">
                                <div className="col-12">
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item disabled">
                                                <a className="page-link" href="#" aria-label="Previous">
                                                    <span
                                                        className="fa fa-angle-double-left"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="sr-only">Previous</span>
                                                </a>
                                            </li>
                                            <li className="page-item active">
                                                <a className="page-link" href="#">
                                                    1
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">
                                                    2
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">
                                                    3
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Next">
                                                    <span
                                                        className="fa fa-angle-double-right"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="sr-only">Next</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div> */}
                        </div>

                        <div className="col-lg-4 pt-3 pt-lg-0">
                            {/* Social Follow Start */}
                            <div className="pb-3">
                                <div className="bg-light py-2 px-4 mb-3">
                                    <h3 className="m-0">Follow Us</h3>
                                </div>
                                <div className="d-flex mb-3">
                                    <a
                                        href=""
                                        className="d-block w-50 py-2 px-3 text-white text-decoration-none mr-2"
                                        style={{ background: "#39569E" }}
                                    >
                                        <small className="fab fa-facebook-f mr-2" />
                                        <small>12,345 Fans</small>
                                    </a>
                                    <a
                                        href=""
                                        className="d-block w-50 py-2 px-3 text-white text-decoration-none ml-2"
                                        style={{ background: "#52AAF4" }}
                                    >
                                        <small className="fab fa-twitter mr-2" />
                                        <small>12,345 Followers</small>
                                    </a>
                                </div>
                                <div className="d-flex mb-3">
                                    <a
                                        href=""
                                        className="d-block w-50 py-2 px-3 text-white text-decoration-none mr-2"
                                        style={{ background: "#0185AE" }}
                                    >
                                        <small className="fab fa-linkedin-in mr-2" />
                                        <small>12,345 Connects</small>
                                    </a>
                                    <a
                                        href=""
                                        className="d-block w-50 py-2 px-3 text-white text-decoration-none ml-2"
                                        style={{ background: "#C8359D" }}
                                    >
                                        <small className="fab fa-instagram mr-2" />
                                        <small>12,345 Followers</small>
                                    </a>
                                </div>
                                <div className="d-flex mb-3">
                                    <a
                                        href=""
                                        className="d-block w-50 py-2 px-3 text-white text-decoration-none mr-2"
                                        style={{ background: "#DC472E" }}
                                    >
                                        <small className="fab fa-youtube mr-2" />
                                        <small>12,345 Subscribers</small>
                                    </a>
                                    <a
                                        href=""
                                        className="d-block w-50 py-2 px-3 text-white text-decoration-none ml-2"
                                        style={{ background: "#1AB7EA" }}
                                    >
                                        <small className="fab fa-vimeo-v mr-2" />
                                        <small>12,345 Followers</small>
                                    </a>
                                </div>
                            </div>
                            {/* Social Follow End */}

                            {/* Newsletter Start */}
                            <div className="pb-3">
                                <div className="bg-light py-2 px-4 mb-3">
                                    <h3 className="m-0">Newsletter</h3>
                                </div>
                                <div className="bg-light text-center p-4 mb-3">
                                    <p>
                                        Aliqu justo et labore at eirmod justo sea erat diam dolor diam
                                        vero kasd
                                    </p>
                                    <div className="input-group" style={{ width: "100%" }}>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Your Email"
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary">Sign Up</button>
                                        </div>
                                    </div>
                                    <small>Sit eirmod nonumy kasd eirmod</small>
                                </div>
                            </div>
                            {/* Newsletter End */}

                            {/* Ads Start */}
                            <div className="mb-3 pb-3">
                                <a href="">
                                    <img className="img-fluid"
                                        //  src="img/news-500x280-4.jpg" 
                                        src={`/img/news-500x280-4.jpg?v=${new Date().getTime()}`}
                                        alt="" />
                                </a>
                            </div>
                            {/* Ads End */}

                            {/* Popular News Start */}
                            <div className="pb-3">
                                <div className="bg-light py-2 px-4 mb-3">
                                    <h3 className="m-0">{isPop == "yes" ? "Trending": "Popular" }</h3>
                                </div>
                                {/* <div className="d-flex mb-3">
                                    <img
                                        // src="img/news-100x100-1.jpg"
                                        src={`/img/news-100x100-1.jpg?v=${new Date().getTime()}`}
                                        style={{ width: 100, height: 100, objectFit: "cover" }}
                                    />
                                    <div
                                        className="w-100 d-flex flex-column justify-content-center bg-light px-3"
                                        style={{ height: 100 }}
                                    >
                                        <div className="mb-1" style={{ fontSize: 13 }}>
                                            <a href="">Technology</a>
                                            <span className="px-1">/</span>
                                            <span>January 01, 2045</span>
                                        </div>
                                        <a className="h6 m-0" href="">
                                            Lorem ipsum dolor sit amet consec adipis elit
                                        </a>
                                    </div>
                                </div> */}
                                {newsSecond.length > 0 ? (
                                    newsSecond.slice(0, 5).map((item, index) => (
                                        <div className="d-flex mb-3" key={index}>
                                            <img
                                                // src={item.image || "img/news-100x100-2.jpg"}
                                                src={`/img/news-100x100-1.jpg?v=${new Date().getTime()}`}
                                                style={{ width: 100, height: 100, objectFit: "cover" }}
                                                alt="Trending News"
                                            />
                                            <div
                                                className="w-100 d-flex flex-column justify-content-center bg-light px-3"
                                                style={{ height: 100 }}
                                            >
                                                <div className="mb-1" style={{ fontSize: 13 }}>
                                                    <a href="">{item.category || "Technology"}</a>
                                                    <span className="px-1">/</span>
                                                    <span>{FormatDate(item.news_date) || "January 01, 2045"}</span>
                                                </div>
                                                <a className="h6 m-0" href="">
                                                    {item.title || "Lorem ipsum dolor sit amet consec adipis elit"}
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Loading trending news...</p>
                                )}

                            </div>
                            {/* Popular News End */}

                            {/* Tags Start */}
                            <div className="pb-3">
                                <div className="bg-light py-2 px-4 mb-3">
                                    <h3 className="m-0">Tags</h3>
                                </div>
                                <div className="d-flex flex-wrap m-n1">
                                    <a href="" className="btn btn-sm btn-outline-secondary m-1">
                                        Politics
                                    </a>
                                    <a href="" className="btn btn-sm btn-outline-secondary m-1">
                                        Business
                                    </a>
                                    <a href="" className="btn btn-sm btn-outline-secondary m-1">
                                        Corporate
                                    </a>
                                    <a href="" className="btn btn-sm btn-outline-secondary m-1">
                                        Sports
                                    </a>
                                    <a href="" className="btn btn-sm btn-outline-secondary m-1">
                                        Health
                                    </a>
                                    <a href="" className="btn btn-sm btn-outline-secondary m-1">
                                        Education
                                    </a>
                                    <a href="" className="btn btn-sm btn-outline-secondary m-1">
                                        Science
                                    </a>
                                    <a href="" className="btn btn-sm btn-outline-secondary m-1">
                                        Technology
                                    </a>
                                    <a href="" className="btn btn-sm btn-outline-secondary m-1">
                                        Foods
                                    </a>
                                    <a href="" className="btn btn-sm btn-outline-secondary m-1">
                                        Entertainment
                                    </a>
                                    <a href="" className="btn btn-sm btn-outline-secondary m-1">
                                        Travel
                                    </a>
                                    <a href="" className="btn btn-sm btn-outline-secondary m-1">
                                        Lifestyle
                                    </a>
                                </div>
                            </div>
                            {/* Tags End */}
                        </div>
                    </div>
                </div>
            </div>
            {/* News With Sidebar End */}
        </>

    )
}
