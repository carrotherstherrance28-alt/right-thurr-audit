import React from 'react';
import { Composition } from 'remotion';
import { ThurrLeadSystemIntro } from './lead-system-intro.jsx';
import { ThurrIntro } from './thurr-intro.jsx';
import { KirbyLogoOptionsShowcase } from './logo-options-showcase.jsx';

export function RemotionRoot() {
  return (
    <>
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
      <Composition
        id="ThurrLeadSystemIntro"
        component={ThurrLeadSystemIntro}
        durationInFrames={1350}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="KirbyLogoOptions"
        component={KirbyLogoOptionsShowcase}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
}
