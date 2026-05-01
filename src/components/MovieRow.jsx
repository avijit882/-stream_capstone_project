// src/components/MovieRow.jsx
import React, { useRef, memo } from 'react';
import MovieCard from './MovieCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const MovieRow = memo(function MovieRow({ title, movies = [], emoji = '' }) {
  const ref = useRef(null);
  if (!movies.length) return null;

  const scroll = dir => ref.current?.scrollBy({ left: dir * 560, behavior: 'smooth' });

  return (
    <div className="mb-10 group/row">
      <h2 className="text-white font-bold text-base sm:text-lg mb-3 px-4 sm:px-10 font-body flex items-center gap-2">
        {emoji && <span>{emoji}</span>}
        {title}
      </h2>
      <div className="relative px-4 sm:px-10">
        {/* Left arrow */}
        <button onClick={() => scroll(-1)}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-full
                     items-center justify-center bg-gradient-to-r from-sv-dark to-transparent
                     opacity-0 group-hover/row:opacity-100 transition-opacity">
          <FiChevronLeft size={26} className="text-white drop-shadow" />
        </button>

        <div ref={ref} className="row-scroll">
          {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>

        {/* Right arrow */}
        <button onClick={() => scroll(1)}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-full
                     items-center justify-center bg-gradient-to-l from-sv-dark to-transparent
                     opacity-0 group-hover/row:opacity-100 transition-opacity">
          <FiChevronRight size={26} className="text-white drop-shadow" />
        </button>
      </div>
    </div>
  );
});

export default MovieRow;
