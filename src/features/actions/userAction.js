import { createAsyncThunk } from "@reduxjs/toolkit";

const Url = "https://minigram-backend.vercel.app";
export const updateProfile = createAsyncThunk('updateProfile', async (data, { rejectWithValue }) => {

    try {

        const response = await fetch(`${Url}/updateProfile`, {
            method: "POST",
            credentials: "include",

            body: data,
        }
        )
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        const result = await response.json()
        // console.log(result)

        return result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const toggleFollower = createAsyncThunk('toggleFollower', async (data, { rejectWithValue }) => {
    try {
        // console.log(data)
        const response = await fetch(`${Url}/managefollowers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            credentials: "include",
            body: JSON.stringify({friendId:data}),
        }
        )
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        const result = await response.json()
        // console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const logout = createAsyncThunk('logout', async (data, { rejectWithValue }) => {
    try {
        // console.log(data)
        const response = await fetch('https://swapy-backend.vercel.app/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            credentials: "include",

        }
        )
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        const result = await response.json()
        // console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getProfile = createAsyncThunk('getProfile', async (data, { rejectWithValue }) => {
    try {

        const response = await fetch(`${Url}/profile`, {
            method: "GET",
            credentials: "include",

        }
        )
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        const result = await response.json()
        // console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getFriendsProfile = createAsyncThunk('getFriendsProfile', async (data, { rejectWithValue }) => {
    try {

        const response = await fetch(`${Url}/profile/${data}`, {
            method: "GET",
            credentials: "include",

        }
        )
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        const result = await response.json()
        // console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getAllUser = createAsyncThunk('getAllUser', async (data, { rejectWithValue }) => {
    try {

        const response = await fetch(`${Url}${data ? `/users?name=${data}`:"/users"}`, {
            method: "GET",
            credentials: "include",

        }
        )
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        const result = await response.json()
        // console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})