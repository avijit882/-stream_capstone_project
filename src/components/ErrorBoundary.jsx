// src/components/ErrorBoundary.jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(e, info) { console.error('ErrorBoundary:', e, info); }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="min-h-screen bg-sv-dark flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="font-display text-7xl text-sv-red mb-3 tracking-widest">OOPS</h1>
        <p className="text-gray-400 mb-2 font-body">Something went wrong rendering this page.</p>
        <p className="text-gray-600 text-sm mb-8 font-mono">{this.state.error?.message}</p>
        <button
          onClick={() => { this.setState({ hasError: false }); window.location.href = '/home'; }}
          className="px-8 py-3 bg-sv-red rounded font-semibold font-body hover:bg-red-700 transition-colors">
          Back to Home
        </button>
      </div>
    );
  }
}
