import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, type PersistConfig, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../pages/user/slices';
import itemReducer from '../pages/item/slices';
import routingReducer from '../pages/routing/slices';
import orderReducer from '../pages/order/slices';
import outputReducer from '../pages/output/slices';
import accountReducer from '../pages/account/slices';
import locationReducer from '../pages/location/slices';
import prorationTypeReducer from '../pages/prorationType/slices';

interface RootState {
    auth: ReturnType<typeof authReducer>;
    item: ReturnType<typeof itemReducer>;
    routing: ReturnType<typeof routingReducer>;
    order: ReturnType<typeof orderReducer>;
    output: ReturnType<typeof outputReducer>;
    account: ReturnType<typeof accountReducer>;
    location: ReturnType<typeof locationReducer>;
    prorationType: ReturnType<typeof prorationTypeReducer>;
}

const rootReducer = combineReducers({
    auth: authReducer,
    item: itemReducer,
    routing: routingReducer,
    order: orderReducer,
    output: outputReducer,
    account: accountReducer,
    location: locationReducer,
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