import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import favouritesReducer from "./favouritesSlice";
import trivialsReducer from "./trivialsSlice";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    favourites: favouritesReducer,
    trivials: trivialsReducer
  },
});