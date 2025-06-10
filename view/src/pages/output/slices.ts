import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/api";

interface DataState {
    data: [] | null;
    loading: boolean;
    error: string | null;
}

interface OutputState {
    outputs: DataState;
    output: DataState;
}

const initialState: OutputState = {
    outputs: { data: [], loading: false, error: null },
    output: { data: [], loading: false, error: null },
}

export const fetchOutputs = createAsyncThunk('output/fetchOutputs', async (params, { rejectWithValue }) => {
    try {
        const response = await api.get('/production/outputs/', { params });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Outputs.');
    }
})
export const fetchOutput = createAsyncThunk('output/fetchOutput', async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/production/outputs/${id}/`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Output.');
    }
})
export const updateOutput = createAsyncThunk('output/updateOutput', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/production/outputs/${id}/`, formData)
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update the Output.')
    }
})

export const updateOutputs = createAsyncThunk('output/updateOutputs', async (_, { rejectWithValue }) => {
    try {
        const response = await api.post('/production/outputs/update_outputs/')
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update Outputs.');
    }
})

const outputSlice = createSlice({
    name: 'output',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOutputs.pending, (state) => {
                state.outputs.loading = true;
                state.outputs.error = null;
                state.outputs.data = []

            })
            .addCase(fetchOutputs.fulfilled, (state, action: PayloadAction<[]>) => {
                state.outputs.loading = false;
                state.outputs.error = null;
                state.outputs.data = action.payload;
            })
            .addCase(fetchOutputs.rejected, (state, action) => {
                state.outputs.loading = false;
                state.outputs.error = action.payload || 'Unknown error';
                state.outputs.data = []
            })
            .addCase(fetchOutput.pending, (state) => {
                state.output.loading = true;
                state.output.error = null;
                state.output.data = []

            })
            .addCase(fetchOutput.fulfilled, (state, action: PayloadAction<[]>) => {
                state.output.loading = false;
                state.output.error = null;
                state.output.data = action.payload;
            })
            .addCase(fetchOutput.rejected, (state, action) => {
                state.output.loading = false;
                state.output.error = action.payload || 'Unknown error';
                state.output.data = []
            })
            .addCase(updateOutput.pending, (state) => {
                state.output.loading = true;
                state.output.error = null;
                state.output.data = []

            })
            .addCase(updateOutput.fulfilled, (state, action: PayloadAction<[]>) => {
                state.output.loading = false;
                state.output.error = null;
                state.output.data = action.payload;
            })
            .addCase(updateOutput.rejected, (state, action) => {
                state.output.loading = false;
                state.output.error = action.payload || 'Unknown error';
                state.output.data = []
            })
            .addCase(updateOutputs.pending, (state) => {
                state.outputs.loading = true;
                state.outputs.error = null;
                state.outputs.data = []

            })
            .addCase(updateOutputs.fulfilled, (state, action: PayloadAction<[]>) => {
                state.outputs.loading = false;
                state.outputs.error = null;
                state.outputs.data = action.payload;
            })
            .addCase(updateOutputs.rejected, (state, action) => {
                state.outputs.loading = false;
                state.outputs.error = action.payload || 'Unknown error';
                state.outputs.data = []
            })
    }
})

export default outputSlice.reducer;