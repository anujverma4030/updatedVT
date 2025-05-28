import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../api/axiosInstance';


// Async thunk for login
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            const result = response.data;

            if (result.success && result.token) {
                const token = result.token;
                const user = result.user || {}; // Avoid destructuring error

                await AsyncStorage.setItem('userToken', token);
                await AsyncStorage.setItem('userInfo', JSON.stringify(user));

                return { token, user };
            } else {
                return rejectWithValue(result.message || 'Login failed');
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed. Please try again.');
        }
    }
);

// Async thunk for signup
export const signup = createAsyncThunk(
    'auth/signup',
    async ({ name, username, email, mobile, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/signup', {
                name,
                username,
                email,
                mobile,
                password,
            });
            const result = response.data;
            if (result.success) {
                return result.message;
            } else {
                return rejectWithValue(result.message || 'Signup failed');
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Signup failed. Please try again.');
        }
    }
);

// Async thunk for loading token from storage
export const loadToken = createAsyncThunk(
    'auth/loadToken',
    async (_, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const user = await AsyncStorage.getItem('userInfo');
            return { token, user: user ? JSON.parse(user) : null };
        } catch (error) {
            return rejectWithValue('Failed to load token');
        }
    }
);

// Async thunk for logout
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await AsyncStorage.removeItem('userToken');
        return null;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userToken: null,
        userInfo: null,
        loading: false,
        errorMsg: null,
    },
    reducers: {
        logout: (state) => {
            AsyncStorage.removeItem('userToken');
            AsyncStorage.removeItem('userInfo');
            state.userToken = null;
            state.userInfo = null;
        },
        loadUserFromStorage: (state, action) => {
            state.userToken = action.payload.token;
            state.userInfo = action.payload.user;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.errorMsg = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.userToken = action.payload.token;
                state.userInfo = action.payload.user;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.errorMsg = action.payload;
            })

            // Signup
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.errorMsg = null;
            })
            .addCase(signup.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.errorMsg = action.payload;
            })

            // Load token
            .addCase(loadToken.fulfilled, (state, action) => {
                state.userToken = action.payload.token;
                state.userInfo = action.payload.user;
              })

            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.userToken = null;
            });
    },
});
export const { logout: logoutAction, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
