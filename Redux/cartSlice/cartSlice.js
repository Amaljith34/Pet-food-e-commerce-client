import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import api from "../../utils/axios";
import { toast } from "react-toastify";

const INITIAL_STATE = {
  cart: [],
};
export const settingCart = createAsyncThunk(
  "cartSlice/settingCart",
  async (_, { rejectWithValue }) => {
    try {
      const id = localStorage.getItem("id");
      if (!id) {
        return rejectWithValue("User ID not found");
      }

      const res = await api.get(`/user/cart/${id}`);

      return res.data?.data?.products;
    } catch (error) {
      console.error("Something went wrong!", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const addToCartAsync = createAsyncThunk(
  "cartSlice/addToCartAsync",
  async (products, { getState }) => {
    try {
      // const state = getState();
      const id = localStorage.getItem("id");
      // let userCart = Array.isArray(state.cartSlice.cart)
      //   ? [...state.cartSlice.cart]
      //   : [];

      // const existingProductIndex = userCart.findIndex(
      //   (item) => item._id === product._id
      // );

      // if (existingProductIndex !== -1) {
      //   userCart = userCart.map((item, index) => {
      //     if (index === existingProductIndex) {
      //       return { ...item, quantity: item.quantity + product.quantity };
      //     }
      //     return item;
      //   });
      // } else {
      //   userCart.push({ ...product, quantity: product.quantity });
      // }

      // console.log(userCart);

      await api.post(`/user/cart/${id}`, {
        productId: products._id,
        quantity: products.quantity,
      });
      // console.log(state.cartSlice.cart.push(product))

      const res = await api.get(`/user/cart/${id}`);
      return res.data.data.products;
    } catch (error) {
      console.error("Something went wrong!", error.message);
      throw error;
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  "cartSlice/removeFromCartAsync",
  async (productId, { getState }) => {
    try {
      const id = localStorage.getItem("id");

      const deleteProduct = await api.delete(`/user/cart/${id}`, {
        data: { productId: productId },
      });
      if(deleteProduct){
        
        const res = await api.get(`/user/cart/${id}`);
        return res.data.data.products;
          
      }
        
        
        
        
      
    } catch (error) {
      toast.error("something went wrong!");
      throw error;
    }
  }
);

export const quantityIncrementAsync = createAsyncThunk(
  "cartSlice/quantityIncrementAsync",
  async (product, { getState }) => {
    try {
      // const state = getState();
      const id = localStorage.getItem("id");
    

      await api.post(`user/cart/${id}`, {
        productId: product.productId._id,
      
        action: "increment",
      });
      const res = await api.get(`/user/cart/${id}`);
      return res.data.data.products;
    } catch (error) {
      console.log("something went wrong!");
      throw error;
    }
  }
);

export const quantityDecrementAsync = createAsyncThunk(
  "cartSlice/quantityDecrementAsync",
  async (product, { getState }) => {
    try {
   
      const id = localStorage.getItem("id");
     

      await api.post(`/user/cart/${id}`, {
        productId: product.productId._id,
        action: "decrement",
      });
      const res = await api.get(`/user/cart/${id}`);
      return res.data.data.products;
    } catch (error) {
      console.log("something went wrong!");
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: INITIAL_STATE,
  reducers: {
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(settingCart.pending, (state) => {
        console.log("cart is loading");
      })
      .addCase(settingCart.rejected, (state) => {
        console.log("Error in fetching cart");
      })
      .addCase(settingCart.fulfilled, (state, action) => {
        console.log("cart updated successfully");
        state.cart = action.payload;
        // console.log(action.payload)
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(quantityIncrementAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(quantityDecrementAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;

export const {
  addToCart,
  removeFromCart,
  quantityIncrement,
  quantityDecrement,
  clearCart,
} = cartSlice.actions;
