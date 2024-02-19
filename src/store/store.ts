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
import postReducer from './post/postReducer';
import categorySlice from './post/categoryReducer';
export interface RootState {
  user: ReturnType<typeof userReducer>;
  auth: ReturnType<typeof authReducer>;
  theme: ReturnType<typeof themeReducer>;
  posts: ReturnType<typeof postReducer>;
  categories: ReturnType<typeof categorySlice>;
}

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  theme: themeReducer,
  posts: postReducer,
  categories: categorySlice,
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
