import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import News from "./pages/News";
import Menu from "./pages/Menu";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/:title" element={<Menu />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
