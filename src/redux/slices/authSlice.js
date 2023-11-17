import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../axios.js';

export const fetchAuthLogin = createAsyncThunk("auth/fetchAuthLogin", async (params) => {
	const { data } = await axios.post("auth/login", params);
	return data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
	const { data } = await axios("auth/me");
	return data;
});

const initialState = {
	data: null,
	status: "loaded"
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logOut: (state) => {
			state.data = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAuthLogin.pending, (state) => {
			state.status = "loading";
			state.data = null;
		})
		builder.addCase(fetchAuthLogin.fulfilled, (state, action) => {
			state.status = "loaded";
			state.data = action.payload;
		})
		builder.addCase(fetchAuthLogin.rejected, (state) => {
			state.status = "error";
			state.data = null;
		})
		builder.addCase(fetchAuthMe.pending, (state) => {
			state.status = "loading";
			state.data = null;
		})
		builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
			state.status = "loaded";
			state.data = action.payload;
		})
		builder.addCase(fetchAuthMe.rejected, (state) => {
			state.status = "error";
			state.data = null;
		});
	}
});

export const authReducer = authSlice.reducer;
export const { logOut } = authSlice.actions;

export const selectIsAuth = (state) => Boolean(state.auth.data);