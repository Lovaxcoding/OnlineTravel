import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navigation/Navbar.jsx";
import HeroSection from "./HeroSection/HeroSection.jsx";
import TravelHeroSection from "./TravelSection/TravelHeroSection.jsx";
import Footer from "./Footer/Footer.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
            </Routes>
            <Footer />
        </Router>
    </StrictMode>
);
