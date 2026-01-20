// src/components/AdsterraBanner.js - UPDATED WITH DOMAIN PROP
import { useEffect, useRef } from 'react';

const AdsterraBanner = ({ 
  adKey, 
  width, 
  height, 
  domain = 'www.highperformanceformat.com',  // Add this line
  debug = true 
}) => {
  const containerRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    console.log(`🎯 AdsterraBanner MOUNTING for ${adKey}`);
    
    if (!containerRef.current || mountedRef.current) return;
    
    mountedRef.current = true;
    const container = containerRef.current;
    
    // Clear container
    container.innerHTML = '';
    
    // Create placeholder
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width: ${width}px;
      height: ${height}px;
      background: #f3f4f6;
      border: 2px dashed #d1d5db;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      font-size: 14px;
      margin: 0 auto;
    `;
    
    placeholder.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 5px;">📢 AD SPACE</div>
      <div style="font-size: 12px;">${width}×${height}</div>
      <div style="font-size: 10px; margin-top: 8px; color: #9ca3af;">Loading ad...</div>
    `;
    
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
    
    console.log(`✅ atOptions set for ${adKey}:`, window.atOptions);
    
    // Create and load script - USE THE DOMAIN PROP HERE
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://${domain}/${adKey}/invoke.js`;  // Fixed this line
    script.async = true;
    
    script.onload = () => {
      console.log(`✅ Script loaded for ${adKey}`);
      setTimeout(() => {
        // Check if ad loaded
        const iframes = container.getElementsByTagName('iframe');
        if (iframes.length > 0) {
          console.log(`🎉 AD LOADED for ${adKey}!`);
          placeholder.style.display = 'none';
        } else {
          console.log(`⚠️ No ad inventory for ${adKey}`);
          placeholder.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px; color: #f59e0b;">⏳ Waiting for Ad</div>
            <div style="font-size: 12px;">${width}×${height}</div>
            <div style="font-size: 10px; margin-top: 10px; color: #9ca3af;">
              Ad space ready<br/>
              Earnings will start soon
            </div>
          `;
        }
      }, 2000);
    };
    
    script.onerror = () => {
      console.error(`❌ Script failed for ${adKey}`);
      placeholder.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px; color: #ef4444;">Ad Blocked</div>
        <div style="font-size: 12px;">${width}×${height}</div>
        <div style="font-size: 10px; margin-top: 10px; color: #9ca3af;">
          Disable ad blocker<br/>
          or try different browser
        </div>
      `;
    };
    
    // Append script
    container.appendChild(script);
    console.log(`📤 Script appended for ${adKey} from ${domain}`);
    
    return () => {
      console.log(`🧹 Cleaning up ${adKey}`);
      mountedRef.current = false;
    };
  }, [adKey, width, height, domain]);  // Add domain to dependencies

  return (
    <div>
      <div
        ref={containerRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: '100%',
          margin: '0 auto'
        }}
      />
      {debug && (
        <div style={{
          fontSize: '11px',
          color: '#6b7280',
          textAlign: 'center',
          marginTop: '4px',
          padding: '4px',
          background: '#f9fafb',
          borderRadius: '4px'
        }}>
          Ad: {adKey.substring(0, 8)}... | {width}×{height} | {domain}
        </div>
      )}
    </div>
  );
};

export default AdsterraBanner;