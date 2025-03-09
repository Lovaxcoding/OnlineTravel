import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard'; // Exemple de page protégée
import Home from './pages/Home';
import RegisterFormWithStepper from "./pages/RegisterPages.jsx";
import Statistics from "./Statistics/Statistics.jsx";
import ReservationList from "./Reservation/ReservationList.jsx";
import UserList from "./User/UserList.jsx";
import Destinations from "./Destination/Destinations.jsx";
import DestinationDetails from "./Destination/DestinationDetails.jsx";
import Navbar from "./Navigation/Navbar.jsx";
import TravelOffers from "./Reservation/TravelOffers.jsx";
import Footer from "./Footer/Footer.jsx";
import ReservationForm from "./Reservation/ReservationForm.jsx";
import LoginFormAdmin from "./pages/LoginFormAdmin.jsx";
import LoginPageUser from "./pages/LoginPageUser.jsx";
import Profile from "./Navigation/ProfileToggleDrawer.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/register" element={<RegisterFormWithStepper />} />
                    <Route path="/dashboard/statistics" element={<Statistics />} />
                    <Route path="/dashboard/reservations" element={<ReservationList />} />
                    <Route path="/dashboard/users" element={<UserList />} />
                    <Route path="/destination" element={<Destinations />} />
                    <Route path="/destinations/:id" element={<DestinationDetails />} />
                    <Route path="/offre" element={<TravelOffers />} />
                    {/* Routes protégées */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/reservation" element={<ReservationForm />} />
                    </Route>
                    <Route path="/loginPageAdmin" element={<LoginFormAdmin />} />
                    <Route path ="/loginPageUser" element={<LoginPageUser />} />
                    <Route path="/profile/:userId" element={<Profile />} />



                    <Route path="/404" element={<NotFound />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
