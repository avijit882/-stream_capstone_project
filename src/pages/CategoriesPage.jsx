// src/pages/CategoriesPage.jsx
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import useDebounce from '../hooks/useDebounce';
import { FiSearch, FiSliders } from 'react-icons/fi';
import { MOVIES, ALL_GENRES, getByGenre, searchMovies } from '../data/movies';

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating',     label: 'Highest Rated' },
  { value: 'year_desc',  label: 'Newest First' },
  { value: 'year_asc',   label: 'Oldest First' },
  { value: 'title',      label: 'A → Z' },
];

const PAGE_SIZE = 12;

export default function CategoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initQ = searchParams.get('q') || '';

  const [query,       setQuery]       = useState(initQ);
  const [genre,       setGenre]       = useState('All');
  const [sort,        setSort]        = useState('popularity');
  const [page,        setPage]        = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const loaderRef = useRef(null);

  const debouncedQ = useDebounce(query, 400); // debounced search

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [debouncedQ, genre, sort]);

  // Sync URL param
  useEffect(() => {
    setSearchParams(debouncedQ ? { q: debouncedQ } : {});
  }, [debouncedQ]);

  // Filtered + sorted movies
  const results = useMemo(() => {
    let list = debouncedQ ? searchMovies(debouncedQ) : getByGenre(genre);
    switch (sort) {
      case 'rating':    list = [...list].sort((a, b) => b.rating - a.rating); break;
      case 'year_desc': list = [...list].sort((a, b) => b.year - a.year);     break;
      case 'year_asc':  list = [...list].sort((a, b) => a.year - b.year);     break;
      case 'title':     list = [...list].sort((a, b) => a.title.localeCompare(b.title)); break;
      default:          list = [...list].sort((a, b) => b.rating * b.year - a.rating * a.year);
    }
    return list;
  }, [debouncedQ, genre, sort]);

  // Visible slice (for infinite scroll simulation)
  const visible = results.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < results.length;

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) setPage(p => p + 1);
    }, { threshold: 0.5 });
    if (loaderRef.current) obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [hasMore]);

  return (
    <div className="min-h-screen bg-sv-dark text-white font-body">
      <Navbar />

      <div className="pt-24 px-4 sm:px-10 pb-16">
        {/* ── Search bar ── */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1 max-w-xl">
            <FiSearch size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by title, genre, cast, director…"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-sv-card border border-sv-border text-white text-sm
                         placeholder-gray-600 outline-none focus:border-sv-red transition-colors"
            />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm transition-colors
              ${showFilters ? 'border-sv-red text-sv-red bg-sv-red/10' : 'border-sv-border text-gray-400 hover:border-gray-500'}`}>
            <FiSliders size={16} /> Filters
          </button>
        </div>

        {/* ── Filters panel ── */}
        {showFilters && (
          <div className="mb-6 p-5 bg-sv-card border border-sv-border rounded-2xl animate-fade-in space-y-4">
            {/* Genre chips */}
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">Genre</p>
              <div className="flex gap-2 flex-wrap">
                {['All', ...ALL_GENRES].map(g => (
                  <button key={g} onClick={() => { setGenre(g); setQuery(''); }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors
                      ${genre === g && !debouncedQ
                        ? 'bg-sv-red border-sv-red text-white'
                        : 'border-sv-border text-gray-400 hover:border-gray-500 hover:text-white'}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">Sort by</p>
              <div className="flex gap-2 flex-wrap">
                {SORT_OPTIONS.map(o => (
                  <button key={o.value} onClick={() => setSort(o.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors
                      ${sort === o.value
                        ? 'bg-white/10 border-white text-white'
                        : 'border-sv-border text-gray-400 hover:border-gray-500'}`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Results header ── */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-500 text-sm">
            {debouncedQ
              ? <><span className="text-white font-medium">{results.length}</span> results for "<span className="text-sv-red">{debouncedQ}</span>"</>
              : <><span className="text-white font-medium">{results.length}</span> titles · <span className="text-gray-400">{genre}</span></>
            }
          </p>
          {/* Mobile sort pill */}
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="sm:hidden bg-sv-card border border-sv-border text-white text-xs rounded-lg px-2 py-1.5 outline-none">
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* ── Grid ── */}
        {results.length === 0 ? (
          <div className="text-center py-24 text-gray-600">
            <p className="text-5xl mb-4">🎬</p>
            <p className="text-lg text-gray-500">No movies found</p>
            <p className="text-sm mt-1">Try a different search or genre</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
            {visible.map(movie => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        )}

        {/* ── Infinite scroll sentinel ── */}
        {hasMore && (
          <div ref={loaderRef} className="flex justify-center mt-10">
            <div className="w-6 h-6 border-2 border-sv-red border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
