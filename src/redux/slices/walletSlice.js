
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';


// Get Wallet Balance
export const getWalletBalance = createAsyncThunk(
    'wallet/getBalance',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/wallet/balance');
            
            return response.data.wallet;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch balance');
        }
    }
);

// Deposit Funds
export const depositFunds = createAsyncThunk(
    'wallet/deposit',
    async (amount, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/wallet/deposit', { amount });
            return response.data.message;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Deposit failed');
        }
    }
);

// Withdraw Funds
export const withdrawFunds = createAsyncThunk(
    'wallet/withdraw',
    async (amount, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/wallet/withdraw', { amount });
            return response.data.message;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Withdraw failed');
        }
    }
);
// // Get Transactions
export const getTransactions = createAsyncThunk(
    'wallet/getTransactions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/wallet/transactions');
            return response.data.transactions;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch transactions');
        }
    }
);
const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        wallet: null,
        loading: false,
        errorMsg: null,
        successMsg: null,
        transactions: [],
    },
    reducers: {
        clearWalletMessages: (state) => {
            state.errorMsg = null;
            state.successMsg = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // Get Wallet Balance
            .addCase(getWalletBalance.pending, (state) => {
                state.loading = true;
                state.errorMsg = null;
            })
            .addCase(getWalletBalance.fulfilled, (state, action) => {
                state.loading = false;
                state.wallet = action.payload; // store full wallet object
            })
            .addCase(getWalletBalance.rejected, (state, action) => {
                state.loading = false;
                state.errorMsg = action.payload;
            })

            // Deposit Funds
            .addCase(depositFunds.fulfilled, (state, action) => {
                state.successMsg = action.payload;
            })
            .addCase(depositFunds.rejected, (state, action) => {
                state.errorMsg = action.payload;
            })

            .addCase(depositFunds.pending, (state) => {
                state.loading = true;
                state.errorMsg = null;
            })
            // Withdraw Funds
            .addCase(withdrawFunds.fulfilled, (state, action) => {
                state.successMsg = action.payload;
            })
            .addCase(withdrawFunds.rejected, (state, action) => {
                state.errorMsg = action.payload;
            })

            // Get Transactions
            .addCase(getTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.loading = false;
                state.errorMsg = action.payload;
            });
    },
});

export const { clearWalletMessages } = walletSlice.actions;
export default walletSlice.reducer;
