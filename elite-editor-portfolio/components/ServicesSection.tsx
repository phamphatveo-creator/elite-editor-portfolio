
import React from 'react';
import { SERVICES } from '../constants';

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 px-8 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h4 className="text-red-500 font-bold uppercase tracking-[0.2em] text-sm mb-4">Dịch vụ của tôi</h4>
          <h2 className="text-4xl md:text-6xl font-black">Khả năng <span className="text-neutral-700">Chuyên nghiệp</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, idx) => (
            <div 
              key={idx} 
              className="p-8 bg-neutral-900 rounded-2xl border border-white/5 hover:border-red-500/20 transition-all group hover:-translate-y-2"
            >
              <div className="mb-6 p-4 inline-block bg-neutral-800 rounded-xl group-hover:bg-red-500/10 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
