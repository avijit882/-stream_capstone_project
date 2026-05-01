// src/utils/storage.js
export const storage = {
  get: (key, fallback = null) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (e) { console.warn('localStorage write failed', e); }
  },
  remove: (key) => localStorage.removeItem(key),
};
