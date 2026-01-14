import { createAsyncThunk } from "@reduxjs/toolkit";
const Url = "http://localhost:3000";
export const CreatePost = createAsyncThunk('CreatePost', async (data, { rejectWithValue }) => {

    try {
        // console.log(data)
        const response = await fetch(`${Url}/post`, {
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
        return rejectWithValue(error)
    }
})
export const GetPost = createAsyncThunk('GetPost', async (data, { rejectWithValue }) => {

    try {
        // console.log(data)
        const response = await fetch(`${Url}/posts`, {
            method: "Get",
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
export const GetMyPost = createAsyncThunk('GetMyPost', async (data, { rejectWithValue }) => {

    try {
        // console.log(data)
        const response = await fetch(`${Url}/myposts`, {
            method: "Get",

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
export const GetFriendPost = createAsyncThunk('GetFriendPost', async (data, { rejectWithValue }) => {

    try {
        // console.log(data)
        const response = await fetch(`${Url}/posts/${data}`, {
            method: "Get",
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
export const DeletePost = createAsyncThunk('DeletePost', async (data, { rejectWithValue }) => {

    try {
        // console.log(data)
        const response = await fetch(`${Url}/post/${data}`, {
            method: "POST",

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

export const addComment = createAsyncThunk(
    "addComment",
    async (data, { rejectWithValue }) => {
        try {
            // console.log(data);

            const response = await fetch(`${Url}/addComment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                return rejectWithValue(result);
            }

            // console.log(result);
            return result;
        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);
export const updateComment = createAsyncThunk(
    "updateComment",
    async (data, { rejectWithValue }) => {
        try {
            // console.log(data);

            const response = await fetch(`${Url}/updateComment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                return rejectWithValue(result);
            }

            // console.log(result);
            return result;
        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);

export const deleteComment = createAsyncThunk('deleteComment', async (data, { rejectWithValue }) => {
    try {
        // console.log(data)
        const response = await fetch(`${Url}/deleteComment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            credentials: "include",
            body: JSON.stringify(data),
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
        return rejectWithValue({ message: error.message })
    }
})
export const toggleLike = createAsyncThunk('toggleLike', async (data, { rejectWithValue }) => {
    try {
        // console.log(data)
        const response = await fetch(`${Url}/managelike`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            credentials: "include",
            body: JSON.stringify(data),
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