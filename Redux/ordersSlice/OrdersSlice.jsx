import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";
import axios from "axios";

export const fetchUsers = createAsyncThunk("userslice/fetchUsers", async () => {
  try {
    const res = await api.get("/admin/orders");
    return res.data;
  } catch (error) {
    console.log("something went wrong!");
  }
});
