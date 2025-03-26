import React, { useEffect, useState } from 'react'
import "../css/Topbar.css"
import axios from 'axios';



export const Topbar = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [liveNews, setLiveNews] = useState([]);

  // Function to get the current day and date in "Monday, January 01, 2045" format
  const updateDate = () => {
    const options = { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));
  };

  // Function to fetch live news from API
  const fetchLiveNews = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/news/published/");
      const sortedNews = response.data.sort((a, b) => new Date(b.news_date) - new Date(a.news_date));
      $(".tranding-carousel").trigger("destroy.owl.carousel");
      setLiveNews(sortedNews.slice(0, 3)); // Get the latest 3 news articles
      // console.log(response)
      // console.log(sortedNews)
      setTimeout(initOwlCarousel, 500);

    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };



  useEffect(() => {
    updateDate()
    fetchLiveNews(); // Fetch live news initially


    // const newsInterval = setInterval(() => {
    //   fetchLiveNews();
    // }, 3600000);
    // Fetch new live news every 1 hour

    // return () => clearInterval(newsInterval);
  }, [])

  const initOwlCarousel = () => {
    $(".tranding-carousel").owlCarousel("destroy"); // Destroy old instance
    $(".tranding-carousel").owlCarousel({
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 2000,
      items: 1,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="fa fa-angle-left"></i>',
        '<i class="fa fa-angle-right"></i>'
      ]
    });
    // console.log("✅ Owl Carousel reinitialized");
  };


  return (

    <div className="container-fluid">
      <div className="row align-items-center bg-light px-lg-5">
        <div className="col-12 col-md-8">
          <div className="d-flex justify-content-between">
            <div className="text-center mr-auto py-3">
              <div className="glow-circle" />
            </div>
            <div className="text-black text-center py-2" style={{ width: 100 }}>
              Live
            </div>
            <div
              className="owl-carousel owl-carousel-1 tranding-carousel position-relative d-inline-flex align-items-center ml-3"
              style={{ width: "calc(100% - 100px)", paddingLeft: 90 }}
            >
              {liveNews.length > 0 ? (
                liveNews.map((news, index) => (
                  <div key={index} className="text-truncate">
                    <a className="text-secondary" href="" >
                      {news.title}
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-truncate">Loading latest news...</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4 text-right d-none d-md-block">
          {currentDate}
        </div>
      </div>
      <div className="row align-items-center py-2 px-lg-5">
        <div className="col-lg-4">
          <a href="" className="navbar-brand d-none d-lg-block">
            <h1 className="m-0 display-5 text-uppercase">
              <span className="text-primary">State</span>Buzz
            </h1>
          </a>

        </div>
        <div className="col-lg-8 text-center text-lg-right">
          <img className="img-fluid" src="img/ads-700x70.jpg" alt="" />
        </div>
      </div>
    </div>

  )
}
