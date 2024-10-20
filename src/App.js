import './App.css';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Signup from './pages/Signup';
import Home from './pages/Home';
import OtpVerification from './pages/OtpVerification';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify'; // Make sure you have react-toastify installed
import { useEffect } from 'react';

function App() {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Please sign up first then see the home page.");
      navigate("/"); 
    }
  }, [token,navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Redirect to signup if there's no token */}
        <Route path="/" element={!token ? <Signup /> : <Navigate to="/home" />} exact />
        <Route path="/home" element={token ? <Home /> : ""} />
        <Route path="/otp-verify/:email/:phone" element={<OtpVerification />} />
      </Routes>
    </>
  );
}

export default App;
