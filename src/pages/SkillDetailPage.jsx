import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SubPageNav from '../components/SubPageNav';
import { detailedSkills } from '../data/portfolio';

const SkillDetailPage = () => {
  const { slug } = useParams();
  const idx = detailedSkills.findIndex(s => s.slug === slug);
  const skill = detailedSkills[idx];

  if (!skill) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4 text-sm">Skill not found.</p>
          <Link to="/skills" className="text-xs font-bold uppercase tracking-widest text-gray-900 underline">
            ← Back to Skills
          </Link>
        </div>
      </div>
    );
  }

  const prev = idx > 0 ? detailedSkills[idx - 1] : null;
  const next = idx < detailedSkills.length - 1 ? detailedSkills[idx + 1] : null;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <SubPageNav
        label={skill.category}
        labelCn={skill.categoryCn}
        backTo="/skills"
        backLabel="Skills"
      />

      {/* Hero */}
      <div className="relative pt-[64px] h-72 md:h-96 overflow-hidden bg-gray-900">
        {/* Giant background number */}
        <span className="absolute right-4 bottom-0 text-[16rem] md:text-[22rem] font-black leading-none text-white/[0.04] select-none pointer-events-none">
          {String(idx + 1).padStart(2, '0')}
        </span>
        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <div className="flex items-center gap-2 mb-4">
            <skill.icon size={14} className="text-white/40" />
            <p className="text-[10px] text-white/40 tracking-[0.35em] uppercase">
              0{idx + 1} — {skill.category} / {skill.categoryCn}
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-[-0.03em] leading-[0.92] uppercase">
            {skill.category}
          </h1>
        </div>
      </div>

      {/* Skills pill strip */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center gap-2">
          {skill.skills.map(s => (
            <span
              key={s}
              className="border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

          {/* Left sticky panel */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <div className="flex items-center gap-2 mb-1">
                <skill.icon size={15} className="text-gray-400 flex-shrink-0" />
                <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">
                  {skill.category}
                </h2>
              </div>
              <p className="text-xs text-gray-400 ml-[23px] mb-8">{skill.categoryCn}</p>

              {/* All skill tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {skill.skills.map(s => (
                  <span
                    key={s}
                    className="border border-gray-200 hover:border-gray-900 hover:text-gray-900 px-3 py-1.5 text-xs text-gray-600 transition-all duration-200 rounded-full cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Category index */}
              <div className="flex flex-col gap-2 mb-10">
                {detailedSkills.map((s, i) => (
                  <Link
                    key={s.slug}
                    to={`/skills/${s.slug}`}
                    className={`flex items-center gap-3 py-2 px-3 text-xs transition-all duration-200 rounded ${
                      s.slug === slug
                        ? 'bg-gray-900 text-white font-bold'
                        : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-mono opacity-50">{String(i + 1).padStart(2, '0')}</span>
                    <span className="uppercase tracking-wider font-bold">{s.category}</span>
                  </Link>
                ))}
              </div>

              <Link
                to="/skills"
                className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors group"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-200" />
                All Skills
              </Link>
            </div>
          </div>

          {/* Right content */}
          <div className="md:col-span-8">
            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-4 font-medium">
              {skill.detail}
            </p>
            <p className="text-base text-gray-400 leading-relaxed mb-14">
              {skill.detailCn}
            </p>

            {/* Key Applications */}
            {skill.highlights && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-7">
                  Key Applications
                </p>
                <div className="flex flex-col gap-4">
                  {skill.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="group flex gap-6 p-6 border border-gray-100 hover:border-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      <span className="text-2xl font-black text-gray-100 group-hover:text-gray-300 transition-colors duration-300 leading-none flex-shrink-0 w-8 mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest text-gray-900 mb-2 group-hover:underline group-hover:underline-offset-4 transition-all duration-300">
                          {h.title}
                        </p>
                        <p className="text-sm text-gray-500 group-hover:text-gray-700 leading-relaxed transition-colors duration-300">
                          {h.desc}
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
              to={`/skills/${prev.slug}`}
              className="group flex items-center gap-4 p-6 border border-gray-100 hover:border-gray-900 transition-all duration-300"
            >
              <ArrowLeft size={14} className="text-gray-400 group-hover:text-gray-900 group-hover:-translate-x-1 transition-all duration-300 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Previous</p>
                <p className="text-xs font-black uppercase tracking-widest text-gray-900">{prev.category}</p>
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              to={`/skills/${next.slug}`}
              className="group flex items-center justify-end gap-4 p-6 border border-gray-100 hover:border-gray-900 transition-all duration-300"
            >
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Next</p>
                <p className="text-xs font-black uppercase tracking-widest text-gray-900">{next.category}</p>
              </div>
              <ArrowRight size={14} className="text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  );
};

export default SkillDetailPage;
