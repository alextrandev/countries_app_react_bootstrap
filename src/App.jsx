import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./components/Home"
import ErrorPage from "./components/ErrorPage"
import Countries from "./components/Countries"
import SingleCountry from "./components/SingleCountry"
import Favourites from './components/Favourites';
import Register from "./components/Register"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="countries" element={<Countries />} />
          <Route path="countries/:cca3" element={<SingleCountry />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
