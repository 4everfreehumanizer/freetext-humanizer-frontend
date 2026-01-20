// src/components/AdsterraBanner.js
import { useEffect, useRef, useState } from 'react';

const AdsterraBanner = ({ 
  adKey, 
  width, 
  height, 
  domain = 'www.highperformanceformat.com',
  debug = false // Set to true to see debug info
}) => {
  const containerRef = useRef(null);
  const [adStatus, setAdStatus] = useState('loading');
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';
    setAdStatus('loading');
    setDebugInfo('Initializing ad...');

    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.id = `adsterra-${adKey}`;
    wrapper.className = 'adsterra-ad-wrapper';
    
    // Create placeholder (shows while ad loads)
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width: ${width}px;
      height: ${height}px;
      background: #f5f5f5;
      border: 1px dashed #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-size: 12px;
      position: relative;
    `;
    placeholder.innerHTML = `
      <div>Ad Loading...</div>
      <div style="font-size:10px;margin-top:5px;">Key: ${adKey.substring(0, 8)}...</div>
    `;
    wrapper.appendChild(placeholder);
    containerRef.current.appendChild(wrapper);

    // Load Adsterra script
    const loadAdScript = () => {
      try {
        // 1. Create atOptions configuration
        window.atOptions = window.atOptions || {};
        window.atOptions = {
          key: adKey,
          format: 'iframe',
          height: height,
          width: width,
          params: {},
          // Add callback for debugging
          onLoad: () => {
            setAdStatus('loaded');
            setDebugInfo('Ad loaded successfully');
            if (debug) console.log(`✅ Ad loaded: ${adKey}`);
          },
          onError: () => {
            setAdStatus('error');
            setDebugInfo('Failed to load ad');
            placeholder.innerHTML = `
              <div style="color:#e74c3c;">Ad Failed to Load</div>
              <div style="font-size:10px;margin-top:5px;">
                Check ad blocker or key<br/>
                Key: ${adKey.substring(0, 8)}...
              </div>
            `;
            if (debug) console.error(`❌ Ad failed: ${adKey}`);
          }
        };

        // 2. Create and append the script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://${domain}/${adKey}/invoke.js`;
        script.async = true;
        
        script.onload = () => {
          setDebugInfo('Script loaded, waiting for ad...');
          if (debug) console.log(`📜 Script loaded for: ${adKey}`);
          
          // Check if ad loaded after 3 seconds
          setTimeout(() => {
            const iframe = wrapper.querySelector('iframe');
            if (iframe && iframe.style.visibility !== 'hidden') {
              setAdStatus('loaded');
              setDebugInfo('Ad displayed');
              placeholder.style.display = 'none';
            } else {
              setAdStatus('timeout');
              setDebugInfo('Ad timed out');
            }
          }, 3000);
        };
        
        script.onerror = () => {
          setAdStatus('script_error');
          setDebugInfo('Failed to load script');
          placeholder.innerHTML = `
            <div style="color:#e74c3c;">Script Failed</div>
            <div style="font-size:10px;">
              Domain: ${domain}<br/>
              Check network tab
            </div>
          `;
          if (debug) console.error(`❌ Script failed: ${adKey}`);
        };

        // 3. Append script
        wrapper.appendChild(script);
        setDebugInfo('Script appended, loading...');

      } catch (error) {
        setAdStatus('error');
        setDebugInfo(`Error: ${error.message}`);
        if (debug) console.error('Adsterra setup error:', error);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadAdScript, 100);
    
    return () => {
      clearTimeout(timer);
      // Cleanup
      if (window.atOptions && window.atOptions.key === adKey) {
        delete window.atOptions;
      }
    };
  }, [adKey, width, height, domain, debug]);

  return (
    <div>
      <div
        ref={containerRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: '100%',
          margin: '0 auto',
          overflow: 'hidden',
          position: 'relative'
        }}
      />
      
      {/* Debug info (only shows when debug=true) */}
      {debug && (
        <div style={{
          fontSize: '10px',
          color: '#666',
          padding: '5px',
          background: '#f9f9f9',
          border: '1px solid #eee',
          marginTop: '5px'
        }}>
          <strong>Ad Debug:</strong> {adStatus} | {debugInfo}
        </div>
      )}
    </div>
  );
};

export default AdsterraBanner;