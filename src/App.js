import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import MainLayout from "./layouts/MainLayout";
import Navbar from "./components/Navbar";

//=============================================

function App() {
  return (
    <MainLayout>
      <Router>
        <Navbar />
        <AnimatedRoutes />
      </Router>
    </MainLayout>
  );
}

export default App;
