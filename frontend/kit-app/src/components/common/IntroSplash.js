import React, { useEffect, useState } from 'react';
import './introSplash.css';

const INTRO_HOLD_MS = 2400;
const EXIT_MS = 550;

const IntroSplash = ({ onComplete }) => {
  const [phase, setPhase] = useState('in');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hold = reduced ? 1200 : INTRO_HOLD_MS;

    const exitTimer = setTimeout(() => setPhase('out'), hold);
    const doneTimer = setTimeout(() => onComplete(), hold + EXIT_MS);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const skip = () => {
    setPhase('out');
    window.setTimeout(onComplete, 280);
  };

  return (
    <div
      className={`ku-intro ${phase === 'out' ? 'ku-intro--out' : ''}`}
      role="dialog"
      aria-label="Site introduction"
      aria-live="polite"
    >
      <div className="ku-intro__inner">
        <div className="ku-intro__logo" aria-hidden="true">
          <span className="ku-intro__mark">K</span>
          <span className="ku-intro__word">Kit-Up</span>
        </div>
        <p className="ku-intro__eyebrow">Built by</p>
        <h1 className="ku-intro__name">
          <span className="ku-intro__name-accent">Abdul Hannan</span>
        </h1>
        <div className="ku-intro__bar" aria-hidden="true" />
      </div>
      <button type="button" className="ku-intro__skip" onClick={skip}>
        Skip
      </button>
    </div>
  );
};

export default IntroSplash;
