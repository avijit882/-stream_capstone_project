# 🎬 StreamVault — OTT Clone (No API Key Required)

A complete Netflix-inspired streaming platform built with React + Vite, Redux Toolkit,
React Router v6, and Tailwind CSS. **Works entirely offline with built-in movie data.**

## 📁 Project Structure

```
streamvault/
├── src/
│   ├── data/
│   │   └── movies.js          ← 24 hardcoded movies (posters from public CDN)
│   ├── components/
│   │   ├── Navbar.jsx          ← Sticky, scroll-aware navbar
│   │   ├── MovieCard.jsx       ← React.memo card with hover overlay
│   │   ├── MovieRow.jsx        ← React.memo horizontal scroll row
│   │   ├── Skeleton.jsx        ← Shimmer skeleton loaders
│   │   ├── ErrorBoundary.jsx   ← Class-based error catcher
│   │   └── ProtectedRoute.jsx  ← Auth + profile guard
│   ├── pages/
│   │   ├── LoginPage.jsx       ← Mock auth (any email/password)
│   │   ├── ProfilesPage.jsx    ← Netflix-style profile picker
│   │   ├── HomePage.jsx        ← Banner + 6 movie rows + continue watching
│   │   ├── CategoriesPage.jsx  ← Search + genre filter + sort + infinite scroll
│   │   ├── WatchPage.jsx       ← YouTube trailer + mock player + cast + similar
│   │   ├── WatchlistPage.jsx   ← My List + Continue Watching management
│   │   └── NotFoundPage.jsx    ← 404
│   ├── redux/
│   │   ├── store.js
│   │   ├── authSlice.js        ← login / logout / profiles
│   │   ├── themeSlice.js       ← dark/light toggle
│   │   └── watchlistSlice.js   ← My List + progress tracking
│   ├── hooks/
│   │   └── useDebounce.js      ← 400ms debounce for search
│   ├── utils/
│   │   └── storage.js          ← localStorage wrapper
│   ├── App.jsx                 ← Routes + React.lazy code splitting
│   ├── main.jsx
│   └── index.css               ← Tailwind + custom CSS
├── index.html
├── vite.config.js
├── tailwind.config.js
├── vercel.json                 ← SPA rewrite rules
└── package.json
```

## 🚀 Setup (3 Steps)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# Open http://localhost:5173

# 3. Build for production
npm run build
```

## 🌐 Deploy to Vercel

```bash
npm i -g vercel && vercel
```

## ✅ Features

| Feature | ✓ |
|---|---|
| React (Vite) + ES6+ | ✅ |
| Redux Toolkit (auth, theme, watchlist) | ✅ |
| React Router v6 + Protected Routes | ✅ |
| Tailwind CSS + Dark mode | ✅ |
| 24 movies — NO API key needed | ✅ |
| Auto-rotating hero banner with cross-fade | ✅ |
| Horizontal scroll rows with arrows | ✅ |
| Genre filter + debounced search + sort | ✅ |
| Infinite scroll (IntersectionObserver) | ✅ |
| YouTube trailer embed + mock player | ✅ |
| Continue Watching + progress bar | ✅ |
| Netflix-style profile picker | ✅ |
| Dark / Light mode toggle | ✅ |
| Skeleton loaders | ✅ |
| Error Boundary | ✅ |
| React.lazy + Suspense (code splitting) | ✅ |
| React.memo (MovieCard, MovieRow) | ✅ |
| LocalStorage persistence | ✅ |
| Responsive (mobile + desktop) | ✅ |
| Vercel deployment ready | ✅ |

## 🔑 Demo Login

**Any email + any password** — mock auth, no backend needed.

## 🎯 SOP Compliance

- Domain: **Entertainment & Media**
- Unique features: Profiles + Continue Watching + Debounced Search
- State Management: **Redux Toolkit**
- Routing: **React Router v6** with Protected Routes
- Performance: `React.memo`, `React.lazy`, `useMemo`, `useDebounce`
- Deployment: **Vercel-ready**
