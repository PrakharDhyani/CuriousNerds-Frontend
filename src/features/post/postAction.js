import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../common/api/Api"


export const uploadPost = createAsyncThunk("post/sendPost", async ({ userId, desc, image, user }, { rejectWithValue }) => {
    //make a req to backend
    try {
        const { data } = await api.post("/post", { userId, desc, image, user });
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
export const uploadImg = createAsyncThunk("post/sendImage", async (data, { rejectWithValue }) => {
    //make a req to backend
    try {
        const res = await api.post("/upload", data);
        return res;

    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})

export const getTimeLinePosts = createAsyncThunk("post/getTimeLinePosts", async (id, { rejectWithValue }) => {
    //make a req to backend
    try {
        const res = await api.get(`/post/${id}/timeline`);
        // console.log(res.data)
        return res.data;
    }
    catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})
export const likePost = createAsyncThunk("post/likePost", async ({ id, userId, like }, { rejectWithValue }) => {
    //make a req to backend
    try {
        console.log(like)
        const res = await api.put(`/post/${id}/like`, { userId });
        return res;
    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})
export const deletePost = createAsyncThunk("post/deletePost", async ({ data, user }, { rejectWithValue }) => {
    // console.log(data, user._id)
    const userId = user._id;
    //make a req to backend
    try {
        const res = await api.delete(`/post/${data._id}/${userId}`);
        return res;
    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})








// { "olddata": [{ "userId": "639987508cde4ceb07f59dbd", "desc": "", "likes": [], "image": "1673892558111_logoblack.png", "_id": "63c592ce3708914885eafc97", "createdAt": "2023-01-16T18:09:18.147Z", "updatedAt": "2023-01-16T18:09:18.147Z", "__v": 0 }] }