import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const News = () => {
  const location = useLocation();
  const { newsId } = location.state || {};

  const [article, setArticle] = useState({});
  const [allImages, setAllImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [content, setContent] = useState("");
  const [recentNews, setRecentNews] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const API_TOKEN = "$2a$12$LWAfyhnpYq2lrDJlsm3YA.25ivExQynX9LghVXoVinHCTf.38cQUe";
  
  useEffect(() => {
    if (newsId) {
      fetchArticle(newsId);
    }
    fetchRecentNews();
  }, [newsId]);

  // ✅ Fetch single article
  const fetchArticle = async (id) => {
    try {
   const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/news-preview/${id}`,
        {}, // empty body if you have nothing to send
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      const data = res.data;
      const articleData = data.article || data;

      // Thumbnail first, then extra images
      const images = [
        articleData.thumbnail_base64,
        ...(articleData.images_base64 || []),
      ].filter(Boolean);

      setArticle(articleData);
      setContent(articleData.content_text);
      setAllImages(images);
      setCurrentSlide(0);

      // Fetch related NEWS by category and exclude current
      fetchRelatedNews(articleData.id, articleData.category, articleData.title);
    } catch (error) {
      console.error("Failed to fetch article:", error);
    }
  };
  const fetchRecentNews = async () => {
          try {
            const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/news`,
        {}, // empty body if you have nothing to send
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`, // your token here
          },
        }
      );

      setRecentNews(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch recent news:", error);
      setRecentNews([]);
    }
  };

  // ✅ Fetch related NEWS (category first, fallback title)
  const fetchRelatedNews = async (excludeId, category = null, title = null) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/related-news`,
        { exclude_id: excludeId, category, title }, // request body
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`, // your API token
          },
        }
      );

      setRelatedNews(res.data || []);
    } catch (error) {
      console.error("Failed to fetch related news:", error);
      setRelatedNews([]);
    }
  };

  // ✅ Slider navigation
  const showSlide = (index) => {
    if (allImages.length === 0) return;
    if (index < 0) index = allImages.length - 1;
    if (index >= allImages.length) index = 0;
    setCurrentSlide(index);
  };

  return (
    <section
      className="pt-40 pb-120"
      style={{
        backgroundImage: `url('/images/bg-article.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "30px",
      }}
    >
      <div className="container">
        <div className="row">
          {/* LEFT ARTICLE */}
          <div className="col-lg-8">
            <div className="corses-singel-left" style={{ backgroundColor: "transparent" }}>
              {/* IMAGE SLIDER */}
              {allImages.length > 0 && (
                <div className="image-slider-container position-relative mb-3">
                  <i
                    className="slider-arrow arrow-left fa fa-chevron-left"
                    onClick={() => showSlide(currentSlide - 1)}
                    style={{
                      position: "absolute",
                      top: "45%",
                      left: "10px",
                      cursor: "pointer",
                      fontSize: "24px",
                      color: "#fff",
                      textShadow: "0 0 5px rgba(0,0,0,0.5)",
                      zIndex: 2,
                    }}
                  />
                  <div className="tab-content">
                    {allImages.map((img, index) => (
                      <div
                        key={index}
                        className={`tab-pane fade ${currentSlide === index ? "show active" : ""}`}
                        style={{ textAlign: "center" }}
                      >
                        <img
                          src={img}
                          alt={`Slide ${index + 1}`}
                          className="img-fluid"
                          style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                  <i
                    className="slider-arrow arrow-right fa fa-chevron-right"
                    onClick={() => showSlide(currentSlide + 1)}
                    style={{
                      position: "absolute",
                      top: "45%",
                      right: "10px",
                      cursor: "pointer",
                      fontSize: "24px",
                      color: "#fff",
                      textShadow: "0 0 5px rgba(0,0,0,0.5)",
                      zIndex: 2,
                    }}
                  />
                </div>
              )}

              {/* TITLE & DATE */}
              <div className="title mt-2 mb-2">
                <h4>{article.safe_title || article.title}</h4>
                <p style={{ fontSize: "14px" }}>
                  {article.date} | {article.category}
                </p>
              </div>

              {/* CONTENT */}
              <div dangerouslySetInnerHTML={{ __html: content }} />

              {/* RELATED NEWS */}
              {relatedNews.length > 0 && (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="releted-courses pt-4">
                      <div className="row g-3">
                        <div className="col-12 mb-2">
                          <h5 className="fw-bold">RELATED NEWS</h5>
                        </div>

                        {relatedNews.map((news) => {
                          const thumbnail =
                            news.image && news.image.trim() !== ""
                              ? news.image
                              : "/default-thumbnail.png";

                          return (
                            <div className="col-md-4 col-sm-6" key={news.id}>
                              <div className="singel-course h-100 border rounded shadow-sm overflow-hidden" style={{ background: "#fff" }}>
                                <Link to="/news" state={{ newsId: news.id }}>
                                  <img
                                    src={thumbnail}
                                    alt={news.safe_title || news.title}
                                    className="img-fluid w-100"
                                    style={{ height: "160px", objectFit: "cover" }}
                                  />
                                </Link>
                                <div className="cont p-3">
                                  <Link to="/news" state={{ newsId: news.id }} style={{ textDecoration: "none", color: "inherit" }}>
                                    <h6
                                      style={{
                                        fontSize: "14px",
                                        lineHeight: "1.4",
                                        margin: 0,
                                        fontWeight: 600,
                                        color: "#14532D",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      {news.safe_title || news.title}
                                    </h6>
                                  </Link>
                                  <small style={{ color: "#888" }}>{news.date}</small>
                                  {/* <p className="mt-1" style={{ fontSize: "12px", color: "#555" }} dangerouslySetInnerHTML={{ __html: news.excerpt }} /> */}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR: RECENT NEWS */}
          <div className="col-lg-4">
            <div className="recent-news-box p-3" style={{ background: "#fff" }}>
              <h5 className="mb-3">Recent News</h5>
              {recentNews.length > 0 ? (
                <ul className="list-unstyled">
                  {recentNews.slice(0, 6).map((news) => (
                    <li key={news.id} className="mb-3 d-flex align-items-start">
                      {news.thumbnail_base64 && (
                        <img
                          src={news.thumbnail_base64}
                          alt={news.title}
                          className="me-2"
                          style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                        />
                      )}
                      <div>
                        <Link to="/news" state={{ newsId: news.id }} style={{ textDecoration: "none", color: "#14532D", fontWeight: "500", fontSize: "14px", lineHeight: "1.3" }}>
                          {news.safe_title || news.title}
                        </Link>
                        <br />
                        <small style={{ color: "#666" }}>{news.date}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recent news available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
