'use client';

import ReactDOM from 'react-dom';

export default function PreloadResources() {
  ReactDOM.preload('/home.webp', { as: 'image' });

  return null;
}
