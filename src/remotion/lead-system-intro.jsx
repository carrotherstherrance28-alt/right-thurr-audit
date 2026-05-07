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
  inkSoft: '#342F29',
  orange: '#D9621F',
  orangeDark: '#A84818',
  paper: '#F5EFE2',
  paperCold: '#FAF7EE',
  green: '#6F8D4E',
};

const scenes = [
  {
    eyebrow: 'The clock starts',
    title: 'A new inquiry comes in.',
    body: 'Website. Booking page. DM. Referral. Call.',
    accent: 'New Lead',
  },
  {
    eyebrow: 'The leak',
    title: 'Warm leads go cold when the path is unclear.',
    body: 'The problem is usually response, routing, and follow-up.',
    accent: 'Path unclear',
  },
  {
    eyebrow: 'Start here',
    title: 'Thurr starts with a Lead Flow Audit.',
    body: 'We review the website, intake, booking path, follow-up, and owner visibility.',
    accent: 'Audit',
  },
  {
    eyebrow: 'Build what matters',
    title: 'If the website is the leak, we build the intake path.',
    body: 'Clear offer. Better form. Faster handoff. Trackable next step.',
    accent: 'Growth Website + Intake',
  },
  {
    eyebrow: 'Automate the gap',
    title: 'If follow-up is the leak, we build the workflow.',
    body: 'Owner alert, CRM status, follow-up tasks, and clear review points.',
    accent: 'Follow-up Automation',
  },
  {
    eyebrow: 'Keep it working',
    title: 'The audit tells us what to fix. The build fixes it.',
    body: 'The retainer keeps the lead system working as the business grows.',
    accent: 'Managed System',
  },
];

function useSceneProgress(index, framesPerScene) {
  const frame = useCurrentFrame();
  const localFrame = frame - index * framesPerScene;
  const opacity = interpolate(localFrame, [-18, 10, framesPerScene - 18, framesPerScene], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(localFrame, [0, 28], [34, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const progress = interpolate(localFrame, [0, framesPerScene], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return { opacity, y, progress };
}

function Pipeline({ activeIndex }) {
  const labels = ['Inquiry', 'Intake', 'Owner Alert', 'Follow-up', 'Next Step'];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: labels.map(() => '1fr').join(' 42px '),
        alignItems: 'center',
        width: '100%',
        marginTop: 46,
      }}
    >
      {labels.map((label, index) => (
        <React.Fragment key={label}>
          <div
            style={{
              minHeight: 104,
              padding: '22px 20px',
              background: index <= activeIndex ? colors.ink : colors.paperCold,
              border: `4px solid ${colors.ink}`,
              color: index <= activeIndex ? colors.paperCold : colors.ink,
              boxShadow: `8px 8px 0 ${index <= activeIndex ? colors.orange : 'rgba(26,23,20,.16)'}`,
            }}
          >
            <div
              style={{
                color: index <= activeIndex ? colors.orange : colors.orangeDark,
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: 3,
                marginBottom: 12,
                textTransform: 'uppercase',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 25, fontWeight: 900 }}>{label}</div>
          </div>
          {index < labels.length - 1 && (
            <div
              style={{
                height: 5,
                background: index < activeIndex ? colors.orange : colors.ink,
                opacity: index < activeIndex ? 1 : 0.28,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function SceneCard({ scene, index, framesPerScene }) {
  const { opacity, y, progress } = useSceneProgress(index, framesPerScene);
  const activePipelineIndex = Math.min(4, Math.max(0, Math.floor(progress * 5)));

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        padding: 72,
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.02fr 0.78fr',
          gap: 58,
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              color: colors.orange,
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 6,
              marginBottom: 24,
              textTransform: 'uppercase',
            }}
          >
            {scene.eyebrow}
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'Georgia, serif',
              fontSize: 78,
              lineHeight: 0.98,
              color: colors.ink,
              maxWidth: 910,
            }}
          >
            {scene.title}
          </h1>
          <p
            style={{
              maxWidth: 760,
              marginTop: 28,
              color: colors.inkSoft,
              fontSize: 32,
              fontWeight: 800,
              lineHeight: 1.18,
            }}
          >
            {scene.body}
          </p>
          <Pipeline activeIndex={activePipelineIndex} />
        </div>

        <div
          style={{
            minHeight: 560,
            padding: 34,
            background: colors.ink,
            border: `6px solid ${colors.ink}`,
            boxShadow: `18px 18px 0 ${colors.orange}`,
            color: colors.paperCold,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 32,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 5,
              textTransform: 'uppercase',
            }}
          >
            <span>Lead System</span>
            <span style={{ color: colors.green }}>Live</span>
          </div>
          <div
            style={{
              padding: 28,
              minHeight: 250,
              background: colors.paper,
              color: colors.ink,
              border: `4px solid ${colors.paperCold}`,
            }}
          >
            <div
              style={{
                color: colors.orange,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: 4,
                marginBottom: 18,
                textTransform: 'uppercase',
              }}
            >
              {scene.accent}
            </div>
            <div style={{ fontSize: 54, fontWeight: 900, lineHeight: 1.02 }}>
              Audit. Build. Manage.
            </div>
          </div>
          {['Capture the right details', 'Alert the owner', 'Start follow-up', 'Track the next step'].map(
            (item, itemIndex) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  marginTop: 18,
                  padding: '17px 18px',
                  background: 'rgba(245,239,226,.08)',
                  border: '2px solid rgba(245,239,226,.2)',
                  fontSize: 23,
                  fontWeight: 900,
                  opacity: itemIndex <= activePipelineIndex ? 1 : 0.35,
                }}
              >
                <span style={{ color: colors.orange }}>✓</span>
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export function ThurrLeadSystemIntro() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const framesPerScene = Math.floor(durationInFrames / scenes.length);
  const logoIn = spring({ frame, fps, config: { damping: 18, stiffness: 110 } });
  const sweep = interpolate(frame, [0, durationInFrames], [-360, 2260]);
  const endOpacity = interpolate(frame, [durationInFrames - 150, durationInFrames - 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.paper,
        backgroundImage:
          'linear-gradient(rgba(26,23,20,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,23,20,.06) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        color: colors.ink,
        fontFamily: 'Arial, Helvetica, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: sweep,
          top: -120,
          width: 190,
          height: 1320,
          background: colors.orange,
          transform: 'rotate(11deg)',
          opacity: 0.82,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 54,
          right: 54,
          top: 38,
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 22,
          borderBottom: `5px solid ${colors.ink}`,
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: 4,
          textTransform: 'uppercase',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Img
            src={staticFile('rt-monogram-clean.png')}
            style={{ width: 54, transform: `scale(${0.82 + logoIn * 0.18})`, opacity: logoIn }}
          />
          <span>Thurr Solutions</span>
        </div>
        <span style={{ color: colors.green }}>Lead System Audit</span>
      </div>

      {scenes.map((scene, index) => (
        <SceneCard scene={scene} index={index} framesPerScene={framesPerScene} key={scene.title} />
      ))}

      <AbsoluteFill
        style={{
          zIndex: 8,
          opacity: endOpacity,
          display: 'grid',
          placeItems: 'center',
          background: colors.ink,
          color: colors.paperCold,
          textAlign: 'center',
          padding: 90,
        }}
      >
        <div>
          <Img src={staticFile('right-thurr-wordmark-clean.png')} style={{ width: 520, marginBottom: 46 }} />
          <div
            style={{
              color: colors.orange,
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 7,
              marginBottom: 24,
              textTransform: 'uppercase',
            }}
          >
            Start with the Lead System Audit
          </div>
          <div
            style={{
              maxWidth: 1050,
              fontFamily: 'Georgia, serif',
              fontSize: 76,
              fontWeight: 900,
              lineHeight: 0.98,
            }}
          >
            Stop losing warm leads to slow follow-up.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

