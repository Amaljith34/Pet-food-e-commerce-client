import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../cartSlice/cartSlice";
import usersSlice from "../usersSlice/usersSlice";
import productSlice from "../productSlice/productSlice";
import loginSlice from "../logSlice/logSlice";
import wishlistSlice from "../wishlistSlice/wishlistSlice";
import AllordersSlice from '../ordersSlice/AllOrderslice.jsx'
// import ordersSlice from '../ordersSlice/OrdersSlice.jsx'

export const storee = configureStore({
  reducer: {
    cartSlice: cartSlice,
    usersSlice: usersSlice,
    productSlice: productSlice,
    isLogged: loginSlice,
    wishlistSlice: wishlistSlice,
    orders: AllordersSlice,
    // orders:ordersSlice
    
  },
});
