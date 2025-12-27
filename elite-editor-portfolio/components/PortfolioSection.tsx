
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Plus, X, Link as LinkIcon, AlertCircle, Image as ImageIcon, ExternalLink, Play, Loader2, Info, MonitorPlay, Tv, Database, Copy, Check } from 'lucide-react';
import VideoCard from './VideoCard';
import { VideoProject } from '../types';
import { generateVideoCaption } from '../services/gemini';

// ĐÂY LÀ DANH SÁCH DỰ ÁN VĨNH VIỄN CỦA ANH EDDIE - ĐÃ CẬP NHẬT 3 DỰ ÁN
const INITIAL_PROJECTS: VideoProject[] = [
  {
    "id": "k6dak3q9y",
    "title": "Dự án mới của Eddie",
    "description": "Dự án này vừa được anh Eddie thêm vào. Đừng quên Export để lưu vĩnh viễn!",
    "url": "https://vimeo.com/1149702867?fl=ip&fe=ec",
    "category": "Vimeo HQ",
    "date": "2025-12-27"
  },
  {
    "id": "brr4paxyx",
    "title": "Dự án Eddie",
    "description": "Sản phẩm video chất lượng cao với kỹ thuật dựng phim hiện đại, tối ưu hình ảnh và âm thanh bởi Trộn Media.",
    "url": "https://vimeo.com/1149536889?fl=ip&fe=ec",
    "category": "Vimeo HQ",
    "date": "2025-12-26"
  },
  {
    "id": "1",
    "title": "Phim Ngắn Cyberpunk",
    "description": "Khám phá ánh sáng neon tương lai với kỹ thuật Color Grading đỉnh cao.",
    "url": "https://vimeo.com/1149536889?fl=ip&fe=ec",
    "category": "Commercial",
    "date": "2024-01-15",
    "thumbnail": "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800"
  }
];

const getEmbedUrl = (url: string): { url: string; type: 'video' | 'drive' | 'youtube' | 'vimeo'; original: string } => {
  if (url.startsWith('blob:') || url.endsWith('.mp4') || url.endsWith('.mov')) {
    return { url, type: 'video', original: url };
  }

  if (url.includes('vimeo.com')) {
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/|manage\/videos\/)?(\d+)(?:\/([a-z0-9]+))?/i);
    if (vimeoMatch && vimeoMatch[1]) {
      const videoId = vimeoMatch[1];
      const hash = vimeoMatch[2];
      let embedPath = `https://player.vimeo.com/video/${videoId}?autoplay=1&dnt=1`;
      if (hash) embedPath += `&h=${hash}`;
      return { url: embedPath, type: 'vimeo', original: url };
    }
  }

  if (url.includes('drive.google.com')) {
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return { url: `https://drive.google.com/file/d/${fileIdMatch[1]}/preview?authuser=0`, type: 'drive', original: url };
    }
  }

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w-]{11})/);
    if (videoIdMatch && videoIdMatch[1]) {
      return { url: `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1&rel=0`, type: 'youtube', original: url };
    }
  }

  return { url, type: 'video', original: url };
};

interface PortfolioSectionProps {
  isAdmin: boolean;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ isAdmin }) => {
  const [projects, setProjects] = useState<VideoProject[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_projects_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.length > 0 ? parsed : INITIAL_PROJECTS;
      }
    } catch (e) {
      console.error("Lỗi load dữ liệu:", e);
    }
    return INITIAL_PROJECTS;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [videoLink, setVideoLink] = useState('');
  const [tempThumbnail, setTempThumbnail] = useState<string | undefined>();
  const [enhancingId, setEnhancingId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [isPlayerActive, setIsPlayerActive] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('portfolio_projects_v2', JSON.stringify(projects));
  }, [projects]);

  const handleExportData = () => {
    const dataStr = JSON.stringify(projects, null, 2);
    navigator.clipboard.writeText(dataStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnhance = async (id: string) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    setEnhancingId(id);
    try {
      const newCaption = await generateVideoCaption(project.title, project.category);
      if (newCaption) {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, description: newCaption } : p));
      }
    } finally {
      setEnhancingId(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newProject: VideoProject = {
        id: Math.random().toString(36).substr(2, 9),
        title: file.name.replace(/\.[^/.]+$/, ""),
        description: 'Tải trực tiếp từ máy (Gửi mã Export cho dev để lưu vĩnh viễn).',
        url: url,
        category: 'Local File',
        date: new Date().toISOString().split('T')[0]
      };
      setProjects([newProject, ...projects]);
      setShowAddModal(false);
    }
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoLink) return;
    
    let cat = 'Motion Design';
    if (videoLink.includes('vimeo')) cat = 'Vimeo HQ';
    if (videoLink.includes('drive')) cat = 'Google Drive';

    const newProject: VideoProject = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Dự án mới của Eddie',
      description: 'Dự án này vừa được anh Eddie thêm vào. Đừng quên Export để lưu vĩnh viễn!',
      url: videoLink,
      thumbnail: tempThumbnail,
      category: cat,
      date: new Date().toISOString().split('T')[0]
    };
    setProjects([newProject, ...projects]);
    setVideoLink('');
    setTempThumbnail(undefined);
    setShowAddModal(false);
  };

  const embedData = selectedVideo ? getEmbedUrl(selectedVideo.url) : null;

  return (
    <section id="portfolio" className="py-24 px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h4 className="text-red-500 font-bold uppercase tracking-[0.2em] text-sm mb-4">SHOWREEL & DỰ ÁN</h4>
            <h2 className="text-4xl md:text-6xl font-black">Video <span className="text-neutral-700">Chất Lượng Cao</span></h2>
          </div>
          
          {isAdmin && (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowExportModal(true)} 
                className="flex items-center space-x-2 px-6 py-4 bg-neutral-900 text-white font-black rounded-full hover:bg-neutral-800 transition-all border border-white/10"
              >
                <Database className="w-5 h-5 text-red-500" />
                <span>XUẤT DỮ LIỆU</span>
              </button>
              <button 
                onClick={() => setShowAddModal(true)} 
                className="flex items-center space-x-2 px-8 py-4 bg-red-500 text-white font-black rounded-full hover:bg-red-600 transition-all shadow-xl shadow-red-500/20"
              >
                <Plus className="w-5 h-5" />
                <span>THÊM CLIP</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <VideoCard 
              key={project.id} 
              project={project} 
              isAdmin={isAdmin}
              onDelete={(id) => setProjects(projects.filter(p => p.id !== id))}
              onUpdate={(id, data) => setProjects(projects.map(p => p.id === id ? { ...p, ...data } : p))}
              onEnhance={handleEnhance}
              isEnhancing={enhancingId === project.id}
              onOpenVideo={(p) => {
                setSelectedVideo(p);
                setIsPlayerActive(false);
                setIsVideoLoading(false);
              }}
            />
          ))}
        </div>
      </div>

      {/* Modal Xuất Dữ Liệu */}
      {showExportModal && (
        <div className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6">
          <div className="bg-neutral-900 border border-white/10 w-full max-w-2xl rounded-[3rem] p-10 animate-in zoom-in-95 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Sao lưu dự án</h3>
              <button onClick={() => setShowExportModal(false)} className="p-2 hover:bg-red-500/10 rounded-full text-neutral-500"><X className="w-8 h-8" /></button>
            </div>
            
            <div className="space-y-6">
               <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-3xl">
                  <h4 className="text-blue-500 font-black uppercase text-xs mb-2">Thông tin cho anh Eddie:</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Mã bên dưới chứa toàn bộ danh sách video anh đã thêm. Để lưu vĩnh viễn cho khách xem, anh chỉ cần copy và gửi cho em là xong!
                  </p>
               </div>

               <div className="relative">
                  <pre className="w-full h-48 bg-black border border-white/5 rounded-2xl p-4 text-[10px] text-neutral-500 overflow-auto font-mono">
                    {JSON.stringify(projects, null, 2)}
                  </pre>
                  <button 
                    onClick={handleExportData}
                    className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-[10px] font-black rounded-lg hover:bg-red-600 transition-all"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'ĐÃ COPY' : 'COPY MÃ NÀY'}
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Thêm Dự Án */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="bg-neutral-900 border border-white/10 w-full max-w-xl rounded-[2.5rem] p-10 animate-in zoom-in-95 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Cấu hình dự án</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-red-500/10 rounded-full text-neutral-500 hover:text-red-500 transition-colors"><X className="w-8 h-8" /></button>
            </div>
            
            <div className="space-y-6">
              <form onSubmit={handleLinkSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-black">Link Video</label>
                  <input 
                    type="url" 
                    placeholder="Dán link vimeo.com/... vào đây" 
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-sm focus:border-red-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-black">Ảnh bìa Thumbnail</label>
                  <div 
                    onClick={() => thumbInputRef.current?.click()}
                    className="w-full h-32 bg-black border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition-all overflow-hidden"
                  >
                    {tempThumbnail ? (
                      <img src={tempThumbnail} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-10 h-10 text-neutral-800" />
                    )}
                  </div>
                  <input type="file" ref={thumbInputRef} onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setTempThumbnail(URL.createObjectURL(file));
                  }} accept="image/*" className="hidden" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button type="submit" className="bg-red-500 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-[10px] shadow-lg shadow-red-500/20">Lưu sản phẩm</button>
                   <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-neutral-800 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-[10px]">Tải file máy</button>
                   <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="video/*" className="hidden" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Cinematic Vimeo/HQ Lightbox */}
      {selectedVideo && embedData && (
        <div className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center p-4 md:p-8">
          <button onClick={() => setSelectedVideo(null)} className="fixed top-8 right-8 p-4 bg-white/10 hover:bg-red-500 rounded-full transition-all text-white z-[310]">
            <X className="w-8 h-8" />
          </button>
          
          <div className="w-full max-w-6xl relative z-[305] animate-in fade-in zoom-in duration-500">
            <div className="w-full aspect-video bg-neutral-900 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(239,68,68,0.1)] border border-white/5 relative">
              
              {!isPlayerActive ? (
                <div className="absolute inset-0 z-30 flex items-center justify-center cursor-pointer group" onClick={() => {
                  setIsPlayerActive(true);
                  setIsVideoLoading(true);
                }}>
                  {selectedVideo.thumbnail && (
                    <img src={selectedVideo.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110" />
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                  <div className="relative flex flex-col items-center">
                    <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                      <Play className="w-10 h-10 text-white fill-current ml-1" />
                    </div>
                    <h3 className="mt-8 text-2xl font-black uppercase tracking-[0.4em] text-white">XEM CHẤT LƯỢNG CAO</h3>
                  </div>
                </div>
              ) : (
                <>
                  {isVideoLoading && (
                    <div className="absolute inset-0 z-20 bg-neutral-950 flex flex-col items-center justify-center">
                      <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
                      <span className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 italic">Đang tải luồng dữ liệu HD...</span>
                    </div>
                  )}
                  
                  {embedData.type === 'video' ? (
                    <video src={selectedVideo.url} controls autoPlay className="w-full h-full" onLoadedData={() => setIsVideoLoading(false)} />
                  ) : (
                    <iframe 
                      src={embedData.url} 
                      className="w-full h-full border-0" 
                      allow="autoplay; fullscreen; picture-in-picture"
                      onLoad={() => setIsVideoLoading(false)}
                      title="Vimeo Player"
                    ></iframe>
                  )}
                </>
              )}
            </div>

            <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-12">
               <div className="max-w-3xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-1.5 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-lg">
                      {selectedVideo.category}
                    </span>
                    <span className="text-neutral-600 text-[10px] font-black uppercase tracking-widest">
                      Host: {embedData.type.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-none">{selectedVideo.title}</h3>
                  <p className="text-neutral-400 text-xl font-light leading-relaxed italic max-w-2xl">"{selectedVideo.description}"</p>
               </div>

               <div className="flex flex-col gap-4 w-full md:w-80">
                  <a 
                    href={embedData.original} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-red-500 hover:text-white transition-all shadow-2xl"
                  >
                    <ExternalLink className="w-4 h-4" /> Mở Trang Gốc
                  </a>
                  <button 
                    onClick={() => setSelectedVideo(null)}
                    className="px-10 py-5 border border-white/10 text-neutral-500 hover:text-white font-black text-xs uppercase tracking-widest rounded-3xl transition-all"
                  >
                    Đóng Gallery
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
