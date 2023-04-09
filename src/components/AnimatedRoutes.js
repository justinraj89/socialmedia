import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import NewPost from "../pages/NewPost";
import Dashboard from "../pages/Dashboard";
import EditPost from "../pages/EditPost";
import CommentPage from "../pages/CommentPage";
import ProfilePage from "../pages/ProfilePage";
//== FRAMER MOTION
import { AnimatePresence } from "framer-motion";
//===============================================

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/post" element={<NewPost />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editpost/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<CommentPage />} />
        <Route path="/:username/:id" element={<ProfilePage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
