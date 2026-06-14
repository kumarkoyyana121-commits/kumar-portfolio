'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Work.module.css';

const projects = [
  {
    num: '01',
    title: 'Social Media Campaigns',
    category: 'DIGITAL MARKETING · RESTAURANT BRANDS · USA CLIENTS',
    desc: 'High-impact promotional creatives for 10+ Indian restaurant brands across the USA — from festive specials to weekly offers, catering promos, and BOGO deals.',
    images: [
      '/work/flyer-01.jpg','/work/flyer-02.jpg','/work/flyer-03.jpg',
      '/work/flyer-04.jpg','/work/flyer-05.jpg','/work/flyer-06.jpg',
      '/work/flyer-07.jpg','/work/flyer-08.jpg','/work/flyer-09.jpg',
      '/work/flyer-10.jpg','/work/flyer-11.jpg','/work/flyer-12.jpg',
      '/work/flyer-13.jpg','/work/flyer-14.jpg','/work/flyer-15.jpg',
      '/work/flyer-16.jpg',
    ],
    reels: [],
    tags: ['Photoshop', 'Illustrator', 'Canva', 'Social Media'],
  },
  {
    num: '02',
    title: 'Logo & Brand Identity',
    category: 'BRAND IDENTITY · LOGO DESIGN · VISUAL SYSTEMS',
    desc: 'Crafting distinctive logos and brand identities for sports clubs, eco-friendly businesses, and creative studios — each with a unique visual language.',
    images: ['/work/logo-01.png','/work/logo-02.png','/work/logo-03.png'],
    reels: [],
    tags: ['Illustrator', 'CorelDRAW', 'Brand Identity', 'Logo Design'],
  },
  {
    num: '03',
    title: 'E-Commerce Banners',
    category: 'E-COMMERCE · PRODUCT MARKETING · AMAZON A+ CONTENT',
    desc: 'High-converting product banner designs for online stores — spanning fashion, electronics, fitness, and home decor with clean conversion-focused layouts.',
    images: ['/work/ecom-01.png','/work/ecom-02.png'],
    reels: [],
    tags: ['Photoshop', 'E-Commerce', 'Product Banners', 'Amazon A+'],
  },
  {
    num: '04',
    title: 'Reels & Motion Graphics',
    category: 'VIDEO EDITING · MOTION DESIGN · SOCIAL REELS',
    desc: 'High-retention Instagram Reels and Facebook video ads crafted with Premiere Pro and CapCut — motion graphics, transitions, and cinematic edits for restaurant and brand clients.',
    images: [],
    reels: [
      'https://res.cloudinary.com/dwcm3yz85/video/upload/reel1_1_dy6z6a.mp4',
      'https://res.cloudinary.com/dwcm3yz85/video/upload/reel2_xzl3so.mp4',
      'https://res.cloudinary.com/dwcm3yz85/video/upload/reel3_duwgas.mp4',
      'https://res.cloudinary.com/dwcm3yz85/video/upload/reel4_zs0mro.mp4',
      'https://res.cloudinary.com/dwcm3yz85/video/upload/reel5_hjwebz.mp4',
    ],
    tags: ['Premiere Pro', 'After Effects', 'CapCut', 'Motion Graphics'],
  },
];

function ImageModal({ src, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <button className={styles.modalClose} onClick={onClose}>✕</button>
      <img src={src} alt="Preview" className={styles.modalImg} onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) cardRef.current?.classList.add(styles.visible); },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <>
      <div ref={cardRef} className={`${styles.projectCard} ${isEven ? styles.cardLeft : styles.cardRight}`}>
        <div className={styles.projectNum}>{project.num}</div>

        <div className={styles.projectInner}>
          <div className={styles.projectHeader}>
            <div className={styles.projectMeta}>
              <span className={styles.projectCategory}>{project.category}</span>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <p className={styles.projectDesc}>{project.desc}</p>
              <div className={styles.projectTags}>
                {project.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
            </div>

            <button
              className={`${styles.expandBtn} ${open ? styles.expandBtnOpen : ''}`}
              onClick={() => setOpen(!open)}
            >
              {open ? 'CLOSE' : 'VIEW WORK'}
              <span className={styles.expandArrow}>{open ? '↑' : '↓'}</span>
            </button>
          </div>

          <div className={styles.projectLine} />

          {/* Image Gallery */}
          {open && project.images.length > 0 && (
            <div className={styles.gallery}>
              {project.images.slice(0, visibleCount).map((img, i) => (
                <div key={i} className={styles.galleryItem} onClick={() => setModalImg(img)}>
                  <img src={img} alt={`Work ${i + 1}`} loading="lazy" />
                  <div className={styles.galleryOverlay}><span>VIEW</span></div>
                </div>
              ))}
              {visibleCount < project.images.length && (
                <button className={styles.loadMore} onClick={() => setVisibleCount((v) => v + 6)}>
                  Load More ({project.images.length - visibleCount} remaining)
                </button>
              )}
            </div>
          )}

          {/* Reels Gallery */}
          {open && project.reels.length > 0 && (
            <div className={styles.reelsGrid}>
              {project.reels.map((reel, i) => (
                <div key={i} className={styles.reelItem}>
                  <video src={reel} controls playsInline preload="metadata" className={styles.reelVideo} />
                  <p className={styles.reelLabel}>Reel {String(i + 1).padStart(2, '0')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {modalImg && <ImageModal src={modalImg} onClose={() => setModalImg(null)} />}
    </>
  );
}

export default function WorkSection() {
  return (
    <section className={styles.workSection} id="work">
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>SELECTED WORK</p>
        <h2 className={styles.sectionTitle}>
          Projects that<br />
          <span className={styles.sectionAccent}>speak for themselves.</span>
        </h2>
      </div>
      <div className={styles.projectList}>
        {projects.map((project, i) => (
          <ProjectCard key={project.num} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
