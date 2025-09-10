import React from "react";
import { Link } from "react-router-dom";

const Home = ({ articles }) => {
  const bannerImages = [1, 2, 3, 4, 5];

  return (
    <>
      {/* Slider Section */}
      <section id="slider-part" className="slider-active">
        <div className="single-slider fixed-slider">
          <video autoPlay muted loop playsInline className="video-background">
            <source src="/Uploads/Videos/banner_video.webm" type="video/webm" />
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
                <h5>Our News</h5>
                <h2>Featured News</h2>
              </div>
            </div>
          </div>

          <div className="row course-slied mt-10">
            {articles.map((art) => (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-4"
                key={art.id}
              >
                <div className="singel-course mt-30">
                  <div className="thum">
                    <div className="image">
                      <img
                        src={art.image}
                        alt="Article Thumbnail"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="cont">
                    <small>
                      <i className="fa fa-calendar"></i> {art.date}
                    </small>
                    <Link to={`/view-article/${art.id}`}>
                      <p className="text-success1 mt-2">
                        <b>{art.safe_title}</b>
                      </p>
                    </Link>
                    <p
                      className="mt-2"
                      style={{ textAlign: "justify" }}
                      dangerouslySetInnerHTML={{ __html: art.excerpt }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt-3">
            <div className="col-12 text-center">
              <Link to="/view-more-article" className="btn btn-outline-success">
                <i className="fa fa-refresh"></i> More News
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
