import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { Alert } from 'react-native';

// Async Thunks
export const fetchReferralCode = createAsyncThunk(
  'referral/fetchReferralCode',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/referral/code');
      return res.data.code;
    } catch (error) {
      let message = 'Failed to fetch referral code';
      if (error.response) {
        message = error.response.data?.message || JSON.stringify(error.response.data);
      } else if (error.message) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const fetchReferralTree = createAsyncThunk(
  'referral/fetchReferralTree',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/referral/tree');
      return res.data.tree || [];
    } catch (error) {
      let message = 'Failed to fetch referral tree';
      if (error.response) {
        message = error.response.data?.message || JSON.stringify(error.response.data);
      } else if (error.message) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const fetchReferralCommission = createAsyncThunk(
  'referral/fetchReferralCommission',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/referral/commission');
      return res.data.commission || 0;
    } catch (error) {
      let message = 'Failed to fetch commission';
      if (error.response) {
        message = error.response.data?.message || JSON.stringify(error.response.data);
      } else if (error.message) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const fetchReferralSummary = createAsyncThunk(
  'referral/fetchReferralSummary',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/referral/summary');
      return res.data;
    } catch (error) {
      let message = 'Failed to fetch referral summary';
      if (error.response) {
        message = error.response.data?.message || JSON.stringify(error.response.data);
      } else if (error.message) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

// Initial State
const initialState = {
  referralCode: null,
  referralTree: [],
  commission: 0,
  summary: {
    totalReferrals: 0,
    earnings: 0,
    activeInvestors: 0,
    referrals: [],
  },
  referralLoading: false,
  errorMsg: null,
};

const referralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {
    resetReferralState: (state) => {
      state.referralCode = null;
      state.referralTree = [];
      state.commission = 0;
      state.summary = {
        totalReferrals: 0,
        earnings: 0,
        activeInvestors: 0,
        referrals: [],
      };
      state.referralLoading = false;
      state.errorMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReferralCode.fulfilled, (state, action) => {
        state.referralCode = action.payload;
      })
      .addCase(fetchReferralTree.fulfilled, (state, action) => {
        state.referralTree = action.payload;
      })
      .addCase(fetchReferralCommission.fulfilled, (state, action) => {
        state.commission = action.payload;
      })
      .addCase(fetchReferralSummary.pending, (state) => {
        state.referralLoading = true;
        state.errorMsg = null;
      })
      .addCase(fetchReferralSummary.fulfilled, (state, action) => {
        const data = action.payload?.data ?? action.payload;

        // Debug alert to confirm referral data
        console.log('Referral Data:', data);
        Alert.alert(
          'Referral Data Loaded',
          `Total: ${data.totalReferrals}, Earnings: $${data.earnings}, Active: ${data.activeInvestors}`
        );

        state.referralLoading = false;
        state.summary = {
          totalReferrals: data.totalReferrals || 0,
          earnings: data.earnings || 0,
          activeInvestors: data.activeInvestors || 0,
          referrals: data.referrals || [],
        };
      })
      .addCase(fetchReferralSummary.rejected, (state, action) => {
        state.referralLoading = false;
        state.errorMsg = action.payload;
      });
  },
});

export const { resetReferralState } = referralSlice.actions;
export default referralSlice.reducer;
