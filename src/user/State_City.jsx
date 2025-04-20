import React, { useEffect, useState } from 'react'
import '../css/style.css'
import axios from 'axios';
import { FormatDate } from '../components/FormatDate';
import { Link, useNavigate } from 'react-router-dom';

export const State_City = () => {
    const [breakingNews, setBreakingNews] = useState([]);
    const [trendingNews, setTrendingNews] = useState([]);
    const [popularNews, setPopularNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // Track the current page
    const navigate = useNavigate()

    const itemsPerPage = 6; // 2 big + 4 small news items per page

    const handleNextPage = () => {
        if ((currentPage + 1) * itemsPerPage < popularNews.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const paginatedNews = popularNews.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // Function to fetch live news from API
    const fetchBreakingNews = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/news/breaking/");
            $(".carousel-item-3").trigger("destroy.owl.carousel");
            setBreakingNews(response.data.slice(0, 5)); // Get the latest 5 news articles   

            const res = await axios.get("http://127.0.0.1:8000/news/trending/");
            $(".carousel-item-4").trigger("destroy.owl.carousel");
            setTrendingNews(res.data.slice(0, 5)); // Get the latest 5 news articles

            const resp = await axios.get("http://127.0.0.1:8000/news/popular/");
            setPopularNews(resp.data); // Get the latest 6 news articles
            setTimeout(initOwlCarousel, 500);
            setTimeout(initOwlCarouselTre, 500);

        } catch (error) {
            console.error("Error fetching news:", error);
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
    };


    return (
        <>
            {/* Trending   */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                        <h3 className="m-0">Trending</h3>
                        <Link
                            className="text-secondary font-weight-medium text-decoration-none"
                            to="/manynews/yes/no/state"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="owl-carousel owl-carousel-2 carousel-item-4 position-relative">
                        {trendingNews.length > 0 ? (
                            trendingNews.map((news, index) => (
                                <div key={index} className="position-relative overflow-hidden" style={{ height: 300 }}>
                                    <img className="img-fluid w-100 h-100"
                                        src={news.images[0]}
                                        style={{ objectFit: "cover" }} alt="News" />
                                    <div className="overlay">
                                        <div className="mb-1" style={{ fontSize: 13 }}>
                                            <Link className="text-white" to={`/state/state/${news.stateId}`}>{news.state?.name}</Link>
                                            <span className="px-1 text-white">/</span>
                                            <Link className="text-white" to={`/state/city/${news.cityId}`}>{news.city?.name}</Link>
                                            <span className="px-1 text-white">/</span>
                                            <span className="text-white" >{new Date(news.news_date).toDateString()}</span>
                                        </div>
                                        <Link className="h4 m-0 text-white" href="#" style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }} to={`/single/state/${news._id}`}>{news.title}</Link>
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
                                            to="/manynews/no/yes/state"
                                        >
                                            View All
                                        </Link>
                                    </div>
                                </div>

                                {/* First 2 news items with large images and descriptions */}
                                {paginatedNews.slice(0, 2).map((news) => (
                                    <div className="col-lg-6" key={news.id}>
                                        <div className="position-relative mb-3">
                                            <img className="img-fluid w-100"
                                                src={news.images[0]}
                                                style={{ objectFit: "cover", height: 170 }} alt='News' />
                                            <div className="overlay position-relative bg-light justify-content-start" style={{ height: 220 }}>
                                                <div className="mb-2" style={{ fontSize: 14 }}>
                                                    <Link to={`/state/state/${news.state?._id}`}>{news.state?.name}</Link>
                                                    <span className="px-1">/</span>
                                                    <Link to={`/state/city/${news.city?._id}`}>{news.city?.name}</Link>
                                                    <span className="px-1">/</span>
                                                    <span>{FormatDate(news.news_date)}</span>
                                                </div>
                                                <Link className="h4" to={`/single/state/${news._id}`} style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>{news.title}</Link>
                                                <p className="m-0" style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>{news.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Last 4 news items with only small images and titles */}
                                {paginatedNews.slice(2, 6).map((news) => (
                                    <div className="col-lg-6" key={news.id}>
                                        <div className="d-flex mb-3">
                                            <img
                                                src={news.images[0]}
                                                style={{ width: 100, height: 100, objectFit: "cover" }} />
                                            <div className="w-100 d-flex flex-column justify-content-center bg-light px-3" style={{ height: 100 }}>
                                                <div className="mb-1" style={{ fontSize: 13 }}>
                                                    <Link to={`/state/state/${news.stateId}`}>{news.state.name}</Link>
                                                    <span className="px-1">/</span>
                                                    <span>{FormatDate(news.news_date)}</span>
                                                </div>
                                                <Link className="h6 m-0" to={`/single/category/${news._id}`} style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>{news.title}</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Buttons */}
                            <div className="d-flex justify-content-between">
                                <button
                                    className="btn btn-danger"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 0}
                                >
                                    Previous
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleNextPage}
                                    disabled={(currentPage + 1) * itemsPerPage >= popularNews.length}
                                >
                                    Next
                                </button>
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
