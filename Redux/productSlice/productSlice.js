import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import api from "../../utils/axios";

export const fetchProducts = createAsyncThunk(
  "productSlice/fetchProducts",
  async () => {
    try {
      const res = await api.get("/user/products");
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("something went wrong!");
    } 
  }
);


const initialState = {
  products: [],
  filteredProducts: [],
  category: "all",
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    searchFilter: (state, action) => {
      state.filteredProducts.data = state.products.data.filter((product) =>
        product.product_name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    categorize: (state, action) => {
      if (action.payload === "all") {
        state.filteredProducts.data = state.products.data;
        
      } else {
        state.filteredProducts.data = state.products.data.filter(
          (product) => product.category === action.payload
        );
      }
      // console.log(action.payload);
    },
    addProduct: (state, action) => {
      state.products.data.push(action.payload);
      state.filteredProducts.data.push(action.payload);
    },
    deleteProduct: (state, action) => {
      const productId = action.payload._id;
      const products = state.products.data.filter(
        (product) => product._id !== productId
      );
      state.products.data = products;

      const filteredProducts = state.filteredProducts.data.filter(
        (product) => product._id !== productId
      );
      state.filteredProducts.data = filteredProducts;
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      state.products.data = state.products.data.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
      state.filteredProducts.data = state.filteredProducts.data.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      console.log("loading");
    }), 
      builder.addCase(fetchProducts.rejected, (state, action) => {
        console.log("Error in fetching");
      }),
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        // console.log("Succes");
        state.products = action.payload;
        state.filteredProducts = action.payload;
        // console.log(action.payload.data);
      });
  },
});

export default productSlice.reducer;
export const {
  categorize,
  searchFilter,
  deleteProduct,
  addProduct,
  updateProduct,
} = productSlice.actions;
