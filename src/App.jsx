// App.jsx — Dhanshree Ratneria · Premium Portfolio
import React, { useEffect, useRef, useState } from 'react';
import mypic from './assets/mypic.jpg';
import {
  Mail, MapPin, Phone, Code2, Zap, Shield,
  Briefcase, Trophy, Award, Rocket, Database, Globe, Server,
  Layout, Sparkles, ExternalLink, ChevronRight, Cpu,
  Wrench, X, User, GraduationCap, Star, ShoppingCart,
  CalendarCheck, Package, Utensils, ClipboardList, ArrowUpRight,
  Terminal, Menu, ChevronDown, Github, Linkedin
} from 'lucide-react';
import {
  motion, useInView, useMotionValue, useTransform, animate,
  useSpring, useScroll, AnimatePresence, LayoutGroup
} from 'framer-motion';

/* ─── Global Styles ──────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink:     #0D0D0D;
      --ink-80:  rgba(13,13,13,0.80);
      --ink-40:  rgba(13,13,13,0.40);
      --ink-15:  rgba(13,13,13,0.15);
      --cream:   #F7F3EE;
      --cream-80: rgba(247,243,238,0.80);
      --gold:    #B8975A;
      --gold-lt: #D4B98A;
      --gold-dk: #8A6D3B;
      --warm:    #E8DDD0;
      --warm-dk: #C9B99E;
      --surface: #FDFAF6;
      --card:    rgba(255,255,255,0.55);
      --border:  rgba(184,151,90,0.18);
      --border-strong: rgba(184,151,90,0.35);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--cream);
      color: var(--ink);
      font-family: 'DM Sans', sans-serif;
      font-size: 16px;
      line-height: 1.6;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    .font-display { font-family: 'Cormorant Garamond', serif; }
    .font-mono    { font-family: 'DM Mono', monospace; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

    ::selection { background: var(--gold); color: var(--cream); }

    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
      opacity: 0.5;
    }

    .card-grain {
      position: relative;
      overflow: hidden;
    }
    .card-grain::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      border-radius: inherit;
    }

    .shimmer-line {
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      background-size: 200% 100%;
      animation: shimmer 3s infinite;
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .dot-pulse {
      animation: dotPulse 2s ease-in-out infinite;
    }
    @keyframes dotPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.8); }
    }

    .tag-pill {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 11px;
      letter-spacing: 0.06em;
      font-weight: 500;
      background: rgba(184,151,90,0.10);
      border: 1px solid rgba(184,151,90,0.25);
      color: var(--gold-dk);
      transition: all 0.2s ease;
      font-family: 'DM Mono', monospace;
    }
    .tag-pill:hover {
      background: var(--gold);
      border-color: var(--gold);
      color: var(--cream);
    }

    .section-eyebrow {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gold);
    }
  `}</style>
);

/* ─── Animated Counter ──────────────────────────────────────────────────── */
const AnimatedCounter = ({ value, suffix = '', prefix = '', duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const c = animate(count, value, { duration, ease: [0.25, 0.1, 0.25, 1] });
    const u = rounded.on('change', v => setDisplay(v));
    return () => { c.stop(); u(); };
  }, [isInView]);

  return <span ref={ref} className="tabular-nums">{prefix}{display}{suffix}</span>;
};

/* ─── Text Swap (roles) ─────────────────────────────────────────────────── */
const ROLES = ['Full-Stack Developer', 'MERN Stack Engineer', 'Spring Boot Developer', 'API Architect'];
const TextSwap = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % ROLES.length), 3200);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ height: 44, overflow: 'hidden', position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 20, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -20, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute', display: 'block',
            fontFamily: 'DM Mono, monospace', fontSize: '0.9rem',
            letterSpacing: '0.08em', color: 'var(--gold)',
            textTransform: 'uppercase'
          }}
        >
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

/* ─── Cursor glow ───────────────────────────────────────────────────────── */
const CursorGlow = () => {
  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(useMotionValue(-200), springConfig);
  const y = useSpring(useMotionValue(-200), springConfig);

  useEffect(() => {
    const h = e => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed', left: x, top: y,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,151,90,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
        translateX: '-50%', translateY: '-50%'
      }}
    />
  );
};

/* ─── Scroll Progress Bar ───────────────────────────────────────────────── */
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 35 });
  return (
    <motion.div
      style={{
        scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt))',
        transformOrigin: '0%', zIndex: 1000
      }}
    />
  );
};

/* ─── Nav ───────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
];

const Nav = ({ onContact }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(247,243,238,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.4s ease',
        padding: '0 clamp(24px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <motion.a href="#" whileHover={{ scale: 1.03 }} style={{ textDecoration: 'none' }}>
          <span className="font-display" style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            DR<span style={{ color: 'var(--gold)' }}>.</span>
          </span>
        </motion.a>

        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            <motion.a
              key={l.href} href={l.href}
              whileHover={{ color: 'var(--gold)', y: -2 }}
              style={{
                textDecoration: 'none', color: 'var(--ink-80)',
                fontSize: '0.8rem', letterSpacing: '0.06em', fontWeight: 500,
                textTransform: 'uppercase', transition: 'color 0.2s'
              }}
            >
              {l.label}
            </motion.a>
          ))}
        </div>

        <motion.button
          onClick={onContact}
          whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(184,151,90,0.25)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: 'var(--ink)', color: 'var(--cream)',
            border: 'none', borderRadius: 100, padding: '0.625rem 1.5rem',
            fontSize: '0.8rem', letterSpacing: '0.06em', fontWeight: 500,
            textTransform: 'uppercase', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <Mail size={14} /> Contact
        </motion.button>
      </div>
      <style>{`@media(max-width:768px){.desktop-nav{display:none!important}}`}</style>
    </motion.nav>
  );
};

/* ─── Hero ──────────────────────────────────────────────────────────────── */
const Hero = ({ onContact }) => {
  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }
  };

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: 'clamp(100px, 12vh, 140px) clamp(24px, 5vw, 80px) 80px',
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', top: '10%', right: '-5%', width: 600, height: 600,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,151,90,0.08) 0%, transparent 65%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '-8%', width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,151,90,0.05) 0%, transparent 65%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '80px 80px', opacity: 0.4
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }} className="hero-grid">

          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={item} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <motion.div style={{ width: 32, height: 1, background: 'var(--gold)' }} animate={{ scaleX: [0, 1] }} transition={{ duration: 0.8 }} />
              <span className="section-eyebrow">Portfolio · 2026</span>
              <div className="dot-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
            </motion.div>

            <motion.h1 variants={item} className="font-display" style={{
              fontSize: 'clamp(3.25rem, 7vw, 5.75rem)', lineHeight: 1.0,
              fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--ink)',
              marginBottom: 16
            }}>
              Dhanshree<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 300 }}>Ratneria</em>
            </motion.h1>

            <motion.div variants={item} style={{ marginBottom: 28 }}>
              <TextSwap />
            </motion.div>

            <motion.p variants={item} style={{
              maxWidth: 520, fontSize: '1rem', lineHeight: 1.75,
              color: 'var(--ink-80)', marginBottom: 36, fontWeight: 300
            }}>
              Full-Stack Developer specializing in <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>MERN stack</strong> &amp; <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>Spring Boot</strong>.
              Building scalable RESTful APIs, JWT/RBAC security systems, and production-ready web applications.
              Currently pursuing B.Tech CSE at SVVV Indore — graduating July 2026.
            </motion.p>

            <motion.div variants={item} style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 40, fontSize: '0.8rem', color: 'var(--ink-80)' }}>
              {[
                { icon: MapPin, text: 'Indore, India' },
                { icon: Phone, text: '+91-8349446596', href: 'tel:+918349446596' },
                { icon: Mail, text: 'ratneriadhanshree@gmail.com', href: 'mailto:ratneriadhanshree@gmail.com' },
              ].map(({ icon: Icon, text, href }) => (
                <motion.a
                  key={text} href={href || '#'}
                  whileHover={{ color: 'var(--gold)', scale: 1.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    textDecoration: 'none', color: 'inherit',
                    transition: 'color 0.2s', fontFamily: 'DM Mono, monospace', fontSize: '0.75rem'
                  }}
                >
                  <Icon size={13} style={{ color: 'var(--gold)' }} />
                  {text}
                </motion.a>
              ))}
            </motion.div>

            <motion.div variants={item} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <motion.button
                onClick={onContact}
                whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(184,151,90,0.3)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'linear-gradient(135deg, var(--gold-dk), var(--gold))',
                  color: 'var(--cream)', border: 'none', borderRadius: 100,
                  padding: '0.875rem 2rem', fontSize: '0.8rem', letterSpacing: '0.07em',
                  fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8
                }}
              >
                <Mail size={14} /> Get in Touch
              </motion.button>

              <motion.a
                href="https://github.com/Dhanshreeratneria"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, borderColor: 'var(--gold)', color: 'var(--gold)' }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '0.8125rem 1.5rem', borderRadius: 100, textDecoration: 'none',
                  border: '1px solid var(--border-strong)', color: 'var(--ink)',
                  fontSize: '0.8rem', letterSpacing: '0.06em', fontWeight: 500,
                  textTransform: 'uppercase', transition: 'all 0.2s'
                }}
              >
                <Github size={14} /> GitHub
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/dhanshree-ratneria-94b0a625b/"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.08, background: 'var(--ink)', color: 'var(--cream)' }}
                style={{
                  width: 46, height: 46, borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  border: '1px solid var(--border-strong)', color: 'var(--ink)',
                  transition: 'all 0.2s', textDecoration: 'none'
                }}
              >
                <Linkedin size={16} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — Profile visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className="hero-avatar"
          >
            <div style={{ position: 'relative', width: 320, height: 320 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -16, borderRadius: '50%',
                  border: '1px solid var(--border-strong)', willChange: 'transform'
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -4, borderRadius: '50%',
                  border: '1px dashed rgba(184,151,90,0.25)', willChange: 'transform'
                }}
              />
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(184,151,90,0.2)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  width: 320, height: 320, borderRadius: '50%',
                  background: 'linear-gradient(145deg, var(--warm), var(--gold-lt))',
                  padding: 4, overflow: 'hidden', cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  overflow: 'hidden', background: 'var(--warm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                   {/* FIX 1: Import image for Vite bundling; fallback to initials via onError */}
                   <img
                     src={mypic}
                     alt="Dhanshree Ratneria"
                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                     onError={e => {
                       e.currentTarget.style.display = 'none';
                       const fallback = e.currentTarget.parentElement.querySelector('.avatar-fallback');
                       if (fallback) fallback.style.display = 'flex';
                     }}
                   />
                  <div className="avatar-fallback" style={{
                    display: 'none', alignItems: 'center', justifyContent: 'center',
                    width: '100%', height: '100%'
                  }}>
                    <span className="font-display" style={{ fontSize: '4.5rem', color: 'var(--gold-dk)', opacity: 0.5 }}>DR</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: -8, right: -12,
                  background: 'var(--ink)', color: 'var(--cream)',
                  borderRadius: 100, padding: '0.5rem 1rem',
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)', willChange: 'transform'
                }}
              >
                <Code2 size={12} style={{ color: 'var(--gold)' }} /> MERN Stack
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', bottom: 8, left: -20,
                  background: 'linear-gradient(135deg, var(--gold-dk), var(--gold))',
                  color: 'var(--cream)', borderRadius: 100, padding: '0.5rem 1rem',
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em',
                  boxShadow: '0 8px 32px rgba(184,151,90,0.3)', willChange: 'transform'
                }}
              >
                <Sparkles size={12} /> Spring Boot
              </motion.div>

              <motion.div
                animate={{ x: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', bottom: '38%', right: -40,
                  background: 'var(--surface)', color: 'var(--ink)',
                  borderRadius: 12, padding: '0.625rem 0.875rem',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)', border: '1px solid var(--border)',
                  willChange: 'transform'
                }}
              >
                <span className="font-display" style={{ fontSize: '1.375rem', fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>9+</span>
                <span style={{ fontSize: '0.625rem', color: 'var(--ink-80)', letterSpacing: '0.05em', marginTop: 2 }}>Projects</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          color: 'var(--ink-40)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase'
        }}
      >
        <span className="font-mono">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>

      <style>{`
        .hero-grid { grid-template-columns: 1fr auto; }
        @media(max-width:900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-avatar { display: none !important; }
        }
      `}</style>
    </section>
  );
};

/* ─── Stats strip ───────────────────────────────────────────────────────── */
const STATS = [
  { value: 9, suffix: '+', label: 'Projects Shipped', icon: Rocket },
  { value: 100, suffix: '+', label: 'APIs Built', icon: Zap },
  { value: 40, suffix: '%', label: 'Security Boost', icon: Shield },
  { value: 500, suffix: '+', label: 'Active Users', icon: User },
];

const StatsStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} style={{
      padding: '60px clamp(24px, 5vw, 80px)',
      background: 'var(--ink)', position: 'relative', overflow: 'hidden'
    }}>
      <div className="shimmer-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1 }} />
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40
      }} className="stats-grid">
        {STATS.map(({ value, suffix, label, icon: Icon }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <Icon size={20} style={{ color: 'var(--gold)', marginBottom: 12 }} />
            <div className="font-display" style={{
              fontSize: '3.25rem', fontWeight: 500, color: 'var(--cream)',
              lineHeight: 1, letterSpacing: '-0.02em'
            }}>
              <AnimatedCounter value={value} suffix={suffix} />
            </div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(247,243,238,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 8 }}>
              {label}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="shimmer-line" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1 }} />
      <style>{`@media(max-width:768px){ .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </section>
  );
};

/* ─── Experience ────────────────────────────────────────────────────────── */
const Experience = () => {
  const bullets = [
    { text: 'Built 3+ scalable MERN applications serving 500+ active users', icon: Rocket },
    { text: 'Designed and deployed 15+ RESTful APIs for auth and workflow automation', icon: Zap },
    { text: 'Implemented JWT + RBAC security, reducing unauthorized access risks by 40%', icon: Shield },
    { text: 'Optimized MongoDB queries and indexing, improving response time by 30%', icon: Database },
    { text: 'Collaborated in Agile sprints and managed production deployments using Git', icon: Terminal },
  ];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" style={{ padding: '100px clamp(24px, 5vw, 80px)' }} ref={containerRef}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 56 }}
        >
          <span className="section-eyebrow">Career</span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', fontWeight: 400,
            marginTop: 8, letterSpacing: '-0.02em', color: 'var(--ink)'
          }}>
            Professional<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 300 }}>Experience</em>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="card-grain"
          style={{
            background: 'var(--ink)', borderRadius: 28,
            padding: 'clamp(32px, 4vw, 56px)',
            border: '1px solid rgba(255,255,255,0.06)',
            position: 'relative', overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 56, right: 56, height: 2,
            background: 'linear-gradient(90deg, transparent, var(--gold), transparent)'
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'linear-gradient(135deg, var(--gold-dk), var(--gold))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Briefcase size={18} style={{ color: 'var(--cream)' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'DM Mono, monospace' }}>
                    Full Stack Developer
                  </p>
                  <h3 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 500, color: 'var(--cream)', letterSpacing: '-0.01em' }}>
                    Acore IT Hub Pvt. Ltd.
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(247,243,238,0.5)', marginLeft: 52, fontFamily: 'DM Mono, monospace' }}>
                Indore, Madhya Pradesh · 4 months
              </p>
            </div>
            <div style={{
              padding: '6px 16px', borderRadius: 100,
              border: '1px solid rgba(184,151,90,0.35)',
              fontSize: '0.75rem', color: 'var(--gold)', fontFamily: 'DM Mono, monospace',
              letterSpacing: '0.06em'
            }}>
              2024 – 2025
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="exp-grid">
            {bullets.map(({ text, icon: Icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.06)' }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '14px 16px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'transform 0.2s, background-color 0.2s'
                }}
              >
                <Icon size={14} style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: '0.875rem', color: 'rgba(247,243,238,0.75)', lineHeight: 1.6 }}>{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <style>{`@media(max-width:680px){ .exp-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
};

/* ─── Projects ──────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    title: 'Tickvia',
    subtitle: 'Event Ticket Booking Platform',
    description: 'Scalable full-stack event booking platform supporting 100+ active listings. JWT authentication, protected routing, RESTful APIs for event lifecycle. 25% frontend efficiency gain via Redux optimization.',
    tech: ['React.js', 'Redux Toolkit', 'REST APIs', 'JWT Auth', 'Bootstrap'],
    link: 'https://tickvia.com/',
    icon: CalendarCheck,
    accent: '#5B8FD4'
  },
  {
    title: 'LaptopKart',
    subtitle: 'E-Commerce Platform',
    description: 'Full-stack e-commerce with secure user registration and purchasing workflows. 10+ product listings with optimized Firestore data structures. Session security via controlled auth mechanisms.',
    tech: ['React.js', 'REST APIs', 'Firebase Auth', 'Firestore'],
    link: 'https://laptopkart-git-main-dhanshree-ratnerias-projects.vercel.app/home',
    github: 'https://github.com/Dhanshreeratneria/Laptopkart',
    icon: ShoppingCart,
    accent: '#4CAF82'
  },
  {
    title: 'CabnCarry',
    subtitle: 'Admin Dashboard',
    description: 'Scalable admin dashboard managing users, drivers, and operational workflows. Reusable UI components for consistency. RESTful APIs for real-time tracking and analytics.',
    tech: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'REST APIs'],
    icon: Cpu,
    accent: '#D4975B'
  },
  {
    title: 'YatraBuddy',
    subtitle: 'Travel Booking Platform',
    description: 'End-to-end travel booking and service workflows. REST APIs for authentication, booking management. Improved backend performance via optimized API handling and reduced response latency.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'REST APIs'],
    link: 'https://yaatrabuddy.in/',
    icon: Globe,
    accent: '#5BC4D4'
  },
  {
    title: 'TerraFlow',
    subtitle: 'Water Solution Management',
    description: '13+ service request categories including drilling and installations. RBAC for Admin/Customer with Firebase real-time tracking. 3+ interactive dashboards with automated notifications — 40–50% efficiency boost.',
    tech: ['React.js', 'Firebase Auth', 'Firestore', 'RBAC', 'REST APIs'],
    link: 'https://terraflow-drilling-solution-and-ser.vercel.app',
    github: 'https://github.com/Dhanshreeratneria/Terraflow-Drilling-Solution-and-Services',
    icon: Package,
    accent: '#6DB85C'
  },
  {
    title: 'Foodies',
    subtitle: 'Food Delivery App',
    description: 'Full-featured food delivery connecting customers with restaurants and homemade vendors. Complete Node.js/MongoDB backend with 100+ APIs. Admin frontend UI with full API integration.',
    tech: ['Node.js', 'MongoDB', 'Express.js', 'REST APIs', 'React.js'],
    icon: Utensils,
    accent: '#D45B5B'
  },
  {
    title: 'Hazaribagh Market',
    subtitle: 'Multi-Vendor Platform',
    description: 'One-stop platform connecting multiple vendors. Complete admin section frontend, UI design, and API integration managing vendors, listings, and orders across the marketplace.',
    tech: ['React.js', 'REST APIs', 'Admin Dashboard', 'Multi-Vendor'],
    icon: Package,
    accent: '#9B5BD4'
  },
  {
    title: 'Spring Boot CRUD',
    subtitle: 'Backend Architecture',
    description: 'Backend services with clean layered architecture. RESTful APIs for efficient CRUD operations using JPA and Hibernate ORM. Improved scalability through clean code practices.',
    tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'Hibernate'],
    github: 'https://github.com/Dhanshreeratneria/springboot-CRUD-operation',
    icon: Server,
    accent: '#D4975B'
  },
  {
    title: 'To-Do Manager',
    subtitle: 'Task Management App',
    description: 'Daily task management with assignment, completion tracking, and progress monitoring. Persistent state handling and intuitive task lifecycle management.',
    tech: ['React.js', 'JavaScript', 'State Management'],
    github: 'https://github.com/Dhanshreeratneria/To-do-Task-manager.git',
    icon: ClipboardList,
    accent: '#5BD4B8'
  },
];

const ProjectCard = ({ title, subtitle, description, tech, link, github, icon: Icon, accent, index }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
      className="card-grain"
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 20, padding: '28px 28px 24px',
        boxShadow: '0 1px 12px rgba(0,0,0,0.04)',
        display: 'flex', flexDirection: 'column', cursor: 'pointer',
        position: 'relative', overflow: 'hidden'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', inset: 0, borderRadius: 20,
          background: `radial-gradient(circle at 50% 0%, ${accent}15, transparent 70%)`,
          pointerEvents: 'none'
        }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <motion.div
          animate={{ backgroundColor: hovered ? accent + '25' : accent + '15', borderColor: hovered ? accent + '50' : accent + '25' }}
          style={{
            width: 44, height: 44, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid', transition: 'all 0.3s'
          }}
        >
          <Icon size={20} style={{ color: accent }} />
        </motion.div>
        <div style={{ display: 'flex', gap: 8 }}>
          {link && (
            <motion.a href={link} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.15, backgroundColor: accent }}
              style={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: 'var(--ink)', color: 'var(--cream)',
                textDecoration: 'none', transition: 'background-color 0.2s'
              }}
            >
              <ArrowUpRight size={14} />
            </motion.a>
          )}
          {github && (
            <motion.a href={github} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.15, backgroundColor: 'var(--ink)' }}
              style={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: 'var(--warm)', color: 'var(--ink)',
                textDecoration: 'none', transition: 'background-color 0.2s'
              }}
            >
              <Github size={14} />
            </motion.a>
          )}
        </div>
      </div>

      <p style={{ fontSize: '0.7rem', fontFamily: 'DM Mono, monospace', color: accent, letterSpacing: '0.08em', marginBottom: 6, textTransform: 'uppercase' }}>
        {subtitle}
      </p>
      <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--ink)', marginBottom: 10, letterSpacing: '-0.01em' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--ink-80)', lineHeight: 1.7, marginBottom: 20, flex: 1, fontWeight: 300 }}>
        {description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {tech.map(t => (
          <span key={t} className="tag-pill" style={{ fontSize: '0.625rem' }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => (
  <section id="work" style={{ padding: '100px clamp(24px, 5vw, 80px)' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}
      >
        <div>
          <span className="section-eyebrow">Selected Work</span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', fontWeight: 400,
            marginTop: 8, letterSpacing: '-0.02em', color: 'var(--ink)'
          }}>
            What I've<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 300 }}>Built</em>
          </h2>
        </div>
        <p style={{ maxWidth: 340, fontSize: '0.875rem', color: 'var(--ink-80)', lineHeight: 1.7, fontWeight: 300 }}>
          9 production-ready projects spanning e-commerce, booking platforms, admin dashboards, and enterprise APIs.
        </p>
      </motion.div>

      {/* FIX 2: Removed LayoutGroup wrapper — no layoutId on cards so it had no effect */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="projects-grid">
        {PROJECTS.map((p, i) => <ProjectCard key={i} {...p} index={i} />)}
      </div>
    </div>
    <style>{`
      @media(max-width:1024px){ .projects-grid { grid-template-columns: repeat(2,1fr) !important; } }
      @media(max-width:600px){ .projects-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </section>
);

/* ─── Skills ────────────────────────────────────────────────────────────── */

/* FIX 3: Replaced via.placeholder.com (unreliable) with a data URI fallback generator */
const skillFallbackSrc = (letter) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23E8DDD0'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-size='14' font-family='sans-serif' fill='%238A6D3B'%3E${letter}%3C/text%3E%3C/svg%3E`;

const SKILL_CATS = [
  {
    category: 'Languages', icon: Code2,
    skills: [
      { name: 'Java', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', desc: 'Object-oriented backend development, Spring ecosystem' },
      { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', desc: 'ES6+, async/await, DOM manipulation' },
      { name: 'C / C++', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', desc: 'Systems programming, DSA fundamentals' },
    ]
  },
  {
    category: 'Frontend', icon: Layout,
    skills: [
      { name: 'React.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', desc: 'Component architecture, hooks, SPA development' },
      { name: 'Redux Toolkit', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', desc: 'Global state management, optimized re-renders' },
      { name: 'Tailwind CSS', img: 'https://www.svgrepo.com/show/374118/tailwind.svg', desc: 'Utility-first styling, responsive design' },
      { name: 'Bootstrap', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', desc: 'Rapid UI prototyping and grid systems' },
    ]
  },
  {
    category: 'Backend', icon: Server,
    skills: [
      { name: 'Node.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', desc: 'Event-driven server-side JavaScript runtime' },
      { name: 'Express.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', desc: 'Minimal REST API framework for Node' },
      { name: 'Spring Boot', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', desc: 'Enterprise Java, JPA, Hibernate ORM' },
    ]
  },
  {
    category: 'Databases', icon: Database,
    skills: [
      { name: 'MySQL', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', desc: 'Relational queries, indexing, transactions' },
      { name: 'MongoDB', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', desc: 'NoSQL, aggregation, query optimization' },
      { name: 'Firebase Firestore', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', desc: 'Real-time cloud database and auth' },
    ]
  },
  {
    category: 'APIs & Security', icon: Shield,
    skills: [
      { name: 'REST APIs', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', desc: 'Designing and integrating RESTful services' },
      { name: 'JWT Auth', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', desc: 'Stateless token-based authentication' },
      { name: 'RBAC', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', desc: 'Role-based access control patterns' },
    ]
  },
  {
    category: 'Tools & DevOps', icon: Wrench,
    skills: [
      { name: 'Git & GitHub', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', desc: 'Version control, branching, CI/CD workflows' },
      { name: 'Postman', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', desc: 'API testing and documentation' },
      { name: 'VS Code', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', desc: 'Primary development environment' },
    ]
  },
];

const SkillCard = ({ category, icon: Icon, skills, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.6 }}
      whileHover={{ y: -5, boxShadow: '0 15px 40px rgba(0,0,0,0.08)' }}
      className="card-grain"
      style={{
        background: 'var(--surface)', borderRadius: 20,
        border: '1px solid var(--border)', overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s'
      }}
    >
      <div style={{
        padding: '20px 24px', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'linear-gradient(135deg, rgba(184,151,90,0.06), transparent)'
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, var(--gold-dk), var(--gold))',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon size={15} style={{ color: 'var(--cream)' }} />
        </div>
        <span className="font-display" style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--ink)' }}>{category}</span>
      </div>

      <div style={{ padding: '16px 24px 24px' }}>
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.05 + i * 0.05 }}
            whileHover={{ backgroundColor: 'rgba(184,151,90,0.05)', paddingLeft: 20 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 10, marginBottom: 4,
              transition: 'all 0.2s ease', cursor: 'default'
            }}
          >
            <img
              src={skill.img}
              alt={skill.name}
              style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'contain', background: 'white', padding: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', flexShrink: 0 }}
              onError={e => { e.currentTarget.src = skillFallbackSrc(skill.name[0]); }}
            />
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.2 }}>{skill.name}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-40)', lineHeight: 1.4, marginTop: 2 }}>{skill.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => (
  <section id="skills" style={{ padding: '100px clamp(24px, 5vw, 80px)', background: 'var(--warm)', position: 'relative' }}>
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      backgroundImage: 'radial-gradient(var(--border-strong) 1px, transparent 1px)',
      backgroundSize: '32px 32px', opacity: 0.5, pointerEvents: 'none'
    }} />
    <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: 60, textAlign: 'center' }}
      >
        <span className="section-eyebrow">Expertise</span>
        <h2 className="font-display" style={{
          fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', fontWeight: 500,
          marginTop: 8, letterSpacing: '-0.02em', color: 'var(--ink)'
        }}>
          Technical <em style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 300 }}>Stack</em>
        </h2>
        <p style={{ maxWidth: 480, margin: '16px auto 0', fontSize: '0.875rem', color: 'var(--ink-80)', lineHeight: 1.7, fontWeight: 300 }}>
          Tools and technologies I use daily to build fast, secure, and scalable applications.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="skills-grid">
        {SKILL_CATS.map((cat, i) => <SkillCard key={i} {...cat} index={i} />)}
      </div>
    </div>
    {/* FIX 4: Added missing quotes around 1fr in media query */}
    <style>{`
      @media(max-width:900px){ .skills-grid { grid-template-columns: repeat(2,1fr) !important; } }
      @media(max-width:560px){ .skills-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </section>
);

/* ─── Achievements + Certs ──────────────────────────────────────────────── */
const ACHIEVEMENTS = [
  { text: 'Ranked Top 20 among 100+ teams at Void Hack 6.0 Hackathon', icon: Trophy },
  { text: 'Improved task execution speed by 30% at Void Hack 5.0 through API optimization', icon: Zap },
  { text: 'Secured 8th rank in college in DSA, OOPs, and C programming', icon: Star },
];

const CERTS = [
  { title: 'Web, Mobile Development & Marketing', issuer: 'IBM SkillsBuild', date: '2026' },
  { title: 'Java & Spring Boot', issuer: 'Coding Era', date: 'Jan 2024' },
  { title: 'Generative AI & Responsible AI', issuer: 'Google', date: 'Dec 2024' },
  { title: 'Introduction to Programming with Python', issuer: 'NPTEL', date: 'Oct 2024' },
  { title: 'Introduction to Java', issuer: 'NPTEL', date: 'Apr 2024' },
  { title: 'C & C++ Programming', issuer: 'Coding Era', date: 'Nov 2023' },
  { title: 'DSA, OOPs & C Programming', issuer: 'Universal Informatics', date: 'Rank 8th' },
];

const Achievements = () => (
  <section id="achievements" style={{ padding: '100px clamp(24px, 5vw, 80px)' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 60 }}>
        <span className="section-eyebrow">Recognition</span>
        <h2 className="font-display" style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', fontWeight: 400, marginTop: 8, letterSpacing: '-0.02em' }}>
          Achievements &amp; <em style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 300 }}>Credentials</em>
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }} className="ach-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: 'var(--ink)', borderRadius: 20, padding: '32px',
              border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 32, right: 32, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p style={{ fontSize: '0.7rem', fontFamily: 'DM Mono, monospace', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Notable Wins</p>
            {ACHIEVEMENTS.map(({ text, icon: Icon }, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                style={{ display: 'flex', gap: 14, marginBottom: i < ACHIEVEMENTS.length - 1 ? 20 : 0, paddingBottom: i < ACHIEVEMENTS.length - 1 ? 20 : 0, borderBottom: i < ACHIEVEMENTS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(184,151,90,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} style={{ color: 'var(--gold)' }} />
                </div>
                <p style={{ fontSize: '0.875rem', color: 'rgba(247,243,238,0.8)', lineHeight: 1.65, fontWeight: 300, paddingTop: 8 }}>{text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            whileHover={{ scale: 1.02 }}
            style={{
              background: 'linear-gradient(135deg, var(--gold-dk), var(--gold))',
              borderRadius: 20, padding: '32px',
            }}
          >
            <p style={{ fontSize: '0.7rem', fontFamily: 'DM Mono, monospace', color: 'rgba(247,243,238,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>Education</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <GraduationCap size={20} style={{ color: 'var(--cream)' }} />
              <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--cream)' }}>B.Tech CSE</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'rgba(247,243,238,0.9)', lineHeight: 1.6, marginBottom: 12 }}>
              Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,255,255,0.2)', color: 'var(--cream)', padding: '4px 14px', borderRadius: 100, fontSize: '0.75rem', fontFamily: 'DM Mono, monospace' }}>
                CGPA: 7.72/10
              </span>
              <span style={{ background: 'rgba(255,255,255,0.2)', color: 'var(--cream)', padding: '4px 14px', borderRadius: 100, fontSize: '0.75rem', fontFamily: 'DM Mono, monospace' }}>
                Expected July 2026
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="card-grain"
          style={{
            background: 'var(--surface)', borderRadius: 20,
            border: '1px solid var(--border)', padding: '32px',
            display: 'flex', flexDirection: 'column'
          }}
        >
          <p style={{ fontSize: '0.7rem', fontFamily: 'DM Mono, monospace', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>Certifications</p>
          <div style={{ flex: 1 }}>
            {CERTS.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ backgroundColor: 'rgba(184,151,90,0.05)', paddingLeft: 20 }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '12px 12px', borderRadius: 10,
                  borderBottom: i < CERTS.length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <Award size={14} style={{ color: 'var(--gold)', marginTop: 3, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.4 }}>{cert.title}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--ink-40)', marginTop: 3, fontFamily: 'DM Mono, monospace' }}>
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    <style>{`@media(max-width:768px){ .ach-grid { grid-template-columns: 1fr !important; } }`}</style>
  </section>
);

/* ─── Contact Modal ─────────────────────────────────────────────────────── */
const Heart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CONTACT_DETAILS = [
  { icon: User, label: 'Full Name', value: 'Dhanshree Ratneria' },
  { icon: Mail, label: 'Email', value: 'ratneriadhanshree@gmail.com', link: 'mailto:ratneriadhanshree@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91-8349446596', link: 'tel:+918349446596' },
  { icon: MapPin, label: 'Location', value: 'Indore, Madhya Pradesh, India' },
  { icon: Github, label: 'GitHub', value: 'github.com/Dhanshreeratneria', link: 'https://github.com/Dhanshreeratneria' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/dhanshree-ratneria', link: 'https://www.linkedin.com/in/dhanshree-ratneria-94b0a625b/' },
  { icon: GraduationCap, label: 'Education', value: 'B.Tech CSE, SVVV Indore (July 2026)' },
  { icon: Star, label: 'CGPA', value: '7.72 / 10.0' },
];

/* FIX 5: Removed the inner AnimatePresence wrapper — the outer one in App handles exit animation */
const ContactModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(13,13,13,0.7)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', overflowY: 'auto'
    }}
    onClick={e => e.target === e.currentTarget && onClose()}
  >
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="card-grain"
      style={{
        background: 'var(--cream)', borderRadius: 28, width: '100%', maxWidth: 720,
        border: '1px solid var(--border-strong)', overflow: 'hidden',
        maxHeight: '90vh', overflowY: 'auto'
      }}
    >
      <div style={{
        padding: '32px 40px 28px', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--ink)', position: 'sticky', top: 0, zIndex: 1
      }}>
        <div>
          <p className="section-eyebrow" style={{ marginBottom: 4, color: 'var(--gold-lt)' }}>Let's Connect</p>
          <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--cream)', letterSpacing: '-0.02em' }}>
            Contact &amp; Details
          </h2>
        </div>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90, background: 'var(--gold)' }}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--cream)', transition: 'all 0.2s'
          }}
        >
          <X size={16} />
        </motion.button>
      </div>

      <div style={{ padding: '32px 40px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {CONTACT_DETAILS.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}
                style={{
                  background: 'var(--surface)', borderRadius: 14,
                  padding: '16px 18px', border: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Icon size={13} style={{ color: 'var(--gold)' }} />
                  <span style={{ fontSize: '0.625rem', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-40)' }}>{d.label}</span>
                </div>
                {d.link ? (
                  <a href={d.link} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--ink)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ wordBreak: 'break-all' }}>{d.value}</span>
                    <ExternalLink size={10} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  </a>
                ) : (
                  <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--ink)' }}>{d.value}</p>
                )}
              </motion.div>
            );
          })}
        </div>

        <div style={{
          background: 'var(--ink)', borderRadius: 16, padding: '28px 32px',
          marginBottom: 16, position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 40, right: 40, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
          <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--cream)', marginBottom: 12 }}>About Me</h3>
          <p style={{ fontSize: '0.875rem', color: 'rgba(247,243,238,0.7)', lineHeight: 1.75, marginBottom: 16, fontWeight: 300 }}>
            Full Stack Developer with hands-on experience in MERN stack and Spring Boot. Building scalable web applications
            and high-performance RESTful APIs. Skilled in authentication (JWT, RBAC), database optimization, and responsive
            UI development. Passionate about clean architecture and production-ready solutions in Agile environments.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['MERN Stack', 'Spring Boot', 'JWT/RBAC', 'REST APIs', 'Agile', 'MongoDB', 'React.js'].map(tag => (
              <span key={tag} className="tag-pill" style={{ background: 'rgba(184,151,90,0.15)', borderColor: 'rgba(184,151,90,0.3)', color: 'var(--gold-lt)' }}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{
          background: 'var(--surface)', borderRadius: 14, padding: '20px 24px',
          border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: 12
        }}>
          <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }}><Heart /></span>
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)' }}>Indore Cancer Foundation Club (2022–2025)</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-80)', marginTop: 4, fontWeight: 300 }}>Led awareness campaigns and designed promotional materials.</p>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--ink-40)', marginTop: 20, fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em' }}>
          Languages: English · Hindi
        </p>
      </div>
    </motion.div>
  </motion.div>
);

/* ─── Footer ────────────────────────────────────────────────────────────── */
const Footer = ({ onContact }) => (
  <footer style={{ background: 'var(--ink)', padding: '60px clamp(24px, 5vw, 80px) 40px' }}>
    <div className="shimmer-line" style={{ marginBottom: 48, height: 1 }} />
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="font-display" style={{ fontSize: '3.25rem', fontWeight: 400, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            DR<span style={{ color: 'var(--gold)' }}>.</span>
          </span>
          <p style={{ fontSize: '0.85rem', color: 'rgba(247,243,238,0.4)', marginTop: 10, fontWeight: 300 }}>
            Full-Stack Developer · Indore, India
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', gap: 16, alignItems: 'center' }}
        >
          {[
            { href: 'https://github.com/Dhanshreeratneria', icon: Github, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/dhanshree-ratneria-94b0a625b/', icon: Linkedin, label: 'LinkedIn' },
            { href: 'mailto:ratneriadhanshree@gmail.com', icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <motion.a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
              whileHover={{ scale: 1.1, background: 'var(--gold)', color: 'var(--cream)', borderColor: 'var(--gold)' }}
              style={{
                width: 44, height: 44, borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(247,243,238,0.6)',
                textDecoration: 'none', transition: 'all 0.2s'
              }}
            >
              <Icon size={16} />
            </motion.a>
          ))}
          <motion.button onClick={onContact}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 25px rgba(184,151,90,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, var(--gold-dk), var(--gold))',
              color: 'var(--cream)', border: 'none', borderRadius: 100,
              padding: '0.75rem 1.5rem', fontSize: '0.75rem', letterSpacing: '0.08em',
              fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8
            }}
          >
            <Mail size={13} /> Hire Me
          </motion.button>
        </motion.div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <p style={{ fontSize: '0.75rem', color: 'rgba(247,243,238,0.3)', fontFamily: 'DM Mono, monospace' }}>© 2026 Dhanshree Ratneria</p>
        <p style={{ fontSize: '0.75rem', color: 'rgba(247,243,238,0.3)', fontFamily: 'DM Mono, monospace' }}>Built with React · Framer Motion</p>
      </div>
    </div>
  </footer>
);

/* ─── App ───────────────────────────────────────────────────────────────── */
export default function App() {
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showContact ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showContact]);

  return (
    <>
      <GlobalStyles />
      <ProgressBar />
      <CursorGlow />
      <Nav onContact={() => setShowContact(true)} />
      <main>
        <Hero onContact={() => setShowContact(true)} />
        <StatsStrip />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
      </main>
      <Footer onContact={() => setShowContact(true)} />
      {/* FIX 5: Single AnimatePresence here is correct — ContactModal handles its own enter/exit */}
      <AnimatePresence>
        {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      </AnimatePresence>
    </>
  );
}