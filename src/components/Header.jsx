import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [submenu, setSubmenu] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const API_TOKEN = "$2a$12$LWAfyhnpYq2lrDJlsm3YA.25ivExQynX9LghVXoVinHCTf.38cQUe";
  
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/webmenus`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );

        setCategories(data.categories || []);
        setSubcategories(data.subcategories || []);
        setSubmenu(data.submenu || []);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/searchArticle?s=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header id="header-part">
        <div className="navigation">
          <div className="container">
            <div className="row">
              <div className="col-lg-11 col-md-11 col-sm-9 col-8">
                <nav className="navbar navbar-expand-lg navigation">
                  <Link
                    className="navbar-brand"
                    to="/"
                    style={{ width: "100px", paddingRight: "15px" }}
                  >
                    <img src="/Uploads/images/logo.png" alt="Logo" />
                  </Link>

                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>

                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                  <div className="wrap-submenu">
                    <ul className="navbar-nav me-auto">
                      {categories.map((cat) => (
                        <li
                          key={cat.id}
                          className={`nav-item ${cat.hasgrid ? "has-grid" : "active"}`}
                        >
                          <a
                            href="#"
                            className={`${
                              cat.isActive ? "active" : ""
                            } ${location.pathname === "/" && cat.id === 1 ? "active" : ""}`}
                          >
                            {cat.cat_name} <i className="fa fa-chevron-right fa-xs submenu-icon"></i>
                          </a>

                          <ul className="sub-menu">
                            {cat.hasgrid === 2 ? (
                              // Category has subcategories
                              subcategories
                                .filter((subcat) => parseInt(subcat.categories_id) === parseInt(cat.id))
                                .map((subcat) => (
                                  <li key={subcat.id}>
                                    <strong>{subcat.title}</strong>
                                    <ul>
                                      {submenu
                                        .filter((submen) => parseInt(submen.subcategory) === parseInt(subcat.id))
                                        .map((submen) => (
                                          <li key={submen.id}>
                                          <Link
                                            to={
                                              submen.url
                                                ? submen.url
                                                : submen.title === "About Us"
                                                ? "/about-us"
                                                : `/${submen.title.toLowerCase().replace(/\s+/g, "-")}`
                                            }
                                            state={{ submenId: submen.id }}
                                          >
                                            {submen.title}
                                          </Link>
                                          </li>
                                        ))}
                                    </ul>
                                  </li>
                                ))
                            ) : (
                              // Category has direct submenu grouped in pairs
                              (() => {
                                const items = submenu.filter(
                                  (submen) => parseInt(submen.category) === parseInt(cat.id)
                                );
                                const grouped = [];
                                for (let i = 0; i < items.length; i += 2) {
                                  grouped.push(items.slice(i, i + 2));
                                }
                                return grouped.map((group, index) => (
                                  <li key={index}>
                                    <ul>
                                      {group.map((submen) => (
                                        <li key={submen.id}>
                                          <Link
                                            to={
                                              submen.url
                                                ? submen.url
                                                : submen.title === "About Us"
                                                ? "/about-us"
                                                : `/${submen.title.toLowerCase().replace(/\s+/g, "-")}`
                                            }
                                            state={{ submenId: submen.id }}
                                          >
                                            {submen.title}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </li>
                                ));
                              })()
                            )}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                  </div>
                </nav>
              </div>

              <div className="col-lg-1 col-md-1 col-sm-2 col-3">
                <div className="right-icon text-right">
                  <ul>
                    <li>
                      <button
                        onClick={() => setSearchOpen(true)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Search Overlay */}
      {searchOpen && (
        <div
          className="search-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            transition: "opacity 0.3s ease",
          }}
        >
          {/* Close Button */}
          <div
            onClick={() => setSearchOpen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              fontSize: "30px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            &times;
          </div>

          {/* Search Input */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              width: "80%",
              maxWidth: "600px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword"
              style={{
                width: "100%",
                padding: "15px 20px",
                fontSize: "18px",
                borderRadius: "30px",
                border: "none",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                marginLeft: "10px",
                padding: "15px 20px",
                borderRadius: "50%",
                border: "none",
                background: "#257c48ff",
                cursor: "pointer",
              }}
            >
              <i className="fa fa-search text-light"></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Header;
