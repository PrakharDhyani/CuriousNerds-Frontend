// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { loginUser, registerUser, logoutUser, updateUser, followUser } from './userActions'


const initialState = {
    loading: false,
    userInfo: null,
    userToken: null,
    error: null,
    success: false,
    following: [],
    followers: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        // register user
        [registerUser.pending]: (state) => {
            state.loading = true
            state.error = false
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        //login user
        [loginUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.userToken = payload.userToken
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        //logout user
        [logoutUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [logoutUser.fulfilled]: (state) => {
            state.loading = false
            state.userInfo = null
            state.userToken = null
        },
        [logoutUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        //update user
        [updateUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.userToken = payload.token
        },
        [updateUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        //follow / unfollow user
        [followUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [followUser.fulfilled]: (state, { payload }) => {
            console.log("amshbd", payload, state)
            state.loading = false
            if (payload.following) {
                state.userInfo.user.following = [payload.id, ...state.userInfo.user.following]
            }
            else {
                state.userInfo.user.following = state.userInfo.user.following.filter((userId) => {
                    return userId !== payload.id
                })
            }
        },
        [followUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    },
})

export default userSlice.reducer
