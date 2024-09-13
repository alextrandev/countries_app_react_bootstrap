import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite(state, action) {
      // create and spread a Set here to remove duplication from the state
      state.favourites = [...new Set([...state.favourites, action.payload])]
    },
    clearFavourites(state) {
      state.favourites = []
    },
    removeFavourites(state, action) {
      state.favourites = state.favourites.filter(country => country !== action.payload)
    },
  },
  extraReducers() {},
});

// export reducer function to use in component
export const {addFavourite, clearFavourites, removeFavourites} = favouritesSlice.actions;

// export to store.js
export default favouritesSlice.reducer;