import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import NavBar from './components/NavBar';
import Footer from './components/Footer'

const App = () => {
  return (
    <Router>
      <NavBar />
      <AppRoutes />
      <Footer />
    </Router>
  );
};

export default App;
