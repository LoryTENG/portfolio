import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SubPageNav from '../components/SubPageNav';
import { experiences } from '../data/portfolio';

const ExperienceDetailPage = () => {
  const { slug } = useParams();
  const idx = experiences.findIndex(e => e.slug === slug);
  const exp = experiences[idx];

  if (!exp) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4 text-sm">Experience entry not found.</p>
          <Link to="/experience" className="text-xs font-bold uppercase tracking-widest text-gray-900 underline">
            ← Back to Experience
          </Link>
        </div>
      </div>
    );
  }

  const prev = idx > 0 ? experiences[idx - 1] : null;
  const next = idx < experiences.length - 1 ? experiences[idx + 1] : null;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <SubPageNav
        label={exp.role}
        labelCn={exp.roleCn}
        backTo="/experience"
        backLabel="Experience"
      />

      {/* Hero */}
      <div className="relative pt-[64px] h-72 md:h-96 overflow-hidden bg-gray-900">
        <span className="absolute right-4 bottom-0 text-[14rem] md:text-[20rem] font-black leading-none text-white/[0.04] select-none pointer-events-none">
          {String(idx + 1).padStart(2, '0')}
        </span>
        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 border border-white/20 px-3 py-1">
              {exp.type}
            </span>
            <span className="text-[10px] text-white/30 font-mono tracking-widest">{exp.period}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-[-0.03em] leading-[0.92] uppercase mb-3">
            {exp.role}
          </h1>
          <p className="text-sm text-white/50 font-bold uppercase tracking-widest">{exp.company}</p>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

          {/* Left sticky panel */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              {/* Meta */}
              <div className="mb-8 p-6 border border-gray-100 space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-1">Period</p>
                  <p className="text-sm font-black text-gray-900 font-mono">{exp.period}</p>
                </div>
                <div className="h-px bg-gray-100" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-1">Organisation</p>
                  <p className="text-sm font-bold text-gray-900">{exp.company}</p>
                </div>
                <div className="h-px bg-gray-100" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-1">Type</p>
                  <p className="text-sm text-gray-600">{exp.type}</p>
                </div>
                <div className="h-px bg-gray-100" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-2">Key Outcomes</p>
                  <ul className="flex flex-col gap-1.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="mt-1.5 w-3 h-px bg-gray-300 flex-shrink-0 inline-block" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Experience index */}
              <div className="flex flex-col gap-2 mb-8">
                {experiences.map((e, i) => (
                  <Link
                    key={e.slug}
                    to={`/experience/${e.slug}`}
                    className={`flex items-center gap-3 py-2 px-3 text-xs transition-all duration-200 rounded ${
                      e.slug === slug
                        ? 'bg-gray-900 text-white font-bold'
                        : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-mono opacity-50 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className="uppercase tracking-wider font-bold truncate">{e.company}</span>
                  </Link>
                ))}
              </div>

              <Link
                to="/experience"
                className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors group"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-200" />
                All Experience
              </Link>
            </div>
          </div>

          {/* Right content */}
          <div className="md:col-span-8">
            {/* Role header */}
            <div className="mb-10">
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">{exp.role}</h2>
                <span className="text-base text-gray-400">{exp.roleCn}</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{exp.company}</p>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-800 leading-relaxed mb-4 font-medium">{exp.desc}</p>
            <p className="text-base text-gray-400 leading-relaxed mb-14">{exp.descCn}</p>

            {/* Detail cards */}
            {exp.details && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-7">
                  What I Did
                </p>
                <div className="flex flex-col gap-4">
                  {exp.details.map((d, i) => (
                    <div
                      key={i}
                      className="group flex gap-6 p-6 border border-gray-100 hover:border-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      <span className="text-2xl font-black text-gray-100 group-hover:text-gray-300 transition-colors duration-300 leading-none flex-shrink-0 w-8 mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest text-gray-900 mb-2 group-hover:underline group-hover:underline-offset-4 transition-all duration-300">
                          {d.title}
                        </p>
                        <p className="text-sm text-gray-500 group-hover:text-gray-700 leading-relaxed transition-colors duration-300">
                          {d.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="border-t border-gray-100 mt-16 pt-8 grid grid-cols-2 gap-4">
          {prev ? (
            <Link
              to={`/experience/${prev.slug}`}
              className="group flex items-center gap-4 p-6 border border-gray-100 hover:border-gray-900 transition-all duration-300"
            >
              <ArrowLeft size={14} className="text-gray-400 group-hover:text-gray-900 group-hover:-translate-x-1 transition-all duration-300 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Previous</p>
                <p className="text-xs font-black uppercase tracking-widest text-gray-900">{prev.role}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{prev.company}</p>
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              to={`/experience/${next.slug}`}
              className="group flex items-center justify-end gap-4 p-6 border border-gray-100 hover:border-gray-900 transition-all duration-300"
            >
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Next</p>
                <p className="text-xs font-black uppercase tracking-widest text-gray-900">{next.role}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{next.company}</p>
              </div>
              <ArrowRight size={14} className="text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  );
};

export default ExperienceDetailPage;
