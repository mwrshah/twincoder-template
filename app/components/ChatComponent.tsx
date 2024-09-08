'use client';

import React from 'react';
import { useState } from 'react';
import { useChat } from 'ai/react';
import { PiStopCircle } from 'react-icons/pi';
import { PiPaperPlaneTilt } from 'react-icons/pi';


export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, data, stop} = useChat({
    onFinish: () => setIsSending(false)
  });
  const [isSending, setIsSending] = useState(false);

  const handleSubmitActions = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSending(true);
    e.preventDefault();
    handleSubmit();
  }
  
  const handleStop = () => {
    stop();
    setIsSending(false);
  }
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {data && <pre className="text-xs text-gray-500">{JSON.stringify(data, null, 2)}</pre>}
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}
      <div className="fixed bottom-0 w-full max-w-md p-1 mb-8 border border-gray-300 rounded shadow-xl">
      <form onSubmit={handleSubmitActions}>
        <input
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          className="w-[92%] p-1"
        />
        {!isSending && <button type="submit" className="absolute right-0 bottom-0 mx-2 mb-2 ">
          <PiPaperPlaneTilt className="w-6 h-6" />
        </button>}
        {isSending && <button 
          className="absolute right-0 bottom-0 mx-2 mb-2"
          onClick={handleStop}
        >
          <PiStopCircle className="w-6 h-6" />
        </button>}
      </form>
      </div>
    </div>
  );
}
