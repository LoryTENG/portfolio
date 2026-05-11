import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SubPageNav from '../components/SubPageNav';
import { featuredProjects } from '../data/portfolio';

const ProjectsPage = () => (
  <div className="min-h-screen bg-white text-gray-900 font-sans">
    <SubPageNav label="Projects" labelCn="精选项目" />

    {/* Hero */}
    <div
      className="relative pt-[64px] h-72 md:h-96 overflow-hidden"
      style={{ backgroundImage: "url('/images/banner_projects.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
        <p className="text-[10px] text-white/50 tracking-[0.35em] uppercase mb-4">03 — Featured Projects / 精选项目</p>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-[-0.03em] leading-none uppercase">
          PROJ<br />ECTS
        </h1>
      </div>
    </div>

    {/* Project count strip */}
    <div className="border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-4">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-900">{featuredProjects.length} Projects</span>
        <div className="h-px flex-grow bg-gray-100" />
        <span className="text-xs text-gray-400 tracking-widest uppercase">Research & Development</span>
      </div>
    </div>

    {/* Grid */}
    <main className="max-w-6xl mx-auto px-6 py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {featuredProjects.map((p, i) => (
          <Link key={i} to={`/projects/${p.slug}`} className="group block border border-gray-200 hover:border-gray-900 hover:-translate-y-2 hover:shadow-2xl transition-all duration-400">
            {/* Image */}
            <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-70 group-hover:opacity-100"
              />
              {/* Number badge */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-white/90 flex items-center justify-center">
                <span className="text-xs font-black text-gray-900">{String(i + 1).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-7">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-1 group-hover:underline group-hover:underline-offset-4 transition-all duration-300">
                {p.title}
              </h3>
              <p className="text-xs text-gray-400 group-hover:text-gray-600 mb-5 transition-colors duration-300">{p.subtitle}</p>
              <p className="text-sm text-gray-600 group-hover:text-gray-800 leading-relaxed mb-6 transition-colors duration-300">{p.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs text-gray-500 border border-gray-200 group-hover:border-gray-400 group-hover:text-gray-700 px-3 py-1 rounded-full transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="w-full py-3 border border-gray-300 text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-all duration-300 flex justify-center items-center gap-2">
                View Details <ArrowRight size={12} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-gray-100 mt-14 py-14 flex flex-wrap gap-4">
        <Link
          to="/experience"
          className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 text-xs font-bold tracking-widest uppercase hover:border-gray-900 hover:text-gray-900 transition-colors"
        >
          ← Experience
        </Link>
        <Link
          to="/#contact"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-700 transition-colors"
        >
          Get In Touch <ArrowRight size={13} />
        </Link>
      </div>
    </main>
  </div>
);

export default ProjectsPage;
