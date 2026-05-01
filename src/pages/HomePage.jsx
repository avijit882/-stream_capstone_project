// src/pages/HomePage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWatchlist, removeFromContinue } from '../redux/watchlistSlice';
import Navbar from '../components/Navbar';
import MovieRow from '../components/MovieRow';
import { FiPlay, FiPlus, FiCheck, FiInfo, FiStar, FiTrash2 } from 'react-icons/fi';
import { TRENDING, TOP_RATED, POPULAR, FEATURED, MOVIES } from '../data/movies';

// ── Auto-rotating Banner ──────────────────────────────────────────────────
function Banner() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const watchlist = useSelector(s => s.watchlist.items);
  const [idx, setIdx] = useState(0);

  // Rotate every 7 seconds
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % FEATURED.length), 7000);
    return () => clearInterval(t);
  }, []);

  const movie  = FEATURED[idx];
  const inList = watchlist.some(m => m.id === movie.id);

  return (
    <div className="relative w-full h-[85vh] min-h-[520px] overflow-hidden">
      {/* Backdrop — cross-fade on change */}
      {FEATURED.map((m, i) => (
        <img key={m.id} src={m.backdrop} alt=""
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000
            ${i === idx ? 'opacity-100' : 'opacity-0'}`} />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 banner-overlay" />

      {/* Content */}
      <div key={movie.id} className="absolute bottom-28 sm:bottom-32 left-6 sm:left-16 max-w-lg animate-slide-up font-body">
        {/* Genre pills */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {movie.genre.slice(0, 3).map(g => (
            <span key={g} className="text-xs px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-gray-300 border border-white/10">
              {g}
            </span>
          ))}
        </div>

        <h1 className="font-display text-5xl sm:text-7xl tracking-widest text-white mb-3 leading-none drop-shadow-xl">
          {movie.title.toUpperCase()}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
          <span>{movie.year}</span>
          <span>·</span>
          <span>{movie.duration}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><FiStar size={13} className="text-yellow-400" />{movie.rating}</span>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm">
          {movie.description.slice(0, 150)}…
        </p>

        <div className="flex gap-3 flex-wrap">
          <button onClick={() => navigate(`/watch/${movie.id}`)}
            className="flex items-center gap-2 px-7 py-3 bg-white text-black font-bold rounded-xl
                       hover:bg-gray-200 transition-colors text-sm">
            <FiPlay size={18} /> Play
          </button>
          <button onClick={() => dispatch(toggleWatchlist(movie))}
            className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold
                       rounded-xl hover:bg-white/20 transition-colors border border-white/10 text-sm">
            {inList ? <FiCheck size={17} /> : <FiPlus size={17} />}
            {inList ? 'In My List' : 'My List'}
          </button>
          <button onClick={() => navigate(`/watch/${movie.id}`)}
            className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm text-white
                       rounded-xl hover:bg-white/20 transition-colors border border-white/10 text-sm">
            <FiInfo size={17} />
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-2">
        {FEATURED.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`rounded-full transition-all duration-300
              ${i === idx ? 'w-6 h-2 bg-sv-red' : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'}`} />
        ))}
      </div>
    </div>
  );
}

// ── Continue Watching strip ───────────────────────────────────────────────
function ContinueWatching() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const list     = useSelector(s => s.watchlist.continueWatching);
  if (!list.length) return null;

  return (
    <div className="mb-10 px-4 sm:px-10">
      <h2 className="text-white font-bold text-base sm:text-lg mb-3 font-body flex items-center gap-2">
        ▶ Continue Watching
      </h2>
      <div className="flex gap-3 row-scroll">
        {list.map(item => (
          <div key={item.id} className="card flex-shrink-0 w-44 sm:w-52 group">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-sv-card">
              <img src={item.poster} alt={item.title} loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60">
                <div className="progress-bar h-full" style={{ width: `${item.progress}%` }} />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button onClick={() => navigate(`/watch/${item.id}`)}
                  className="p-2.5 bg-white rounded-full text-black hover:bg-gray-100 transition-colors">
                  <FiPlay size={18} />
                </button>
                <button onClick={e => { e.stopPropagation(); dispatch(removeFromContinue(item.id)); }}
                  className="p-2.5 bg-black/60 rounded-full text-gray-300 hover:text-sv-red transition-colors">
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
            <p className="text-white text-xs font-medium mt-1.5 truncate font-body">{item.title}</p>
            <p className="text-gray-600 text-xs font-body">{Math.round(item.progress)}% watched</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── HomePage ──────────────────────────────────────────────────────────────
export default function HomePage() {
  // Shuffle once for variety in "New Releases" row
  const newReleases = useMemo(() =>
    [...MOVIES].sort(() => Math.random() - 0.5).slice(0, 10), []);

  return (
    <div className="min-h-screen bg-sv-dark">
      <Navbar />
      <Banner />
      <div className="pb-16 -mt-4 relative z-10">
        <ContinueWatching />
        <MovieRow title="Trending Now"     emoji="🔥" movies={TRENDING}    />
        <MovieRow title="Top Rated"        emoji="⭐" movies={TOP_RATED}   />
        <MovieRow title="Popular Movies"   emoji="🎬" movies={POPULAR}     />
        <MovieRow title="New Releases"     emoji="🆕" movies={newReleases} />
        <MovieRow title="Action & Sci-Fi"  emoji="🚀"
          movies={MOVIES.filter(m => m.genre.includes('Action') || m.genre.includes('Sci-Fi'))} />
        <MovieRow title="Award Winners"    emoji="🏆"
          movies={MOVIES.filter(m => m.rating >= 8.5)} />
      </div>
    </div>
  );
}
