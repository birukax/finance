import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, type PersistConfig, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../pages/user/slices';
import itemReducer from '../pages/item/slices';
import orderReducer from '../pages/order/slices';
import outputReducer from '../pages/output/slices';
import routingReducer from '../pages/routing/slices';
import accountReducer from '../pages/account/slices';
import locationReducer from '../pages/location/slices';
import prorationTypeReducer from '../pages/prorationType/slices';
import labelPerHourReducer from '../pages/labelPerHour/slices';

interface RootState {
    auth: ReturnType<typeof authReducer>;
    item: ReturnType<typeof itemReducer>;
    order: ReturnType<typeof orderReducer>;
    output: ReturnType<typeof outputReducer>;
    routing: ReturnType<typeof routingReducer>;
    account: ReturnType<typeof accountReducer>;
    location: ReturnType<typeof locationReducer>;
    labelPerHour: ReturnType<typeof labelPerHourReducer>;
    prorationType: ReturnType<typeof prorationTypeReducer>;
}

const rootReducer = combineReducers({
    auth: authReducer,
    item: itemReducer,
    order: orderReducer,
    output: outputReducer,
    routing: routingReducer,
    account: accountReducer,
    location: locationReducer,
    labelPerHour: labelPerHourReducer,
    prorationType: prorationTypeReducer,
})

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;