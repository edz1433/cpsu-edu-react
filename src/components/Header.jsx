import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const API_TOKEN = "$2a$12$LWAfyhnpYq2lrDJlsm3YA.25ivExQynX9LghVXoVinHCTf.38cQUe";
  
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/webmenus`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );

        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching menus:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  // Memoize the category processing to avoid recalculating on every render
  const processedCategories = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      // Pre-filter subcategories with their submenus for performance
      processedSubcategories: cat.subcategories?.map(subcat => ({
        ...subcat,
        submenus: subcat.submenus || []
      })) || []
    }));
  }, [categories]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/searchArticle?s=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  // Generate URL for a submenu item
  const getSubmenuUrl = (submen) => {
    if (submen.url) return submen.url;
    
    // Handle special cases
    if (submen.title === "About Us") return "/about-us";
    
    // Default URL generation
    return `/${submen.title.toLowerCase().replace(/\s+/g, "-")}`;
  };

  if (loading) {
    return (
      <header id="header-part">
        <div className="navigation">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center p-3">Loading navigation...</div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

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
                        {processedCategories.map((cat) => (
                          <li
                            key={cat.id}
                            className={`nav-item ${cat.hasgrid === 1 ? "has-grid" : ""}`}
                          >
                            <a
                              href="#"
                              className={`${
                                location.pathname === "/" && cat.id === 1 ? "active" : ""
                              }`}
                            >
                              {cat.cat_name} 
                              {cat.subcategories?.length > 0 && (
                                <i className="fa fa-chevron-right fa-xs submenu-icon"></i>
                              )}
                            </a>

                            {cat.subcategories?.length > 0 && (
                              <ul className="sub-menu">
                                {cat.hasgrid === 2 ? (
                                  // Category has subcategories (like About)
                                  cat.processedSubcategories.map((subcat) => (
                                    <li key={subcat.id}>
                                      <strong>{subcat.title}</strong>
                                      <ul>
                                        {subcat.submenus.map((submen) => (
                                          <li key={submen.id}>
                                            <Link
                                              to={getSubmenuUrl(submen)}
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
                                  // Category has direct submenu items grouped in pairs
                                  (() => {
                                    // Get all submenus from all subcategories
                                    const allSubmenus = cat.processedSubcategories.flatMap(
                                      subcat => subcat.submenus
                                    );
                                    
                                    // Group into pairs
                                    const grouped = [];
                                    for (let i = 0; i < allSubmenus.length; i += 2) {
                                      grouped.push(allSubmenus.slice(i, i + 2));
                                    }
                                    
                                    return grouped.map((group, index) => (
                                      <li key={index}>
                                        <ul>
                                          {group.map((submen) => (
                                            <li key={submen.id}>
                                              <Link
                                                to={getSubmenuUrl(submen)}
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
                            )}
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
                        aria-label="Open search"
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
          <button
            onClick={closeSearch}
            aria-label="Close search"
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              fontSize: "30px",
              color: "#fff",
              cursor: "pointer",
              background: "none",
              border: "none",
            }}
          >
            &times;
          </button>

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
              autoFocus
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
              aria-label="Search"
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