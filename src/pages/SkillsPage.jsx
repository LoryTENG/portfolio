import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight, ExternalLink } from 'lucide-react';
import SubPageNav from '../components/SubPageNav';
import { detailedSkills } from '../data/portfolio';

const SkillsPage = () => (
  <div className="min-h-screen bg-white text-gray-900 font-sans">
    <SubPageNav label="Technical Skills" labelCn="专业技能" />

    {/* Hero */}
    <div
      className="relative pt-[64px] h-72 md:h-96 overflow-hidden"
      style={{ backgroundImage: "url('/images/banner_skills.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
        <p className="text-[10px] text-white/50 tracking-[0.35em] uppercase mb-4">01 — Technical Skills / 专业技能</p>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-[-0.03em] leading-none uppercase">
          TECH<br />SKILLS
        </h1>
      </div>
    </div>

    {/* Content */}
    <main className="max-w-6xl mx-auto px-6">
      <div className="divide-y divide-gray-100">
        {detailedSkills.map((group, idx) => (
          <div key={idx} className="group py-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 hover:bg-gray-50 -mx-6 px-6 transition-colors duration-300">
            {/* Left: number + category */}
            <div className="md:col-span-4">
              <span className="text-8xl font-black text-gray-100 leading-none block mb-6 select-none group-hover:text-gray-200 transition-colors duration-300">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2 mb-1">
                <group.icon size={15} className="text-gray-400 flex-shrink-0" />
                <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">{group.category}</h2>
              </div>
              <p className="text-xs text-gray-400 tracking-wider ml-[23px] mb-5">{group.categoryCn}</p>
              <Link
                to={`/skills/${group.slug}`}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors duration-200 group/btn"
              >
                Deep Dive
                <ExternalLink size={10} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>

            {/* Right: tags + description */}
            <div className="md:col-span-8">
              <div className="flex flex-wrap gap-2.5 mb-7">
                {group.skills.map(skill => (
                  <span
                    key={skill}
                    className="border border-gray-200 hover:border-gray-900 hover:text-gray-900 px-4 py-2 text-sm text-gray-600 transition-all duration-200 rounded-full cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-3 max-w-prose">{group.detail}</p>
              <p className="text-sm text-gray-400 leading-relaxed max-w-prose">{group.detailCn}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-gray-100 py-14 flex flex-wrap gap-4">
        <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-700 transition-colors">
          Download CV <Download size={13} />
        </button>
        <Link
          to="/experience"
          className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 text-xs font-bold tracking-widest uppercase hover:border-gray-900 hover:text-gray-900 transition-colors"
        >
          View Experience <ArrowRight size={13} />
        </Link>
      </div>
    </main>
  </div>
);

export default SkillsPage;
