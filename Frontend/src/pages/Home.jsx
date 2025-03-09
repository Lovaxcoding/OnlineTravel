import React, { useState } from "react";
import HeroSection from "../HeroSection/HeroSection";
import TravelHeroSection from "../TravelSection/TravelHeroSection.jsx";
import AboutUs from "../AboutOnlineTravel/AboutUs.jsx";
import ReservationForm from "../Reservation/ReservationForm.jsx";
import Destinations from "../Destination/Destinations.jsx";
import TravelOffers from "../Reservation/TravelOffers.jsx";
import Navbar from "../Navigation/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";

export default function Home() {
    const [refresh, setRefresh] = useState(false);
    console.log('Home component loaded');
    return (
        <div>
            <Navbar />
            <HeroSection />
            <Destinations />
            <AboutUs />
            <TravelOffers />
            <TravelHeroSection />
            <Footer />
        </div>
    );
}
