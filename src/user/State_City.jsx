import React, { useEffect, useState } from 'react'
import '../css/style.css'
import axios from 'axios';
import { FormatDate } from '../components/FormatDate';
import { Link } from 'react-router-dom';

export const State_City = () => {
  const [breakingNews, setBreakingNews] = useState([]);
      const [trendingNews, setTrendingNews] = useState([]);
      const [popularNews, setPopularNews] = useState([]);
  
  
      // Function to fetch live news from API
      const fetchBreakingNews = async () => {
          try {
              const response = await axios.get("http://127.0.0.1:8000/news/breaking/");
              // const sortedNews = response.data.sort((a, b) => new Date(b.news_date) - new Date(a.news_date));
              $(".carousel-item-3").trigger("destroy.owl.carousel");
              // setBreakingNews(sortedNews.slice(0, 5)); // Get the latest 5 news articles
              setBreakingNews(response.data.slice(0, 5)); // Get the latest 5 news articles   
  
              const res = await axios.get("http://127.0.0.1:8000/news/trending/");
              // const sortNews = res.data.sort((a, b) => new Date(b.news_date) - new Date(a.news_date));
              $(".carousel-item-4").trigger("destroy.owl.carousel");
              setTrendingNews(res.data.slice(0, 5)); // Get the latest 5 news articles
              // setTrendingNews(sortNews.slice(0, 5)); // Get the latest 5 news articles
              // console.log(response)
              // console.log(sortedNews)
              // console.log(res)
              // console.log(sortNews)
  
              const resp = await axios.get("http://127.0.0.1:8000/news/popular/");
              // const sortNews = res.data.sort((a, b) => new Date(b.news_date) - new Date(a.news_date));
              setPopularNews(resp.data.slice(0, 6)); // Get the latest 6 news articles
              setTimeout(initOwlCarousel, 500);
              setTimeout(initOwlCarouselTre, 500);
            //   console.log(res.data[0].state.name)
  
          } catch (error) {
              console.error("Error fetching news:", error);
          }
      };
  
  
  
      useEffect(() => {
  
          fetchBreakingNews() // Fetch live news initially
  
  
          // const newsInterval = setInterval(() => {
          //   fetchLiveNews();
          // }, 3600000);
          // Fetch new live news every 1 hour
  
          // return () => clearInterval(newsInterval);
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
          // console.log("✅ Owl Carousel reinitialized");
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
  
  
  
      return (
          <>
              {/* Top News Slider Start */}
              {/* <div className="container-fluid py-3">
                  <div className="container">
                      <div className="owl-carousel owl-carousel-2 carousel-item-3 position-relative">
                          {breakingNews.length > 0 ? (
                              breakingNews.map((item, index) => (
                                  <div className="d-flex" key={index}>
                                    
                                      <img
                                          src="img/news-80x80-1.jpg"
                                          style={{ width: 80, height: 80, objectFit: "cover" }}
                                          alt="news"
                                      />
                                      <div
                                          className="d-flex align-items-center bg-light px-3"
                                          style={{ height: 80 }}
                                      >
                                          <a className="text-secondary font-weight-semi-bold" href={item.url}>
                                              {item.title}
                                          </a>
                                      </div>
                                  </div>
                              ))
                          ) : (
                              <p>Loading...</p>
                          )}
                      </div>
                  </div>
              </div> */}
              {/* Top News Slider End */}
  
              {/* Main News Slider Start */}
              {/* <div className="container-fluid py-3">
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
              </div> */}
              {/* Main News Slider End */}
  
              {/* Trending   */}
              <div className="container-fluid py-3">
                  <div className="container">
                      <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                          <h3 className="m-0">Trending</h3>
                          <a
                              className="text-secondary font-weight-medium text-decoration-none"
                              href=""
                          >
                              View All
                          </a>
                      </div>
                      <div className="owl-carousel owl-carousel-2 carousel-item-4 position-relative">
                          {trendingNews.length > 0 ? (
                              trendingNews.map((news, index) => (
                                  <div key={index} className="position-relative overflow-hidden" style={{ height: 300 }}>
                                      <img className="img-fluid w-100 h-100" 
                                    //   src={news.image_url}
                                        src={`/img/news-300x300-1.jpg?v=${new Date().getTime()}`}
                                       style={{ objectFit: "cover" }} alt="News" />
                                      <div className="overlay">
                                          <div className="mb-1" style={{ fontSize: 13 }}>
                                              <a className="text-white" href="#">{news.state.name}</a>
                                              <span className="px-1 text-white">/</span>
                                              <a className="text-white" href="#">{news.city.name}</a>
                                              <span className="px-1 text-white">/</span>
                                              <a className="text-white" href="#">{new Date(news.news_date).toDateString()}</a>
                                          </div>
                                          <Link className="h4 m-0 text-white" href="#" style={{
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
                                          <a
                                              className="text-secondary font-weight-medium text-decoration-none"
                                              href=""
                                          >
                                              View All
                                          </a>
                                      </div>
                                  </div>
  
                                  {/* First 2 news items with large images and descriptions */}
                                  {popularNews.slice(0, 2).map((news) => (
                                      <div className="col-lg-6" key={news.id}>
                                          <div className="position-relative mb-3">
                                              <img className="img-fluid w-100" src="img/news-500x280-1.jpg" style={{ objectFit: "cover" , height:170}} alt='News' />
                                              <div className="overlay position-relative bg-light" style={{ height: 220 }}>
                                                  <div className="mb-2" style={{ fontSize: 14 }}>
                                                      <a href="">{news.state.name}</a>
                                                      <span className="px-1">/</span>
                                                      <span>{FormatDate(news.news_date)}</span>
                                                  </div>
                                                  <Link className="h4" to={`/single/category/${news._id}`} style={{
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
                                  {popularNews.slice(2, 6).map((news) => (
                                      <div className="col-lg-6" key={news.id}>
                                          <div className="d-flex mb-3">
                                              <img src="img/news-80x80-4.jpg" style={{ width: 100, height: 100, objectFit: "cover" }} />
                                              <div className="w-100 d-flex flex-column justify-content-center bg-light px-3" style={{ height: 100 }}>
                                                  <div className="mb-1" style={{ fontSize: 13 }}>
                                                      <a href="">{news.state.name}</a>
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
  
          </>
  
      )
}
