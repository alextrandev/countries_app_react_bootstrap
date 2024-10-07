import { createSlice } from "@reduxjs/toolkit";
import fetchTrivials from "../services/trivialsService";

const initialState = {
  trivials: {},
  isLoading: false,
  isInitialized: false,
  currentTrivial: {},
}

export const trivialsSlice = createSlice({
  name: "trivials",
  initialState,
  reducers: {
    getTrivials(state, action) {
      const { cca3, trivials } = action.payload;
      state.trivials[cca3] = trivials;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setInitialized(state, action) {
      state.isInitialized = action.payload;
    },
    setCurrentTrivial(state, action) {
      const { cca3, currentTrivial } = action.payload;
      state.currentTrivial[cca3] = currentTrivial;
    },
  },
  extraReducers() {},
});

export const getTrivialsFromSource = (cca3) => async (dispatch) => {
  dispatch(setLoading(true));
  const trivials = await fetchTrivials(cca3);
  dispatch(getTrivials({ cca3, trivials }));
  dispatch(setLoading(false));
}

export const showTrivial = (cca3) => async (dispatch, getState) => {
  dispatch(setInitialized(true));
  let state = getState().trivials;

  if (!state.trivials[cca3] || state.trivials[cca3].length === 0) {
    await dispatch(getTrivialsFromSource(cca3));
    state = getState().trivials;
  }

  if (state.trivials[cca3].length > 0) {
    const current = state.trivials[cca3][0];
    dispatch(setCurrentTrivial({ cca3, currentTrivial: current }));
    dispatch(getTrivials({ cca3, trivials: state.trivials[cca3].slice(1) }));
  }
};

export const {getTrivials, setLoading, setInitialized, setCurrentTrivial} = trivialsSlice.actions;

export default trivialsSlice.reducer;