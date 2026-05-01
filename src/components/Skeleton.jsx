// src/components/Skeleton.jsx
import React from 'react';

export function CardSkeleton() {
  return (
    <div className="flex-shrink-0 w-36 sm:w-44 md:w-48">
      <div className="skeleton w-full aspect-[2/3] rounded-lg" />
      <div className="skeleton w-3/4 h-3 mt-2 rounded" />
      <div className="skeleton w-1/2 h-2.5 mt-1 rounded" />
    </div>
  );
}

export function RowSkeleton({ count = 6 }) {
  return (
    <div className="mb-10 px-4 sm:px-10">
      <div className="skeleton w-40 h-5 mb-3 rounded" />
      <div className="flex gap-2.5 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}

export function BannerSkeleton() {
  return (
    <div className="w-full h-[85vh] skeleton relative rounded-none">
      <div className="absolute bottom-24 left-6 sm:left-16 space-y-3">
        <div className="skeleton w-72 h-12 rounded" />
        <div className="skeleton w-96 h-4 rounded" />
        <div className="skeleton w-80 h-4 rounded" />
        <div className="flex gap-3 mt-5">
          <div className="skeleton w-28 h-11 rounded" />
          <div className="skeleton w-32 h-11 rounded" />
        </div>
      </div>
    </div>
  );
}
