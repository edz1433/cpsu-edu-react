import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";

const Home = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const bannerImages = [1, 2, 3, 4, 5];

  const partners = {
    1: "https://ched.gov.ph/",
    2: "https://www.foi.gov.ph/",
    3: "https://www.dbm.gov.ph/",
    5: "https://cpsu.edu.ph/content/86",
    4: "https://pasuc.org.ph/",
    6: "https://notices.philgeps.gov.ph/",
    7: "https://aaccup.com/",
  };

  const API_TOKEN = "$2a$12$LWAfyhnpYq2lrDJlsm3YA.25ivExQynX9LghVXoVinHCTf.38cQUe";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/news`,
          {},
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        setNewsList(data.data || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Slick slider settings for Featured News
  const newsSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  // Slick slider settings for Partner Logos
  const partnerSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <>
      {/* Slider Section */}
      <section id="slider-part" className="slider-active">
        <div className="single-slider fixed-slider">
          <video autoPlay muted loop playsInline className="video-background">
            <source src="/Uploads/page-banner/banner_video.webm" type="video/webm" />
          </video>
          <div className="slider-cont"></div>
        </div>

        {bannerImages.map((i) => (
          <div className="single-slider" key={i}>
            <img
              src={`/Uploads/page-banner/banner-${i}.jpg`}
              alt={`Banner ${i}`}
              className="slider-image"
            />
            <div className="slider-cont"></div>
          </div>
        ))}
      </section>

      {/* Featured News Section */}
      <section id="course-part" className="pt-115 pb-120 gray-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-title pb-45">
                <h5 className="main-color">Our News</h5>
                <h2>Featured News</h2>
              </div>
            </div>
          </div>

          <div className="row course-slied mt-10">
            {loading ? (
              <div className="col-12 text-center">
                <p>Loading news...</p>
              </div>
            ) : newsList.length > 0 ? (
              <Slider {...newsSettings} className="col-12">
                {newsList.map((news) => ( 
                  <div key={news.id} className="px-2">
                    <div className="col-12">
                      <div className="singel-course mt-30">
                        <div className="thum">
                          <div className="image">
                            <img
                              src={news.image || "/placeholder.jpg"}
                              alt={news.safe_title}
                              className="img-fluid"
                            />
                          </div>
                        </div>
                        <div className="cont">
                          <small>
                            <i className="fa fa-calendar"></i> {news.date}
                          </small>
                          <Link to="/news" state={{ newsId: news.id }}>
                            <p className="main-color mt-2">
                              <b>{news.safe_title}</b>
                            </p>
                          </Link>
                            <p className="mt-2" style={{ textAlign: "justify" }}>
                              <span style={{ whiteSpace: "normal" }}>
                                <span dangerouslySetInnerHTML={{ __html: news.excerpt }} />
                                <Link
                                  to="/news"
                                  state={{ newsId: news.id }}
                                  className="read-more-link main-color"
                                  style={{ display: "inline" }} // ensure no line break
                                >
                                  Read More
                                </Link>
                              </span>
                            </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="col-12 text-center">
                <p>No news found.</p>
              </div>
            )}
          </div>

          <div className="row mt-3">
            <div className="col-12 text-center">
              <Link to="/view-more-news" className="btn btn-outline-success">
                <i className="fa fa-refresh"></i> More News
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-page" className="pt-70 pb-110 bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-6 col-lg-7">
              <div className="about-image mt-50 hover-effect">
                <Link to="">
                  <img
                    src="./Uploads/images/academic calendar.jpg"
                    alt="calendar"
                    className="img-fluid"
                  />
                </Link>
              </div>
            </div>
            <div className="col-6 col-lg-5">
              <div className="about-image hover-effect">
                <Link to="">
                  <img
                    src="./Uploads/images/hiring logo.png"
                    alt="hiring"
                    className="img-fluid"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="testimonial"
        className="pt-115 pb-115"
        style={{
          backgroundImage: "url('/Uploads/images/s-12.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="hive-container">
            <div className="row-hive row1">
              <div className="hex planning hive-white">
                <div><h4></h4><span></span></div>
              </div>
              <div className="hex qs">
                <div><h4></h4><span></span></div>
              </div>
              <div className="hex audit">
                <div><h4></h4><span></span></div>
              </div>
            </div>

            <div className="row-hive offset">
              <div className="hex admin">
                <div><h4></h4><span></span></div>
              </div>
              <div className="hex the">
                <div><h4></h4><span></span></div>
              </div>
              <div className="hex uigreen">
                <div><h4></h4><span></span></div>
              </div>
              <div className="hex rnd">
                <div>
                  <h3>CPSU SECURES 105TH SPOT IN THE WURI RANKING 2025</h3><span></span>
                </div>
              </div>
            </div>

            <div className="row-hive row3">
              <div
                className="hex"
                  style={{
                    backgroundImage: "url('https://cpsu.edu.ph/images/cpsu-iso.png')",
                  }}
                >
                <div><h4></h4><span></span></div>
              </div>
              <div className="hex it"
              >
                <div><h4></h4><span></span></div>
              </div>
              <div className="hex wuri">
                <div><h4></h4><span></span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section
        id="testimonial"
        className="pb-10"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="hive-container">
            {/* Hive rows unchanged */}
          </div>
        </div>
      </section>

      {/* Partner Logos Slider */}
      <section id="patnar-logo" className="pt-40 pb-80 gray-bg">
        <div className="container">
          <Slider {...partnerSettings}>
            {Object.entries(partners).map(([i, link]) => (
              <div key={i} className="col-auto logo-col text-center">
                {link !== "#" ? (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`/Uploads/images/patnar-logo/${i}.png`}
                      alt={`Logo ${i}`}
                      className="patnar-img small-logo"
                    />
                  </a>
                ) : (
                  <img
                    src={`/Uploads/images/patnar-logo/${i}.png`}
                    alt={`Logo ${i}`}
                    className="patnar-img small-logo"
                  />
                )}
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Home;
