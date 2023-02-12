import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../common/api/Api"

// userAction.js

export const registerUser = createAsyncThunk(
    // action type string
    'auth/register',
    // callback function
    async ({ firstname, lastname, username, password }, { rejectWithValue }) => {
        try {
            // make request to backend
            const { data } = await api.post('/auth/register', { firstname, lastname, username, password })
            return data;

        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)


export const loginUser = createAsyncThunk("auth/login", async ({ username, password }, { rejectWithValue }) => {
    try {
        // configure header's Content-Type as JSON
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        // make request to backend
        const { data } = await api.post(
            '/auth/login',
            { username, password },
            config
        )
        // console.log(data);
        localStorage.setItem('profile', JSON.stringify({ data }))
        return data;
    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})

export const updateUser = createAsyncThunk("auth/update", async ({ id, formData }, { rejectWithValue }) => {
    try {
        // make request to backend
        console.log(id + " " + formData)
        const { data } = await api.put(`/user/${id}`, formData)
        localStorage.setItem('profile', JSON.stringify({ data }))
        console.log({ data })
        return data;
    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})
export const followUser = createAsyncThunk("user/follow", async ({ id, user, following }, { rejectWithValue }) => {
    try {
        const { data } = await api.put(`/user/${id}/follow`, user);
        return { id, following };
    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})
