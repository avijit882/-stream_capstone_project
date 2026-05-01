// src/components/MovieCard.jsx
import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWatchlist } from '../redux/watchlistSlice';
import { FiPlay, FiPlus, FiCheck, FiStar } from 'react-icons/fi';

const MovieCard = memo(function MovieCard({ movie }) {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const watchlist = useSelector(s => s.watchlist.items);
  const [imgErr, setImgErr] = useState(false);

  if (!movie) return null;

  const inList = watchlist.some(m => m.id === movie.id);

  return (
    <div
      className="card w-36 sm:w-44 md:w-48 group"
      onClick={() => navigate(`/watch/${movie.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/watch/${movie.id}`)}
    >
      {/* Poster */}
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-sv-card">
        {imgErr ? (
          <div className="w-full h-full flex items-center justify-center bg-sv-card text-gray-600 text-xs text-center p-2 font-body">
            {movie.title}
          </div>
        ) : (
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 rounded-lg bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2.5">
        <div className="flex justify-end">
          <button
            onClick={e => { e.stopPropagation(); dispatch(toggleWatchlist(movie)); }}
            className={`p-1.5 rounded-full border text-xs transition-colors
              ${inList ? 'border-sv-red text-sv-red bg-sv-red/10' : 'border-white text-white hover:border-sv-red hover:text-sv-red'}`}
            aria-label={inList ? 'Remove from list' : 'Add to list'}
          >
            {inList ? <FiCheck size={13} /> : <FiPlus size={13} />}
          </button>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <FiPlay size={20} className="text-black ml-0.5" />
          </div>
        </div>
        <div />
      </div>

      {/* Info */}
      <div className="mt-2 px-0.5">
        <p className="text-white text-xs font-semibold truncate font-body">{movie.title}</p>
        <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-0.5 font-body">
          <span>{movie.year}</span>
          <span>·</span>
          <FiStar size={10} className="text-yellow-400" />
          <span>{movie.rating}</span>
        </div>
      </div>
    </div>
  );
});

export default MovieCard;
