import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const API_TOKEN = "$2a$12$LWAfyhnpYq2lrDJlsm3YA.25ivExQynX9LghVXoVinHCTf.38cQUe";

const Menu = () => {
  const location = useLocation();
  const submenId = location.state?.submenId; // optional chaining

  const [menuItem, setMenuItem] = useState({});
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (submenId) {
      fetchMenu(submenId);
    }
  }, [submenId]);

  const fetchMenu = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/menu-preview/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`, 
          },
        }
      );

      const data = res.data; // single object
      setMenuItem(data);
      setContent(data.content_text || "");
      setImages(data.images_base64 || []);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
      setMenuItem({});
      setContent("");
      setImages([]);
    }
  };

  return (
    <section className="pt-40 pb-120" style={{ backgroundColor: "#f9f9f9", padding: "30px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="menu-content" style={{ backgroundColor: "transparent" }}>
              {/* THUMBNAIL */}
              {menuItem.thumbnail_base64 && (
                <img
                  src={menuItem.thumbnail_base64}
                  alt={menuItem.safe_title || menuItem.title}
                  style={{ width: "100%", marginBottom: "20px" }}
                />
              )}

              {/* MULTIPLE IMAGES */}
              {images.length > 0 && (
                <div className="menu-images" style={{ marginBottom: "20px" }}>
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`menu-image-${idx}`}
                      style={{ width: "48%", margin: "1%" }}
                    />
                  ))}
                </div>
              )}

              {/* CONTENT */}
              <div
                dangerouslySetInnerHTML={{ __html: content }}
                style={{ textAlign: "justify" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
