import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Adress from "./pages/Adress";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import Cart from "./pages/cart/Cart";
import { APP_ROUTES } from "./utils/constants";
import Product from "./pages/Product";
import AboutUs from "./pages/AboutUs";
import Perfil from "./pages/Perfil";
import MyOrders from './pages/MyOrders';
import Contact from './pages/Contact';
import Cards from './pages/Cards';
import AddCard from './pages/AddCard';
import Success from "./pages/backPages/Success";
import Failure from "./pages/backPages/Failure";
import Pending from "./pages/backPages/Pending";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={APP_ROUTES.SIGN_IN} />} />
      <Route path={APP_ROUTES.SIGN_UP} element={<SignUp />} />
      <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
      <Route path={APP_ROUTES.SEARCH_PAGE} element={<SearchPage />} />
      <Route path={APP_ROUTES.ADRESS} element={<Adress />} />
      <Route path={APP_ROUTES.HOME_PAGE} element={<HomePage />} />
      <Route path={APP_ROUTES.CART_PAGE} element={<Cart />} />
      <Route path={`${APP_ROUTES.PRODUCT}/:id`} element={<Product />} />
      <Route path={APP_ROUTES.ABOUT_US} element={<AboutUs />} />
      <Route path={APP_ROUTES.PERFIL} element={<Perfil />} />
      <Route path={APP_ROUTES.MY_ORDERS} element={<MyOrders />} />
      <Route path={APP_ROUTES.CONTACT} element={<Contact />} />  
      <Route path={APP_ROUTES.CARDS} element={<Cards />} />  
      <Route path={APP_ROUTES.AddCard} element={<AddCard />} />
      <Route path={APP_ROUTES.SUCCESS} element={<Success />} />
      <Route path={APP_ROUTES.FAILURE} element={<Failure />} />
      <Route path={APP_ROUTES.PENDING} element={<Pending />} />
    </Routes>
  );
};

export default AppRoutes;