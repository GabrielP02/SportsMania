import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import NavBar from "./components/NavBar";  
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar"; 

const App = () => {
  return (
    <Router>
      <AppRoutes />
      <Footer />
    </Router>
  );
};

export default App;
