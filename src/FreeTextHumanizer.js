import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Moon, Sun, Copy, Download, RefreshCw, ArrowLeft, Loader2 } from 'lucide-react';

const API_URL = 'http://localhost:3001';

const FreeTextHumanizer = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState('input'); // 'input' or 'output'
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState('Neutral');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [outputData, setOutputData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [adBlockerDetected, setAdBlockerDetected] = useState(false);
  const [adRefreshKey, setAdRefreshKey] = useState(0);

  // Detect ad blocker
  useEffect(() => {
    const detectAdBlocker = async () => {
      try {
        await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
          method: 'HEAD',
          mode: 'no-cors'
        });
        setAdBlockerDetected(false);
      } catch (e) {
        // Check multiple ad networks
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox ad-banner adsbygoogle';
        testAd.style.position = 'absolute';
        testAd.style.left = '-9999px';
        document.body.appendChild(testAd);
        
        setTimeout(() => {
          if (testAd.offsetHeight === 0) {
            setAdBlockerDetected(true);
          }
          document.body.removeChild(testAd);
        }, 100);
      }
    };

    detectAdBlocker();
  }, []);

  // Refresh ads on page change
  useEffect(() => {
    setAdRefreshKey(prev => prev + 1);
  }, [page]);

  const handleSubmit = async () => {
    if (!inputText.trim() || inputText.length > 2000 || loading) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/humanize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          tone: tone
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to humanize text');
      }

      setOutputData(data);
      setPage('output');
    } catch (err) {
      setError(err.message);
      // Trigger shake animation
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (outputData?.humanizedText) {
      navigator.clipboard.writeText(outputData.humanizedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (outputData?.humanizedText) {
      const blob = new Blob([outputData.humanizedText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'humanized-text.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleRegenerate = async () => {
    setPage('input');
    setTimeout(() => handleSubmit(), 100);
  };

  const handleBackToInput = () => {
    setPage('input');
    setOutputData(null);
    setError('');
  };

  const charCount = inputText.length;
  const isOverLimit = charCount > 2000;
  const isButtonDisabled = !inputText.trim() || isOverLimit || loading;

  // Ad Component
  const AdPlaceholder = ({ size, position }) => (
    <div 
      key={`${position}-${adRefreshKey}`}
      className={`ad-placeholder ${darkMode ? 'ad-dark' : 'ad-light'}`}
      style={{
        width: size === 'banner' ? '728px' : '160px',
        height: size === 'banner' ? '90px' : '600px',
        maxWidth: '100%'
      }}
    >
      <div className="ad-content">
        <span className="ad-label">Advertisement</span>
        <span className="ad-size">{size === 'banner' ? '728x90' : '160x600'}</span>
      </div>
    </div>
  );

  if (adBlockerDetected) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-white via-pink-50 to-white'}`}>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className={`glass-card ${darkMode ? 'glass-dark' : ''} p-12 rounded-3xl`}>
              <div className="text-6xl mb-6">🚫</div>
              <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Ad Blocker Detected
              </h1>
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                ForeverFree Humanizer is 100% free and relies on ads to operate. Please disable your ad blocker to continue using our service.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary px-8 py-3 rounded-xl font-semibold"
              >
                I've Disabled My Ad Blocker
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-white via-pink-50 to-white'}`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="stars"></div>
      </div>

      {/* Top Banner Ad */}
      <div className="flex justify-center py-4">
        <AdPlaceholder size="banner" position="top" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex gap-8">
          {/* Left Sidebar Ad */}
          <div className="hidden lg:block flex-shrink-0 sticky top-8 h-fit">
            <AdPlaceholder size="sidebar" position="left" />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className={`w-8 h-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'} animate-pulse`} />
                <h1 className="text-5xl font-bold gradient-text">
                  ForeverFree Humanizer
                </h1>
                <Zap className={`w-8 h-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} animate-pulse`} />
              </div>
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Transform AI Text Into Authentic Human Expression — 100% Free, Forever, Unlimited ✨
              </p>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`mt-4 p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'} hover:scale-110 transition-transform`}
              >
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
            </div>

            {/* Input Page */}
            {page === 'input' && (
              <div className={`glass-card ${darkMode ? 'glass-dark' : ''} p-8 rounded-3xl mb-8`}>
                <div className="mb-6">
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Enter Your AI-Generated Text
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your AI-generated text here..."
                    className={`w-full h-64 p-4 rounded-xl border-2 ${
                      isOverLimit 
                        ? 'border-red-500' 
                        : darkMode 
                          ? 'border-gray-600 bg-gray-800 text-white' 
                          : 'border-gray-300 bg-white text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none`}
                  />
                  <div className={`text-sm mt-2 ${isOverLimit ? 'text-red-500 font-semibold' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {charCount}/2000 characters
                  </div>
                </div>

                <div className="mb-6">
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Select Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className={`w-full p-4 rounded-xl border-2 ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-800 text-white' 
                        : 'border-gray-300 bg-white text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  >
                    <option value="Neutral">Neutral</option>
                    <option value="Formal">Formal</option>
                    <option value="Casual">Casual</option>
                    <option value="Persuasive">Persuasive</option>
                    <option value="Friendly">Friendly</option>
                  </select>
                </div>

                {error && (
                  <div className="error-message mb-6 shake">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isButtonDisabled}
                  className={`btn-primary w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 ${
                    isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Humanizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Humanize It!
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Output Page */}
            {page === 'output' && outputData && (
              <div className={`glass-card ${darkMode ? 'glass-dark' : ''} p-8 rounded-3xl mb-8`}>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ✨ Humanized Text
                </h2>
                <div className={`p-6 rounded-xl mb-6 ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'
                } border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className="whitespace-pre-wrap">{outputData.humanizedText}</p>
                </div>

                <div className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span>Tone: {outputData.tone}</span>
                  <span className="mx-2">•</span>
                  <span>Original: {outputData.originalLength} chars</span>
                  <span className="mx-2">•</span>
                  <span>Humanized: {outputData.humanizedLength} chars</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={handleCopy}
                    className="btn-secondary py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <Copy className="w-5 h-5" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="btn-secondary py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button
                    onClick={handleRegenerate}
                    className="btn-secondary py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Regenerate
                  </button>
                  <button
                    onClick={handleBackToInput}
                    className="btn-secondary py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Input
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden lg:block flex-shrink-0 sticky top-8 h-fit">
            <AdPlaceholder size="sidebar" position="right" />
          </div>
        </div>

        {/* Bottom Banner Ad */}
        <div className="flex justify-center mt-8">
          <AdPlaceholder size="banner" position="bottom" />
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <div className="flex flex-wrap justify-center gap-4 mb-3 text-sm">
          <a href="/terms" className={`hover:underline ${darkMode ? 'hover:text-gray-200' : 'hover:text-gray-900'}`}>
            Terms of Use
          </a>
          <span>•</span>
          <a href="/privacy" className={`hover:underline ${darkMode ? 'hover:text-gray-200' : 'hover:text-gray-900'}`}>
            Privacy Policy
          </a>
          <span>•</span>
          <a href="/disclaimer" className={`hover:underline ${darkMode ? 'hover:text-gray-200' : 'hover:text-gray-900'}`}>
            Disclaimer
          </a>
          <span>•</span>
          <a href="mailto:4everfreehumanizer@gmail.com" className={`hover:underline ${darkMode ? 'hover:text-gray-200' : 'hover:text-gray-900'}`}>
            Contact Us
          </a>
        </div>
        <p className="text-sm">
          © 2026 ForeverFree Humanizer – Human‑like text, forever free.
        </p>
      </footer>
    </div>
  );
};

export default FreeTextHumanizer;