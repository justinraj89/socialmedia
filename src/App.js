import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import MainLayout from './layouts/MainLayout';
import Navbar from "./components/Navbar";
import NewPost from "./pages/NewPost"
import EditPost from "./pages/EditPost";
import CommentPage from "./pages/CommentPage"

import { AnimatePresence } from "framer-motion";
//=============================================

function App() {


  return (
    <MainLayout>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post" element={<NewPost/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/editpost/:id" element={<EditPost/>} />
          <Route path="/post/:id" element={<CommentPage/>} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}

export default App;
