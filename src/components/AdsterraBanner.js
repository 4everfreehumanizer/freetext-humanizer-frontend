import React, { useEffect, useRef } from 'react';

const AdsterraBanner = ({ adKey, width, height }) => {
  const bannerRef = useRef(null);

  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = `//pl24004888.profitablecpmgate.com/${adKey}/invoke.js`;

    // Append to banner container
    if (bannerRef.current) {
      bannerRef.current.appendChild(script);
    }

    // Cleanup
    return () => {
      if (bannerRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [adKey]);

  return (
    <div 
      ref={bannerRef}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        maxWidth: '100%',
        margin: '0 auto'
      }}
      id={`container-${adKey}`}
    />
  );
};

export default AdsterraBanner;