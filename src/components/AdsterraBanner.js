// src/components/AdsterraBanner.js - CLEAN VERSION
import { useEffect, useRef } from 'react';

const AdsterraBanner = ({ 
  adKey, 
  width, 
  height, 
  domain = 'www.highperformanceformat.com',
  debug = false  // Changed default to false
}) => {
  const containerRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || mountedRef.current) return;
    
    mountedRef.current = true;
    const container = containerRef.current;
    
    // Clear container
    container.innerHTML = '';
    
    // Create minimal placeholder
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width: ${width}px;
      height: ${height}px;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9ca3af;
      font-size: 12px;
      margin: 0 auto;
    `;
    
    placeholder.innerHTML = `<div>Loading...</div>`;
    
    container.appendChild(placeholder);
    
    // Set global atOptions
    window.atOptions = window.atOptions || {};
    window.atOptions = {
      key: adKey,
      format: 'iframe',
      height: height,
      width: width,
      params: {}
    };
    
    // Create and load script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://${domain}/${adKey}/invoke.js`;
    script.async = true;
    
    script.onload = () => {
      setTimeout(() => {
        // Check if ad loaded
        const iframes = container.getElementsByTagName('iframe');
        if (iframes.length > 0) {
          placeholder.style.display = 'none';
        }
      }, 2000);
    };
    
    script.onerror = () => {
      // Just hide placeholder on error, no message
      placeholder.style.display = 'none';
    };
    
    // Append script
    container.appendChild(script);
    
    return () => {
      mountedRef.current = false;
    };
  }, [adKey, width, height, domain]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: '100%',
        margin: '0 auto'
      }}
    />
  );
};

export default AdsterraBanner;