'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// No floating elements — clean browser frame only

const JSON_LINES = [
  '{',
  '  "data": [',
  '    {',
  '      "id": 1,',
  '      "name": "Alex Johnson",',
  '      "email": "alex@fetchlab.dev",',
  '      "role": "admin"',
  '    }',
  '  ],',
  '  "total": 847,',
  '  "page": 1',
  '}',
];

function syntaxHighlight(line: string): React.ReactNode {
  return line.split(/("(?:[^"\\]|\\.)*")/g).map((part, i) => {
    if (part.startsWith('"') && part.endsWith('"')) {
      if (line.includes(':') && line.indexOf(part) < line.indexOf(':')) {
        return <span key={i} style={{ color: '#89D196' }}>{part}</span>;
      }
      return <span key={i} style={{ color: '#98C379' }}>{part}</span>;
    }
    if (/\b\d+\b/.test(part)) {
      return <span key={i} style={{ color: '#D19A66' }}>{part}</span>;
    }
    if (part.includes('true') || part.includes('false')) {
      return <span key={i} style={{ color: '#D19A66' }}>{part}</span>;
    }
    if (part.includes('{') || part.includes('}') || part.includes('[') || part.includes(']')) {
      return <span key={i} style={{ color: '#F79CE0' }}>{part}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function HeroVisual() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [urlTyped, setUrlTyped] = useState('');
  const fullUrl = 'https://api.fetchlab.dev/v1/users';

  // Typing animation for URL
  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setUrlTyped(fullUrl.slice(0, i + 1));
        i++;
        if (i >= fullUrl.length) {
          clearInterval(interval);
          setTimeout(() => setShowResponse(true), 400);
        }
      }, 35);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // JSON lines appearing one by one
  useEffect(() => {
    if (!showResponse) return;
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= JSON_LINES.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [showResponse]);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 1000, margin: '0 auto' }}>
      {/* Main browser frame */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 10,
          background: '#111113',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 40px 100px -20px rgba(0,0,0,0.7), 0 0 150px -50px rgba(255,149,0,0.08)',
        }}
      >
        {/* Browser top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px', background: '#0C0C0E',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#111113', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 6, padding: '4px 14px', fontSize: 11, color: '#5C5C5C',
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5C5C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            fetchlab.dev
          </div>
          <div style={{ width: 60 }} />
        </div>

        {/* Content area */}
        <div style={{ padding: '20px 24px', background: '#0E0E10', minHeight: 400, paddingBottom: 30 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <img src="/logo.jpg" alt="" style={{ width: 18, height: 18, borderRadius: 4 }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>Fetchlab</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.1)' }}>›</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>APIs</span>
          </div>

          {/* Request bar */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              style={{
                padding: '8px 14px', borderRadius: 8,
                background: '#10B98115', border: '1px solid #10B98125',
                fontSize: 13, fontWeight: 700, color: '#10B981',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              GET
            </motion.div>
            <div style={{
              flex: 1, padding: '8px 14px', borderRadius: 8,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              fontSize: 13, color: 'rgba(255,255,255,0.7)',
              fontFamily: "'JetBrains Mono', monospace",
              overflow: 'hidden', whiteSpace: 'nowrap',
            }}>
              {urlTyped}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                style={{ color: '#FF9500', marginLeft: 1 }}
              >|</motion.span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '8px 20px', borderRadius: 8,
                background: 'linear-gradient(135deg, #FF9500, #FF7A00)',
                color: 'white', fontSize: 13, fontWeight: 600,
                border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(255,149,0,0.25)',
              }}
            >
              Send
            </motion.button>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex', gap: 16, borderBottom: '1px solid rgba(255,255,255,0.06)',
            marginBottom: 16, paddingBottom: 0,
          }}>
            {['Response', 'Headers', 'Scripts', 'Tests'].map((tab, i) => (
              <span key={tab} style={{
                fontSize: 12, fontWeight: 500, paddingBottom: 8,
                color: i === 0 ? '#FF9500' : 'rgba(255,255,255,0.25)',
                borderBottom: i === 0 ? '2px solid #FF9500' : '2px solid transparent',
              }}>{tab}</span>
            ))}
          </div>

          {/* Response */}
          <AnimatePresence>
            {showResponse && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Status bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    style={{
                      fontSize: 12, fontWeight: 700, color: '#10B981',
                      background: '#10B98115', padding: '4px 10px', borderRadius: 6,
                    }}
                  >200 OK</motion.span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>42ms</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>1.2 KB</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.12)', marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace" }}>application/json</span>
                </div>

                {/* JSON response */}
                <div style={{
                  background: '#09090B', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10, padding: '14px 16px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12, lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.4)',
                  overflow: 'hidden',
                }}>
                  {JSON_LINES.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                      style={{ whiteSpace: 'pre' }}
                    >
                      {syntaxHighlight(line)}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
