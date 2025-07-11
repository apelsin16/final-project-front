import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (amount) => {
    // тут може бути запит до API, але для прикладу — затримка
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const selectCount = (state) => state.counter.value;

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer