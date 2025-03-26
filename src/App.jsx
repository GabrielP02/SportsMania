import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { APP_ROUTES } from './utils/constants';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import SearchPage from './pages/SearchPage';


function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Navigate to={APP_ROUTES.SIGN_IN} />} />
    <Route path={APP_ROUTES.SIGN_UP} exact element={<SignUp />} />
    <Route path={APP_ROUTES.SIGN_IN} exact element={<SignIn />} />
    <Route path={APP_ROUTES.SEARCH_PAGE} exact element={<SearchPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
