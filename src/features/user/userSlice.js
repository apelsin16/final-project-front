import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  current: null,
  following: [],
  followers: [],
  status: "idle",
  error: null,
};

// Async Thunks
export const followUser = createAsyncThunk(
  "user/followUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/users/${userId}/follow`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/users/${userId}/unfollow`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchFollowers = createAsyncThunk(
  "user/fetchFollowers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/users/followers`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(followUser.fulfilled, (state, action) => {
        state.following.push(action.payload);
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.following = state.following.filter(
          (user) => user._id !== action.payload._id
        );
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("user/") && action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("user/") && action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("user/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
