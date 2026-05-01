// src/components/Navbar.jsx
import React, { useState, useEffect, memo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { toggleTheme } from '../redux/themeSlice';
import { FiSearch, FiBell, FiSun, FiMoon, FiLogOut, FiUser, FiBookmark, FiMenu, FiX } from 'react-icons/fi';

const Navbar = memo(function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dark     = useSelector(s => s.theme.dark);
  const profile  = useSelector(s => s.auth.activeProfile);

  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchVal,   setSearchVal]   = useState('');
  const [userMenu,    setUserMenu]    = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/categories?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  };

  const nav = [
    { to: '/home',       label: 'Home' },
    { to: '/categories', label: 'Movies' },
    { to: '/watchlist',  label: 'My List' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-body
      ${scrolled ? 'nav-solid shadow-lg' : 'nav-trans'}`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/home" className="font-display text-2xl tracking-widest text-sv-red select-none">
          STREAM<span className="text-white">VAULT</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6 ml-10">
          {nav.map(({ to, label }) => (
            <Link key={to} to={to}
              className={`text-sm font-medium transition-colors hover:text-sv-red
                ${location.pathname === to ? 'text-sv-red' : 'text-gray-300'}`}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Search */}
          <div className="relative flex items-center">
            {searchOpen && (
              <form onSubmit={handleSearch} className="mr-1">
                <input autoFocus value={searchVal} onChange={e => setSearchVal(e.target.value)}
                  placeholder="Search movies, cast…"
                  onBlur={() => { if (!searchVal) setSearchOpen(false); }}
                  className="w-44 sm:w-60 px-3 py-1.5 text-sm rounded-md bg-black/70 border border-gray-600
                             text-white placeholder-gray-500 outline-none focus:border-sv-red transition-colors" />
              </form>
            )}
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-300 hover:text-sv-red transition-colors" aria-label="Search">
              <FiSearch size={19} />
            </button>
          </div>

          {/* Bell */}
          <button className="hidden sm:block p-2 text-gray-300 hover:text-sv-red relative">
            <FiBell size={19} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-sv-red" />
          </button>

          {/* Theme */}
          <button onClick={() => dispatch(toggleTheme())}
            className="p-2 text-gray-300 hover:text-sv-red transition-colors" aria-label="Toggle theme">
            {dark ? <FiSun size={19} /> : <FiMoon size={19} />}
          </button>

          {/* Profile dropdown */}
          <div className="relative ml-1">
            <button onClick={() => setUserMenu(!userMenu)}
              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 transition-colors">
              <span className="text-2xl">{profile?.avatar ?? '👤'}</span>
              <span className="hidden sm:block text-sm font-medium text-gray-200">{profile?.name ?? 'Profile'}</span>
            </button>

            {userMenu && (
              <div className="absolute right-0 top-11 w-44 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl text-sm overflow-hidden z-50"
                onMouseLeave={() => setUserMenu(false)}>
                <Link to="/profiles" onClick={() => setUserMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-3 hover:bg-white/5 transition-colors text-gray-200">
                  <FiUser size={15} /> Switch Profile
                </Link>
                <Link to="/watchlist" onClick={() => setUserMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-3 hover:bg-white/5 transition-colors text-gray-200">
                  <FiBookmark size={15} /> My List
                </Link>
                <div className="border-t border-gray-700" />
                <button onClick={() => { dispatch(logout()); navigate('/login'); }}
                  className="w-full flex items-center gap-2.5 px-4 py-3 hover:bg-red-900/30 transition-colors text-red-400">
                  <FiLogOut size={15} /> Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors ml-1">
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 border-t border-gray-800 px-6 py-4 space-y-1">
          {nav.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setMobileOpen(false)}
              className={`block py-2.5 text-sm font-medium border-b border-gray-800
                ${location.pathname === to ? 'text-sv-red' : 'text-gray-300'}`}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
});

export default Navbar;
