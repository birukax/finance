import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/api";

interface DataState {
    data: [] | null;
    loading: boolean;
    error: string | null;
}

interface LabelPerHourState {
    labelPerHours: DataState;
    labelPerHour: DataState;
}

const initialState: LabelPerHourState = {
    labelPerHours: { data: [], loading: false, error: null },
    labelPerHour: { data: [], loading: false, error: null },
}

export const fetchLabelPerHours = createAsyncThunk('labelPerHour/fetchLabelPerHours', async (params, { rejectWithValue }) => {
    try {
        const response = await api.get('/production/label-per-hours/', { params });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch LabelPerHours.');
    }
})
export const fetchLabelPerHour = createAsyncThunk('labelPerHour/fetchLabelPerHour', async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/production/label-per-hours/${id}/`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Label-Per-Hour.');
    }
})
export const createLabelPerHour = createAsyncThunk('labelPerHour/createLabelPerHour', async (formData, { rejectWithValue }) => {
    try {
        const response = await api.post('/production/label-per-hours/', formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to create Label-Per-Hour.')
    }
})

export const updateLabelPerHour = createAsyncThunk('labelPerHour/updateLabelPerHour', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/production/label-per-hours/${id}/`, formData)
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update the Label-Per-Hour.')
    }
})

export const updateLabelPerHours = createAsyncThunk('labelPerHour/updateLabelPerHours', async (_, { rejectWithValue }) => {
    try {
        const response = await api.post('/production/label-per-hours/update_labelPerHours/')
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update LabelPerHours.');
    }
})

const labelPerHourSlice = createSlice({
    name: 'labelPerHour',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLabelPerHours.pending, (state) => {
                state.labelPerHours.loading = true;
                state.labelPerHours.error = null;
                state.labelPerHours.data = []

            })
            .addCase(fetchLabelPerHours.fulfilled, (state, action: PayloadAction<[]>) => {
                state.labelPerHours.loading = false;
                state.labelPerHours.error = null;
                state.labelPerHours.data = action.payload;
            })
            .addCase(fetchLabelPerHours.rejected, (state, action) => {
                state.labelPerHours.loading = false;
                state.labelPerHours.error = action.payload || 'Unknown error';
                state.labelPerHours.data = []
            })
            .addCase(fetchLabelPerHour.pending, (state) => {
                state.labelPerHour.loading = true;
                state.labelPerHour.error = null;
                state.labelPerHour.data = []

            })
            .addCase(fetchLabelPerHour.fulfilled, (state, action: PayloadAction<[]>) => {
                state.labelPerHour.loading = false;
                state.labelPerHour.error = null;
                state.labelPerHour.data = action.payload;
            })
            .addCase(fetchLabelPerHour.rejected, (state, action) => {
                state.labelPerHour.loading = false;
                state.labelPerHour.error = action.payload || 'Unknown error';
                state.labelPerHour.data = []
            })
            .addCase(createLabelPerHour.pending, (state) => {
                state.labelPerHour.loading = true;
                state.labelPerHour.error = null;
                state.labelPerHour.data = []

            })
            .addCase(createLabelPerHour.fulfilled, (state, action: PayloadAction<[]>) => {
                state.labelPerHour.loading = false;
                state.labelPerHour.error = null;
                state.labelPerHour.data = action.payload;
            })
            .addCase(createLabelPerHour.rejected, (state, action) => {
                state.labelPerHour.loading = false;
                state.labelPerHour.error = action.payload || 'Unknown error';
                state.labelPerHour.data = []
            })
            .addCase(updateLabelPerHour.pending, (state) => {
                state.labelPerHour.loading = true;
                state.labelPerHour.error = null;
                state.labelPerHour.data = []

            })
            .addCase(updateLabelPerHour.fulfilled, (state, action: PayloadAction<[]>) => {
                state.labelPerHour.loading = false;
                state.labelPerHour.error = null;
                state.labelPerHour.data = action.payload;
            })
            .addCase(updateLabelPerHour.rejected, (state, action) => {
                state.labelPerHour.loading = false;
                state.labelPerHour.error = action.payload || 'Unknown error';
                state.labelPerHour.data = []
            })
            .addCase(updateLabelPerHours.pending, (state) => {
                state.labelPerHours.loading = true;
                state.labelPerHours.error = null;
                state.labelPerHours.data = []

            })
            .addCase(updateLabelPerHours.fulfilled, (state, action: PayloadAction<[]>) => {
                state.labelPerHours.loading = false;
                state.labelPerHours.error = null;
                state.labelPerHours.data = action.payload;
            })
            .addCase(updateLabelPerHours.rejected, (state, action) => {
                state.labelPerHours.loading = false;
                state.labelPerHours.error = action.payload || 'Unknown error';
                state.labelPerHours.data = []
            })
    }
})

export default labelPerHourSlice.reducer;