import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Dashboard Stats // Completed
export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard');
      // console.log('Dashboard Details:', response.data.stats);
      return response.data.stats;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Approve All Withdrawals
export const approveAllWithdrawals = createAsyncThunk("admin/approveAllWithdrawals", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/admin/approvewithdrawals");
    return res.data.transactions;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
//  Create Investment Plan
export const createInvestmentPlan = createAsyncThunk("admin/createInvestmentPlan", async (payload, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/admin/investment/plan", payload);
    return res.data.plan;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
// All Investment Plans // completed
export const fetchAllInvestmentPlans = createAsyncThunk(
  'admin/fetchAllInvestmentPlans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/investment/plans');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Fetch User Investments
export const fetchUserInvestments = createAsyncThunk("admin/fetchUserInvestments", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/admin/userinvestments");
    return res.data.investments;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
// Update Investment Plan
export const updateInvestmentPlan = createAsyncThunk(
  'admin/updateInvestmentPlan',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/plan/${id}`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// All Users
export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/users');
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Single User by ID
export const fetchUserById = createAsyncThunk(
  'admin/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Toggle User Status
export const toggleUserStatus = createAsyncThunk(
  'admin/toggleUserStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/user/status/${id}`, { status });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Toggle Deposit Status
export const toggleDepositStatus = createAsyncThunk("admin/toggleDepositStatus", async ({ id, status }, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/admin/depositstatus/${id}`, { status });
    return res.data.transaction;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
// Toggle Withdrawal Status
export const toggleWithdrawalStatus = createAsyncThunk("admin/toggleWithdrawalStatus", async ({ id, status }, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/admin/withdrawalstatus/${id}`, { status });
    return res.data.transaction;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// All Transactions
export const fetchTransactionReports = createAsyncThunk(
  'admin/fetchTransactionReports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/transactions');
      return response.data.transactions;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// All Deposits
export const fetchAllDeposits = createAsyncThunk(
  'admin/fetchAllDeposits',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/wallet/deposits');
      return response.data.transactions;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// All Withdrawals
export const fetchAllWithdrawals = createAsyncThunk(
  'admin/fetchAllWithdrawals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/wallet/withdrawals');
      return response.data.transactions;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); 

// All Spins
export const fetchSpinLogs = createAsyncThunk(
  'admin/fetchSpinLogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/spins/logs');
      return response.data.spins;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Referral Stats
export const fetchReferralStats = createAsyncThunk(
  'admin/fetchReferralStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/referrals');
      return response.data.referrals;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// All User Investments
// export const fetchAllUserInvestments = createAsyncThunk(
//   'admin/fetchAllUserInvestments',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get('/admin/investments');
//       return response.data.investments;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    dashboardStats: null,
    users: [],
    singleUser: null,
    investmentPlans: [],
    userInvestments: [],
    deposits: [],
    withdrawals: [],
    spins: [],
    referralStats: [],
    transactionReports: [],
    loading: false,
    error: null,
    singleUserLoading: false,
    selectedPlan: null,
    selectedPlanMode: 'edit',
  },
  reducers: {setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload.plan;
      state.selectedPlanMode = action.payload.mode;
    },
    clearSelectedPlan: (state) => {
      state.selectedPlan = null;
      state.selectedPlanMode = 'edit';
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Users
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      // Single User
      
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.singleUser = action.payload;
        state.singleUserLoading = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.singleUserLoading = false;
        state.error = action.payload;
      })
      // Toggle User Status
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        // You may want to update user status in users list if needed
        state.singleUser = action.payload;
      })
      // Investment Plans
      .addCase(fetchAllInvestmentPlans.fulfilled, (state, action) => {
        state.investmentPlans = action.payload;
        state.loading = false;
      })

      // Deposits and Withdrawals
      .addCase(fetchAllDeposits.fulfilled, (state, action) => {
        state.deposits = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllWithdrawals.fulfilled, (state, action) => {
        state.withdrawals = action.payload;
        state.loading = false;
      })
      // Update Investment Plan
      .addCase(updateInvestmentPlan.fulfilled, (state, action) => {
        // optionally update the investmentPlans list

      })
      // Spins
      .addCase(fetchSpinLogs.fulfilled, (state, action) => {
        state.spins = action.payload;
        state.loading = false;
      })
      // Referral Stats
      .addCase(fetchReferralStats.fulfilled, (state, action) => {
        state.referralStats = action.payload;
      })
      // Transaction Reports
      .addCase(fetchTransactionReports.fulfilled, (state, action) => {
        state.transactionReports = action.payload;
      })
      // Create Investment Plan
      .addCase(createInvestmentPlan.fulfilled, (state, action) => {
        state.investmentPlans.push(action.payload);
        state.loading = false;
      })
      // Fetch User Investments
      .addCase(fetchUserInvestments.fulfilled, (state, action) => {
        state.userInvestments = action.payload;
        state.loading = false;
      })
      // Approve All Withdrawals
      .addCase(approveAllWithdrawals.fulfilled, (state, action) => {
        state.withdrawals = action.payload;
        state.loading = false;
      })
      // Toggle Deposit Status
      .addCase(toggleDepositStatus.fulfilled, (state, action) => {
        const updatedDeposits = state.deposits.map(deposit =>
          deposit.id === action.payload.id ? action.payload : deposit
        );
        state.deposits = updatedDeposits;
        state.loading = false;
      })
      // Toggle Withdrawal Status
      .addCase(toggleWithdrawalStatus.fulfilled, (state, action) => {
        const updatedWithdrawals = state.withdrawals.map(withdrawal =>
          withdrawal.id === action.payload.id ? action.payload : withdrawal
        );
        state.withdrawals = updatedWithdrawals;
        state.loading = false;
      })
      // handle fulfilled actions globally
      .addMatcher(
        (action) => action.type.startsWith('admin/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )

      // handle rejections globally
      .addMatcher(
        (action) => action.type.startsWith('admin/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addMatcher(
        (action) => action.type.startsWith('admin/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      );

      
  }
});

export default adminSlice.reducer;
export const { setSelectedPlan, clearSelectedPlan } = adminSlice.actions;
