import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { Alert } from 'react-native';

export interface BonusItem {
  name: string;
  date: string;
  amount: number;
  level: number;
}

interface RewardSummary {
  totalReferrals: number;
  earnings: number;
  activeInvestors: number;
}

interface RewardState {
  rewardBalance: number;
  spinBalance: number;
  referralBalance: number;  // added this field
  summary: RewardSummary;
  bonusHistory: BonusItem[];
  loading: boolean;
  error: string | null;
}

export const fetchRewardInfo = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>(
  'reward/fetchRewardInfo',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/reward/getreward');
      return res.data;
    } catch (error: any) {
      let message = 'Failed to fetch reward info';
      if (error.response) {
        message = error.response.data?.message || JSON.stringify(error.response.data);
      } else if (error.message) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

const initialState: RewardState = {
  rewardBalance: 0,
  spinBalance: 0,
  referralBalance: 0,
  summary: {
    totalReferrals: 0,
    earnings: 0,
    activeInvestors: 0,
  },
  bonusHistory: [],
  loading: false,
  error: null,
};

const rewardSlice = createSlice({
  name: 'reward',
  initialState,
  reducers: {
    resetRewardState: (state) => {
      state.rewardBalance = 0;
      state.spinBalance = 0;
      state.referralBalance = 0;
      state.summary = {
        totalReferrals: 0,
        earnings: 0,
        activeInvestors: 0,
      };
      state.bonusHistory = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewardInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRewardInfo.fulfilled, (state, action: PayloadAction<any>) => {
        const data = action.payload;

        // Alert to check backend data keys and values
        Alert.alert(
          'Reward Info',
          `Spin Balance: $${data.spineBalance}\nReferral Balance: $${data.referralBalance}\nReward Balance: $${data.rewardBalance}`
        );

        state.loading = false;
        // Map backend keys correctly
        state.rewardBalance = data.rewardBalance ?? 0;
        state.spinBalance = data.spineBalance ?? 0;  // Note: backend uses 'spineBalance'
        state.referralBalance = data.referralBalance ?? 0;
        state.summary = data.summary ?? {
          totalReferrals: 0,
          earnings: 0,
          activeInvestors: 0,
        };
        state.bonusHistory =
          data.bonusHistory?.length > 0
            ? data.bonusHistory
            : [
                { name: 'Rohit Sharma', date: new Date().toISOString(), amount: 25, level: 1 },
                { name: 'Kunal Verma', date: new Date().toISOString(), amount: 40, level: 1 },
                { name: 'Shruti Mehta', date: new Date().toISOString(), amount: 30, level: 1 },
              ];
      })
      .addCase(fetchRewardInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch reward info';
      });
  },
});

export const { resetRewardState } = rewardSlice.actions;
export default rewardSlice.reducer;
