import { createSlice } from "@reduxjs/toolkit";
import { addFavouriteToFirebase, auth, db } from "../auth/firebase";
import { collection, getDocs, query } from "firebase/firestore";

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
      // create and spread a Set here to remove duplication from the state
      state.favourites = [...new Set([...state.favourites, action.payload])]
      // save to Firebase db
      const user = auth.currentUser;
      if (user) addFavouriteToFirebase(user.uid, action.payload);
    },
    clearFavourites(state) {
      state.favourites = []
    },
    removeFavourites(state, action) {
      state.favourites = state.favourites.filter(country => country !== action.payload);
    },
  },
  extraReducers() {},
});

export const getFavouritesFromSource = () => async (dispatch) => {
  const user = auth.currentUser;
  if (user) {
    const q = query(collection(db, `user/${user.uid}/favourites`));
    const querySnapshot = await getDocs(q);
    const favourites = querySnapshot.docs.map((doc) => doc.data().name);
    dispatch(getFavourites(favourites));
    dispatch(setLoading(false));
  }
}

// export reducer function to use in component
export const {addFavourite, clearFavourites, removeFavourites, getFavourites, setLoading} = favouritesSlice.actions;

// export to store.js
export default favouritesSlice.reducer;