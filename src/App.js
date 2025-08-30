import React from 'react';
import Clock from './Clock';

export default function App(){
  return (
    <div className="app">
      <h1>Digital Clock</h1>
      <Clock />
      <p className="hint">Built with React — live updating every second.</p>
    </div>
  );
}
