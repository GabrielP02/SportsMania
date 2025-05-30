import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import NavBar from "./components/NavBar";  
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar"; 
import { CartProvider } from "./context/cartContext_temp";

const App = () => {
  return (
    <CartProvider>
    <Router>
      <AppRoutes />
      <Footer />
    </Router>
    </CartProvider>
  );
};

export default App;
