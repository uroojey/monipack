'use client';

import React from 'react';

interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div className={`toast ${message ? 'show' : ''}`} id="toast">
      {message || ''}
    </div>
  );
}
