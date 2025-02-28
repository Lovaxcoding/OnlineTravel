import HeroSection from "../HeroSection/HeroSection";
import TravelHeroSection from "../TravelSection/TravelHeroSection.jsx";
import AboutUs from "../AboutOnlineTravel/AboutUs.jsx";
import UserList from "../User/UserList.jsx";
import ReservationList from "../Reservation/ReservationList.jsx";
import ReservationForm from "../Reservation/ReservationForm.jsx";
import {useState} from "react";
import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import Destinations from "../Destination/Destinations.jsx";
import OfferCard from "../Reservation/TravelOffers.jsx";
import TravelOffers from "../Reservation/TravelOffers.jsx";

export default function Home() {
    const [refresh, setRefresh] = useState(false);
    return (
        <div>
            <HeroSection />
            <Destinations />
            <AboutUs />
            <TravelOffers />
            <TravelHeroSection />
            <ReservationForm />
            {/*<UserList />*/}
            {/*<Container>*/}
            {/*    <Typography variant="h4" align="center">Gestion des Réservations</Typography>*/}
            {/*    <ReservationForm refresh={() => setRefresh(!refresh)} />*/}
            {/*    <ReservationList key={refresh} />*/}
            {/*</Container>*/}

        </div>
    );
}
