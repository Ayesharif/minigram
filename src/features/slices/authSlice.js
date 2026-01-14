import { createSlice } from "@reduxjs/toolkit";
import {  login, logout, RegisterUser, reSetPassword, verifyOtp, checkUser, sendOtp } from "../actions/authAction.js";
import { updateProfile } from "../actions/userAction.js";


//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("User"));
//   // console.log(user);
  
//  let userAvail=null
//   if(token){
// userAvail=true
//   }
//   // console.log(userAvail);
  
export const authSlice = createSlice({


  name: "authSlice",
initialState: {
  currentUser: null,
  loading: true,
  message: null,
  status: 0,
  IsLogin: false,
  authChecked: false, // 🔑 THIS FIXES EVERYTHING
},

    reducers: {
      
    clearAuthMessage: (state) => {
      state.message = "";
      state.status = null;
    },
    },
  extraReducers:(builder)=>{
builder.addCase(login.pending, (state)=>{
  state.loading=true;
})
.addCase(login.fulfilled, (state, action)=>{
  state.loading=false;
  state.currentUser=action.payload.data;
  // state.token=action.payload.token;
  state.message=action.payload.message;
  state.status=action.payload.status;
  state.IsLogin=true;
})
.addCase(login.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.status=action.payload.status;
})
.addCase(RegisterUser.pending, (state)=>{
  state.loading=true;
})
.addCase(RegisterUser.fulfilled, (state, action)=>{
  state.loading=false;
  console.log(action.payload);
  state.currentUser=action.payload.email;
  state.message=action.payload.message;
  state.status=action.payload.status;
})
.addCase(RegisterUser.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.status=action.payload.status;
})
.addCase(sendOtp.pending, (state)=>{
  state.loading=true;
})
.addCase(sendOtp.fulfilled, (state, action)=>{
  state.loading=false;
  // console.log(action.payload);
  state.currentUser=action.payload.data
  state.message=action.payload.message;
  state.status=action.payload.status;
})
.addCase(sendOtp.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.status=action.payload.status;
})
.addCase(verifyOtp.pending, (state)=>{
  state.loading=true;
})
.addCase(verifyOtp.fulfilled, (state, action)=>{
  state.loading=false;
  // console.log(action.payload);
  state.currentUser=action.payload.data
  state.message=action.payload.message;
  state.status=action.payload.status;
})
.addCase(verifyOtp.rejected, (state, action)=>{
  state.loading=false;  
  state.message=action.payload.message;
  state.status=action.payload.status;
})
.addCase(reSetPassword.pending, (state)=>{
  state.loading=true;
})
.addCase(reSetPassword.fulfilled, (state, action)=>{
  state.loading=false;

  state.message=action.payload.message;
  state.status=action.payload.status;

})
.addCase(reSetPassword.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.status=action.payload.status;
})
.addCase(logout.pending, (state)=>{
  state.loading=true;
})
.addCase(logout.fulfilled, (state, action)=>{
  state.loading=false;
  state.currentUser=null;
  state.message=action.payload.message;
  state.status=action.payload.status;
  state.IsLogin=false;
})
.addCase(logout.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.status=action.payload.status;
})
.addCase(checkUser.pending, (state) => {
  state.loading = true;
})

.addCase(checkUser.fulfilled, (state, action) => {
  state.loading = false;
  state.currentUser = action.payload.data;
  state.IsLogin = true;
  state.authChecked = true; // ✅ mark auth resolved
})

.addCase(checkUser.rejected, (state) => {
  state.loading = false;
  state.IsLogin = false;
  state.currentUser = null;
  state.authChecked = true; // ✅ ALSO mark resolved
})
.addCase(updateProfile.pending, (state) => {
            state.loading = true;
        })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload.data;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })

},
});
export const { setMessage, clearAuthMessage } = authSlice.actions;
export default authSlice.reducer;