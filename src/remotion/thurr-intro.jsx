import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const colors = {
  ink: '#1A1714',
  orange: '#D9621F',
  paper: '#F5EFE2',
  paperCold: '#FAF7EE',
};

export function ThurrIntro({ headline, subhead, cta }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoIn = spring({ frame, fps, config: { damping: 16, stiffness: 110 } });
  const headlineY = interpolate(frame, [22, 60], [90, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headlineOpacity = interpolate(frame, [18, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardY = interpolate(frame, [84, 120], [120, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardOpacity = interpolate(frame, [82, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sweep = interpolate(frame, [0, 180], [-520, 1320]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.paper,
        backgroundImage:
          'linear-gradient(rgba(26,23,20,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(26,23,20,.055) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        color: colors.ink,
        fontFamily: 'Arial, Helvetica, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 56,
          border: `8px solid ${colors.ink}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: sweep,
          top: -80,
          width: 260,
          height: 2160,
          background: colors.orange,
          transform: 'rotate(12deg)',
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 126,
          left: 108,
          right: 108,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 28,
          fontWeight: 900,
          letterSpacing: 8,
          textTransform: 'uppercase',
        }}
      >
        <span>Thurr Solutions</span>
        <span style={{ color: colors.orange }}>System Live</span>
      </div>
      <Img
        src={staticFile('right-thurr-wordmark-clean.png')}
        style={{
          position: 'absolute',
          top: 240,
          left: 140,
          width: 800,
          transform: `scale(${0.72 + logoIn * 0.28}) rotate(-4deg)`,
          opacity: logoIn,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 100,
          right: 100,
          top: 840,
          transform: `translateY(${headlineY}px)`,
          opacity: headlineOpacity,
        }}
      >
        <div
          style={{
            color: colors.orange,
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: 9,
            marginBottom: 34,
            textTransform: 'uppercase',
          }}
        >
          AI Business Buildout Plan
        </div>
        <h1
          style={{
            margin: 0,
            fontFamily: 'Georgia, serif',
            fontSize: 116,
            lineHeight: 0.94,
            letterSpacing: -2,
          }}
        >
          {headline}
        </h1>
        <p
          style={{
            maxWidth: 780,
            marginTop: 42,
            fontSize: 44,
            lineHeight: 1.22,
            fontWeight: 800,
          }}
        >
          {subhead}
        </p>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 100,
          right: 100,
          bottom: 128,
          padding: '42px 48px',
          background: colors.ink,
          border: `6px solid ${colors.ink}`,
          boxShadow: `16px 16px 0 ${colors.orange}`,
          color: colors.paperCold,
          transform: `translateY(${cardY}px) rotate(-1deg)`,
          opacity: cardOpacity,
        }}
      >
        <div
          style={{
            color: colors.orange,
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 8,
            marginBottom: 18,
            textTransform: 'uppercase',
          }}
        >
          Next move
        </div>
        <div style={{ fontSize: 54, fontWeight: 900, lineHeight: 1.08 }}>{cta}</div>
      </div>
    </AbsoluteFill>
  );
}
