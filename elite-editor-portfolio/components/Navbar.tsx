
import React from 'react';
import { Section } from '../types';
import { Lock, Unlock } from 'lucide-react';

interface NavbarProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, isAdmin, onToggleAdmin }) => {
  const navItems = [
    { label: 'Trang chủ', value: Section.Home },
    { label: 'Dịch vụ', value: Section.Services },
    { label: 'Kỹ năng', value: Section.Skills },
    { label: 'Sản phẩm', value: Section.Portfolio },
    { label: 'Liên hệ', value: Section.Contact },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-black text-red-500 tracking-tighter cursor-pointer" onClick={() => onNavigate(Section.Home)}>
          TRỘN <span className="text-white">MEDIA</span>
        </div>
        <button 
          onClick={onToggleAdmin}
          className={`p-2 rounded-full transition-all ${isAdmin ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-white/40'}`}
          title={isAdmin ? "Thoát chế độ Quản trị" : "Vào chế độ Quản trị"}
        >
          {isAdmin ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
        </button>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => onNavigate(item.value)}
            className={`text-sm font-medium transition-colors hover:text-red-500 ${
              activeSection === item.value ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <button 
        onClick={() => onNavigate(Section.Contact)}
        className="px-5 py-2 text-xs font-bold uppercase tracking-widest border border-white/20 hover:border-red-500 hover:text-red-500 transition-all rounded-full"
      >
        Hợp Tác Ngay
      </button>
    </nav>
  );
};

export default Navbar;
