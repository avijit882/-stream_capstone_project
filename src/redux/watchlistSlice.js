// src/redux/watchlistSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../utils/storage';

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    items:           storage.get('wl_items', []),
    continueWatching: storage.get('wl_continue', []),
  },
  reducers: {
    toggleWatchlist(state, { payload: movie }) {
      const idx = state.items.findIndex(m => m.id === movie.id);
      if (idx >= 0) state.items.splice(idx, 1);
      else state.items.unshift(movie);
      storage.set('wl_items', state.items);
    },
    updateProgress(state, { payload: { id, progress, title, poster } }) {
      const entry = { id, progress, title, poster, updatedAt: Date.now() };
      const idx = state.continueWatching.findIndex(m => m.id === id);
      if (idx >= 0) state.continueWatching[idx] = entry;
      else state.continueWatching.unshift(entry);
      state.continueWatching = state.continueWatching.slice(0, 10);
      storage.set('wl_continue', state.continueWatching);
    },
    removeFromContinue(state, { payload: id }) {
      state.continueWatching = state.continueWatching.filter(m => m.id !== id);
      storage.set('wl_continue', state.continueWatching);
    },
  },
});

export const { toggleWatchlist, updateProgress, removeFromContinue } = watchlistSlice.actions;
export default watchlistSlice.reducer;
