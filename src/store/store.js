import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import favouritesSlice from "./favouritesSlice";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    favourites: favouritesSlice,
  },
});