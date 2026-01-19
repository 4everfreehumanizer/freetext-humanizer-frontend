// src/components/AdsterraBanner.js
import { useEffect, useRef } from 'react';

const AdsterraBanner = ({ adKey, width, height, domain = 'www.highperformanceformat.com' }) => {
  const containerRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || scriptLoadedRef.current) return;

    // Clear container first
    containerRef.current.innerHTML = '';

    // Create wrapper div for Adsterra
    const wrapper = document.createElement('div');
    wrapper.className = 'adsterra-ad';
    wrapper.dataset.key = adKey;

    // Create config script
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      atOptions = {
        'key': '${adKey}',
        'format': 'iframe',
        'height': ${height},
        'width': ${width},
        'params': {}
      };
    `;

    // Create invoke script
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.async = true;
    invokeScript.src = `https://${domain}/${adKey}/invoke.js`;
    
    // Add error handling
    invokeScript.onerror = () => {
      console.error(`Failed to load ad script for key: ${adKey}`);
      // Optionally show placeholder
      wrapper.innerHTML = `<div style="width:${width}px;height:${height}px;border:1px dashed #ccc;display:flex;align-items:center;justify-content:center;background:#f9f9f9;">
        <p style="color:#666;font-size:12px;">Ad failed to load</p>
      </div>`;
    };

    // Append to wrapper
    wrapper.appendChild(configScript);
    wrapper.appendChild(invokeScript);
    containerRef.current.appendChild(wrapper);
    
    scriptLoadedRef.current = true;

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        scriptLoadedRef.current = false;
      }
    };
  }, [adKey, width, height, domain]);

  return (
    <div
      ref={containerRef}
      className="adsterra-container"
      style={{
        minWidth: `${width}px`,
        minHeight: `${height}px`,
        width: '100%',
        height: 'auto',
        maxWidth: `${width}px`,
        margin: '0 auto',
        overflow: 'hidden',
        position: 'relative',
      }}
    />
  );
};

export default AdsterraBanner;