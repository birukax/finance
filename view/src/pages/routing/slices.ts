import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/api";

interface DataState {
    data: [] | null;
    loading: boolean;
    error: string | null;
}

interface RoutingState {
    routings: DataState;
    routing: DataState;
}

const initialState: RoutingState = {
    routings: { data: [], loading: false, error: null },
    routing: { data: [], loading: false, error: null },
}

export const fetchRoutings = createAsyncThunk('routing/fetchRoutings', async (params, { rejectWithValue }) => {
    try {
        const response = await api.get('/production/routings/', { params });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Routings.');
    }
})
export const fetchRouting = createAsyncThunk('routing/fetchRouting', async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/production/routings/${id}/`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Routing.');
    }
})
export const updateRouting = createAsyncThunk('routing/updateRouting', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/production/routings/${id}/`, formData)
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update the Routing.')
    }
})

export const updateRoutings = createAsyncThunk('routing/updateRoutings', async (_, { rejectWithValue }) => {
    try {
        const response = await api.post('/production/routings/update_routings/')
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update Routings.');
    }
})

const routingSlice = createSlice({
    name: 'routing',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoutings.pending, (state) => {
                state.routings.loading = true;
                state.routings.error = null;
                state.routings.data = []

            })
            .addCase(fetchRoutings.fulfilled, (state, action: PayloadAction<[]>) => {
                state.routings.loading = false;
                state.routings.error = null;
                state.routings.data = action.payload;
            })
            .addCase(fetchRoutings.rejected, (state, action) => {
                state.routings.loading = false;
                state.routings.error = action.payload || 'Unknown error';
                state.routings.data = []
            })
            .addCase(fetchRouting.pending, (state) => {
                state.routing.loading = true;
                state.routing.error = null;
                state.routing.data = []

            })
            .addCase(fetchRouting.fulfilled, (state, action: PayloadAction<[]>) => {
                state.routing.loading = false;
                state.routing.error = null;
                state.routing.data = action.payload;
            })
            .addCase(fetchRouting.rejected, (state, action) => {
                state.routing.loading = false;
                state.routing.error = action.payload || 'Unknown error';
                state.routing.data = []
            })
            .addCase(updateRouting.pending, (state) => {
                state.routing.loading = true;
                state.routing.error = null;
                state.routing.data = []

            })
            .addCase(updateRouting.fulfilled, (state, action: PayloadAction<[]>) => {
                state.routing.loading = false;
                state.routing.error = null;
                state.routing.data = action.payload;
            })
            .addCase(updateRouting.rejected, (state, action) => {
                state.routing.loading = false;
                state.routing.error = action.payload || 'Unknown error';
                state.routing.data = []
            })
            .addCase(updateRoutings.pending, (state) => {
                state.routings.loading = true;
                state.routings.error = null;
                state.routings.data = []

            })
            .addCase(updateRoutings.fulfilled, (state, action: PayloadAction<[]>) => {
                state.routings.loading = false;
                state.routings.error = null;
                state.routings.data = action.payload;
            })
            .addCase(updateRoutings.rejected, (state, action) => {
                state.routings.loading = false;
                state.routings.error = action.payload || 'Unknown error';
                state.routings.data = []
            })
    }
})

export default routingSlice.reducer;