import axios from "axios";

const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const api = axios.create({
  baseURL: isLocal
    ? "http://localhost/cpsu-edu/public/api" // XAMPP local
    : "https://cpsu.edu.ph/public/api",      // Production
});

export default api;
