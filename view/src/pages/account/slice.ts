import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from '../../utils/api';

interface Tokens {
    access: string | null;
    refresh: string | null;
    loading: boolean;
    error: string | null;
}

interface AuthState {
    tokens: Tokens;
}

const initialState: AuthState = {
    tokens: { access: null, refresh: null, loading: false, error: null },
};

export const login = createAsyncThunk('auth/login', async (formData, { rejectWithValue }) => {
    try {
        const response = await api.post('/api/token/',  formData )
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error?.response?.data || "Login failed")
    }
})

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { dispatch }) => {
        try {
            dispatch(clearTokens());
        } catch (error) {
            throw new Error(error?.response?.data || "Logout failed");
        }
    }
);
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<Tokens>) => {
            state.tokens = action.payload;
        },
        clearTokens: (state) => {
            state.tokens.access = null;
            state.tokens.refresh = null;
            state.tokens.loading = false;
            state.tokens.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.tokens.loading = true;
                state.tokens.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.tokens.access = action.payload.access
                state.tokens.refresh = action.payload.refresh
                state.tokens.loading = false
                state.tokens.error = null
            })
            .addCase(login.rejected, (state, action) => {
                state.tokens.error = action.payload || 'Unknown error'
                state.tokens.loading = false
                state.tokens.access = null
                state.tokens.refresh = null
            })
    }
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;