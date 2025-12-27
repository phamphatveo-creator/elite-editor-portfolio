
import React from 'react';
import { SKILLS } from '../constants';

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-8 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="md:w-1/2">
          <h4 className="text-red-500 font-bold uppercase tracking-[0.2em] text-sm mb-4">Nền tảng kỹ thuật</h4>
          <h2 className="text-4xl md:text-6xl font-black mb-8">Phần mềm <span className="text-neutral-700">& Làm chủ</span></h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Tận dụng các công cụ tiêu chuẩn ngành để mang lại sản phẩm video chất lượng cao nhất. Quy trình làm việc của tôi được tối ưu hóa cho hiệu quả và chất lượng, đảm bảo mỗi khung hình đều đạt đến sự hoàn hảo.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="px-6 py-2 bg-neutral-900 border border-white/5 rounded-full text-sm font-bold">Render 4K</span>
            <span className="px-6 py-2 bg-neutral-900 border border-white/5 rounded-full text-sm font-bold">Quy trình RAW</span>
            <span className="px-6 py-2 bg-neutral-900 border border-white/5 rounded-full text-sm font-bold">Màu sắc HDR</span>
          </div>
        </div>
        
        <div className="md:w-1/2 space-y-6">
          {SKILLS.map((skill, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold tracking-wide">{skill.name}</span>
                <span className="text-red-500 text-xs font-black">{skill.level}%</span>
              </div>
              <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
