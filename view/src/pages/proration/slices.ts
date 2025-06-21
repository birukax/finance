import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/api";

interface DataState {
    data: [] | null;
    loading: boolean;
    error: string | null;
}

interface ProrationState {
    prorations: DataState;
    proration: DataState;
}

const initialState: ProrationState = {
    prorations: { data: [], loading: false, error: null },
    proration: { data: [], loading: false, error: null },
}

export const fetchProrations = createAsyncThunk('proration/fetchProrations', async (params, { rejectWithValue }) => {
    try {
        const response = await api.get('/proration/prorations/', { params });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Prorations.');
    }
})

export const fetchProration = createAsyncThunk('proration/fetchProration', async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/proration/prorations/${id}/`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Proration.');
    }
})

export const createProration = createAsyncThunk('proration/createProration', async (formData, { rejectWithValue }) => {
    try {
        const response = await api.post('/proration/prorations/', formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to create Proration.')
    }
})

export const updateProration = createAsyncThunk('proration/updateProration', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/proration/prorations/${id}/`, formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update Proration.');
    }
})

const prorationSlice = createSlice({
    name: 'proration',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProrations.pending, (state) => {
                state.prorations.loading = true;
                state.prorations.error = null;

            })
            .addCase(fetchProrations.fulfilled, (state, action: PayloadAction<[]>) => {
                state.prorations.loading = false;
                state.prorations.error = null;
                state.prorations.data = action.payload;
            })
            .addCase(fetchProrations.rejected, (state, action) => {
                state.prorations.loading = false;
                state.prorations.error = action.payload || 'Unknown error';
            })
            .addCase(fetchProration.pending, (state) => {
                state.proration.loading = true;
                state.proration.error = null;

            })
            .addCase(fetchProration.fulfilled, (state, action: PayloadAction<[]>) => {
                state.proration.loading = false;
                state.proration.error = null;
                state.proration.data = action.payload;
            })
            .addCase(fetchProration.rejected, (state, action) => {
                state.proration.loading = false;
                state.proration.error = action.payload || 'Unknown error';
            })
            .addCase(createProration.pending, (state) => {
                state.proration.loading = true;
                state.proration.error = null;
            })
            .addCase(createProration.fulfilled, (state, action: PayloadAction<[]>) => {
                state.proration.loading = false;
                state.proration.error = null;
                state.proration.data = action.payload;
            })
            .addCase(createProration.rejected, (state, action) => {
                state.proration.loading = false;
                state.proration.error = action.payload || 'Unknown error';
            })
            .addCase(updateProration.pending, (state) => {
                state.proration.loading = true;
                state.proration.error = null;
            })
            .addCase(updateProration.fulfilled, (state, action: PayloadAction<[]>) => {
                state.proration.loading = false;
                state.proration.error = null;
                state.proration.data = action.payload;
            })
            .addCase(updateProration.rejected, (state, action) => {
                state.proration.loading = false;
                state.proration.error = action.payload || 'Unknown error';
            })
    }
})

export default prorationSlice.reducer;