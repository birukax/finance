import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/api";

interface DataState {
    data: [] | null;
    loading: boolean;
    error: string | null;
}

interface ProrationTypeState {
    prorationTypes: DataState;
    prorationType: DataState;
}

const initialState: ProrationTypeState = {
    prorationTypes: { data: [], loading: false, error: null },
    prorationType: { data: [], loading: false, error: null },
}

export const fetchProrationTypes = createAsyncThunk('prorationType/fetchProrationTypes', async (params, { rejectWithValue }) => {
    try {
        const response = await api.get('/proration/proration-types/', { params });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Proration Types.');
    }
})

export const fetchProrationType = createAsyncThunk('prorationType/fetchProrationType', async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/proration/proration-types/${id}/`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Proration Type.');
    }
})

export const createProrationType = createAsyncThunk('prorationType/createProrationType', async (formData, { rejectWithValue }) => {
    try {
        const response = await api.post('/proration/proration-types/', formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to create Proration Type.')
    }
})

export const updateProrationType = createAsyncThunk('prorationType/updateProrationType', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/proration/proration-types/${id}/`, formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update Proration Type.');
    }
})

const prorationTypeSlice = createSlice({
    name: 'prorationType',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProrationTypes.pending, (state) => {
                state.prorationTypes.loading = true;
                state.prorationTypes.error = null;

            })
            .addCase(fetchProrationTypes.fulfilled, (state, action: PayloadAction<[]>) => {
                state.prorationTypes.loading = false;
                state.prorationTypes.error = null;
                state.prorationTypes.data = action.payload;
            })
            .addCase(fetchProrationTypes.rejected, (state, action) => {
                state.prorationTypes.loading = false;
                state.prorationTypes.error = action.payload || 'Unknown error';
            })
            .addCase(fetchProrationType.pending, (state) => {
                state.prorationType.loading = true;
                state.prorationType.error = null;

            })
            .addCase(fetchProrationType.fulfilled, (state, action: PayloadAction<[]>) => {
                state.prorationType.loading = false;
                state.prorationType.error = null;
                state.prorationType.data = action.payload;
            })
            .addCase(fetchProrationType.rejected, (state, action) => {
                state.prorationType.loading = false;
                state.prorationType.error = action.payload || 'Unknown error';
            })
            .addCase(createProrationType.pending, (state) => {
                state.prorationType.loading = true;
                state.prorationType.error = null;
            })
            .addCase(createProrationType.fulfilled, (state, action: PayloadAction<[]>) => {
                state.prorationType.loading = false;
                state.prorationType.error = null;
                state.prorationType.data = action.payload;
            })
            .addCase(createProrationType.rejected, (state, action) => {
                state.prorationType.loading = false;
                state.prorationType.error = action.payload || 'Unknown error';
            })
            .addCase(updateProrationType.pending, (state) => {
                state.prorationType.loading = true;
                state.prorationType.error = null;
            })
            .addCase(updateProrationType.fulfilled, (state, action: PayloadAction<[]>) => {
                state.prorationType.loading = false;
                state.prorationType.error = null;
                state.prorationType.data = action.payload;
            })
            .addCase(updateProrationType.rejected, (state, action) => {
                state.prorationType.loading = false;
                state.prorationType.error = action.payload || 'Unknown error';
            })
    }
})

export default prorationTypeSlice.reducer;