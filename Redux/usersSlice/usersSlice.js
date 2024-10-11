import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";
// import axios from "axios";

export const fetchUsers = createAsyncThunk("userslice/fetchUsers", async () => {
  try {
    const res = await api.get("/admin/userlist");
    return res.data;
  } catch (error) {
    console.log("something went wrong!");
  }
});
const initialState = {
  users: [],
  filteredUsers: [],
};

const userSlice = createSlice({
  name: "userslice",
  initialState,
  reducers: {
    searchFilterUser: (state, action) => {
      state.filteredUsers.data = state.users.data.filter((user) =>
        user.username.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    deleteUser: (state, action) => {
      const userId = action.payload.id;
      state.users.data = state.users.data.filter((user) => user.id !== userId);
      state.filteredUsers.data = state.filteredUsers.data.filter((user) => user.id !== userId);
    },
    blockUser: (state, action) => {
      const userId = action.payload.id;
      state.users.data = state.users.data.map((user) => 
        user.id === userId ? { ...user, isBlockd: !user.isBlockd } : user
      );
      state.filteredUsers.data = state.filteredUsers.data.map((user) => 
        user.id === userId ? { ...user, isBlockd: !user.isBlockd } : user
      );
    },
    
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      console.log("loading");
    }),
      builder.addCase(fetchUsers.rejected, (state, action) => {
        console.log("Error in fetching");
      }),
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        console.log("Succes");
        state.users = action.payload;
        state.filteredUsers = action.payload;
        // console.log(action.payload);
      });
  },
});

export default userSlice.reducer;
export const { searchFilterUser, deleteUser ,blockUser} = userSlice.actions;
