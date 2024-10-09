import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  isLoading: true,
  search: '',
  currentPagination: 1,
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    getCountries(state, action) {
      state.countries = action.payload;
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    search(state, action) {
      state.search = action.payload;
    },
    setPagination(state, action) {
      state.currentPagination = action.payload;
    }
  },
  extraReducers() {},
});

// export reducer function to use in component
export const {getCountries, isLoading, search, setPagination} = countriesSlice.actions;

// export to store.js
export default countriesSlice.reducer;