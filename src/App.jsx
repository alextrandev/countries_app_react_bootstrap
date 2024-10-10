import { auth } from "./auth/firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeCountries } from "./services/countriesServices";
import { getFavouritesFromSource } from "./store/favouritesSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Countries from "./components/Countries";
import SingleCountry from "./components/SingleCountry";
import Favourites from './components/Favourites';
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();

  // this effect will fetch all necessary data on refresh
  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route>
            <Route path="/" element={<Home user={user} />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* protected routes, checkout the component for details */}
            <Route element={<ProtectedRoute user={user} loading={loading} />}>
              <Route path="countries" element={<Countries />} />
              <Route path="countries/:cca3" element={<SingleCountry />} />
              <Route path="favourites" element={<Favourites />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
