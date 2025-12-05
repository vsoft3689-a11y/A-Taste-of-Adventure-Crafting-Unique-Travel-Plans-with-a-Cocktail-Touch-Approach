import "./App.css";
import Navbar from "./components/Navbar";
import Recommendations from "./pages/tourist/Recommendations";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Route, Routes } from "react-router-dom";
import TravelHistory from "./pages/tourist/TravelHistory";
import Profile from "./pages/tourist/Profile";
import PackageDetails from "./pages/tourist/PackageDetails";
import AddLandscape from "./pages/admin/AddLandscape";
import AddPackage from "./pages/admin/AddPackage";
import ManagePackages from "./pages/admin/ManagePackages";
import TouristDashboard from "./pages/tourist/TouristDashboard";
import ManageLandscapes from "./pages/admin/ManageLandscapes";
import TouristPackages from "./pages/tourist/TouristPackages";
import BookPackage from "./pages/tourist/BookPackage";
import LandingPage from "./components/LandingPage";
import ManageBookings from "./pages/admin/ManageBookings";
import EditLandscape from "./pages/admin/EditLandscape";
import EditPackage from "./pages/admin/EditPackage";
import PackageReviews from "./pages/tourist/PackageReviews";
import ReviewForm from "./pages/tourist/ReviewForm";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* ------------------ AUTH ------------------ */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ------------------ TOURIST ROUTES ------------------ */}

        <Route path="/tourist/dashboard" element={<TouristDashboard />} />

        <Route path="/recommendations" element={<Recommendations />} />

        <Route path="/history" element={<TravelHistory />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/packages" element={<TouristPackages />} />

        <Route path="/package/:id" element={<PackageDetails />} />

        <Route path="/book/:id" element={<BookPackage />} />

        <Route path="/package/:id/add-review" element={<ReviewForm />} />

        <Route path="/package/:id/reviews" element={<PackageReviews />} />

        {/* ------------------ ADMIN ROUTES ------------------ */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/add-landscape" element={<AddLandscape />} />

        <Route path="/admin/manage-landscapes" element={<ManageLandscapes />} />

        <Route path="/admin/edit-landscape/:id" element={<EditLandscape />} />

        <Route path="/admin/add-package" element={<AddPackage />} />

        <Route path="/admin/edit-package/:id" element={<EditPackage />} />

        <Route path="/admin/packages" element={<ManagePackages />} />

        <Route path="/admin/bookings" element={<ManageBookings />} />
      </Routes>
    </>
  );
}

export default App;
