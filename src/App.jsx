import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { APP_ROUTES } from './utils/constants';

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Navigate to={APP_ROUTES.SIGN_IN} />} />
    <Route path={APP_ROUTES.SIGN_UP} exact element={<SignUp />} />
    <Route path={APP_ROUTES.SIGN_IN} exact element={<SignIn />} />
    <Route path={APP_ROUTES.SEARCH_PAGE} exact element={<SearchPage />} />
    <Route path={APP_ROUTES.HOME_PAGE} exact element={<HomePage />} />
    <Route path={APP_ROUTES.CART_PAGE} exact element={<Cart />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
