import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Import global CSS
import "./assets/css/slick.css";
import "./assets/css/animate.css";
import "./assets/css/nice-select.css";
import "./assets/css/jquery.nice-number.min.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/default.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";

// Hook to dynamically load a script
const useScript = (url) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;

    script.onload = () => setLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  return loaded;
};

function Root() {
  // Load scripts
  const modernizrLoaded = useScript("/assets/js/vendor/modernizr-3.6.0.min.js");
  const jqueryLoaded = useScript("/assets/js/vendor/jquery-1.12.4.min.js");
  const bootstrapLoaded = useScript("/assets/js/bootstrap.min.js");
  const slickLoaded = useScript("/assets/js/slick.min.js");
  const magnificLoaded = useScript("/assets/js/jquery.magnific-popup.min.js");
  const waypointsLoaded = useScript("/assets/js/waypoints.min.js");
  const counterupLoaded = useScript("/assets/js/jquery.counterup.min.js");
  const niceSelectLoaded = useScript("/assets/js/jquery.nice-select.min.js");
  const niceNumberLoaded = useScript("/assets/js/jquery.nice-number.min.js");
  const countdownLoaded = useScript("/assets/js/jquery.countdown.min.js");
  const validatorLoaded = useScript("/assets/js/validator.min.js");
  const ajaxContactLoaded = useScript("/assets/js/ajax-contact.js");
  const mainLoaded = useScript("/assets/js/main.js");

  // Initialize Slick after jQuery and Slick are loaded
  useEffect(() => {
    if (jqueryLoaded && slickLoaded && window.$) {
      // Example: initialize your slider
      window.$(".slider-active").slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      });
    }
  }, [jqueryLoaded, slickLoaded]);

  return (
    <>
      <App />
      {/* Back to Top Button */}
      <a href="#" className="back-to-top">
        <i className="fa fa-angle-up"></i>
      </a>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
