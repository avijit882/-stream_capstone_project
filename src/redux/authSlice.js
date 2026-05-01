// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../utils/storage';

const DEFAULT_PROFILES = [
  { id: 1, name: 'Avijit',  avatar: '🦁', color: '#E50914' },
  { id: 2, name: 'Kartik',   avatar: '🐼', color: '#0080FF' },
  { id: 3, name: 'Kids',  avatar: '🐸', color: '#00C851' },
];

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: storage.get('auth_isAuth', false),
    user:            storage.get('auth_user', null),
    profiles:        storage.get('auth_profiles', DEFAULT_PROFILES),
    activeProfile:   storage.get('auth_profile', null),
  },
  reducers: {
    login(state, { payload }) {
      state.isAuthenticated = true;
      state.user = payload;
      storage.set('auth_isAuth', true);
      storage.set('auth_user', payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.activeProfile = null;
      storage.remove('auth_isAuth');
      storage.remove('auth_user');
      storage.remove('auth_profile');
    },
    selectProfile(state, { payload }) {
      state.activeProfile = payload;
      storage.set('auth_profile', payload);
    },
    addProfile(state, { payload }) {
      state.profiles.push(payload);
      storage.set('auth_profiles', state.profiles);
    },
  },
});

export const { login, logout, selectProfile, addProfile } = authSlice.actions;
export default authSlice.reducer;
