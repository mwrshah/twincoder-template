'use client'
import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const notify = () => toast('This is a toast from React-Hot-Toast!');

  return (
    <div>
      <button onClick={notify}>Show Toast</button>
      <Toaster />
    </div>
  );
}

export default App;
