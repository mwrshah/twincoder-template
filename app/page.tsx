'use client'
"use client";

import { useEffect } from 'react';
import mermaid from 'mermaid';

export default function Home() {
  const mermaidChart = `
    graph TD;
      Start[Start] --> Planning[Planning];
      Planning --> Design[Design];
      Design --> Development[Development];
      Development --> Testing[Testing];
      Testing --> Deployment[Deployment];
      Deployment --> Maintenance[Maintenance];
      Maintenance --> Planning[Planning];
  `;

  useEffect(() => {
    // Initialize Mermaid after component mounts
    mermaid.initialize({ startOnLoad: true });
    // Render the Mermaid chart content after load
    mermaid.contentLoaded();
  }, []);

  return (
    <div>
      <h1>Software Development Cycle</h1>
      {/* Mermaid chart container */}
      <div className="mermaid">{mermaidChart}</div>
    </div>
  );
}
