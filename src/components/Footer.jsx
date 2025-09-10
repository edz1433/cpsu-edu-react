import React from "react";

const Footer = () => {
  return (
    <footer id="footer-part">
      <div className="footer-top pt-40 pb-70">
        <div className="container">
          <div className="row">
            {/* About Section */}
            <div className="col-4 col-md-4 col-lg-4">
              <div className="footer-about mt-30">
                <div className="logo">
                  <a href="#">
                    <img src="/Uploads/images/logo-header.png" alt="Logo" />
                  </a>
                </div>
                <p>
                  <b>Central Philippines State University (CPSU)</b>
                  <br />
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "13px",
                      lineHeight: 1.6,
                    }}
                  >
                    is a catalyst for change in Negros Occidental empowering
                    communities through innovation, education, and agriculture.
                    With 10 ISO-accredited campuses, CPSU transforms local
                    potential into lasting impact.
                  </span>
                </p>
                <ul className="mt-20">
                  <li>
                    <a
                      href="https://www.facebook.com/CPSUpublicinformationoffice"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Support Links */}
            <div className="col-4 col-md-4 col-lg-4">
              <div className="footer-link support mt-40">
                <div className="footer-title pb-25">
                  <h6>Support</h6>
                </div>
                <ul>
                  <li>
                    <a href="https://cpsu.edu.ph/sublink/84">
                      <i className="fa fa-angle-right"></i> Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-angle-right"></i> Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-4 col-md-4 col-lg-4">
              <div className="footer-address mt-40">
                <div className="footer-title pb-25">
                  <h6>Contact Us</h6>
                </div>
                <ul>
                  <li>
                    <div className="icon">
                      <i className="fa fa-home"></i>
                    </div>
                    <div className="cont">
                      <p>
                        Central Philippines State University, Kabankalan City,
                        Negros Occidental
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="fa fa-phone"></i>
                    </div>
                    <div className="cont">
                      <p>+63 9173 015 565</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="fa fa-envelope-o"></i>
                    </div>
                    <div className="cont">
                      <p>
                        <a
                          href="mailto:cpsu_main@cpsu.edu.ph"
                          className="no-style text-light"
                        >
                          cpsu_main@cpsu.edu.ph
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Visitor Stats */}
          <div className="row mt-4">
            <div className="col-12 text-center">
              <p style={{ margin: 0, color: "rgb(236, 233, 233)" }}>
                Online Visitors: <strong id="onlineVisitors">0</strong> &nbsp;|&nbsp;
                Today's Visitors: <strong id="todaysVisitors">0</strong> &nbsp;|&nbsp;
                Total Page Views: <strong id="totalPageViews">0</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
