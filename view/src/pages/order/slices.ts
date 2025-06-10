import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/api";

interface DataState {
    data: [] | null;
    loading: boolean;
    error: string | null;
}

interface OrderState {
    orders: DataState;
    order: DataState;
}

const initialState: OrderState = {
    orders: { data: [], loading: false, error: null },
    order: { data: [], loading: false, error: null },
}

export const fetchOrders = createAsyncThunk('order/fetchOrders', async (params, { rejectWithValue }) => {
    try {
        const response = await api.get('/production/orders/', { params });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Orders.');
    }
})
export const fetchOrder = createAsyncThunk('order/fetchOrder', async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/production/orders/${id}/`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Order.');
    }
})
export const updateOrder = createAsyncThunk('order/updateOrder', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/production/orders/${id}/`, formData)
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update the Order.')
    }
})

export const updateOrders = createAsyncThunk('order/updateOrders', async (_, { rejectWithValue }) => {
    try {
        const response = await api.post('/production/orders/update_orders/')
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update Orders.');
    }
})

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.orders.loading = true;
                state.orders.error = null;
                state.orders.data = []

            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<[]>) => {
                state.orders.loading = false;
                state.orders.error = null;
                state.orders.data = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.orders.loading = false;
                state.orders.error = action.payload || 'Unknown error';
                state.orders.data = []
            })
            .addCase(fetchOrder.pending, (state) => {
                state.order.loading = true;
                state.order.error = null;
                state.order.data = []

            })
            .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<[]>) => {
                state.order.loading = false;
                state.order.error = null;
                state.order.data = action.payload;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.order.loading = false;
                state.order.error = action.payload || 'Unknown error';
                state.order.data = []
            })
            .addCase(updateOrder.pending, (state) => {
                state.order.loading = true;
                state.order.error = null;
                state.order.data = []

            })
            .addCase(updateOrder.fulfilled, (state, action: PayloadAction<[]>) => {
                state.order.loading = false;
                state.order.error = null;
                state.order.data = action.payload;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.order.loading = false;
                state.order.error = action.payload || 'Unknown error';
                state.order.data = []
            })
            .addCase(updateOrders.pending, (state) => {
                state.orders.loading = true;
                state.orders.error = null;
                state.orders.data = []

            })
            .addCase(updateOrders.fulfilled, (state, action: PayloadAction<[]>) => {
                state.orders.loading = false;
                state.orders.error = null;
                state.orders.data = action.payload;
            })
            .addCase(updateOrders.rejected, (state, action) => {
                state.orders.loading = false;
                state.orders.error = action.payload || 'Unknown error';
                state.orders.data = []
            })
    }
})

export default orderSlice.reducer;