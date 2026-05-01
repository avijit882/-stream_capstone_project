// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700)); // simulate network
    dispatch(login({ email, name: email.split('@')[0] }));
    navigate('/profiles');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center font-body overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-sv-dark">
        <img
          src="https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-8 z-10">
        <span className="font-display text-3xl tracking-widest text-sv-red">
          STREAM<span className="text-white">VAULT</span>
        </span>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-black/80 backdrop-blur-sm rounded-2xl px-8 sm:px-12 py-10 border border-white/5 shadow-2xl animate-fade-in">
        <h1 className="text-3xl font-bold text-white mb-1">Sign In</h1>
        <p className="text-gray-500 text-sm mb-8">Welcome back to StreamVault</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Email address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white
                         placeholder-gray-600 outline-none focus:border-sv-red transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 rounded-xl bg-white/5 border border-white/10 text-white
                           placeholder-gray-600 outline-none focus:border-sv-red transition-colors text-sm"
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPw ? <FiEyeOff size={17} /> : <FiEye size={17} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sv-red text-sm bg-sv-red/10 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3.5 mt-2 bg-sv-red text-white font-bold rounded-xl
                       hover:bg-red-700 transition-colors disabled:opacity-60 text-sm tracking-wide">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </span>
            ) : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-600">
          🎬 Demo: any email + any password works
        </p>

        <div className="mt-6 text-sm text-gray-500 text-center">
          New here?{' '}
          <span className="text-white cursor-pointer hover:underline underline-offset-2">
            Create account
          </span>
        </div>
      </div>
    </div>
  );
}
