import { createSlice } from "@reduxjs/toolkit";
import fetchTrivials from "../services/trivialsService";

// object state to hold trivia info for different countries
const initialState = {
  trivials: {},
  isLoading: false,
  isInitialized: {},
  currentTrivial: {},
}

export const trivialsSlice = createSlice({
  name: "trivials",
  initialState,
  reducers: {
    getTrivials(state, action) {
      // sending the data to it own object item based on passed cca3 code
      const { cca3, trivials } = action.payload;
      state.trivials[cca3] = trivials;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    // this state is to keep track of which country have its trivials fetched
    setInitialized(state, action) {
      const { cca3, bool } = action.payload;
      state.isInitialized[cca3] = bool;
    },
    setCurrentTrivial(state, action) {
      const { cca3, currentTrivial } = action.payload;
      state.currentTrivial[cca3] = currentTrivial;
    },
  },
  extraReducers() {},
});

// this function will fetch 15 trivia from source and put result in the state when called by below function
export const getTrivialsFromSource = (cca3) => async (dispatch) => {
  dispatch(setLoading(true));
  const trivials = await fetchTrivials(cca3);
  dispatch(getTrivials({ cca3, trivials }));
  dispatch(setLoading(false));
}

// this function will get the first item from trivials state and put it in currentTrivial
export const showTrivial = (cca3) => async (dispatch, getState) => {
  dispatch(setInitialized({ cca3, bool: true }));
  // take a snapshot of the current state
  let state = getState().trivials;

  // if the trivials state for a a countries is not fetched or ran out, fetch a new trivials and update snapshot
  if (!state.trivials[cca3] || state.trivials[cca3].length === 0) {
    await dispatch(getTrivialsFromSource(cca3));
    state = getState().trivials;
  }

  // move the first trivials from state to currentTrivial
  if (state.trivials[cca3].length > 0) {
    const current = state.trivials[cca3][0];
    dispatch(setCurrentTrivial({ cca3, currentTrivial: current }));
    // this one to remove the moved trivial so user never get the same one
    dispatch(getTrivials({ cca3, trivials: state.trivials[cca3].slice(1) }));
  }
};

export const {getTrivials, setLoading, setInitialized, setCurrentTrivial} = trivialsSlice.actions;

export default trivialsSlice.reducer;