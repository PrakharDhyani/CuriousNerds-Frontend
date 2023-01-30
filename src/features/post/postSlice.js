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
    extraReducers: {
        [uploadPost.pending]: (state) => {
            state.loading = true
            state.error = false
        },
        [uploadPost.fulfilled]: (state, action) => {
            state.loading = false
            state.success = true
            state.posts = [action.payload, ...state.posts]
        },
        [uploadPost.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [uploadImg.pending]: (state) => {
            state.loading = true
            state.error = false
        },
        [uploadImg.fulfilled]: (state, action) => {
            state.loading = false
            state.success = true
        },
        [uploadImg.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [getTimeLinePosts.pending]: (state) => {
            state.loading = true
            state.error = false
        },
        [getTimeLinePosts.fulfilled]: (state, action) => {
            state.loading = false
            state.success = true
            console.log("actio n payload", action.payload)
            state.posts = action.payload
        },
        [getTimeLinePosts.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        //     [likePost.pending]: (state) => {
        //         state.loading = true
        //         state.error = false
        //     },
        //     [likePost.fulfilled]: (state, { payload }) => {
        //         state.loading = false
        //         state.success = true
        //         console.log("jahsgda", payload.like)
        //         if (payload.like) {
        //             state.posts.map((post) => {
        //                 if (post._id === payload.id) {
        //                     post.likes = [payload.userId, ...post.likes];
        //                 }
        //             })
        //         } else {
        //             state.posts.map((post) => {
        //                 if (post._id === payload.id) {
        //                     post.likes.filter((userid) => {
        //                         return userid !== payload.userId;
        //                     })
        //                 }
        //             })
        //         }
        //     },
        //     [likePost.rejected]: (state, action) => {
        //         state.loading = false
        //         state.error = action.payload
        //     },
    }

})

export default postSlice.reducer

