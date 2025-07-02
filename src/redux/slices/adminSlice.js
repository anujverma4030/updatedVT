import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { Alert } from 'react-native'; 
// Dashboard Stats
export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard');
      return response.data.stats;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Investment Plan with error alert
export const deleteInvestmentPlan = createAsyncThunk(
  'admin/deleteInvestmentPlan',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/admin/deleteplan/${id}`);
      return { id };
    } catch (error) {
      const errorMsg = error?.response?.data || error.message || 'Unknown error';
      console.error('❌ Delete API failed:', errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);



export const approveAllWithdrawals = createAsyncThunk("admin/approveAllWithdrawals", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/admin/approvewithdrawals");
    return res.data.transactions;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const createInvestmentPlan = createAsyncThunk("admin/createInvestmentPlan", async (payload, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/admin/investment/plan", payload);
    return res.data.plan;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

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

export const fetchUserInvestments = createAsyncThunk("admin/fetchUserInvestments", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/admin/userinvestments");
    return res.data.investments;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateInvestmentPlan = createAsyncThunk(
  'admin/updateInvestmentPlan',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/investment/updateplan/${id}`, data); // ✅ FIXED
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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

export const toggleDepositStatus = createAsyncThunk("admin/toggleDepositStatus", async ({ id, status }, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/admin/depositstatus/${id}`, { status });
    return res.data.transaction;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const toggleWithdrawalStatus = createAsyncThunk("admin/toggleWithdrawalStatus", async ({ id, status }, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/admin/withdrawalstatus/${id}`, { status });
    return res.data.transaction;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

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
  reducers: {
    setSelectedPlan: (state, action) => {
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
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.singleUser = action.payload;
        state.singleUserLoading = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.singleUserLoading = false;
        state.error = action.payload;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.singleUser = action.payload;
      })
      .addCase(fetchAllInvestmentPlans.fulfilled, (state, action) => {
        state.investmentPlans = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllDeposits.fulfilled, (state, action) => {
        state.deposits = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllWithdrawals.fulfilled, (state, action) => {
        state.withdrawals = action.payload;
        state.loading = false;
      })
      .addCase(fetchSpinLogs.fulfilled, (state, action) => {
        state.spins = action.payload;
        state.loading = false;
      })
      .addCase(fetchReferralStats.fulfilled, (state, action) => {
        state.referralStats = action.payload;
      })
      .addCase(fetchTransactionReports.fulfilled, (state, action) => {
        state.transactionReports = action.payload;
      })
      .addCase(createInvestmentPlan.fulfilled, (state, action) => {
        const plan = action.payload;
        if (plan.amount && !plan.minAmount) {
          plan.minAmount = plan.amount;
        }
        state.investmentPlans.push(plan);
        state.loading = false;
      })
      .addCase(fetchUserInvestments.fulfilled, (state, action) => {
        state.userInvestments = action.payload;
        state.loading = false;
      })
      .addCase(approveAllWithdrawals.fulfilled, (state, action) => {
        state.withdrawals = action.payload;
        state.loading = false;
      })
      .addCase(toggleDepositStatus.fulfilled, (state, action) => {
        state.deposits = state.deposits.map(d =>
          d.id === action.payload.id ? action.payload : d
        );
        state.loading = false;
      })
      .addCase(toggleWithdrawalStatus.fulfilled, (state, action) => {
        state.withdrawals = state.withdrawals.map(w =>
          w.id === action.payload.id ? action.payload : w
        );
        state.loading = false;
      })
      .addCase(updateInvestmentPlan.fulfilled, (state, action) => {
        const updatedPlan = action.payload;
        const index = state.investmentPlans.findIndex(plan => plan.id === updatedPlan.id);
        if (index !== -1) {
          state.investmentPlans[index] = updatedPlan;
        }
      })

      // ✅ Delete Investment Plan — SUCCESS
      .addCase(deleteInvestmentPlan.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        state.investmentPlans = state.investmentPlans.filter(plan => plan.id !== deletedId);
      })

      // ❌ Delete Investment Plan — ERROR ALERT
      .addCase(deleteInvestmentPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        const errorMessage =
          typeof action.payload === 'string'
            ? action.payload
            : action.payload?.message || 'Unknown error occurred while deleting the plan.';
        Alert.alert('❌ Delete Failed', errorMessage); // ✅ Native Alert
      })

      // Global Matchers
      .addMatcher(
        (action) => action.type.startsWith('admin/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
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
  },
});

export default adminSlice.reducer;
export const { setSelectedPlan, clearSelectedPlan } = adminSlice.actions;
