import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// 🔁 Асинхронна операція для оновлення аватарки
export const updateUserAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.patch("/api/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update avatar"
      );
    }
  }
);

const initialState = {
  current: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.current = action.payload;
    },
    logoutUser(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.current) {
          state.current.avatar = action.payload.avatar;
        }
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
        toast.error(state.error);
      });
  },
});

export const { setCurrentUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
