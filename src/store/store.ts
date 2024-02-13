import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import authReducer from 'store/auth/authReducer';
import themeReducer from 'store/theme/themeReducer';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userReducer';
export interface RootState {
  user: ReturnType<typeof userReducer>;
  auth: ReturnType<typeof authReducer>;
  theme: ReturnType<typeof themeReducer>;
}

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'auth', 'theme'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
