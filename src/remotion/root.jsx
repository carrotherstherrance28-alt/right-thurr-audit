import React from 'react';
import { Composition } from 'remotion';
import { ThurrIntro } from './thurr-intro.jsx';

export function RemotionRoot() {
  return (
    <Composition
      id="ThurrIntro"
      component={ThurrIntro}
      durationInFrames={180}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        headline: 'Ideas do not pay you. Systems do.',
        subhead: 'Thurr builds private AI systems for local service businesses.',
        cta: 'Get your AI business buildout plan.',
      }}
    />
  );
}
