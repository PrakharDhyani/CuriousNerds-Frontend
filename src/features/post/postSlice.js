import { createSlice } from "@reduxjs/toolkit";
import { uploadPost, uploadImg, getTimeLinePosts } from "./postAction";

const initialState = {
    loading: null,
    user: null,
    desc: null,
    image: null,
    userId: null,
    error: null,
    success: false,
    posts: []
}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // upload post reducer
        builder.addCase(uploadPost.pending, (state, action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(uploadPost.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.posts = [payload, ...state.posts]
        })
        builder.addCase(uploadPost.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        // upload image reducer
        builder.addCase(uploadImg.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(uploadImg.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
        })
        builder.addCase(uploadImg.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        // get timeline posts reducer
        builder.addCase(getTimeLinePosts.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(getTimeLinePosts.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            console.log("actio n payload", payload)
            state.posts = payload
        })
        builder.addCase(getTimeLinePosts.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
    },
})

export default postSlice.reducer

