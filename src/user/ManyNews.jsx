import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FormatDate } from '../components/FormatDate'

export const ManyNews = () => {
    const [newsFirst, setNewsFirst] = useState([])
    const [newsSecond, setNewsSecond] = useState([])
    const [currentPage, setCurrentPage] = useState(1) // Pagination state
    const navigate = useNavigate()

    const { isTrend, isPop, val } = useParams()

    const fetchNews = async () => {
        const pop = await axios.get("http://127.0.0.1:8000/news/popular/")
        const trend = await axios.get("http://127.0.0.1:8000/news/trending/")
        $(".carousel-item-2").trigger("destroy.owl.carousel");
        if (isTrend == "yes") {
            setNewsFirst(trend.data)
            setNewsSecond(pop.data)
        }
        else {
            setNewsFirst(pop.data)
            setNewsSecond(trend.data)
        }
    }

    const handleNextPage = () => {
        if (currentPage * 14 < newsFirst.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        fetchNews();

    }, [])

    const startIndex = (currentPage - 1) * 14;
    const bigNews = newsFirst.slice(startIndex, startIndex + 4);
    const smallNews = newsFirst.slice(startIndex + 4, startIndex + 14);

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
                            {newsFirst.length > 0 ? (isPop == "yes" ? "Popular" : "Trending") : "Loading..."}
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
                                        <h3 className="m-0">{newsFirst.length > 0 ? (isPop == "yes" ? "Popular" : "Trending") : "Loading..."}</h3>
                                    </div>
                                </div>
                                {bigNews.length > 0 ? (
                                    bigNews.map((item, index) => (
                                        <div className="col-lg-6" key={index}>
                                            <div className="position-relative mb-3">
                                                <img
                                                    className="img-fluid w-100"
                                                    src={item.images[0]}
                                                    style={{ objectFit: "cover", height: 170 }}
                                                    alt="News"
                                                />
                                                <div className="overlay position-relative bg-light justify-content-start" style={{ height: 250 }}>
                                                    <div className="mb-2" style={{ fontSize: 14 }}>
                                                        {val == "category" ?
                                                            (
                                                                <Link to={`/category/${item.category}`}>{item.category || "Technology"}</Link>
                                                            ) :
                                                            (
                                                                <>
                                                                    <Link to={`/state/state/${item.state._id}`}>{item.state.name || "Gujarat"}</Link>
                                                                    <span className="px-1">/</span>
                                                                    <Link to={`/state/city/${item.city._id}`}>{item.city.name || "Ahmedabad"}</Link>
                                                                </>

                                                            )}

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
                                                        WebkitLineClamp: 6,
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
                                {smallNews.length > 0 ? (
                                    smallNews.map((item, index) => (
                                        <div className="col-lg-6" key={index + 4}>
                                            <div className="d-flex mb-3">
                                                <img
                                                    src={item.images[0]}
                                                    style={{ width: 100, height: 100, objectFit: "cover" }}
                                                    alt="News"
                                                />
                                                <div
                                                    className="w-100 d-flex flex-column justify-content-center bg-light px-3"
                                                    style={{ height: 100 }}
                                                >
                                                    <div className="mb-1" style={{ fontSize: 13 }}>
                                                        {val == "category" ?
                                                            (
                                                                <Link to={`category/${item.category}`}>{item.category || "Technology"}</Link>
                                                            ) :
                                                            (
                                                                <>
                                                                    <Link to={`/state/state/${item.state._id}`}>{item.state.name || "Gujarat"}</Link>
                                                                </>

                                                            )}
                                                        <span className="px-1">/</span>
                                                        <span>{FormatDate(item.news_date) || "January 01, 2045"}</span>
                                                    </div>
                                                    <Link className="h6 m-0" to={`/single/category/${item._id}`} style={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}>
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
                            <div className="d-flex justify-content-between mt-3">
                                <button
                                    className="btn btn-danger"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleNextPage}
                                    disabled={currentPage * 14 >= newsFirst.length}
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

                            {/* Ads Start */}
                            <div className="mb-3 pb-3">
                                <a href="">
                                    <img className="img-fluid"
                                        src={`/img/news-500x280-4.jpg?v=${new Date().getTime()}`}
                                        alt="" />
                                </a>
                            </div>
                            {/* Ads End */}

                            {/* Popular News Start */}
                            <div className="pb-3">
                                <div className="bg-light py-2 px-4 mb-3">
                                    <h3 className="m-0">{isPop == "yes" ? "Trending" : "Popular"}</h3>
                                </div>
                                {newsSecond.length > 0 ? (
                                    newsSecond.slice(0, 5).map((item, index) => (
                                        <div className="d-flex mb-3" key={index}>
                                            <img
                                                // src={`/img/news-100x100-1.jpg?v=${new Date().getTime()}`}
                                                src={item.images[0]}
                                                style={{ width: 100, height: 100, objectFit: "cover" }}
                                                alt="Trending News"
                                            />
                                            <div
                                                className="w-100 d-flex flex-column justify-content-center bg-light px-3"
                                                style={{ height: 100 }}
                                            >
                                                <div className="mb-1" style={{ fontSize: 13 }}>
                                                    {val == "category" ?
                                                        (
                                                            <Link to={`/category/${item.category}`}>{item.category || "Technology"}</Link>
                                                        ) :
                                                        (
                                                            <>
                                                                <Link to={`/state/state/${item.state._id}`}>{item.state.name || "Gujarat"}</Link>
                                                            </>

                                                        )}

                                                    {/* <a href="">{item.category || "Technology"}</a> */}
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
            {/* News With Sidebar End */}
        </>

    )
}
