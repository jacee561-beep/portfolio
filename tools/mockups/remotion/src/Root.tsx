import React from 'react';
import {Composition, AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const BG = '#0B0B0C';
const loopSin = (f: number, total: number, phase = 0) => Math.sin((f / total) * Math.PI * 2 + phase);

/* ---------- devices, drawn in CSS ---------- */
const Phone: React.FC<{src: string; start: number; w: number; tilt?: number}> = ({src, start, w, tilt = 0}) => {
  const h = w * 2.05;
  return (
    <div style={{width: w, height: h, borderRadius: w * 0.17, padding: w * 0.035, transform: `rotate(${tilt}deg)`,
      background: 'linear-gradient(145deg,#3a3a3e,#111114 40%,#2a2a2e)',
      boxShadow: `0 ${w * 0.25}px ${w * 0.45}px -${w * 0.12}px rgba(0,0,0,.9), inset 0 0 0 1.5px rgba(255,255,255,.12)`}}>
      <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: w * 0.14, overflow: 'hidden', background: '#000'}}>
        <OffthreadVideo src={staticFile(src)} startFrom={start * 30} muted
          style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        <div style={{position: 'absolute', top: w * 0.035, left: '50%', width: w * 0.3, height: w * 0.085,
          marginLeft: -w * 0.15, borderRadius: 99, background: '#000'}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(115deg,rgba(255,255,255,.10),transparent 35%)'}} />
      </div>
    </div>
  );
};

const Laptop: React.FC<{src: string; start: number; w: number}> = ({src, start, w}) => {
  const sw = w * 0.86, sh = sw * 10 / 16;
  return (
    <div style={{width: w, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{width: sw + w * 0.03, padding: w * 0.015, paddingBottom: w * 0.03, borderRadius: `${w * 0.025}px ${w * 0.025}px 4px 4px`,
        background: '#0d0d0f', boxShadow: 'inset 0 0 0 2px #2c2c30'}}>
        <div style={{width: sw, height: sh, overflow: 'hidden', background: '#000', position: 'relative'}}>
          <OffthreadVideo src={staticFile(src)} startFrom={start * 30} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(120deg,rgba(255,255,255,.08),transparent 40%)'}} />
        </div>
      </div>
      <div style={{width: w, height: w * 0.032, borderRadius: `0 0 ${w * 0.04}px ${w * 0.04}px`,
        background: 'linear-gradient(#cfcfd3,#8d8d93)', position: 'relative'}}>
        <div style={{position: 'absolute', left: '50%', top: 0, width: w * 0.14, height: w * 0.012, marginLeft: -w * 0.07,
          borderRadius: `0 0 ${w * 0.01}px ${w * 0.01}px`, background: '#7b7b80'}} />
      </div>
      <div style={{width: w * 0.9, height: w * 0.05, marginTop: -2, background: 'radial-gradient(50% 100% at 50% 0,rgba(0,0,0,.8),transparent)'}} />
    </div>
  );
};

/* stage: dark room, a soft key light in the clip's colour, SMPTE bars on the floor line */
const Stage: React.FC<{tint: string; children: React.ReactNode}> = ({tint, children}) => (
  <AbsoluteFill style={{background: BG}}>
    <AbsoluteFill style={{background: `radial-gradient(55% 60% at 50% 40%, ${tint}33, transparent 70%)`}} />
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>{children}</AbsoluteFill>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 6, display: 'flex'}}>
      {['#C8C8C8', '#D6CF00', '#00C2D1', '#2FC23A', '#CC2FCC', '#D9262F', '#2B3FDB'].map((c) => <div key={c} style={{flex: 1, background: c}} />)}
    </div>
  </AbsoluteFill>
);

/* ---------- A: three phones, vertical reels ---------- */
const Reels: React.FC = () => {
  const f = useCurrentFrame(); const {durationInFrames: d} = useVideoConfig();
  const items: [string, number, number][] = [
    ['uncoordinated-the-gym-routine-that-works.mp4', 2, -6], ['cwk-ep2-b.mp4', 6, 0], ['sojourners-denise.mp4', 9, 6]];
  return (
    <Stage tint="#CC2FCC">
      <div style={{display: 'flex', gap: 70, alignItems: 'center'}}>
        {items.map(([src, start, tilt], i) => (
          <div key={src} style={{transform: `translateY(${loopSin(f, d, i * 2.1) * 14 + (i === 1 ? -20 : 20)}px)`}}>
            <Phone src={src} start={start} w={i === 1 ? 250 : 220} tilt={tilt} />
          </div>
        ))}
      </div>
    </Stage>
  );
};

/* ---------- B: laptop + phone, a recap and its vertical cut ---------- */
const Studio: React.FC = () => {
  const f = useCurrentFrame(); const {durationInFrames: d} = useVideoConfig();
  return (
    <Stage tint="#00C2D1">
      <div style={{position: 'relative', width: 1000, height: 560}}>
        <div style={{position: 'absolute', left: 0, top: 40, transform: `translateY(${loopSin(f, d) * 6}px)`}}>
          <Laptop src="promisefund-event.mp4" start={12} w={820} />
        </div>
        <div style={{position: 'absolute', right: 0, top: 70, transform: `translateY(${loopSin(f, d, 1.7) * 12}px)`}}>
          <Phone src="nrg-ep7-b.mp4" start={4} w={200} tilt={4} />
        </div>
      </div>
    </Stage>
  );
};

export const Root: React.FC = () => (
  <>
    <Composition id="Reels" component={Reels} durationInFrames={300} fps={30} width={1280} height={720} />
    <Composition id="Studio" component={Studio} durationInFrames={300} fps={30} width={1280} height={720} />
  </>
);
