// src/pages/NotFoundPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-sv-dark flex flex-col items-center justify-center text-white text-center px-4 font-body">
      <h1 className="font-display text-[12rem] leading-none text-sv-red/20 select-none">404</h1>
      <p className="text-2xl font-bold -mt-8 mb-2">Lost in the Stream</p>
      <p className="text-gray-500 mb-8">This page doesn't exist in any universe.</p>
      <button onClick={() => navigate('/home')}
        className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
        Back to Home
      </button>
    </div>
  );
}
