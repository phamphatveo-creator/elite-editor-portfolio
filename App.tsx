
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import SkillsSection from './components/SkillsSection';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import { Section } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Home);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const handleNavigate = (section: Section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section);
    }
  };

  const toggleAdmin = () => {
    const newState = !isAdmin;
    setIsAdmin(newState);
    localStorage.setItem('isAdmin', String(newState));
    
    if (newState) {
      alert("Đã BẬT chế độ Quản trị viên. Anh có thể xóa clip mẫu và chỉnh sửa thông tin ngay bây giờ.");
    } else {
      alert("Đã TẮT chế độ Quản trị viên.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(Section);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
        isAdmin={isAdmin} 
        onToggleAdmin={toggleAdmin} 
      />
      
      <main>
        <Hero isAdmin={isAdmin} onNavigate={handleNavigate} />
        <ServicesSection />
        <SkillsSection />
        <PortfolioSection isAdmin={isAdmin} />
        <ContactSection isAdmin={isAdmin} />
      </main>

      <footer className="py-12 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-black text-red-500 tracking-tighter">
            TRỘN <span className="text-white">MEDIA</span>
          </div>
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} TRỘN MEDIA Studio. Mọi quyền được bảo lưu bởi Eddie Phạm.
          </p>
          <div className="flex space-x-6 text-neutral-400 text-xs uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-red-500 transition-colors">Bảo mật</a>
            <a href="#" className="hover:text-red-500 transition-colors">Điều khoản</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
