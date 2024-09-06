import axios from "axios";
import { getCountries, isLoading } from "../store/countriesSlice";

const baseUrl = "https://restcountries.com/v3.1/all";

const getAllCountries = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const initializeCountries = () => {
  return async (dispatch) => {
    const countries = await getAllCountries();
    dispatch(getCountries(countries));
    dispatch(isLoading(false));
  }
};

export {getAllCountries, initializeCountries};