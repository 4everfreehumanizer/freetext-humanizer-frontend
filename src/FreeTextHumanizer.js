import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Moon, Sun, Copy, Download, RefreshCw, ArrowLeft, Loader2, AlertCircle, CheckCircle, BarChart } from 'lucide-react';
import AdsterraBanner from './components/AdsterraBanner';

const API_URL = 'https://freetext-humanizer-backend.onrender.com';

const FreeTextHumanizer = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  const [page, setPage] = useState('input');
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState('Neutral');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [outputData, setOutputData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [adRefreshKey, setAdRefreshKey] = useState(0);
  const [stats, setStats] = useState({ processed: 0, lastUpdated: null });
  const [showStats, setShowStats] = useState(false);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('humanizerStats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Failed to load stats:', e);
      }
    }
  }, []);

  // Refresh ads when page changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAdRefreshKey(prev => prev + 1);
    }, 300);
    return () => clearTimeout(timer);
  }, [page]);

  // Submit handler with enhanced error handling
  const handleSubmit = async () => {
    if (!inputText.trim() || inputText.length > 2000 || loading) return;
    
    setLoading(true);
    setError('');
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000);
      
      const response = await fetch(`${API_URL}/api/humanize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          tone: tone,
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || 
          `Server error: ${response.status} ${response.statusText}`
        );
      }
      
      const data = await response.json();
      
      // Update stats
      const newStats = {
        processed: (stats.processed || 0) + 1,
        lastUpdated: new Date().toISOString(),
        lastTone: tone,
        avgLength: data.humanizedLength
      };
      
      setStats(newStats);
      localStorage.setItem('humanizerStats', JSON.stringify(newStats));
      
      setOutputData(data);
      setPage('output');
      
    } catch (err) {
      console.error('Humanization error:', err);
      
      let errorMessage = 'Failed to humanize text. ';
      
      if (err.name === 'AbortError') {
        errorMessage += 'Request timed out. Please try again.';
      } else if (err.message.includes('429')) {
        errorMessage += 'Server is busy. Please wait a moment.';
      } else if (err.message.includes('500')) {
        errorMessage += 'Server error. Please try again in a few moments.';
      } else if (err.message.includes('Failed to fetch')) {
        errorMessage += 'Network error. Check your connection.';
      } else {
        errorMessage += err.message;
      }
      
      setError(errorMessage);
      
      // Auto-clear error after 5 seconds
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  // Copy handler with improved feedback
  const handleCopy = async () => {
    if (outputData?.humanizedText) {
      try {
        await navigator.clipboard.writeText(outputData.humanizedText);
        setCopied(true);
        
        // Reset after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy failed:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = outputData.humanizedText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  // Download handler
  const handleDownload = () => {
    if (outputData?.humanizedText) {
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `humanized-text-${timestamp}.txt`;
      
      const blob = new Blob([outputData.humanizedText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Regenerate handler
  const handleRegenerate = () => {
    if (inputText.trim()) {
      setPage('input');
      setTimeout(() => handleSubmit(), 100);
    }
  };

  // Back to input handler
  const handleBackToInput = () => {
    setPage('input');
    setOutputData(null);
    setError('');
  };

  // Clear input handler
  const handleClearInput = () => {
    setInputText('');
    setError('');
  };

  // Sample texts for quick testing
  const sampleTexts = [
    {
      name: "Academic",
      text: "The exponential growth of artificial intelligence necessitates a comprehensive reevaluation of traditional pedagogical methodologies to ensure educational systems remain relevant in an increasingly automated landscape."
    },
    {
      name: "Business",
      text: "Leveraging data-driven insights through advanced analytics platforms enables organizations to optimize operational efficiencies, enhance customer engagement metrics, and drive sustainable revenue growth in competitive market environments."
    },
    {
      name: "Casual",
      text: "AI is pretty cool because it helps with boring tasks and makes things easier. Like, you can ask it questions and get answers right away without searching all over the internet."
    }
  ];

  const handleUseSample = (sampleText) => {
    setInputText(sampleText);
    setError('');
  };

  const charCount = inputText.length;
  const isOverLimit = charCount > 2000;
  const isButtonDisabled = !inputText.trim() || isOverLimit || loading;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50'
    }`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-pink-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Top Banner Ad */}
      <div className="flex justify-center py-4 bg-white/5 backdrop-blur-sm">
        <AdsterraBanner
          key={`top-${adRefreshKey}`}
          adKey="cd565dee18419e2f87c8cc9af2c50727"
          domain="www.highperformanceformat.com"
          width={728}
          height={90}
          debug={true}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar Ad */}
          <div className="hidden lg:block flex-shrink-0">
            <div className="sticky top-8">
              <AdsterraBanner
                adKey="0cc840d2d41c8c3b952d52ae7366dd20"
                domain="www.highperformanceformat.com"
                width={160}
                height={600}
                debug={true}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Sparkles className={`w-10 h-10 ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  } animate-pulse`} />
                  <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ForeverFree Humanizer
                  </h1>
                  <Zap className={`w-10 h-10 ${
                    darkMode ? 'text-yellow-400' : 'text-yellow-600'
                  } animate-pulse`} />
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowStats(!showStats)}
                    className={`p-2 rounded-full ${
                      darkMode 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    } transition-all hover:scale-110`}
                    title="Show Stats"
                  >
                    <BarChart className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-3 rounded-full ${
                      darkMode 
                        ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    } transition-all hover:scale-110 shadow-lg`}
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                  </button>
                </div>
              </div>
              
              <p className={`text-lg sm:text-xl mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Transform AI Text Into Authentic Human Expression — 
                <span className="font-semibold text-purple-600"> 100% Free, Forever, Unlimited</span> ✨
              </p>
              
              {/* Stats Panel */}
              {showStats && (
                <div className={`inline-block p-4 rounded-xl mb-4 ${
                  darkMode ? 'bg-gray-800/50' : 'bg-white/50'
                } backdrop-blur-sm border ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-lg text-purple-600">{stats.processed || 0}</div>
                      <div className="text-gray-500">Texts Processed</div>
                    </div>
                    {stats.lastTone && (
                      <div className="text-center">
                        <div className="font-bold text-lg text-pink-600">{stats.lastTone}</div>
                        <div className="text-gray-500">Last Tone</div>
                      </div>
                    )}
                    {stats.avgLength && (
                      <div className="text-center">
                        <div className="font-bold text-lg text-blue-600">{stats.avgLength}</div>
                        <div className="text-gray-500">Avg Length</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Input Page */}
            {page === 'input' && (
              <div className={`backdrop-blur-sm ${
                darkMode 
                  ? 'bg-gray-800/30 border-gray-700' 
                  : 'bg-white/30 border-gray-200'
              } border rounded-2xl p-6 sm:p-8 mb-8 shadow-xl`}>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <label className={`block text-lg font-semibold ${
                      darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      ✍️ Enter Your AI-Generated Text
                    </label>
                    <button
                      onClick={handleClearInput}
                      className={`text-sm px-3 py-1 rounded-lg ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      } transition-colors`}
                    >
                      Clear
                    </button>
                  </div>
                  
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your AI-generated text here... (Max 2000 characters)"
                    className={`w-full h-64 p-4 rounded-xl border-2 text-lg transition-all ${
                      isOverLimit
                        ? 'border-red-500 bg-red-50/50'
                        : darkMode
                        ? 'border-gray-600 bg-gray-900/50 text-white focus:border-purple-500'
                        : 'border-gray-300 bg-white/80 text-gray-900 focus:border-purple-400'
                    } focus:outline-none focus:ring-2 ${
                      darkMode ? 'focus:ring-purple-500/50' : 'focus:ring-purple-400/50'
                    } resize-none`}
                  />
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className={`text-sm ${
                      isOverLimit
                        ? 'text-red-500 font-semibold animate-pulse'
                        : darkMode
                        ? 'text-gray-400'
                        : 'text-gray-600'
                    }`}>
                      {charCount}/2000 characters
                      {charCount > 0 && (
                        <span className="ml-2">
                          ({Math.ceil(charCount / 5)} words approx.)
                        </span>
                      )}
                    </div>
                    {isOverLimit && (
                      <div className="text-red-500 text-sm font-semibold flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Too long! Please shorten your text.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <label className={`block text-lg font-semibold mb-4 ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    🎨 Select Tone
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {['Neutral', 'Formal', 'Casual', 'Persuasive', 'Friendly'].map((toneOption) => (
                      <button
                        key={toneOption}
                        onClick={() => setTone(toneOption)}
                        className={`py-3 px-4 rounded-xl text-center transition-all ${
                          tone === toneOption
                            ? darkMode
                              ? 'bg-purple-600 text-white shadow-lg'
                              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                            : darkMode
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {toneOption}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Samples */}
                <div className="mb-8">
                  <label className={`block text-sm font-semibold mb-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    🚀 Quick Samples (Click to try):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {sampleTexts.map((sample, index) => (
                      <button
                        key={index}
                        onClick={() => handleUseSample(sample.text)}
                        className={`p-3 rounded-lg text-sm text-left transition-all ${
                          darkMode
                            ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                            : 'bg-white/50 text-gray-700 hover:bg-gray-100/50'
                        } hover:scale-[1.02]`}
                      >
                        <div className="font-medium mb-1">{sample.name}</div>
                        <div className="text-xs opacity-70 truncate">{sample.text.substring(0, 60)}...</div>
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                    darkMode
                      ? 'bg-red-900/30 border border-red-700/50'
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      darkMode ? 'text-red-400' : 'text-red-500'
                    }`} />
                    <div className="text-sm">{error}</div>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isButtonDisabled}
                  className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all ${
                    isButtonDisabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:scale-[1.02] active:scale-[0.98]'
                  } ${
                    darkMode
                      ? 'bg-gradient-to-r from-purple-700 to-pink-700 text-white'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span className="animate-pulse">Humanizing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      ✨ Humanize It! (100% Free)
                    </>
                  )}
                </button>
                
                <div className={`text-center mt-4 text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  ⚡ Powered by advanced AI • No sign up required • Unlimited usage
                </div>
              </div>
            )}

            {/* Output Page */}
            {page === 'output' && outputData && (
              <div className={`backdrop-blur-sm ${
                darkMode 
                  ? 'bg-gray-800/30 border-gray-700' 
                  : 'bg-white/30 border-gray-200'
              } border rounded-2xl p-6 sm:p-8 mb-8 shadow-xl`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-2xl font-bold flex items-center gap-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Sparkles className="w-6 h-6 text-purple-500" />
                    ✨ Humanized Text
                  </h2>
                  <div className={`text-sm px-3 py-1 rounded-full ${
                    darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {outputData.tone} Tone
                  </div>
                </div>
                
                <div className={`p-5 rounded-xl mb-6 ${
                  darkMode 
                    ? 'bg-gray-900/50 text-gray-100 border-gray-700' 
                    : 'bg-white/80 text-gray-900 border-gray-200'
                } border`}>
                  <div className="whitespace-pre-wrap leading-relaxed text-lg">
                    {outputData.humanizedText}
                  </div>
                </div>
                
                <div className={`mb-8 p-4 rounded-xl ${
                  darkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
                }`}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Original Length
                      </div>
                      <div className={`text-xl font-bold ${
                        darkMode ? 'text-gray-300' : 'text-gray-800'
                      }`}>
                        {outputData.originalLength}
                      </div>
                    </div>
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Humanized Length
                      </div>
                      <div className={`text-xl font-bold ${
                        outputData.lengthRatio > 1.05 
                          ? 'text-yellow-500' 
                          : darkMode 
                            ? 'text-green-400' 
                            : 'text-green-600'
                      }`}>
                        {outputData.humanizedLength}
                      </div>
                    </div>
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Length Ratio
                      </div>
                      <div className={`text-xl font-bold ${
                        outputData.lengthRatio > 1.05 
                          ? 'text-yellow-500' 
                          : darkMode 
                            ? 'text-green-400' 
                            : 'text-green-600'
                      }`}>
                        {outputData.lengthRatio || '1.00'}
                      </div>
                    </div>
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Status
                      </div>
                      <div className={`text-xl font-bold flex items-center justify-center gap-1 ${
                        outputData.cached 
                          ? darkMode ? 'text-blue-400' : 'text-blue-600' 
                          : darkMode ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {outputData.cached ? (
                          <>
                            <span>Cached</span>
                            <CheckCircle className="w-5 h-5" />
                          </>
                        ) : 'Fresh'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={handleCopy}
                    className={`py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      copied
                        ? darkMode
                          ? 'bg-green-700 text-white'
                          : 'bg-green-100 text-green-700 border border-green-300'
                        : darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    } hover:scale-[1.02]`}
                  >
                    <Copy className="w-5 h-5" />
                    {copied ? 'Copied! ✓' : 'Copy Text'}
                  </button>
                  
                  <button
                    onClick={handleDownload}
                    className={`py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    } hover:scale-[1.02]`}
                  >
                    <Download className="w-5 h-5" />
                    Download .txt
                  </button>
                  
                  <button
                    onClick={handleRegenerate}
                    className={`py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    } hover:scale-[1.02]`}
                  >
                    <RefreshCw className="w-5 h-5" />
                    Regenerate
                  </button>
                  
                  <button
                    onClick={handleBackToInput}
                    className={`py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    } hover:scale-[1.02]`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    New Text
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden lg:block flex-shrink-0">
            <div className="sticky top-8">
              <AdsterraBanner
                adKey="15d45323977b03b6df0139313d64172b"
                domain="www.highperformanceformat.com"
                width={160}
                height={600}
                debug={true}
              />
            </div>
          </div>
        </div>

        {/* Bottom Banner Ad */}
        <div className="flex justify-center mt-12">
          <AdsterraBanner
            key={`bottom-${adRefreshKey}`}
            adKey="cd199a74bf99c7d40490085e0d2ed9fe"
            domain="www.highperformanceformat.com"
            width={728}
            height={90}
            debug={true}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-8 text-center ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {['Terms of Use', 'Privacy Policy', 'Disclaimer', 'Contact Us'].map((item, index) => (
              <a
                key={index}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className={`hover:underline transition-colors ${
                  darkMode 
                    ? 'hover:text-gray-200' 
                    : 'hover:text-gray-900'
                }`}
              >
                {item}
              </a>
            ))}
            <a
              href="mailto:4everfreehumanizer@gmail.com"
              className={`hover:underline transition-colors ${
                darkMode 
                  ? 'hover:text-gray-200' 
                  : 'hover:text-gray-900'
              }`}
            >
              💌 Support Email
            </a>
          </div>
          
          <div className={`text-sm mb-2 ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            © 2026 ForeverFree Humanizer – Making AI text undetectable, forever free.
          </div>
          
          <div className="text-xs opacity-70">
            Powered by advanced AI • No sign up • No limits • Human-like quality guaranteed
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FreeTextHumanizer;