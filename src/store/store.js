import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/slices/authSlice.js'
import userReducer from '../features/slices/userSlice.js'
import postReducer from '../features/slices/postSlice'
// import productReducer from '../features/slices/productSlice'
// import adminReducer from '../features/slices/adminSlice.js'
// import userReducer from '../features/slices/userSlice.js'

export const store = configureStore({
  reducer: {

    auth: authReducer,
    user: userReducer,
    post: postReducer,
    // admin: adminReducer,
    // chat: chatReducer
  },
});