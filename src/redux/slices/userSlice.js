import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Async thunk to get employee by ID
export const getEmployeeById = createAsyncThunk(
    'user/getEmployeeById',
    async (employeeId, { rejectWithValue }) => {
        try {
            console.log('Fetching user with ID:', employeeId);
            const response = await axiosInstance.get(`/profile/${employeeId}`);
            console.log('User fetched successfully:', response.data.user);
            
            return response.data.user;
        } catch (error) {
            console.log(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
        }
    }
);

// Async thunk to update user (must be authenticated)
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (updateData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put('/profile/update', updateData);
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update user');
        }
    }
);
export const uploadAvatar = createAsyncThunk(
    'auth/uploadAvatar',
    async (formData, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.userToken;

            const response = await axiosInstance.post('/profile/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.message;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Avatar upload failed');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetails: null,
        wallet: null,
        loading: false,
        errorMsg: null,
    },
    reducers: {
        clearUser: (state) => {
            state.userDetails = null;
            state.wallet = null;
            state.errorMsg = null;
            
        },
    },
    extraReducers: (builder) => {
        builder
            // Get Employee
            .addCase(getEmployeeById.pending, (state) => {
                state.loading = true;
                state.errorMsg = null;
            })
            // .addCase(getEmployeeById.fulfilled, (state, action) => {
            //     state.userDetails = action.payload;
            //     state.wallet = action.payload.wallet || null;
            //     state.loading = false;
            // })
            .addCase(getEmployeeById.fulfilled, (state, action) => {
                // console.log('Reducer fulfilled action payload:', action.payload);
                state.userDetails = action.payload;
                state.wallet = action.payload.wallet || null;
                state.loading = false;
              })
            .addCase(getEmployeeById.rejected, (state, action) => {
                state.loading = false;
                state.errorMsg = action.payload;
            })

            // Update User
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.errorMsg = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.userDetails = action.payload;
                state.loading = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.errorMsg = action.payload;
            })
            // Upload Avatar
            // builder
            .addCase(uploadAvatar.pending, (state) => {
                state.loading = true;
                state.errorMsg = null;
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails.avatar = action.payload; // Assuming avatar URL is returned
            })
            .addCase(uploadAvatar.rejected, (state, action) => {
                state.loading = false;
                state.errorMsg = action.payload;
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
