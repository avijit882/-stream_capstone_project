// src/pages/WatchPage.jsx
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWatchlist, updateProgress } from '../redux/watchlistSlice';
import Navbar from '../components/Navbar';
import MovieRow from '../components/MovieRow';
import { MOVIES, getSimilar } from '../data/movies';
import { FiArrowLeft, FiStar, FiPlus, FiCheck, FiPlay, FiPause,
         FiMaximize, FiVolume2, FiVolumeX } from 'react-icons/fi';

// ── Mock video player ─────────────────────────────────────────────────────
function Player({ movie, onProgress }) {
  const [playing,  setPlaying]  = useState(false);
  const [muted,    setMuted]    = useState(false);
  const [progress, setProgress] = useState(0);
  const [showUI,   setShowUI]   = useState(true);
  const [useTrailer, setUseTrailer] = useState(true);
  const timerRef = useRef(null);
  const uiTimer  = useRef(null);

  // Simulate playback progress when mock player is active
  useEffect(() => {
    if (!playing || useTrailer) return;
    timerRef.current = setInterval(() => {
      setProgress(p => {
        const next = Math.min(parseFloat((p + 0.3).toFixed(1)), 100);
        onProgress(next);
        if (next >= 100) { clearInterval(timerRef.current); setPlaying(false); }
        return next;
      });
    }, 300);
    return () => clearInterval(timerRef.current);
  }, [playing, useTrailer, onProgress]);

  // Auto-hide controls
  const resetUiTimer = useCallback(() => {
    setShowUI(true);
    clearTimeout(uiTimer.current);
    uiTimer.current = setTimeout(() => setShowUI(false), 3000);
  }, []);

  // YouTube embed
  if (useTrailer && movie.trailer) {
    return (
      <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden relative group">
        <iframe
          className="w-full h-full"
          src={`${movie.trailer}?autoplay=1&rel=0&modestbranding=1`}
          title={`${movie.title} Trailer`}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
        <button onClick={() => setUseTrailer(false)}
          className="absolute top-3 right-3 px-3 py-1.5 bg-black/70 text-white text-xs rounded-lg
                     opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black">
          Switch to Mock Player
        </button>
      </div>
    );
  }

  // Mock player UI
  return (
    <div
      className="w-full aspect-video bg-black rounded-2xl overflow-hidden relative cursor-pointer select-none"
      onClick={() => setPlaying(!playing)}
      onMouseMove={resetUiTimer}
    >
      {/* Backdrop as "video" */}
      <img src={movie.backdrop} alt="" className="w-full h-full object-cover opacity-50" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Big play/pause */}
      {showUI && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-20 h-20 rounded-full bg-white/90 flex items-center justify-center
                          shadow-2xl transition-all duration-200 ${playing ? 'scale-90' : 'scale-100'}`}>
            {playing
              ? <FiPause size={34} className="text-black" />
              : <FiPlay  size={34} className="text-black ml-1" />}
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0">
        {showUI && (
          <div className="px-4 pb-1 flex items-center gap-3 text-white text-xs">
            <span>{Math.round(progress)}%</span>
            <div className="flex-1 h-1 bg-white/20 rounded-full">
              <div className="h-1 bg-sv-red rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span>{playing ? 'Playing…' : 'Paused'}</span>
          </div>
        )}
        <div className="h-1 bg-white/10">
          <div className="h-1 bg-sv-red transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Controls */}
      {showUI && (
        <div className="absolute bottom-8 right-4 flex items-center gap-2">
          <button onClick={e => { e.stopPropagation(); setMuted(!muted); }}
            className="p-2 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors">
            {muted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
          </button>
          <button onClick={e => e.stopPropagation()}
            className="p-2 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors">
            <FiMaximize size={16} />
          </button>
        </div>
      )}

      {/* Demo label */}
      <div className="absolute top-3 left-3 px-2.5 py-1 bg-sv-red/80 text-white text-xs rounded-lg font-body">
        DEMO PLAYER · Click to {playing ? 'pause' : 'play'}
      </div>

      {movie.trailer && (
        <button onClick={e => { e.stopPropagation(); setUseTrailer(true); }}
          className="absolute top-3 right-3 px-3 py-1.5 bg-black/70 text-white text-xs rounded-lg hover:bg-black">
          Watch Real Trailer
        </button>
      )}
    </div>
  );
}

// ── WatchPage ─────────────────────────────────────────────────────────────
export default function WatchPage() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const watchlist = useSelector(s => s.watchlist.items);

  const movie   = MOVIES.find(m => m.id === Number(id));
  const similar = movie ? getSimilar(movie) : [];
  const inList  = watchlist.some(m => m.id === movie?.id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const handleProgress = useCallback(progress => {
    if (!movie) return;
    dispatch(updateProgress({ id: movie.id, progress, title: movie.title, poster: movie.poster }));
  }, [movie, dispatch]);

  if (!movie) return (
    <div className="min-h-screen bg-sv-dark flex flex-col items-center justify-center text-white font-body">
      <p className="text-5xl mb-4">🎬</p>
      <p className="text-xl mb-2">Movie not found</p>
      <button onClick={() => navigate('/home')}
        className="mt-4 px-6 py-2.5 bg-sv-red rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors">
        Go Home
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-sv-dark text-white font-body">
      <Navbar />

      <div className="pt-20 max-w-screen-xl mx-auto px-4 sm:px-10 pb-16">
        {/* Back */}
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-4 mt-2">
          <FiArrowLeft size={16} /> Back
        </button>

        {/* ── Player ── */}
        <Player movie={movie} onProgress={handleProgress} />

        {/* ── Info ── */}
        <div className="mt-8 flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <img src={movie.poster} alt={movie.title}
            className="hidden md:block w-44 rounded-xl object-cover flex-shrink-0 shadow-xl border border-sv-border" />

          <div className="flex-1">
            <h1 className="font-display text-4xl sm:text-5xl tracking-wider mb-2 leading-tight">
              {movie.title.toUpperCase()}
            </h1>

            {/* Genre pills */}
            <div className="flex gap-2 mb-3 flex-wrap">
              {movie.genre.map(g => (
                <span key={g} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-sv-border text-gray-400">
                  {g}
                </span>
              ))}
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <span>{movie.year}</span>
              <span>·</span>
              <span>{movie.duration}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <FiStar size={13} className="text-yellow-400" /> {movie.rating} / 10
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm mb-6 max-w-prose">{movie.description}</p>

            <p className="text-gray-500 text-sm mb-5">
              <span className="text-gray-400">Director: </span>{movie.director}
            </p>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => dispatch(toggleWatchlist(movie))}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors
                  ${inList ? 'bg-white/10 border border-sv-border hover:bg-white/15' : 'bg-sv-red hover:bg-red-700'}`}>
                {inList ? <FiCheck size={16} /> : <FiPlus size={16} />}
                {inList ? 'In My List' : 'Add to My List'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Cast ── */}
        <div className="mt-10">
          <h2 className="text-lg font-bold mb-4">Cast</h2>
          <div className="flex gap-4 row-scroll pb-2">
            {movie.cast.map((name, i) => (
              <div key={i} className="flex-shrink-0 text-center w-24">
                <div className="w-20 h-20 rounded-full bg-sv-card border border-sv-border flex items-center justify-center
                                text-2xl mx-auto mb-2 hover:border-sv-red transition-colors">
                  {['🎭','🎬','🌟','🎥','🎞️'][i % 5]}
                </div>
                <p className="text-xs text-gray-300 font-medium leading-tight">{name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Similar ── */}
        {similar.length > 0 && (
          <div className="mt-10">
            <MovieRow title="More Like This" emoji="🎯" movies={similar} />
          </div>
        )}
      </div>
    </div>
  );
}
