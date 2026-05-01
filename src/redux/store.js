// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer      from './authSlice';
import themeReducer     from './themeSlice';
import watchlistReducer from './watchlistSlice';

export default configureStore({
  reducer: {
    auth:      authReducer,
    theme:     themeReducer,
    watchlist: watchlistReducer,
  },
  middleware: (getDefault) =>
    getDefault({ serializableCheck: { ignoredPaths: ['watchlist.continueWatching'] } }),
});
