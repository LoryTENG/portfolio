import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SubPageNav from '../components/SubPageNav';
import { experiences } from '../data/portfolio';

const ExperiencePage = () => (
  <div className="min-h-screen bg-white text-gray-900 font-sans">
    <SubPageNav label="Experience" labelCn="科研与项目经历" />

    {/* Hero */}
    <div
      className="relative pt-[64px] h-72 md:h-96 overflow-hidden"
      style={{ backgroundImage: "url('/images/banner_experience.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
        <p className="text-[10px] text-white/50 tracking-[0.35em] uppercase mb-4">02 — Professional Experience / 科研经历</p>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-[-0.03em] leading-none uppercase">
          EXPERI<br />ENCE
        </h1>
      </div>
    </div>

    {/* Timeline */}
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 md:left-[11.5rem] top-0 bottom-0 w-px bg-gray-100 hidden md:block" />

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div key={i} className="group relative md:grid md:grid-cols-12 md:gap-10 py-14 border-b border-gray-100 last:border-b-0">
              {/* Period column */}
              <div className="md:col-span-3 mb-6 md:mb-0 md:text-right md:pr-10 relative">
                <span className="text-xs font-mono text-gray-400 group-hover:text-gray-900 transition-colors duration-300 block mb-2">
                  {exp.period}
                </span>
                {/* Timeline dot */}
                <div className="hidden md:block absolute right-[-5px] top-[2px] w-2.5 h-2.5 rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-900 group-hover:bg-gray-900 transition-all duration-300" />
              </div>

              {/* Content column */}
              <div className="md:col-span-9 md:pl-10">
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <h3 className="text-base font-black uppercase tracking-tight text-gray-900 group-hover:underline group-hover:underline-offset-4 transition-all duration-300">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-gray-400">{exp.roleCn}</span>
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-900 transition-colors duration-300 mb-5">
                  {exp.company}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-2 max-w-2xl">{exp.desc}</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-2xl">{exp.descCn}</p>

                {/* Highlights */}
                {exp.highlights && (
                  <ul className="flex flex-col gap-1.5 mb-6">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="mt-1 w-3 h-px bg-gray-300 flex-shrink-0 inline-block" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  to={`/experience/${exp.slug}`}
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors duration-200 group/btn"
                >
                  View Details
                  <ArrowRight size={10} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-gray-100 py-14 flex flex-wrap gap-4">
        <Link
          to="/skills"
          className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 text-xs font-bold tracking-widest uppercase hover:border-gray-900 hover:text-gray-900 transition-colors"
        >
          ← Skills
        </Link>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-700 transition-colors"
        >
          View Projects <ArrowRight size={13} />
        </Link>
      </div>
    </main>
  </div>
);

export default ExperiencePage;
