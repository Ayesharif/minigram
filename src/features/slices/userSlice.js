import { createSlice } from "@reduxjs/toolkit";
import { getAllUser, getFriendsProfile, getProfile, toggleFollower } from "../actions/userAction";


export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        myProfile: {},
        profile: {},
        friends: [],
        users: [],
        loading: false,
        message: null,
        status: 0,

    },
    reducers: {

        clearMessage: (state) => {
            state.message = "";
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;

            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })

            .addCase(getProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.myProfile= action.payload.data;
                state.friends= action.payload.friends;

            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(getFriendsProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFriendsProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile= action.payload.data;
                state.friends= action.payload.friends;

            })
            .addCase(getFriendsProfile.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })

            .addCase(toggleFollower.pending, (state) => {
                state.loading = true;
            })
            .addCase(toggleFollower.fulfilled, (state, action) => {
                state.loading = false;

                const user= state.friends.find((f)=>f._id==action.payload.id);
                    if (action.payload.message === "User followed") {
                        state.users= state.users.filter((u) => u._id !== action.payload.id);
                        state.friends.push(user);
                        state.message=action.payload.message
                        state.status=action.payload.status
                    }
                    if (action.payload.message === "User unfollowed") {
                        state.loading=true
                        setTimeout(() => {
                            state.loading=false
                            
                        }, 3000);

                    state.friends= state.friends.filter((u) => u._id !== action.payload.id);
                    state.users.push(user);
                    state.message=action.payload.message
                    state.status=action.payload.status
                }

            })
            .addCase(toggleFollower.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })



    }
})

export const { clearMessage } = userSlice.actions;
export default userSlice.reducer;