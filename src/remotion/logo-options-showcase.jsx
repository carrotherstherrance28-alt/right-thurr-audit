import React from 'react';
import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, interpolate } from 'remotion';

const bg = '#0b0b0c';

const Slide = ({ src, start, duration, zoomFrom = 1.02, zoomTo = 1.0 }) => {
  const frame = useCurrentFrame();
  const local = frame - start;

  const opacity = interpolate(local, [0, 12, duration - 12, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(local, [0, duration], [zoomFrom, zoomTo], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Sequence from={start} durationInFrames={duration}>
      <AbsoluteFill style={{ backgroundColor: bg, justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            width: '92%',
            height: '92%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity,
            transform: `scale(${scale})`,
          }}
        >
          <Img
            src={src}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: 18,
            }}
          />
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

export const KirbyLogoOptionsShowcase = () => {
  const fps = 30;
  const slide = 3 * fps;

  return (
    <AbsoluteFill style={{ backgroundColor: bg }}>
      <Slide
        src={staticFile('media/kirby-fun-pack/palette-clean-AH.png')}
        start={0}
        duration={slide}
        zoomFrom={1.0}
        zoomTo={1.0}
      />
      <Slide
        src={staticFile('media/kirby-fun-pack/palette-playful-AH.png')}
        start={slide}
        duration={slide}
        zoomFrom={1.0}
        zoomTo={1.0}
      />
      <Slide
        src={staticFile('media/kirby-fun-pack/hero-3-directions.png')}
        start={slide * 2}
        duration={slide}
        zoomFrom={1.0}
        zoomTo={1.0}
      />
      <Slide
        src={staticFile('media/kirby-fun-pack/palette-vintage-AF.png')}
        start={slide * 3}
        duration={slide}
        zoomFrom={1.0}
        zoomTo={1.0}
      />
    </AbsoluteFill>
  );
};
