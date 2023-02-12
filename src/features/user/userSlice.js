// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { loginUser, registerUser, updateUser, followUser } from './userActions'


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
    reducers: {
        logoutUser: (state) => {
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
            state.success = false
            state.following = []
            state.followers = []
        }
    },
    extraReducers: (builder) => {
        //register user pending , fulfilled, rejected
        builder.addCase(registerUser.pending, (state, action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(registerUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
        })
        builder.addCase(registerUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        // login user pending , fulfilled, rejected
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.userToken = payload.userToken
        })
        builder.addCase(loginUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        // update user pending , fulfilled, rejected
        builder.addCase(updateUser.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(updateUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.userToken = payload.token
        })
        builder.addCase(updateUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        //followUser pending , fulfilled, rejected
        builder.addCase(followUser.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(followUser.fulfilled, (state, { payload }) => {
            // console.log("amshbd", payload, state)
            state.loading = false
            if (payload.following) {
                state.userInfo.user.following = [payload.id, ...state.userInfo.user.following]
            }
            else {
                state.userInfo.user.following = state.userInfo.user.following.filter((userId) => {
                    return userId !== payload.id
                })
            }
        })
        builder.addCase(followUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
    },
})

export default userSlice.reducer
export const { logoutUser } = userSlice.actions