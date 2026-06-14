'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/Hero.module.css';

const CinematicLayer = dynamic(() => import('./CinematicLayer'), { ssr: false });

export default function VideoHero() {
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const roleRef = useRef(null);
  const statsRef = useRef(null);

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [showSoundBadge, setShowSoundBadge] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // GSAP animations
    const runAnimations = async () => {
      const { gsap } = await import('gsap');

      setLoaded(true);

      gsap.fromTo(heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.out' }
      );

      gsap.fromTo(taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(nameRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, delay: 1.0, ease: 'power3.out' }
      );

      gsap.fromTo(roleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1.3, ease: 'power3.out' }
      );

      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.6, ease: 'power3.out' }
      );
    };

    runAnimations();

    // Hide sound badge after 4s
    const timer = setTimeout(() => setShowSoundBadge(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    const bg = bgVideoRef.current;
    if (v) v.muted = !muted;
    if (bg) bg.muted = !muted;
    setMuted(!muted);
    setShowSoundBadge(false);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); bgVideoRef.current?.pause(); }
    else { v.play(); bgVideoRef.current?.play(); }
    setPlaying(!playing);
  };

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className={styles.hero} style={{ opacity: 0 }}>

      {/* BG blurred video */}
      <video
        ref={bgVideoRef}
        className={styles.bgVideo}
        autoPlay loop muted playsInline
        src="https://res.cloudinary.com/dwcm3yz85/video/upload/hero-video_elbtis.mp4"
      />

      {/* Gradient overlays */}
      <div className={styles.gradientBottom} />
      <div className={styles.gradientTop} />
      <div className={styles.gradientSides} />

      {/* Three.js particles */}
      <CinematicLayer />

      {/* Foreground video */}
      <video
        ref={videoRef}
        className={styles.fgVideo}
        autoPlay loop muted playsInline
        src="https://res.cloudinary.com/dwcm3yz85/video/upload/hero-video_elbtis.mp4"
      />

      {/* Content overlay */}
      <div className={styles.content}>
        <p ref={taglineRef} className={styles.tagline} style={{ opacity: 0 }}>
          GRAPHIC DESIGNER · VISUAL DESIGNER · CREATIVE DESIGNER
        </p>

        <div ref={nameRef} className={styles.nameBlock} style={{ opacity: 0 }}>
          <h1 className={styles.firstName}>KUMAR</h1>
          <h1 className={styles.lastName}>KOYYANA</h1>
        </div>

        <p ref={roleRef} className={styles.role} style={{ opacity: 0 }}>
          3+ Years · 20+ Brand Clients · 100+ Campaigns Delivered
        </p>

        <div ref={statsRef} className={styles.stats} style={{ opacity: 0 }}>
          <div className={styles.stat}>
            <span className={styles.statNum}>3+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>20+</span>
            <span className={styles.statLabel}>Brand Clients</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>100+</span>
            <span className={styles.statLabel}>Campaigns</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>8+</span>
            <span className={styles.statLabel}>Design Tools</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={togglePlay} title={playing ? 'Pause' : 'Play'}>
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          )}
        </button>
        <button className={styles.controlBtn} onClick={toggleMute} title={muted ? 'Unmute' : 'Mute'}>
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <line x1="23" y1="9" x2="17" y2="15" stroke="white" strokeWidth="2"/>
              <line x1="17" y1="9" x2="23" y2="15" stroke="white" strokeWidth="2"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          )}
        </button>
      </div>

      {/* Sound badge */}
      {showSoundBadge && (
        <div className={styles.soundBadge} onClick={toggleMute}>
          🔇 Tap for sound
        </div>
      )}

      {/* Scroll indicator */}
      <button className={styles.scrollIndicator} onClick={scrollToNext}>
        <div className={styles.scrollLine} />
      </button>
    </section>
  );
}
