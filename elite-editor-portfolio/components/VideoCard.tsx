
import React, { useState } from 'react';
import { Play, Trash2, Wand2, Edit3, Check, X, Volume2, Video } from 'lucide-react';
import { VideoProject } from '../types';

interface VideoCardProps {
  project: VideoProject;
  isAdmin: boolean;
  onDelete?: (id: string) => void;
  onEnhance?: (id: string) => void;
  onUpdate?: (id: string, updatedData: Partial<VideoProject>) => void;
  onOpenVideo: (project: VideoProject) => void;
  isEnhancing?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  project, 
  isAdmin, 
  onDelete, 
  onEnhance, 
  onUpdate, 
  onOpenVideo,
  isEnhancing 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [editData, setEditData] = useState({
    title: project.title,
    category: project.category,
    description: project.description
  });

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(project.id, editData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: project.title,
      category: project.category,
      description: project.description
    });
    setIsEditing(false);
  };

  // Kiểm tra xem có thể dùng preview video trực tiếp không
  const isDirectVideo = !project.url.includes('drive.google.com') && !project.url.includes('youtube.com');

  return (
    <div 
      className={`group relative bg-neutral-900 rounded-2xl overflow-hidden border transition-all flex flex-col h-full ${isAdmin ? 'border-red-500/30' : 'border-white/5 hover:border-red-500/30'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cụm nút Quản trị góc trên bên phải */}
      {isAdmin && !isEditing && (
        <div className="absolute top-2 right-2 z-[40] flex space-x-2">
          {!showDeleteConfirm ? (
            <button 
              onClick={(e) => { 
                e.preventDefault();
                e.stopPropagation(); 
                setShowDeleteConfirm(true); 
              }}
              className="p-3 bg-red-600 shadow-2xl rounded-xl hover:bg-red-700 transition-all text-white flex items-center justify-center border border-white/20"
              title="Xóa clip này"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center space-x-1 animate-in slide-in-from-right-2 duration-200">
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  onDelete?.(project.id); 
                }}
                className="p-3 bg-green-600 shadow-2xl rounded-xl hover:bg-green-700 text-white flex items-center justify-center border border-white/20"
                title="Xác nhận xóa"
              >
                <Check className="w-5 h-5" />
              </button>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setShowDeleteConfirm(false); 
                }}
                className="p-3 bg-neutral-700 shadow-2xl rounded-xl hover:bg-neutral-600 text-white flex items-center justify-center border border-white/20"
                title="Hủy xóa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Admin Indicator */}
      {isAdmin && !isEditing && (
        <div className="absolute top-2 left-2 z-[30]">
           <div className="bg-black/80 backdrop-blur-md text-red-500 text-[9px] font-black px-2 py-1 rounded-md border border-red-500/50 uppercase tracking-tighter">
             {showDeleteConfirm ? 'XÁC NHẬN XÓA?' : 'Editor Mode'}
           </div>
        </div>
      )}

      {/* Video Preview Area */}
      <div 
        className="aspect-video relative overflow-hidden bg-black cursor-pointer" 
        onClick={(e) => {
          if (!isEditing && !showDeleteConfirm) onOpenVideo(project);
        }}
      >
        {isHovered && isDirectVideo ? (
          <video 
            src={project.url} 
            className="w-full h-full object-cover" 
            autoPlay 
            muted 
            loop
          />
        ) : project.thumbnail ? (
          <img 
            src={project.thumbnail} 
            className="w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110" 
            alt={project.title} 
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-800 transition-colors group-hover:bg-neutral-700">
             <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <Video className="w-8 h-8 text-red-500" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">{project.category}</span>
          </div>
        )}
        
        {/* Hover Controls */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center space-x-3 ${isHovered && !isEditing && !showDeleteConfirm ? 'opacity-100' : 'opacity-0'}`}>
           <div className="flex flex-col items-center scale-90 group-hover:scale-100 transition-transform duration-300">
              <div className="p-4 bg-red-500 rounded-full mb-3 shadow-xl">
                <Play className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Bấm để Xem Phim</span>
           </div>
        </div>

        {/* Edit & Enhance Buttons */}
        {isAdmin && !isEditing && !showDeleteConfirm && (
          <div className="absolute bottom-3 right-3 flex space-x-2 z-20">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
              className="p-2 bg-blue-500/80 backdrop-blur-md rounded-lg hover:bg-blue-600 transition-all text-white"
              title="Sửa chữ"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onEnhance?.(project.id); }}
              disabled={isEnhancing}
              className="p-2 bg-purple-500/80 backdrop-blur-md rounded-lg hover:bg-purple-600 transition-all text-white disabled:opacity-50"
              title="AI mô tả"
            >
              <Wand2 className={`w-4 h-4 ${isEnhancing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex-grow flex flex-col bg-gradient-to-b from-neutral-900 to-black">
        {isEditing ? (
          <div className="space-y-3">
            <input 
              type="text" 
              value={editData.title}
              onChange={(e) => setEditData({...editData, title: e.target.value})}
              className="w-full bg-neutral-800 border border-white/20 rounded px-3 py-2 text-white text-base font-bold focus:border-red-500 outline-none"
              placeholder="Tên sản phẩm"
            />
            <input 
              type="text" 
              value={editData.category}
              onChange={(e) => setEditData({...editData, category: e.target.value})}
              className="w-full bg-neutral-800 border border-white/20 rounded px-3 py-2 text-[10px] uppercase tracking-widest text-red-500 focus:border-red-500 outline-none"
              placeholder="Tag"
            />
            <textarea 
              value={editData.description}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              className="w-full bg-neutral-800 border border-white/20 rounded px-3 py-2 text-xs text-gray-300 focus:border-red-500 outline-none resize-none h-20"
              placeholder="Mô tả..."
            />
            <div className="flex space-x-2">
              <button onClick={handleSave} className="flex-1 bg-green-600 text-white text-[10px] font-bold py-2 rounded">LƯU</button>
              <button onClick={handleCancel} className="flex-1 bg-neutral-700 text-white text-[10px] font-bold py-2 rounded">HỦY</button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-base font-black group-hover:text-red-500 transition-colors truncate pr-2 tracking-tight">
                {project.title}
              </h3>
            </div>
            <p className="text-neutral-500 text-[11px] line-clamp-2 leading-relaxed font-medium mb-4">
              {project.description}
            </p>
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
               <span className="text-[9px] font-black text-red-500/60 uppercase tracking-widest">{project.category}</span>
               <div className="flex items-center text-[9px] text-neutral-700 font-bold uppercase tracking-tighter">
                  <Volume2 className="w-3 h-3 mr-1" /> Audio On
               </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
