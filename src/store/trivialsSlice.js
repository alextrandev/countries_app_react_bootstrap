import { createSlice } from "@reduxjs/toolkit"
import fetchTrivials from "../services/trivialsService";

const initialState = {
  trivials: [],
  isLoading: true,
  isInitialized: false,
  currentTrivial: {},
}

export const trivialsSlice = createSlice({
  name: "trivials",
  initialState,
  reducers: {
    getTrivials(state, action) {
      state.trivials = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setInitialized(state, action) {
      state.isInitialized = action.payload;
    },
    setCurrentTrivial(state, action) {
      state.currentTrivial = action.payload;
    },
  },
  extraReducers() {},
});

export const getTrivialsFromSource = (cca3) => async (dispatch) => {
  dispatch(setLoading(true));
  const trivials = await fetchTrivials(cca3);
  dispatch(getTrivials(trivials));
  dispatch(setLoading(false));
}

export const showTrivial = (cca3) => (state, dispatch) => {
  if (state.trivials.length == 0) {
    getTrivialsFromSource(cca3);
  }
  dispatch(setCurrentTrivial(state.trivials[0]));
  dispatch(getTrivials(state.trivials.slice(1)));
}

export const {getTrivials, setLoading, setInitialized, setCurrentTrivial} = trivialsSlice.actions;

export default trivialsSlice.reducer;