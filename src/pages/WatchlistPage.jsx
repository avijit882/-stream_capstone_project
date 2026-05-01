// src/pages/WatchlistPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleWatchlist, removeFromContinue } from '../redux/watchlistSlice';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { FiPlay, FiTrash2, FiBookmark } from 'react-icons/fi';

export default function WatchlistPage() {
  const dispatch         = useDispatch();
  const navigate         = useNavigate();
  const watchlist        = useSelector(s => s.watchlist.items);
  const continueWatching = useSelector(s => s.watchlist.continueWatching);

  return (
    <div className="min-h-screen bg-sv-dark text-white font-body">
      <Navbar />
      <div className="pt-24 px-4 sm:px-10 pb-16 max-w-screen-xl mx-auto">

        {/* ── My List ── */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <FiBookmark size={22} className="text-sv-red" />
            <h1 className="text-2xl font-bold">My List</h1>
            <span className="px-2 py-0.5 bg-sv-card border border-sv-border rounded-full text-xs text-gray-500">
              {watchlist.length}
            </span>
          </div>

          {watchlist.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-sv-border rounded-2xl">
              <p className="text-5xl mb-4">📋</p>
              <p className="text-gray-400 font-medium">Your list is empty</p>
              <p className="text-gray-600 text-sm mt-1 mb-5">Hover any movie and click + to add it</p>
              <button onClick={() => navigate('/categories')}
                className="px-6 py-2.5 bg-sv-red text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors">
                Browse Movies
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
              {watchlist.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
          )}
        </div>

        {/* ── Continue Watching ── */}
        {continueWatching.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl">▶</span>
              <h2 className="text-2xl font-bold">Continue Watching</h2>
              <span className="px-2 py-0.5 bg-sv-card border border-sv-border rounded-full text-xs text-gray-500">
                {continueWatching.length}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {continueWatching.map(item => (
                <div key={item.id} className="group relative">
                  {/* Card */}
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-sv-card border border-sv-border cursor-pointer"
                    onClick={() => navigate(`/watch/${item.id}`)}>
                    <img src={item.poster} alt={item.title} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60">
                      <div className="h-1 bg-sv-red" style={{ width: `${item.progress}%` }} />
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button onClick={() => navigate(`/watch/${item.id}`)}
                        className="p-3 bg-white rounded-full text-black hover:bg-gray-100 transition-colors shadow-xl">
                        <FiPlay size={20} />
                      </button>
                      <button onClick={e => { e.stopPropagation(); dispatch(removeFromContinue(item.id)); }}
                        className="p-3 bg-black/60 rounded-full text-gray-300 hover:text-sv-red transition-colors">
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <p className="text-white text-xs font-medium mt-2 truncate">{item.title}</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-gray-600 text-xs">{Math.round(item.progress)}% watched</p>
                    {/* Mini progress indicator */}
                    <div className="w-12 h-1 bg-sv-border rounded-full overflow-hidden">
                      <div className="h-full bg-sv-red" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
