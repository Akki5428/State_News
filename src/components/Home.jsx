import React, { useEffect, useState } from 'react'
import '../css/style.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FormatDate } from './FormatDate';
import { Loader } from './Loader';

export const Home = () => {
    const [breakingNews, setBreakingNews] = useState([]);
    const [trendingNews, setTrendingNews] = useState([]);
    const [popularNews, setPopularNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state for popular news
    const [popularNewsPage, setPopularNewsPage] = useState(0); // Current page for popular news
    const itemsPerPage = 6; // Number of items per page
    const navigate = useNavigate()


    // Function to fetch live news from API
    const fetchBreakingNews = async () => {
        setIsLoading(true); // Set loading state to true
        try {
            const response = await axios.get("http://127.0.0.1:8000/news/breaking/");
            $(".carousel-item-3").trigger("destroy.owl.carousel");
            $(".carousel-item-1").trigger("destroy.owl.carousel");
            setBreakingNews(response.data.slice(0, 8)); // Get the latest 5 news articles   

            const res = await axios.get("http://127.0.0.1:8000/news/trending/");
            $(".carousel-item-4").trigger("destroy.owl.carousel");
            setTrendingNews(res.data.slice(0, 5)); // Get the latest 5 news articles

            const resp = await axios.get("http://127.0.0.1:8000/news/popular/");
            setPopularNews(resp.data); // Get the latest 6 news articles
            setTimeout(initOwlCarousel, 500);
            setTimeout(initOwlCarouselTre, 500);
            setTimeout(initOwlCarouselsing, 500);

        } catch (error) {
            console.error("Error fetching news:", error);
        }
        finally {
            setIsLoading(false); // Set loading state to false
        }

    };



    useEffect(() => {

        fetchBreakingNews() // Fetch live news initially

    }, [])

    const initOwlCarousel = () => {
        $(".carousel-item-3").owlCarousel("destroy"); // Destroy old instance
        $(".carousel-item-3").owlCarousel({
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
                768: { items: 2 },
                992: { items: 3 }
            }
        });
    };

    const initOwlCarouselTre = () => {
        $(".carousel-item-4").owlCarousel("destroy"); // Destroy old instance
        $(".carousel-item-4").owlCarousel({
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
                768: { items: 2 },
                992: { items: 3 },
                1200: { items: 4 }
            }
        });
        console.log("✅ Owl Carousel reinitialized");
    };

    const initOwlCarouselsing = () => {
        $(".carousel-item-1").owlCarousel("destroy"); // Destroy old instance
        $(".carousel-item-1").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            items: 1,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ]
        });
        console.log("✅ Owl Carousel reinitialized");
    };

    const handleNextPage = () => {
        if ((popularNewsPage + 1) * 6 < popularNews.length) {
            setPopularNewsPage(popularNewsPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (popularNewsPage > 0) {
            setPopularNewsPage(popularNewsPage - 1);
        }
    };


    return (
        <>
            {isLoading && <Loader/>}
            {/* Top News Slider Start */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="owl-carousel owl-carousel-2 carousel-item-3 position-relative">
                        {breakingNews.length > 0 ? (
                            breakingNews.slice(0, 5).map((item, index) => (
                                <div className="d-flex" key={index}>
                                    <img
                                        src={item.images[0]}
                                        style={{ width: 80, height: 80, objectFit: "cover" }}
                                        alt="news"
                                    />
                                    <div
                                        className="d-flex align-items-center bg-light px-3"
                                        style={{
                                            height: 80,
                                            width: 260, // fixed width
                                            overflow: "hidden",
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Link className="text-secondary font-weight-semi-bold" to={`/single/category/${item._id}`} style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {item.title}
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
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
                                {breakingNews.length > 0 ? (
                                    breakingNews.slice(5, 7).map((item, index) => (
                                        <div key={index}
                                            className="position-relative overflow-hidden"
                                            style={{ height: 435 }}
                                        >
                                            <img
                                                className="img-fluid h-100"
                                                src={item.images[0]}
                                                style={{ objectFit: "cover" }}
                                                alt='News'
                                            />
                                            <div className="overlay">
                                                <div className="mb-1">
                                                    <Link className="text-white" to={`/category/${item.category}`}>
                                                        {item.category}
                                                    </Link>
                                                    <span className="px-2 text-white">/</span>
                                                    <span className="text-white" href="#">
                                                        {FormatDate(item.news_date)}
                                                    </span>
                                                </div>
                                                <Link className="h2 m-0 text-white font-weight-bold" to={`/single/category/${item._id}`}>
                                                    {item.title}
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        </div>

                        {/* Category Choosing bar */}
                        <div className="col-lg-4">
                            <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                                <h3 className="m-0">Categories</h3>
                                <Link
                                    className="text-secondary font-weight-medium text-decoration-none"
                                    to="/categories"
                                >
                                    View All
                                </Link>
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
                                <Link
                                    to="/category/Business"
                                    className="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none"
                                >
                                    Business
                                </Link>
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
                                <Link
                                    to="/category/Technology"
                                    className="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none"
                                >
                                    Technology
                                </Link>
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
                                <Link
                                    to="/category/Entertainment"
                                    className="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none"
                                >
                                    Entertainment
                                </Link>
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
                                <Link
                                    to="/category/Sports"
                                    className="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none"
                                >
                                    Sports
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main News Slider End */}

            {/* Trending   */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                        <h3 className="m-0">Trending</h3>
                        <Link
                            className="text-secondary font-weight-medium text-decoration-none"
                            to="/manynews/yes/no/category"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="owl-carousel owl-carousel-2 carousel-item-4 position-relative">
                        {trendingNews.length > 0 ? (
                            trendingNews.map((news, index) => (
                                <div key={index} className="position-relative overflow-hidden" style={{ height: 300 }}>
                                    <img className="img-fluid w-100 h-100" src={news.images[0]} style={{ objectFit: "cover" }} alt="News" />
                                    <div className="overlay">
                                        <div className="mb-1" style={{ fontSize: 13 }}>
                                            <Link className="text-white" to={`/category/${news.category}`}>{news.category}</Link>
                                            <span className="px-1 text-white">/</span>
                                            <a className="text-white" href="#">{new Date(news.news_date).toDateString()}</a>
                                        </div>
                                        <Link className="h4 m-0 text-white" style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }} to={`/single/category/${news._id}`}>{news.title}</Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center w-100 text-secondary">Loading trending news...</div>
                        )}


                    </div>
                </div>
            </div>
            {/* Trending end  */}

            {/* Popular */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                                        <h3 className="m-0">Popular</h3>
                                        <Link
                                            className="text-secondary font-weight-medium text-decoration-none"
                                            to="/manynews/no/yes/category"
                                        >
                                            View All
                                        </Link>
                                    </div>
                                </div>

                                {/* First 2 news items with large images and descriptions */}
                                {popularNews
                                    .slice(popularNewsPage * 6, popularNewsPage * 6 + 2)
                                    .map((news) => (
                                        <div className="col-lg-6" key={news.id}>
                                            <div className="position-relative mb-3">
                                                <img
                                                    className="img-fluid w-100"
                                                    src={news.images[0]}
                                                    style={{ objectFit: "cover", height: 200 }}
                                                    alt="News"
                                                />
                                                <div className="bg-light p-3" style={{ height: 180 }}>
                                                    <div className="mb-2" style={{ fontSize: 14 }}>
                                                        <Link to={`/category/${news.category}`}>{news.category}</Link>
                                                        <span className="px-1">/</span>
                                                        <span>{FormatDate(news.news_date)}</span>
                                                    </div>
                                                    <Link
                                                        className="h4"
                                                        to={`/single/category/${news._id}`}
                                                        style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 3,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                    >
                                                        {news.title}
                                                    </Link>
                                                    <p className="m-0">{news.content.slice(0, 50)}...</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                {/* Last 4 news items with only small images and titles */}
                                {popularNews
                                    .slice(popularNewsPage * 6 + 2, popularNewsPage * 6 + 6)
                                    .map((news) => (
                                        <div className="col-lg-6" key={news.id}>
                                            <div className="d-flex mb-3">
                                                <img
                                                    src={news.images[0]}
                                                    style={{ width: 100, height: 100, objectFit: "cover" }}
                                                    alt="News"
                                                />
                                                <div
                                                    className="w-100 d-flex flex-column justify-content-center bg-light px-3"
                                                    style={{ height: 100 }}
                                                >
                                                    <div className="mb-1" style={{ fontSize: 13 }}>
                                                        <Link to={`/category/${news.category}`}>{news.category}</Link>
                                                        <span className="px-1">/</span>
                                                        <span>{FormatDate(news.news_date)}</span>
                                                    </div>
                                                    <Link
                                                        className="h6 m-0"
                                                        to={`/single/category/${news._id}`}
                                                        style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                    >
                                                        {news.title}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                {/* Pagination buttons */}
                                <div className="col-12 d-flex justify-content-between mt-3">
                                    <button
                                        className="btn btn-danger"
                                        onClick={handlePreviousPage}
                                        disabled={popularNewsPage === 0}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleNextPage}
                                        disabled={(popularNewsPage + 1) * 6 >= popularNews.length}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
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
                                        Just Sign up and get news related notification from our website
                                    </p>
                                    <div className="input-group d-flex justify-content-center mt-3" style={{ width: "100%" }}>
                                        <div className="input-group-append">
                                            <button className="btn btn-primary px-5 py-2 fs-5" onClick={() => { navigate("/signup") }}>Sign Up</button>
                                        </div>
                                    </div>
                                    <small>Very Easy Signup Process</small>
                                </div>
                            </div>
                            {/* Newsletter End */}
                            {/* Tags Start */}
                            <div className="pb-3">
                                <div className="bg-light py-2 px-4 mb-3">
                                    <h3 className="m-0">Tags</h3>
                                </div>
                                <div className="d-flex flex-wrap m-n1">
                                    <Link to="/category/Politics" className="btn btn-sm btn-outline-secondary m-1">
                                        Politics
                                    </Link>
                                    <Link to="/category/Sports" className="btn btn-sm btn-outline-secondary m-1">
                                        Sports
                                    </Link>
                                    <Link to="/category/Entertainment" className="btn btn-sm btn-outline-secondary m-1">
                                        Entertainment
                                    </Link>
                                    <Link to="/category/Lifestyle" className="btn btn-sm btn-outline-secondary m-1">
                                        Lifestyle
                                    </Link>
                                    <Link to="/category/Technology" className="btn btn-sm btn-outline-secondary m-1">
                                        Technology
                                    </Link>
                                    <Link to="/category/Business" className="btn btn-sm btn-outline-secondary m-1">
                                        Business
                                    </Link>
                                    <Link to="/category/Health" className="btn btn-sm btn-outline-secondary m-1">
                                        Health
                                    </Link>
                                    <Link to="/category/Science" className="btn btn-sm btn-outline-secondary m-1">
                                        Science
                                    </Link>
                                    <Link to="/category/Education" className="btn btn-sm btn-outline-secondary m-1">
                                        Education
                                    </Link>
                                    <Link to="/category/World" className="btn btn-sm btn-outline-secondary m-1">
                                        World
                                    </Link>
                                    <Link to="/category/Food" className="btn btn-sm btn-outline-secondary m-1">
                                        Food
                                    </Link>
                                    <Link to="/category/Finance" className="btn btn-sm btn-outline-secondary m-1">
                                        Finance
                                    </Link>

                                </div>
                            </div>
                            {/* Tags End */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular End*/}

        </>

    )
}
