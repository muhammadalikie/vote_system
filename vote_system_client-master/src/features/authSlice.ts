import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {toast} from "react-toastify";
import {removeItem, setItem, TOKEN_KEY} from "../services/storage.ts";
import {AuthState, UserForm} from "../types/auth.ts";
import {getUserService, signinService} from "../services/auth.ts";



export const signin = createAsyncThunk(
  'auth/signin',
  async (formData: UserForm, thunkAPI) => {
    try {
      return await signinService(formData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.error);
    }
  }
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, thunkAPI) => {
    try {
      return await getUserService();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.error);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authStatus: 'idle',
    user: null,
  } as AuthState,
  reducers: {
    logout: state => {
      removeItem(TOKEN_KEY);
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, state => {
        state.authStatus = 'loading';
      })
      .addCase(signin.fulfilled, (state, action) => {
        if (action.payload) {
          setItem(TOKEN_KEY, action.payload.access);
          state.authStatus = 'succeeded';
        }
      })
      .addCase(signin.rejected, (state, action) => {
        state.authStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
      .addCase(getUser.pending, state => {
        state.authStatus = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.authStatus = 'succeeded';
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.authStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;