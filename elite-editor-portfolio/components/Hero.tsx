
import React, { useState, useRef } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Camera } from 'lucide-react';
import { Section } from '../types';

interface HeroProps {
  isAdmin: boolean;
  onNavigate: (section: Section) => void;
}

const Hero: React.FC<HeroProps> = ({ isAdmin, onNavigate }) => {
  const [avatar, setAvatar] = useState<string>("https://picsum.photos/seed/eddie/800/800");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center px-8 pt-20 md:pt-0">
      <div className="md:w-1/2 flex justify-center mb-12 md:mb-0">
        <div className="relative group">
          <div className="absolute -inset-1 bg-red-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-red-500/50">
            <img 
              src={avatar} 
              alt="Eddie Phạm - Founder Trộn Media" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {isAdmin && (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="w-10 h-10 text-white mb-2" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">Thay ảnh đại diện</span>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleAvatarChange} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="md:w-1/2 max-w-xl">
        <h2 className="text-xl md:text-2xl font-light text-gray-300 mb-4 leading-tight">
          Chào bạn, tôi là <span className="text-red-500 font-bold">Eddie Phạm</span>
          <br />
          <span className="text-lg opacity-60 italic">Founder của Trộn Media.</span>
        </h2>
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          AI VISUALS & <span className="text-red-500">MOTION EDITOR</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed italic border-l-4 border-red-500 pl-6">
          "Tôi biến những ý tưởng thô thành trải nghiệm thị giác hiện đại. Bằng việc kết hợp nhịp điệu phim ảnh và kỹ xảo AI, tôi không chỉ đơn thuần là người cắt ghép, tôi tối ưu từng khung hình để nội dung của bạn giữ chân người xem đến giây cuối cùng."
        </p>
        
        <div className="flex space-x-4 mb-10">
          {SOCIAL_LINKS.map((link, idx) => (
            <div key={idx} className="relative group/link">
              <div 
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-gray-500 cursor-not-allowed transition-all"
                title="Sắp ra mắt"
              >
                {link.icon}
              </div>
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-[10px] py-1 px-2 rounded opacity-0 group-hover/link:opacity-100 transition-opacity whitespace-nowrap">
                Coming Soon
              </span>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => onNavigate(Section.Contact)}
          className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-all shadow-lg shadow-red-500/20"
        >
          Bắt đầu dự án
        </button>
      </div>
    </section>
  );
};

export default Hero;
