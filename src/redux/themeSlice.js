// src/redux/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../utils/storage';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { dark: storage.get('theme_dark', true) },
  reducers: {
    toggleTheme(state) {
      state.dark = !state.dark;
      storage.set('theme_dark', state.dark);
      document.documentElement.classList.toggle('dark', state.dark);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
