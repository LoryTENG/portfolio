import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Linkedin,
  Mail,
  Terminal,
  Download,
  ArrowRight,
  MessageSquare,
  Map,
  Brain,
  Code2,
} from 'lucide-react';
import { Github } from 'lucide-react';
import { detailedSkills, experiences, featuredProjects } from './data/portfolio';
import DotGrid from './components/DotGrid';

// ── Scroll Reveal Hooks ───────────────────────────────────────

function useScrollReveal(animClass = 'reveal-visible', options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('reveal-hidden');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.remove('reveal-hidden');
        el.classList.add(animClass);
        observer.disconnect();
      }
    }, { threshold: options.threshold ?? 0.1, rootMargin: options.rootMargin ?? '0px 0px -50px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [animClass]);
  return ref;
}

function useStaggerReveal(childSelector = ':scope > *', options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const parent = ref.current;
    if (!parent) return;
    const children = Array.from(parent.querySelectorAll(childSelector));
    children.forEach(c => c.classList.add('reveal-hidden'));
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        children.forEach((c, i) => {
          setTimeout(() => {
            c.classList.remove('reveal-hidden');
            c.classList.add('reveal-visible');
          }, i * 120);
        });
        observer.disconnect();
      }
    }, { threshold: options.threshold ?? 0.08, rootMargin: options.rootMargin ?? '0px 0px -40px 0px' });
    observer.observe(parent);
    return () => observer.disconnect();
  }, [childSelector]);
  return ref;
}

function useCountUp(target, duration = 1400, shouldStart = false) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    const end = parseInt(target, 10);
    if (isNaN(end)) return;
    const steps = 40;
    let step = 0;
    const iv = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round((end / steps) * step), end));
      if (step >= steps) clearInterval(iv);
    }, duration / steps);
    return () => clearInterval(iv);
  }, [target, shouldStart, duration]);
  return current;
}

// ─────────────────────────────────────────────────────────────

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [expanded, setExpanded] = useState({
    skills: false, experience: false, projects: true, contact: true,
  });
  const toggleSection = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const noMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onBannerMove = (e) => {
    if (noMotion()) return;
    const el = e.currentTarget;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transition = 'transform 0.08s ease';
    el.style.transform = `perspective(700px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 14).toFixed(2)}deg) scale3d(1.02,1.02,1.02)`;
  };
  const onBannerLeave = (e) => {
    const el = e.currentTarget;
    el.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transform = '';
  };
  const statsRef = useRef(null);

  const skillsRef   = useStaggerReveal();
  const expRef      = useStaggerReveal();
  const projectsRef = useStaggerReveal();
  const contactRef  = useScrollReveal('reveal-fade');
  const footerRef   = useScrollReveal('reveal-fade');

  const count0 = useCountUp(7, 1400, statsVisible);
  const count1 = useCountUp(4, 1200, statsVisible);
  const count2 = useCountUp(6, 1300, statsVisible);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toTimeString().split(' ')[0]);
    }, 1000);

    const heroTimer = setTimeout(() => setHeroLoaded(true), 150);

    const sectionIds = ['about', 'skills', 'experience', 'projects', 'contact'];
    const sectionEls = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.25, rootMargin: '-80px 0px -60% 0px' });
    sectionEls.forEach(el => navObs.observe(el));

    const statsEl = statsRef.current;
    let statsObs;
    if (statsEl) {
      statsObs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setStatsVisible(true); statsObs.disconnect(); }
      }, { threshold: 0.2 });
      statsObs.observe(statsEl);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
      clearTimeout(heroTimer);
      navObs.disconnect();
      statsObs?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-900 selection:text-white overflow-x-hidden">

      {/* Full-page dot grid — fixed, pointer-events none, z-1 */}
      <DotGrid />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[80] transition-all duration-300 ${scrolled ? 'bg-white/95 border-b border-gray-200 backdrop-blur-sm' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900">TENG LONGYIN</span>
          <div className="hidden md:flex gap-0 text-xs tracking-widest uppercase">
            {[
              { id: 'about',      to: '#about',       en: 'Intro',      cn: '简介' },
              { id: 'skills',     to: '/skills',       en: 'Skills',     cn: '技能' },
              { id: 'experience', to: '/experience',   en: 'Experience', cn: '经历' },
              { id: 'projects',   to: '/projects',     en: 'Projects',   cn: '项目' },
              { id: 'contact',    to: '#contact',      en: 'Contact',    cn: '联系' },
            ].map(({ id, to, en, cn }) => {
              const isActive = activeSection === id;
              const cls = `px-4 py-2 whitespace-nowrap transition-all duration-200 flex items-center justify-center gap-1.5 font-bold ${
                isActive
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-400 hover:text-gray-900'
              }`;
              const label = (
                <>
                  <span className="text-[13px]">{en}</span>
                  <span className="text-[11px] opacity-30 font-normal">·</span>
                  <span className="text-[11px] opacity-60 normal-case font-normal tracking-[0.08em]">{cn}</span>
                </>
              );
              return to.startsWith('#')
                ? <a key={id} href={to} className={cls}>{label}</a>
                : <Link key={id} to={to} className={cls}>{label}</Link>;
            })}
          </div>
          <span className="text-xs text-gray-300 font-mono tracking-widest hidden sm:inline">{time}</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section id="about" className="relative pt-36 pb-24 grid grid-cols-1 md:grid-cols-12 gap-10 items-start scroll-mt-16" style={{ scrollSnapAlign: 'start' }}>
          <div className="md:col-span-7 relative z-10">
            <p
              className={`text-xs tracking-[0.3em] uppercase text-gray-400 mb-6 transition-all duration-700 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '0ms' }}
            >
              Ph.D. Researcher · Beijing · China
            </p>
            <h1
              className={`font-black tracking-[-0.04em] text-gray-900 mb-5 leading-[1.0] transition-all duration-700 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <span className="block text-4xl md:text-6xl uppercase tracking-[-0.02em]">TENGLONGYIN</span>
              <span className="block text-3xl md:text-5xl tracking-[0.1em] mt-1" style={{ fontFamily: "'Archivo', 'PingFang SC', 'Noto Serif SC', sans-serif" }}>滕龙吟</span>
            </h1>
            <p
              className={`text-lg font-medium text-gray-500 mb-2 transition-all duration-700 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '200ms' }}
            >
              Urban Planner &amp; Spatial Data Developer
            </p>
            <p
              className={`text-base text-gray-400 mb-10 transition-all duration-700 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '250ms' }}
            >
              城乡规划博士 &amp; 空间算法开发者
            </p>
            <p
              className={`text-gray-500 text-base leading-relaxed max-w-xl mb-10 transition-all duration-700 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '320ms' }}
            >
              Ph.D. candidate at Beijing University of Technology. Specializing in spatial simulation, GIS analysis, and 3D point cloud processing. Developing AI-driven architectural tools and multi-agent urban models.
            </p>
            <div
              className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '400ms' }}
            >
              <a href="#contact" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-700 transition-colors">
                Get in Touch <MessageSquare size={13} />
              </a>
              <button className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 text-xs font-bold tracking-widest uppercase hover:border-gray-900 hover:text-gray-900 transition-colors">
                Download CV <Download size={13} />
              </button>
            </div>
            <div
              className={`flex gap-5 text-gray-400 transition-all duration-700 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '480ms' }}
            >
              <a href="mailto:bjut.dr.teng@foxmail.com"><Mail className="hover:text-gray-900 transition-colors cursor-pointer" size={20} /></a>
              <Github className="hover:text-gray-900 transition-colors cursor-pointer" size={20} />
              <Linkedin className="hover:text-gray-900 transition-colors cursor-pointer" size={20} />
            </div>
          </div>

          {/* Portrait */}
          <div
            className={`md:col-span-5 flex justify-center md:justify-end relative z-[1] transition-all duration-700 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="w-full">
              <div className="w-full aspect-[3/4] bg-gray-100 overflow-hidden">
                <img
                  src="/images/portrait.jpg"
                  alt="Teng Longyin"
                  className="w-full h-full object-cover object-top opacity-60"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-20" />

        {/* ── Stats ────────────────────────────────────────────── */}
        <section ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-24 border border-gray-200">
          {[
            { label: 'Years Exp',     val: statsVisible ? `${count0}+` : '07+', cn: '本硕博深耕' },
            { label: 'Core Algos',    val: statsVisible ? `0${count1}` : '04',  cn: '独立研发' },
            { label: 'Patents & SW',  val: statsVisible ? `${count2}+` : '06+', cn: '专利与软著' },
            { label: 'Degree',        val: 'Ph.D',                               cn: '城乡规划' },
          ].map((s, i) => (
            <div
              key={i}
              className={`group border-r last:border-r-0 border-b md:border-b-0 border-gray-200 px-8 py-8 transition-all duration-300 hover:border-gray-900 hover:-translate-y-1 hover:shadow-xl cursor-default ${statsVisible ? 'reveal-count' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight group-hover:scale-110 transition-all duration-300 origin-left inline-block">{s.val}</div>
              <div className="text-xs font-bold text-gray-400 group-hover:text-gray-700 uppercase tracking-[0.15em] mt-2">{s.label}</div>
              <div className="text-xs text-gray-400 group-hover:text-gray-600 mt-0.5">{s.cn}</div>
            </div>
          ))}
        </section>

        {/* ── Skills ───────────────────────────────────────────── */}
        <section id="skills" className="mb-1 scroll-mt-16" style={{ scrollSnapAlign: 'start' }}>
          <div
            className="relative -mx-6 h-56 md:h-64 cursor-pointer overflow-hidden"
            onClick={() => toggleSection('skills')}
            onMouseMove={onBannerMove}
            onMouseLeave={onBannerLeave}
            style={{ willChange: 'transform', backgroundImage: "url('/images/banner_skills.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black/65" />
            {/* Toggle + View — top right */}
            <div className="absolute top-5 right-6 z-10 flex items-center gap-3">
              <Link to="/skills" onClick={e => e.stopPropagation()} className="hidden sm:flex items-center gap-1 text-[10px] text-white/60 hover:text-white uppercase tracking-widest transition-colors duration-200">
                View <ArrowRight size={10} />
              </Link>
              <div className={`w-9 h-9 border border-white/40 flex items-center justify-center text-white text-xl leading-none font-thin transition-transform duration-400 ${expanded.skills ? 'rotate-45' : ''}`}>+</div>
            </div>
            {/* Editorial text — bottom left */}
            <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-8">
              <p className="text-[10px] text-white/50 tracking-[0.35em] uppercase mb-3">01 — Technical Skills / 专业技能</p>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-[-0.03em] leading-none uppercase">
                TECH SKILLS
              </h2>
            </div>
          </div>
          {/* Collapsible content */}
          <div className={`collapsible-wrap ${expanded.skills ? 'open' : ''}`}>
            <div className="collapsible-inner">
              <div className="py-10">
                <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  {detailedSkills.map((group, idx) => (
                    <Link key={idx} to={`/skills/${group.slug}`} className="group bg-white p-6 md:p-8 border border-gray-200 hover:border-gray-900 hover:-translate-y-2 hover:shadow-2xl transition-all duration-400 block">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1 flex items-center gap-2 group-hover:underline group-hover:underline-offset-4 transition-all duration-300">
                        <group.icon size={14} className="text-gray-400" />
                        {group.category}
                      </h3>
                      <p className="text-xs text-gray-400 group-hover:text-gray-600 mb-5 transition-colors duration-300">{group.categoryCn}</p>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map(skill => (
                          <span key={skill} className="border border-gray-200 group-hover:border-gray-400 group-hover:text-gray-700 px-3 py-1.5 text-xs text-gray-600 transition-all duration-300 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Experience ───────────────────────────────────────── */}
        <section id="experience" className="mb-1 scroll-mt-16" style={{ scrollSnapAlign: 'start' }}>
          <div
            className="relative -mx-6 h-56 md:h-64 cursor-pointer overflow-hidden"
            onClick={() => toggleSection('experience')}
            onMouseMove={onBannerMove}
            onMouseLeave={onBannerLeave}
            style={{ willChange: 'transform', backgroundImage: "url('/images/banner_experience.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute top-5 right-6 z-10 flex items-center gap-3">
              <Link to="/experience" onClick={e => e.stopPropagation()} className="hidden sm:flex items-center gap-1 text-[10px] text-white/60 hover:text-white uppercase tracking-widest transition-colors duration-200">
                View <ArrowRight size={10} />
              </Link>
              <div className={`w-9 h-9 border border-white/40 flex items-center justify-center text-white text-xl leading-none font-thin transition-transform duration-400 ${expanded.experience ? 'rotate-45' : ''}`}>+</div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-8">
              <p className="text-[10px] text-white/50 tracking-[0.35em] uppercase mb-3">02 — Professional Experience / 科研经历</p>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-[-0.03em] leading-none uppercase">
                EXPERIENCE
              </h2>
            </div>
          </div>
          <div className={`collapsible-wrap ${expanded.experience ? 'open' : ''}`}>
            <div className="collapsible-inner">
              <div className="py-4">
                <div ref={expRef} className="flex flex-col gap-5">
                  {experiences.map((exp, i) => (
                    <div key={i} className="group cursor-default border border-gray-200 hover:border-gray-900 hover:-translate-y-2 hover:shadow-2xl p-6 md:p-8 transition-all duration-400">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-baseline gap-3 mb-2">
                            <h3 className="text-base font-bold text-gray-900 uppercase tracking-tight group-hover:underline group-hover:underline-offset-4 transition-all duration-300">{exp.role}</h3>
                            <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors duration-300">{exp.roleCn}</span>
                          </div>
                          <p className="text-xs font-bold text-gray-500 group-hover:text-gray-900 uppercase tracking-widest mb-4 transition-colors duration-300">{exp.company}</p>
                          <p className="text-sm text-gray-600 group-hover:text-gray-800 leading-relaxed mb-2 max-w-2xl transition-colors duration-300">{exp.desc}</p>
                          <p className="text-sm text-gray-400 group-hover:text-gray-600 leading-relaxed max-w-2xl transition-colors duration-300">{exp.descCn}</p>
                        </div>
                        <span className="text-xs text-gray-400 group-hover:text-gray-900 font-mono whitespace-nowrap mt-1 transition-colors duration-300">{exp.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects ─────────────────────────────────────────── */}
        <section id="projects" className="mb-1 scroll-mt-16" style={{ scrollSnapAlign: 'start' }}>
          <div
            className="relative -mx-6 h-56 md:h-64 cursor-pointer overflow-hidden"
            onClick={() => toggleSection('projects')}
            onMouseMove={onBannerMove}
            onMouseLeave={onBannerLeave}
            style={{ willChange: 'transform', backgroundImage: "url('/images/banner_projects.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute top-5 right-6 z-10 flex items-center gap-3">
              <Link to="/projects" onClick={e => e.stopPropagation()} className="hidden sm:flex items-center gap-1 text-[10px] text-white/60 hover:text-white uppercase tracking-widest transition-colors duration-200">
                View <ArrowRight size={10} />
              </Link>
              <div className={`w-9 h-9 border border-white/40 flex items-center justify-center text-white text-xl leading-none font-thin transition-transform duration-400 ${expanded.projects ? 'rotate-45' : ''}`}>+</div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-8">
              <p className="text-[10px] text-white/50 tracking-[0.35em] uppercase mb-3">03 — Featured Projects / 精选项目</p>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-[-0.03em] leading-none uppercase">
                PROJECTS
              </h2>
            </div>
          </div>
          <div className={`collapsible-wrap ${expanded.projects ? 'open' : ''}`}>
            <div className="collapsible-inner">
              <div className="py-10">
                <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredProjects.map((p, i) => (
                    <Link key={i} to={`/projects/${p.slug}`} className="group block border border-gray-200 hover:border-gray-900 hover:-translate-y-2 hover:shadow-2xl transition-all duration-400">
                      <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-70 group-hover:opacity-100" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1 group-hover:underline group-hover:underline-offset-4 transition-all duration-300">{p.title}</h3>
                        <p className="text-xs text-gray-400 group-hover:text-gray-600 mb-4 transition-colors duration-300">{p.subtitle}</p>
                        <p className="text-sm text-gray-600 group-hover:text-gray-800 leading-relaxed mb-5 transition-colors duration-300">{p.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {p.tags.map(tag => (
                            <span key={tag} className="text-xs text-gray-500 border border-gray-200 group-hover:border-gray-400 group-hover:text-gray-700 px-2.5 py-1 rounded-full transition-all duration-300">{tag}</span>
                          ))}
                        </div>
                        <div className="w-full py-3 border border-gray-300 text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-all duration-300 flex justify-center items-center gap-2">
                          View Project <ArrowRight size={13} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <section id="contact" className="mb-20 scroll-mt-16" style={{ scrollSnapAlign: 'start' }}>
          <div
            className="relative -mx-6 h-56 md:h-64 cursor-pointer overflow-hidden"
            onClick={() => toggleSection('contact')}
            onMouseMove={onBannerMove}
            onMouseLeave={onBannerLeave}
            style={{ willChange: 'transform', backgroundImage: "url('/images/banner_contact.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute top-5 right-6 z-10">
              <div className={`w-9 h-9 border border-white/40 flex items-center justify-center text-white text-xl leading-none font-thin transition-transform duration-400 ${expanded.contact ? 'rotate-45' : ''}`}>+</div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-8">
              <p className="text-[10px] text-white/50 tracking-[0.35em] uppercase mb-3">04 — Get In Touch / 联系我</p>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-[-0.03em] leading-none uppercase">
                CONTACT
              </h2>
            </div>
          </div>
          <div className={`collapsible-wrap ${expanded.contact ? 'open' : ''}`}>
            <div className="collapsible-inner">
              <div className="py-10">
                <div ref={contactRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 border border-gray-200 p-8 md:p-12">
            {/* Info */}
            <div>
              <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-sm">
                Always open to discussing new research projects, collaborations, and academic exchanges.
                <span className="block mt-2 text-gray-400">随时欢迎探讨新项目、合作与学术交流。</span>
              </p>
              <div className="space-y-5">
                <a href="mailto:bjut.dr.teng@foxmail.com" className="flex items-center gap-4 group py-2 border-l-[3px] border-l-transparent hover:border-l-gray-900 pl-0 hover:pl-3 transition-all duration-300">
                  <div className="w-9 h-9 border border-gray-200 flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 transition-all duration-300">
                    <Mail size={16} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium transition-all duration-300">bjut.dr.teng@foxmail.com</span>
                </a>
                <div className="flex items-center gap-4 group py-2 border-l-[3px] border-l-transparent hover:border-l-gray-900 pl-0 hover:pl-3 transition-all duration-300 cursor-default">
                  <div className="w-9 h-9 border border-gray-200 flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 transition-all duration-300">
                    <MessageSquare size={16} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium transition-all duration-300">132 4182 2775</span>
                </div>
                <a href="#" className="flex items-center gap-4 group py-2 border-l-[3px] border-l-transparent hover:border-l-gray-900 pl-0 hover:pl-3 transition-all duration-300">
                  <div className="w-9 h-9 border border-gray-200 flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 transition-all duration-300">
                    <Linkedin size={16} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium transition-all duration-300">LinkedIn Profile</span>
                </a>
                <a href="#" className="flex items-center gap-4 group py-2 border-l-[3px] border-l-transparent hover:border-l-gray-900 pl-0 hover:pl-3 transition-all duration-300">
                  <div className="w-9 h-9 border border-gray-200 flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 transition-all duration-300">
                    <Github size={16} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium transition-all duration-300">GitHub Profile</span>
                </a>
              </div>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">Name</label>
                  <input type="text" placeholder="Your name" className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">Email</label>
                  <input type="email" placeholder="your@email.com" className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">Subject</label>
                <input type="text" placeholder="Subject" className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">Message</label>
                <textarea rows="5" placeholder="Your message..." className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors resize-none"></textarea>
              </div>
              <button type="button" className="bg-gray-900 text-white text-xs font-bold uppercase tracking-widest py-4 hover:bg-gray-700 transition-colors">
                Send Message
              </button>
            </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer ref={footerRef} className="border-t border-gray-100 py-10 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900">TENG LONGYIN</span>
          <span className="text-xs text-gray-400 uppercase tracking-widest">© 2026 · All Rights Reserved</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <span className="text-xs text-gray-400 font-mono">Beijing, China</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
