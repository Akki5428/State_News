import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FormatDate } from '../components/FormatDate'
import { Link } from 'react-router-dom'

export const Categories = () => {
    const [catNews, setCatNews] = useState([])
    const [trendingNews, setTrendingNews] = useState([])

    const fetchNews = async () => {
        const news = await axios.get("http://127.0.0.1:8000/news/category/")
        const res = await axios.get("http://127.0.0.1:8000/news/trending/")
        $(".carousel-item-2").trigger("destroy.owl.carousel");
        console.log(res.data)
        setTimeout(initOwlCarousel, 500);
        setCatNews(news.data)
        setTrendingNews(res.data)
    }

    useEffect(() => {
        fetchNews();

    }, [])

    const initOwlCarousel = () => {
        $(".carousel-item-2").owlCarousel("destroy"); // Destroy old instance
        $(".carousel-item-2").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            margin: 30,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: { items: 1 },
                576: { items: 1 },
                768: { items: 2 }
            }
        });
        // console.log("✅ Owl Carousel reinitialized");
    };



    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 py-3">
                            <div className="bg-light py-2 px-4 mb-3">
                                <h3 className="m-0">Entertainment</h3>
                            </div>
                            <div className="owl-carousel owl-carousel-3 carousel-item-2 position-relative">
                                {
                                    catNews.length > 0 ? (
                                        catNews
                                            .filter(news => news.category === "Entertainment") // Filter only Entertainment category
                                            .slice(0, 4) // Take the first 4
                                            .map((news, index) => (
                                                <div className="position-relative" key={index}> {/* Using index as key */}
                                                    <img
                                                        className="img-fluid w-100"
                                                        src="img/news-500x280-6.jpg"
                                                        style={{ objectFit: "cover", height: 150 }}
                                                    />
                                                    <div className="overlay position-relative bg-light" style={{ height: 170 }}>
                                                        <div className="mb-2" style={{ fontSize: 13 }}>
                                                            <a href="">{news.category}</a>
                                                            <span className="px-1">/</span>
                                                            <span style={{
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 1,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis'
                                                            }}>{FormatDate(news.news_date)}</span>
                                                        </div>
                                                        <Link className="h4 m-0" href="" style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }} to={`/single/category/${news._id}`}>
                                                            {news.title}
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <div className="text-center w-100 text-secondary">Loading trending news...</div>
                                    )
                                }


                                {/* <div className="position-relative">
                                    <img
                                        className="img-fluid w-100"
                                        src="img/news-500x280-4.jpg"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="overlay position-relative bg-light">
                                        <div className="mb-2" style={{ fontSize: 13 }}>
                                            <a href="">Technology</a>
                                            <span className="px-1">/</span>
                                            <span>January 01, 2045</span>
                                        </div>
                                        <a className="h4 m-0" href="">
                                            Sanctus amet sed ipsum lorem
                                        </a>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="col-lg-6 py-3">
                            <div className="bg-light py-2 px-4 mb-3">
                                <h3 className="m-0">Sports</h3>
                            </div>
                            <div className="owl-carousel owl-carousel-3 carousel-item-2 position-relative">
                                {
                                    catNews.length > 0 ? (
                                        catNews
                                            .filter(news => news.category === "Sports") // Filter only Entertainment category
                                            .slice(0, 4) // Take the first 4
                                            .map((news, index) => (
                                                <div className="position-relative" key={index} > {/* Using index as key */}
                                                    <img
                                                        className="img-fluid w-100"
                                                        src="img/news-500x280-6.jpg"
                                                        style={{ objectFit: "cover", height: 150 }}
                                                    />
                                                    <div className="overlay position-relative bg-light" style={{ height: 170 }}>
                                                        <div className="mb-2" style={{ fontSize: 13 }}>
                                                            <a href="">{news.category}</a>
                                                            <span className="px-1">/</span>
                                                            <span style={{
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis'
                                                            }}>{news.news_date}</span>
                                                        </div>
                                                        <Link className="h4 m-0" href="" style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }} to={`/single/category/${news._id}`}>
                                                            {news.title}
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <div className="text-center w-100 text-secondary">Loading trending news...</div>
                                    )
                                }

                                <div className="position-relative">
                                    <img
                                        className="img-fluid w-100"
                                        src="img/news-500x280-2.jpg"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="overlay position-relative bg-light">
                                        <div className="mb-2" style={{ fontSize: 13 }}>
                                            <a href="">Technology</a>
                                            <span className="px-1">/</span>
                                            <span>January 01, 2045</span>
                                        </div>
                                        <a className="h4 m-0" href="">
                                            Sanctus amet sed ipsum lorem
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category News Slider Start */}
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 py-3">
                            <div className="bg-light py-2 px-4 mb-3">
                                <h3 className="m-0">Business</h3>
                            </div>
                            <div className="owl-carousel owl-carousel-3 carousel-item-2 position-relative">
                                {
                                    catNews.length > 0 ? (
                                        catNews
                                            .filter(news => news.category === "Business") // Filter only Entertainment category
                                            .slice(0, 4) // Take the first 4
                                            .map((news, index) => (
                                                <div className="position-relative" key={index}> {/* Using index as key */}
                                                    <img
                                                        className="img-fluid w-100"
                                                        src="img/news-500x280-6.jpg"
                                                        style={{ objectFit: "cover" ,height: 150}}
                                                    />
                                                    <div className="overlay position-relative bg-light" style={{ height: 170 }}>
                                                        <div className="mb-2" style={{ fontSize: 13 }}>
                                                            <a href="">{news.category}</a>
                                                            <span className="px-1">/</span>
                                                            <span style={{
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis'
                                                            }}>{FormatDate(news.news_date)}</span>
                                                        </div>
                                                        <Link className="h4 m-0" href="" style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }} to={`/single/category/${news._id}`}>
                                                            {news.title}
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <div className="text-center w-100 text-secondary">Loading trending news...</div>
                                    )
                                }

                                {/* <div className="position-relative">
                                    <img
                                        className="img-fluid w-100"
                                        src="img/news-500x280-2.jpg"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="overlay position-relative bg-light">
                                        <div className="mb-2" style={{ fontSize: 13 }}>
                                            <a href="">Technology</a>
                                            <span className="px-1">/</span>
                                            <span>January 01, 2045</span>
                                        </div>
                                        <a className="h4 m-0" href="">
                                            Sanctus amet sed ipsum lorem
                                        </a>
                                    </div>
                                </div>
                                <div className="position-relative">
                                    <img
                                        className="img-fluid w-100"
                                        src="img/news-500x280-3.jpg"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="overlay position-relative bg-light">
                                        <div className="mb-2" style={{ fontSize: 13 }}>
                                            <a href="">Technology</a>
                                            <span className="px-1">/</span>
                                            <span>January 01, 2045</span>
                                        </div>
                                        <a className="h4 m-0" href="">
                                            Sanctus amet sed ipsum lorem
                                        </a>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="col-lg-6 py-3">
                            <div className="bg-light py-2 px-4 mb-3">
                                <h3 className="m-0">Technology</h3>
                            </div>
                            <div className="owl-carousel owl-carousel-3 carousel-item-2 position-relative">
                                {
                                    catNews.length > 0 ? (
                                        catNews
                                            .filter(news => news.category === "Technology") // Filter only Entertainment category
                                            .slice(0, 4) // Take the first 4
                                            .map((news, index) => (
                                                <div className="position-relative" key={index}> {/* Using index as key */}
                                                    <img
                                                        className="img-fluid w-100"
                                                        src="img/news-500x280-6.jpg"
                                                        style={{ objectFit: "cover" ,height: 150}}
                                                    />
                                                    <div className="overlay position-relative bg-light" height={{height: 170}}>
                                                        <div className="mb-2" style={{ fontSize: 13 }}>
                                                            <a href="">{news.category}</a>
                                                            <span className="px-1">/</span>
                                                            <span style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }}>{FormatDate(news.news_date)}</span>
                                                        </div>
                                                        <Link className="h4 m-0" href="" style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }} to={`/single/category/${news._id}`}>
                                                            {news.title}
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <div className="text-center w-100 text-secondary">Loading trending news...</div>
                                    )
                                }
                                {/* <div className="position-relative">
                                    <img
                                        className="img-fluid w-100"
                                        src="img/news-500x280-5.jpg"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="overlay position-relative bg-light">
                                        <div className="mb-2" style={{ fontSize: 13 }}>
                                            <a href="">Technology</a>
                                            <span className="px-1">/</span>
                                            <span>January 01, 2045</span>
                                        </div>
                                        <a className="h4 m-0" href="">
                                            Sanctus amet sed ipsum lorem
                                        </a>
                                    </div>
                                </div>
                                <div className="position-relative">
                                    <img
                                        className="img-fluid w-100"
                                        src="img/news-500x280-6.jpg"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="overlay position-relative bg-light">
                                        <div className="mb-2" style={{ fontSize: 13 }}>
                                            <a href="">Technology</a>
                                            <span className="px-1">/</span>
                                            <span>January 01, 2045</span>
                                        </div>
                                        <a className="h4 m-0" href="">
                                            Sanctus amet sed ipsum lorem
                                        </a>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Category News Slider End */}

            {/* News With Sidebar Start */}
            {/* Popular */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                                        <h3 className="m-0">Popular</h3>
                                        <a
                                            className="text-secondary font-weight-medium text-decoration-none"
                                            href=""
                                        >
                                            View All
                                        </a>
                                    </div>
                                </div>

                                {/* First 2 news items with large images and descriptions */}
                                {trendingNews.slice(0, 2).map((news) => (
                                    <div className="col-lg-6" key={news.id}>
                                        <div className="position-relative mb-3">
                                            <img className="img-fluid w-100" src="img/news-500x280-1.jpg" style={{ objectFit: "cover" , height:220 }} alt='News' />
                                            <div className="overlay position-relative bg-light" style={{ height: 200 }}>
                                                <div className="mb-2" style={{ fontSize: 14 }}>
                                                    <a href="">{news.category}</a>
                                                    <span className="px-1">/</span>
                                                    <span>{FormatDate(news.news_date)}</span>
                                                </div>
                                                <Link className="h4" to={`/single/category/${news._id}`}>{news.title}</Link>
                                                <p className="m-0">{news.content.slice(0, 50)}...</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Last 4 news items with only small images and titles */}
                                {trendingNews.slice(2, 6).map((news) => (
                                    <div className="col-lg-6" key={news.id}>
                                        <div className="d-flex mb-3">
                                            <img src="img/news-80x80-4.jpg" style={{ width: 100, height: 100, objectFit: "cover" }} />
                                            <div className="w-100 d-flex flex-column justify-content-center bg-light px-3" style={{ height: 100 }}>
                                                <div className="mb-1" style={{ fontSize: 13 }}>
                                                    <a href="">{news.category}</a>
                                                    <span className="px-1">/</span>
                                                    <span>{FormatDate(news.news_date)}</span>
                                                </div>
                                                <Link className="h6 m-0" to={`/single/category/${news._id}`}>{news.title}</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Ads */}
                            {/* <div className="mb-3 pb-3">
                                <a href="">
                                    <img className="img-fluid w-100" src="img/ads-700x70.jpg" alt="" />
                                </a>
                            </div> */}

                            {/* Latest */}
                            {/* <div className="row">
                                <div className="col-12">
                                    <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                                        <h3 className="m-0">Latest</h3>
                                        <a
                                            className="text-secondary font-weight-medium text-decoration-none"
                                            href=""
                                        >
                                            View All
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="position-relative mb-3">
                                        <img
                                            className="img-fluid w-100"
                                            src="img/news-500x280-5.jpg"
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
                                    <div className="d-flex mb-3">
                                        <img
                                            src="img/news-100x100-5.jpg"
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
                                    <div className="d-flex mb-3">
                                        <img
                                            src="img/news-100x100-1.jpg"
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
                                    <div className="position-relative mb-3">
                                        <img
                                            className="img-fluid w-100"
                                            src="img/news-500x280-6.jpg"
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
                                    <div className="d-flex mb-3">
                                        <img
                                            src="img/news-100x100-2.jpg"
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
                                    <div className="d-flex mb-3">
                                        <img
                                            src="img/news-100x100-3.jpg"
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
                            {/* <div className="mb-3 pb-3">
                                <a href="">
                                    <img className="img-fluid" src="img/news-500x280-4.jpg" alt="" />
                                </a>
                            </div> */}
                            {/* Ads End */}
                            {/* Popular News Start */}
                            {/* <div className="pb-3">
                                <div className="bg-light py-2 px-4 mb-3">
                                    <h3 className="m-0">Tranding</h3>
                                </div>
                                <div className="d-flex mb-3">
                                    <img
                                        src="img/news-100x100-1.jpg"
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
                                <div className="d-flex mb-3">
                                    <img
                                        src="img/news-100x100-2.jpg"
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
                                <div className="d-flex mb-3">
                                    <img
                                        src="img/news-100x100-3.jpg"
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
                                <div className="d-flex mb-3">
                                    <img
                                        src="img/news-100x100-4.jpg"
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
                                <div className="d-flex mb-3">
                                    <img
                                        src="img/news-100x100-5.jpg"
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
                            </div> */}
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

            {/* Popular End*/}

            {/* News With Sidebar End */}
        </>

    )
}
