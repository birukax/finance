import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/api";

interface DataState {
    data: [] | null;
    loading: boolean;
    error: string | null;
}

interface LocationState {
    locations: DataState;
    location: DataState;
}

const initialState: LocationState = {
    locations: { data: [], loading: false, error: null },
    location: { data: [], loading: false, error: null },
}

export const fetchLocations = createAsyncThunk('location/fetchLocations', async (params, { rejectWithValue }) => {
    try {
        const response = await api.get('/production/locations/', { params });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Locations.');
    }
})
export const fetchLocation = createAsyncThunk('location/fetchLocation', async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/production/locations/${id}/`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Location.');
    }
})
export const updateLocation = createAsyncThunk('location/updateLocation', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/production/locations/${id}/`, formData)
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update the Location.')
    }
})

export const updateLocations = createAsyncThunk('location/updateLocations', async (_, { rejectWithValue }) => {
    try {
        const response = await api.post('/production/locations/update_locations/')
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update Locations.');
    }
})

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.locations.loading = true;
                state.locations.error = null;
                state.locations.data = []

            })
            .addCase(fetchLocations.fulfilled, (state, action: PayloadAction<[]>) => {
                state.locations.loading = false;
                state.locations.error = null;
                state.locations.data = action.payload;
            })
            .addCase(fetchLocations.rejected, (state, action) => {
                state.locations.loading = false;
                state.locations.error = action.payload || 'Unknown error';
                state.locations.data = []
            })
            .addCase(fetchLocation.pending, (state) => {
                state.location.loading = true;
                state.location.error = null;
                state.location.data = []

            })
            .addCase(fetchLocation.fulfilled, (state, action: PayloadAction<[]>) => {
                state.location.loading = false;
                state.location.error = null;
                state.location.data = action.payload;
            })
            .addCase(fetchLocation.rejected, (state, action) => {
                state.location.loading = false;
                state.location.error = action.payload || 'Unknown error';
                state.location.data = []
            })
            .addCase(updateLocation.pending, (state) => {
                state.location.loading = true;
                state.location.error = null;
                state.location.data = []

            })
            .addCase(updateLocation.fulfilled, (state, action: PayloadAction<[]>) => {
                state.location.loading = false;
                state.location.error = null;
                state.location.data = action.payload;
            })
            .addCase(updateLocation.rejected, (state, action) => {
                state.location.loading = false;
                state.location.error = action.payload || 'Unknown error';
                state.location.data = []
            })
            .addCase(updateLocations.pending, (state) => {
                state.locations.loading = true;
                state.locations.error = null;
                state.locations.data = []

            })
            .addCase(updateLocations.fulfilled, (state, action: PayloadAction<[]>) => {
                state.locations.loading = false;
                state.locations.error = null;
                state.locations.data = action.payload;
            })
            .addCase(updateLocations.rejected, (state, action) => {
                state.locations.loading = false;
                state.locations.error = action.payload || 'Unknown error';
                state.locations.data = []
            })
    }
})

export default locationSlice.reducer;