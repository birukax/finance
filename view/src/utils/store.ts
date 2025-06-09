import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, type PersistConfig, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../pages/user/slices';
import accountReducer from '../pages/account/slices';
import prorationTypeReducer from '../pages/prorationType/slices';

interface RootState {
    auth: ReturnType<typeof authReducer>;
    account: ReturnType<typeof accountReducer>;
    prorationType: ReturnType<typeof prorationTypeReducer>;
}

const rootReducer = combineReducers({
    auth: authReducer,
    account: accountReducer,
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