import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/home/Home";
import Explore from "../pages/explore/Explore";
import Compare from "../pages/compare/Compare";
import Analyze from "../pages/analyze/Analyze";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import Profile from "../pages/profile/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;