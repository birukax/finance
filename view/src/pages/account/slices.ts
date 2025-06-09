import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/api";

interface DataState {
    data: [] | null;
    loading: boolean;
    error: string | null;
}

interface AccountState {
    accounts: DataState;
    account: DataState;
}

const initialState: AccountState = {
    accounts: { data: [], loading: false, error: null },
    account: { data: [], loading: false, error: null },
}

export const fetchAccounts = createAsyncThunk('account/fetchAccounts', async (params, { rejectWithValue }) => {
    try {
        const response = await api.get('/gl/accounts/', { params });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Accounts.');
    }
})
export const fetchAccount = createAsyncThunk('account/fetchAccount', async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/gl/accounts/${id}/`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Account.');
    }
})
export const updateAccount = createAsyncThunk('account/updateAccount', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/gl/accounts/${id}/`, formData)
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update the Account.')
    }
})

export const updateAccounts = createAsyncThunk('account/updateAccounts', async (_, { rejectWithValue }) => {
    try {
        const response = await api.post('/gl/accounts/update_accounts/')
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update Accounts.');
    }
})

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccounts.pending, (state) => {
                state.accounts.loading = true;
                state.accounts.error = null;
                state.accounts.data = []

            })
            .addCase(fetchAccounts.fulfilled, (state, action: PayloadAction<[]>) => {
                state.accounts.loading = false;
                state.accounts.error = null;
                state.accounts.data = action.payload;
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.accounts.loading = false;
                state.accounts.error = action.payload || 'Unknown error';
                state.accounts.data = []
            })
            .addCase(fetchAccount.pending, (state) => {
                state.account.loading = true;
                state.account.error = null;
                state.account.data = []

            })
            .addCase(fetchAccount.fulfilled, (state, action: PayloadAction<[]>) => {
                state.account.loading = false;
                state.account.error = null;
                state.account.data = action.payload;
            })
            .addCase(fetchAccount.rejected, (state, action) => {
                state.account.loading = false;
                state.account.error = action.payload || 'Unknown error';
                state.account.data = []
            })
            .addCase(updateAccount.pending, (state) => {
                state.account.loading = true;
                state.account.error = null;
                state.account.data = []

            })
            .addCase(updateAccount.fulfilled, (state, action: PayloadAction<[]>) => {
                state.account.loading = false;
                state.account.error = null;
                state.account.data = action.payload;
            })
            .addCase(updateAccount.rejected, (state, action) => {
                state.account.loading = false;
                state.account.error = action.payload || 'Unknown error';
                state.account.data = []
            })
            .addCase(updateAccounts.pending, (state) => {
                state.accounts.loading = true;
                state.accounts.error = null;
                state.accounts.data = []

            })
            .addCase(updateAccounts.fulfilled, (state, action: PayloadAction<[]>) => {
                state.accounts.loading = false;
                state.accounts.error = null;
                state.accounts.data = action.payload;
            })
            .addCase(updateAccounts.rejected, (state, action) => {
                state.accounts.loading = false;
                state.accounts.error = action.payload || 'Unknown error';
                state.accounts.data = []
            })
    }
})

export default accountSlice.reducer;