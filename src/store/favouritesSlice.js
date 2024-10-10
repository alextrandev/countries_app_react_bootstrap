import { createSlice } from "@reduxjs/toolkit";
import { addFavouriteToFirebase, auth, clearFavouritesFromFireBase, getFavouritesFromFirebase, removeFavouriteFormFirebase } from "../auth/firebase";

const initialState = {
  favourites: [],
  isLoading: true,
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    getFavourites(state, action) {
      state.favourites = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    addFavourite(state, action) {
      const user = auth.currentUser;
      if (user) {
        // save to Firebase db then update the state
        addFavouriteToFirebase(user.uid, action.payload)
          // create and spread a Set here to remove duplication from the state
          .then(state.favourites = [...new Set([...state.favourites, action.payload])]);
      }
    },
    removeFavourites(state, action) {
      const user = auth.currentUser;
      if (user) {
        removeFavouriteFormFirebase(user.uid, action.payload)
          .then(state.favourites = state.favourites.filter(country => country !== action.payload));
      }
    },
    clearFavourites(state) {
      const user = auth.currentUser;
      if (user) {
        clearFavouritesFromFireBase(user.uid)
          .then(state.favourites = []);
      }
    },
  },
  extraReducers() {},
});

export const getFavouritesFromSource = () => async (dispatch) => {
  const user = auth.currentUser;
  if (user) {
    dispatch(setLoading(true));
    const favourites = await getFavouritesFromFirebase(user.uid);
    dispatch(getFavourites(favourites));
    dispatch(setLoading(false));
  }
}

// export reducer function to use in component
export const {addFavourite, clearFavourites, removeFavourites, getFavourites, setLoading} = favouritesSlice.actions;

// export to store.js
export default favouritesSlice.reducer;