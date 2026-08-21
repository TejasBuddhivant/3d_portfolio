"use client";

import { useEffect, useState } from 'react';

export default function SplineBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Inject the Spline module script dynamically on the client side
    const scriptId = 'spline-viewer-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      // Use unpkg to avoid Next.js routing bugs with WASM
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.90/build/spline-viewer.js';
      document.head.appendChild(script);
    }
  }, []);

  // Avoid hydration mismatch by only rendering the viewer after the client has mounted
  if (!mounted) {
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          overflow: 'hidden',
          backgroundColor: '#000',
        }} 
      />
    );
  }

  // Cast the web component tag to 'any' to bypass TS IntrinsicElements checks 
  const SplineViewerTag = 'spline-viewer' as any;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      <SplineViewerTag 
        loading-anim-type="spinner-small-dark" 
        url="https://prod.spline.design/UHmqrqtbop3bSBeh/scene.splinecode"
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}
