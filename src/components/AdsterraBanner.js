// src/components/AdsterraBanner.js
import { useEffect, useRef, useState } from 'react';

const AdsterraBanner = ({ 
  adKey, 
  width, 
  height, 
  domain = 'www.highperformanceformat.com',
  debug = true // Keep true for now
}) => {
  const containerRef = useRef(null);
  const [adStatus, setAdStatus] = useState('loading');
  const [debugInfo, setDebugInfo] = useState('');
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || scriptLoadedRef.current) return;

    console.log(`🔵 AdsterraBanner mounting for key: ${adKey}`);
    
    // Clear container
    containerRef.current.innerHTML = '';
    setAdStatus('loading');
    setDebugInfo('Initializing...');
    scriptLoadedRef.current = true;

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.id = `adsterra-${adKey}`;
    wrapper.className = 'adsterra-wrapper';
    
    // Create placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'adsterra-placeholder';
    placeholder.style.cssText = `
      width: ${width}px;
      height: ${height}px;
      background: linear-gradient(135deg, #667eea0d 0%, #764ba20d 100%);
      border: 2px dashed #667eea40;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #667eea;
      font-size: 14px;
      position: relative;
      margin: 0 auto;
    `;
    
    placeholder.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 5px;">🔄 Loading Ad...</div>
      <div style="font-size: 11px; opacity: 0.7;">${width}×${height}</div>
      <div style="font-size: 10px; margin-top: 8px; opacity: 0.5;">Key: ${adKey.substring(0, 8)}...</div>
    `;
    
    wrapper.appendChild(placeholder);
    containerRef.current.appendChild(wrapper);

    // CRITICAL FIX: Create atOptions on WINDOW object
    // This must be set GLOBALLY before loading the script
    if (!window.atOptions) {
      window.atOptions = {};
    }
    
    // Set the specific ad configuration
    window.atOptions = {
      key: adKey,
      format: 'iframe',
      height: height,
      width: width,
      params: {}
    };
    
    console.log(`📋 window.atOptions set for: ${adKey}`, window.atOptions);

    // Create script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://${domain}/${adKey}/invoke.js`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log(`✅ Script loaded for: ${adKey}`);
      setDebugInfo('Script loaded, ad should appear...');
      
      // Check if ad loaded after delay
      setTimeout(() => {
        const iframes = wrapper.getElementsByTagName('iframe');
        if (iframes.length > 0) {
          console.log(`🎉 Ad iframe found for: ${adKey}`);
          setAdStatus('loaded');
          setDebugInfo('Ad displayed ✓');
          placeholder.style.display = 'none';
        } else {
          console.log(`⚠️ No iframe found for: ${adKey}`);
          setAdStatus('no_iframe');
          setDebugInfo('No ad served yet');
          placeholder.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px; color: #f59e0b;">⏳ Waiting for Ad</div>
            <div style="font-size: 11px; opacity: 0.7;">${width}×${height}</div>
            <div style="font-size: 10px; margin-top: 10px; opacity: 0.5;">
              No ad inventory yet<br/>
              Try refreshing
            </div>
          `;
        }
      }, 2000); // Wait 2 seconds for ad to render
    };
    
    script.onerror = (error) => {
      console.error(`❌ Script failed for ${adKey}:`, error);
      setAdStatus('error');
      setDebugInfo('Script failed to load');
      
      placeholder.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px; color: #ef4444;">❌ Ad Error</div>
        <div style="font-size: 11px; opacity: 0.7;">${width}×${height}</div>
        <div style="font-size: 10px; margin-top: 10px; opacity: 0.5; text-align: center;">
          Script failed to load<br/>
          Check ad blocker<br/>
          Key: ${adKey.substring(0, 8)}...
        </div>
      `;
    };

    // Append script to wrapper
    console.log(`📤 Appending script for: ${adKey}`);
    wrapper.appendChild(script);
    setDebugInfo('Script appended, loading...');

    // Cleanup
    return () => {
      console.log(`🧹 Cleaning up ad: ${adKey}`);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      scriptLoadedRef.current = false;
    };
  }, [adKey, width, height, domain, debug]);

  return (
    <div className="adsterra-container">
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
      
      {/* Debug info - always show for now */}
      <div style={{
        fontSize: '11px',
        color: debug ? '#666' : 'transparent',
        padding: '4px',
        background: debug ? '#f8fafc' : 'transparent',
        border: debug ? '1px solid #e2e8f0' : 'none',
        marginTop: '4px',
        borderRadius: '4px',
        textAlign: 'center',
        minHeight: '32px'
      }}>
        {debug ? (
          <>
            <strong>Ad Debug:</strong> {adStatus} | {debugInfo}
          </>
        ) : (
          <span style={{color: 'transparent'}}>.</span>
        )}
      </div>
    </div>
  );
};

export default AdsterraBanner;