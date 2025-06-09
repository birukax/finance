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
        const response = await api.get('/gl/proration-types/', { params });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Proration Types.');
    }
})

export const fetchProrationType = createAsyncThunk('prorationType/fetchProrationType', async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/gl/proration-types/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Proration Type.');
    }
})

export const createProrationType = createAsyncThunk('prorationType/createProrationType', async (formData, { rejectWithValue }) => {
    try {
        const response = await api.post('/gl/proration-types/', formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to create Proration Type.')
    }
})

export const updateProrationType = createAsyncThunk('prorationType/updateProrationType', async (id, formData, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/gl/proration-types/${id}/`, formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update Proration Type.')
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
                state.prorationTypes.data = []

            })
            .addCase(fetchProrationTypes.fulfilled, (state, action: PayloadAction<[]>) => {
                state.prorationTypes.loading = false;
                state.prorationTypes.error = null;
                state.prorationTypes.data = action.payload;
            })
            .addCase(fetchProrationTypes.rejected, (state, action) => {
                state.prorationTypes.loading = false;
                state.prorationTypes.error = action.payload || 'Unknown error';
                state.prorationTypes.data = []
            })
            .addCase(fetchProrationType.pending, (state) => {
                state.prorationType.loading = true;
                state.prorationType.error = null;
                state.prorationType.data = []

            })
            .addCase(fetchProrationType.fulfilled, (state, action: PayloadAction<[]>) => {
                state.prorationType.loading = false;
                state.prorationType.error = null;
                state.prorationType.data = action.payload;
            })
            .addCase(fetchProrationType.rejected, (state, action) => {
                state.prorationType.loading = false;
                state.prorationType.error = action.payload || 'Unknown error';
                state.prorationType.data = []
            })
            .addCase(updateProrationTypes.pending, (state) => {
                state.prorationTypes.loading = true;
                state.prorationTypes.error = null;
                state.prorationTypes.data = []

            })
            .addCase(updateProrationTypes.fulfilled, (state, action: PayloadAction<[]>) => {
                state.prorationTypes.loading = false;
                state.prorationTypes.error = null;
                state.prorationTypes.data = action.payload;
            })
            .addCase(updateProrationTypes.rejected, (state, action) => {
                state.prorationTypes.loading = false;
                state.prorationTypes.error = action.payload || 'Unknown error';
                state.prorationTypes.data = []
            })
    }
})

export default prorationTypeSlice.reducer;