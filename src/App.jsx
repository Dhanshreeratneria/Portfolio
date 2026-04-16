// App.jsx
import React, { useEffect, useRef, useState } from 'react';
import mypic from './assets/mypic.jpg';
import { motion, useInView, useMotionValue, useTransform, animate, useScroll, useSpring } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  Code2, 
  Zap, 
  Shield, 
  Briefcase, 
  Trophy, 
  Award,
  Rocket,
  Database,
  Globe,
  Terminal,
  Server,
  Layout,
  Smartphone,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Sprout,
  Coffee,
  Cpu,
  Wrench,
  Lock,
  Cloud,
  Menu,
  X
} from 'lucide-react';

// --- Animated Counter Component ---
const AnimatedCounter = ({ value, suffix = '', prefix = '', duration = 2.5 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { 
        duration: duration, 
        ease: [0.25, 0.1, 0.25, 1]
      });
      
      const unsubscribe = rounded.onChange(latest => {
        setDisplayValue(latest);
      });
      
      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, value, duration, count, rounded]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

// --- Animated Text Swap ---
const TextSwap = () => {
  const roles = ["Full-Stack Developer", "MERN Devloper", "Spring Boot Developer", "API Integration"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="h-14 md:h-16 overflow-hidden relative">
      <motion.div
        key={index}
        initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -30, opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="absolute"
      >
        <span className="text-[#99744A] font-heading text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight">
          {roles[index]}
        </span>
      </motion.div>
    </div>
  );
};

// --- Floating Particle Component ---
const FloatingParticle = ({ delay = 0, duration = 20, size = 4, color = "#DBC2A6" }) => {
  return (
    <motion.div
      className="absolute rounded-full opacity-30"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// --- Enhanced Project Card with 3D Tilt Effect ---
const ProjectCard = ({ title, description, technologies, link, github, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -5;
    const rotateYValue = ((x - centerX) / centerX) * 5;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    setGlowIntensity(Math.abs(rotateXValue) + Math.abs(rotateYValue));
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowIntensity(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      className="group relative bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-[#DBC2A6]/30 shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Animated Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#99744A]/20 to-[#DBC2A6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          opacity: glowIntensity * 0.02,
        }}
      />
      
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-3xl">
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-[#99744A]/20 to-transparent rotate-45" />
      </div>
      
      <div className="absolute top-6 right-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-3 h-3 rounded-full bg-gradient-to-r from-[#99744A] to-[#DBC2A6]"
        />
      </div>
      
      <h3 className="font-heading text-2xl text-[#414A37] mb-3 group-hover:text-[#99744A] transition-colors duration-300">{title}</h3>
      <p className="font-body text-[#414A37]/70 mb-6 leading-relaxed text-sm md:text-base">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, i) => (
          <motion.span 
            key={i} 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + i * 0.05 }}
            whileHover={{ scale: 1.05, backgroundColor: "#99744A", color: "#F5EFE6" }}
            className="text-xs px-3 py-1.5 bg-[#DBC2A6]/20 text-[#414A37] rounded-full font-body tracking-wide transition-all duration-300"
          >
            {tech}
          </motion.span>
        ))}
      </div>
      
      {(link || github) && (
        <div className="flex gap-4 mt-4">
          {link && (
            <motion.a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="text-xs uppercase tracking-wider text-[#99744A] hover:text-[#414A37] transition-colors flex items-center gap-1"
            >
              Live Demo <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
          )}
          {github && (
            <motion.a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="text-xs uppercase tracking-wider text-[#414A37]/60 hover:text-[#99744A] transition-colors flex items-center gap-1"
            >
              GitHub <Github className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
          )}
        </div>
      )}
      
      <motion.div 
        className="mt-4 h-px bg-gradient-to-r from-[#DBC2A6] to-transparent"
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        transition={{ delay: index * 0.2, duration: 0.5 }}
      />
    </motion.div>
  );
};

// --- Certification Card with Animation ---
const CertificationCard = ({ title, issuer, date, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 10, backgroundColor: "rgba(153, 116, 74, 0.05)" }}
      className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 cursor-default group"
    >
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-1"
      >
        <Award className="w-4 h-4 text-[#99744A] group-hover:text-[#414A37] transition-colors" />
      </motion.div>
      <div>
        <h4 className="font-body font-medium text-[#414A37] group-hover:text-[#99744A] transition-colors">{title}</h4>
        <p className="text-sm text-[#414A37]/60">{issuer} • {date}</p>
      </div>
    </motion.div>
  );
};

// --- Skill Tag with Animation ---
const SkillTag = ({ skill, delay }) => {
  const getIcon = (skillName) => {
    const icons = {
      'Java': Coffee,
      'JavaScript': Code2,
      'React.js': Layout,
      'Node.js': Server,
      'Spring Boot': Sprout,
      'MySQL': Database,
      'MongoDB': Database,
      'Firebase': Cloud,
      'JWT': Lock,
      'RBAC': Shield,
      'Git': Wrench,
      'REST APIs': Globe,
    };
    return icons[skillName] || Code2;
  };

  const IconComponent = getIcon(skill);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1, backgroundColor: "#99744A", color: "#F5EFE6" }}
      className="px-4 py-2 bg-[#DBC2A6]/15 text-[#414A37] rounded-full text-sm font-body transition-all duration-300 cursor-default border border-[#DBC2A6]/30 flex items-center gap-2"
    >
      <IconComponent className="w-3.5 h-3.5" />
      {skill}
    </motion.span>
  );
};

// --- Main App Component ---
const App = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const projects = [
    {
      title: "CabnCarry – Admin Dashboard",
      description: "Engineered a scalable admin dashboard to manage users, drivers, and operational workflows. Integrated RESTful APIs for real-time tracking, analytics, and system monitoring.",
      technologies: ["React.js", "Redux Toolkit", "Tailwind CSS", "REST APIs"],
      link: null,
      github: null
    },
    {
      title: "YatraBuddy – Travel Platform",
      description: "Developed a full-stack travel platform supporting end-to-end booking workflows. Built REST APIs for authentication and booking management with optimized performance.",
      technologies: ["React.js", "Node.js", "Express.js", "MySQL"],
      link: "https://yaatrabuddy.in/",
      github: null
    },
    {
      title: "TerraFlow – Water Management",
      description: "Full-stack system managing 13+ service categories with role-based authentication. Real-time tracking via Firebase boosted response efficiency by 40-50%.",
      technologies: ["React.js", "Firebase", "Firestore", "RBAC"],
      link: "https://cwsms.vercel.app/",
      github: "https://github.com/Dhanshreeratneria/CWSMS"
    },
    {
      title: "Spring Boot CRUD API",
      description: "Designed backend services using Spring Boot with layered architecture. Implemented RESTful APIs with JPA and Hibernate ORM for efficient data management.",
      technologies: ["Java", "Spring Boot", "JPA", "MySQL", "Hibernate"],
      link: null,
      github: null
    }
  ];

  const stats = [
    { value: 3, suffix: '+', label: 'Scalable MERN Apps', prefix: '', icon: Rocket },
    { value: 15, suffix: '+', label: 'RESTful APIs Built', prefix: '', icon: Zap },
    { value: 40, suffix: '%', label: 'Security Improvement', prefix: '', icon: Shield },
  ];

  const certifications = [
    { title: "Java & Spring Boot", issuer: "Coding Era", date: "Jan 2024" },
    { title: "Generative AI & Responsible AI", issuer: "Google", date: "Dec 2024" },
    { title: "Programming with Python", issuer: "NPTEL", date: "Oct 2024" },
    { title: "Introduction to Java", issuer: "NPTEL", date: "Apr 2024" },
    { title: "C & C++ Programming", issuer: "Coding Era", date: "Nov 2023" }
  ];

  const achievements = [
    { text: "Ranked Top 20 among 100+ teams at Void Hack 6.0", icon: Trophy },
    { text: "Improved task execution speed by 30% at Void Hack 5.0", icon: Zap }
  ];

  const allSkills = [
    "Java", "JavaScript", "C/C++", "React.js", "Redux", "Node.js", 
    "Express.js", "Spring Boot", "Hibernate", "MySQL", "MongoDB", 
    "Firebase", "JWT", "RBAC", "REST APIs", "Git", "Postman"
  ];

  return (
    <div className="min-h-screen bg-[#F5EFE6] font-body text-[#414A37] antialiased relative overflow-x-hidden">
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#99744A] via-[#DBC2A6] to-[#414A37] z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} duration={15 + i} size={3 + (i % 4)} />
        ))}
      </div>
      
      {/* --- Navigation --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-[#F5EFE6]/80 backdrop-blur-xl border-b border-[#DBC2A6]/30"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="font-heading text-2xl tracking-tight text-[#414A37] relative"
          >
            DR.
            <motion.div 
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#99744A] to-[#DBC2A6]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5 }}
            />
          </motion.span>
          
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-wider">
            {["Work", "Skills", "Achievements"].map((item) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2 }}
                className="hover:text-[#99744A] transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#99744A] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
          
          <motion.a 
            href="mailto:ratneriadhanshree@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden bg-gradient-to-r from-[#99744A] to-[#414A37] text-[#F5EFE6] px-6 py-2.5 rounded-full text-sm font-medium shadow-lg group flex items-center gap-2"
          >
            <Mail className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Contact</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#DBC2A6] to-[#99744A]"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </div>
      </motion.nav>

      {/* --- Hero Section with Profile Image --- */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 flex items-center gap-4"
              >
                <div className="w-12 h-px bg-gradient-to-r from-[#99744A] to-[#DBC2A6]" />
                <span className="text-sm uppercase tracking-widest text-[#414A37]/60">Dhanshree Ratneria</span>
              </motion.div>
              
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-4 text-[#414A37]">
                Full-Stack<br />
                <span className="italic font-light bg-gradient-to-r from-[#99744A] to-[#414A37] bg-clip-text text-transparent">Developer</span>
              </h1>
              
              <div className="mb-6">
                <TextSwap />
              </div>
              
              <p className="font-body text-base md:text-lg text-[#414A37]/70 max-w-xl leading-relaxed mb-6">
                Specializing in MERN stack and Spring Boot development. Designing scalable RESTful APIs, 
                implementing JWT/RBAC security, and optimizing database performance.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-[#414A37]/60 mb-8">
                <motion.span whileHover={{ x: 3 }} className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> Indore, India
                </motion.span>
                <motion.span whileHover={{ x: 3 }} className="flex items-center gap-1">
                  <Phone className="w-4 h-4" /> +91-8349446596
                </motion.span>
                <motion.a 
                  whileHover={{ x: 3 }}
                  href="mailto:ratneriadhanshree@gmail.com" 
                  className="hover:text-[#99744A] transition-colors flex items-center gap-1"
                >
                  <Mail className="w-4 h-4" /> ratneriadhanshree@gmail.com
                </motion.a>
              </div>

              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/Dhanshreeratneria"
                  target="_blank"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-10 h-10 rounded-full bg-[#DBC2A6]/20 flex items-center justify-center text-[#414A37] hover:bg-[#99744A] hover:text-white transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/dhanshree-ratneria"
                  target="_blank"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-10 h-10 rounded-full bg-[#DBC2A6]/20 flex items-center justify-center text-[#414A37] hover:bg-[#99744A] hover:text-white transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Animated Border Ring */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-[#DBC2A6]/50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-2 rounded-full border border-[#99744A]/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-4 rounded-full border border-[#DBC2A6]/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Image Container */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="absolute inset-6 rounded-full overflow-hidden bg-gradient-to-br from-[#99744A] to-[#414A37] p-1"
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#DBC2A6]">
                    <img
                      src={mypic}
                      alt="Dhanshree Ratneria"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x400/DBC2A6/414A37?text=DR";
                      }}
                    />
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-[#99744A] rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <Code2 className="w-6 h-6" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 w-10 h-10 bg-[#414A37] rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Background Geometric Pattern */}
        <div className="absolute right-0 top-20 -z-0 opacity-10">
          <svg width="600" height="600" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="#99744A" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="60" stroke="#414A37" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="40" stroke="#DBC2A6" strokeWidth="0.5" />
            <path d="M100 0 L130 50 L180 70 L150 110 L170 160 L120 140 L80 180 L60 130 L20 110 L50 60 Z" stroke="#99744A" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      </section>

      {/* --- Impact Statistics with Enhanced Design --- */}
      <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#99744A]/10 to-[#DBC2A6]/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-[#DBC2A6]/30 text-center">
                  <IconComponent className="w-10 h-10 mx-auto mb-4 text-[#99744A]" />
                  <div className="font-heading text-5xl md:text-6xl text-[#99744A] mb-3">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <p className="font-body text-[#414A37]/70 uppercase tracking-wider text-sm">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* --- Professional Experience --- */}
      <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#414A37]/5 to-[#99744A]/5 rounded-[3rem] blur-2xl" />
          <div className="relative bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-[#DBC2A6]/40">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#99744A] to-[#414A37] flex items-center justify-center"
              >
                <Briefcase className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <span className="text-sm uppercase tracking-widest text-[#99744A]">Experience</span>
                <h2 className="font-heading text-3xl md:text-4xl text-[#414A37]">Full Stack Developer</h2>
              </div>
            </div>
            
            <p className="text-[#414A37]/70 mb-6 ml-14">Acore IT Hub Pvt. Ltd., Indore, Madhya Pradesh | 4 months</p>
            
            <div className="grid md:grid-cols-2 gap-4 ml-14">
              {[
                "Built 3+ scalable MERN applications serving 500+ active users",
                "Designed and deployed 15+ RESTful APIs",
                "Implemented JWT + RBAC security (40% risk reduction)",
                "Optimized MongoDB queries (30% faster response)",
                "Collaborated in Agile sprints with Git deployment"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <ChevronRight className="w-4 h-4 text-[#99744A] mt-0.5 flex-shrink-0" />
                  <span className="text-[#414A37]/80">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- Projects Grid --- */}
      <section id="work" className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-12 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-[#99744A]">Featured Projects</span>
          <h2 className="font-heading text-4xl md:text-5xl text-[#414A37] mt-2">What I've Built</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#99744A] to-[#DBC2A6] mx-auto mt-4" />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} index={idx} />
          ))}
        </div>
      </section>

      {/* --- Skills Section --- */}
      <section id="skills" className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#DBC2A6]/10 to-transparent rounded-[3rem]" />
          <div className="relative bg-white/30 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-[#DBC2A6]/30">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl text-[#414A37] mb-2">Technical Expertise</h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#99744A] to-[#DBC2A6] mx-auto" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {allSkills.map((skill, i) => (
                <SkillTag key={i} skill={skill} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- Achievements & Certifications --- */}
      <section id="achievements" className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/50 to-white/20 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-[#DBC2A6]/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#99744A]/10 to-transparent rounded-full blur-2xl" />
            
            <span className="text-sm uppercase tracking-widest text-[#99744A]">Recognition</span>
            <h3 className="font-heading text-2xl md:text-3xl text-[#414A37] mt-2 mb-6">Achievements</h3>
            
            <ul className="space-y-6">
              {achievements.map((achievement, idx) => {
                const IconComponent = achievement.icon;
                return (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex items-start gap-4"
                  >
                    <IconComponent className="w-8 h-8 text-[#99744A] flex-shrink-0" />
                    <span className="font-body text-[#414A37]/80">{achievement.text}</span>
                  </motion.li>
                );
              })}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-[#DBC2A6]/30">
              <h4 className="font-heading text-lg text-[#414A37] mb-3">Education</h4>
              <p className="font-body text-[#414A37]/80">
                <span className="font-medium text-[#99744A]">B.Tech, Computer Science & Engineering</span><br />
                Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore<br />
                <span className="text-sm text-[#414A37]/60">CGPA: 7.72/10 | Expected Graduation: July 2026</span>
              </p>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-bl from-white/50 to-white/20 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-[#DBC2A6]/30 relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#414A37]/10 to-transparent rounded-full blur-2xl" />
            
            <span className="text-sm uppercase tracking-widest text-[#99744A]">Credentials</span>
            <h3 className="font-heading text-2xl md:text-3xl text-[#414A37] mt-2 mb-6">Certifications</h3>
            
            <div className="space-y-1">
              {certifications.map((cert, idx) => (
                <CertificationCard key={idx} {...cert} index={idx} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Growth Section --- */}
      <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-[#DBC2A6]/50 pt-16 relative"
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#99744A] to-[#414A37] flex items-center justify-center"
            >
              <Sprout className="w-8 h-8 text-white" />
            </motion.div>
            
            <span className="text-sm uppercase tracking-widest text-[#414A37]/50">Growth Log</span>
            <h3 className="font-heading text-3xl md:text-4xl text-[#414A37] mt-4 mb-6">Continuous Evolution</h3>
            
            <p className="font-body text-lg md:text-xl text-[#414A37]/70 leading-relaxed">
              Bridging the gap between robust <span className="text-[#99744A] font-medium">MERN stack</span> applications 
              and <span className="text-[#99744A] font-medium">Spring Boot</span> enterprise architectures. 
              Exploring Generative AI integration while strengthening core DSA fundamentals.
            </p>
            
            <div className="mt-8 flex justify-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-[#99744A] to-transparent" />
              {/* <span className="text-sm font-body italic text-[#414A37]/60">
                Member, Indore Cancer Foundation Club (2022–2025)
              </span> */}
              <div className="h-px w-12 bg-gradient-to-l from-[#99744A] to-transparent" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-8 px-6 md:px-8 max-w-7xl mx-auto border-t border-[#DBC2A6]/30">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-heading text-sm text-[#414A37]/50">
            © 2024 Dhanshree Ratneria — Built with precision & AI aesthetics
          </span>
          
          <div className="flex gap-6 text-sm text-[#414A37]/60">
            <motion.a 
              href="https://github.com/Dhanshreeratneria"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, color: "#99744A" }}
              className="hover:text-[#99744A] transition-colors flex items-center gap-1"
            >
              <Github className="w-4 h-4" /> GitHub
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/dhanshree-ratneria"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, color: "#99744A" }}
              className="hover:text-[#99744A] transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </motion.a>
            <motion.a 
              href="mailto:ratneriadhanshree@gmail.com"
              whileHover={{ y: -2, color: "#99744A" }}
              className="hover:text-[#99744A] transition-colors flex items-center gap-1"
            >
              <Mail className="w-4 h-4" /> Email
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;