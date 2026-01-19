// src/components/AdsterraBanner.js
import { useEffect, useRef } from 'react';

const AdsterraBanner = ({ adKey, width, height, domain = 'www.highperformanceformat.com' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || containerRef.current.hasChildNodes()) return;

    // Config script (atOptions)
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

    // Invoke script
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.async = true;
    invokeScript.src = `//${domain}/${adKey}/invoke.js`;

    containerRef.current.appendChild(configScript);
    containerRef.current.appendChild(invokeScript);

    // Cleanup on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [adKey, width, height, domain]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: '100%',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    />
  );
};

export default AdsterraBanner;