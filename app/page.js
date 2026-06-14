import VideoHero from './components/VideoHero';
import WorkSection from './components/WorkSection';

export default function Home() {
  return (
    <main>
      <VideoHero />
      <WorkSection />

      {/* Contact Section */}
      <section style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '6rem 6vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1.5rem',
      }}>
        <p style={{ color: '#f97316', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          LET'S WORK TOGETHER
        </p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          Have a project in mind?
        </h2>
        <p style={{ color: '#71717a', fontSize: '0.95rem', maxWidth: '400px', lineHeight: 1.7 }}>
          Open for freelance projects & full-time opportunities.
        </p>
        <a
          href="mailto:kumarkoyyana121@gmail.com"
          style={{
            marginTop: '0.5rem',
            padding: '0.85rem 2.5rem',
            background: '#f97316',
            color: '#000',
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            borderRadius: '2px',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
        >
          Get In Touch
        </a>
        <p style={{ color: '#3f3f46', fontSize: '0.75rem', marginTop: '3rem' }}>
          © 2026 Kumar Koyyana · Visakhapatnam, AP
        </p>
      </section>
    </main>
  );
}
