import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SubPageNav = ({ label, labelCn, backTo = '/', backLabel = 'Home' }) => (
  <nav className="fixed top-0 w-full z-50 bg-white/95 border-b border-gray-100 backdrop-blur-sm">
    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <Link
        to={backTo}
        className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors group"
      >
        <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
        {backLabel}
      </Link>
      <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900">TENG LONGYIN</span>
      <div className="text-right hidden sm:block">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-900 block">{label}</span>
        <span className="text-[10px] text-gray-400 tracking-wider">{labelCn}</span>
      </div>
    </div>
  </nav>
);

export default SubPageNav;
