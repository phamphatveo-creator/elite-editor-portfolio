
import React from 'react';
import { 
  Sparkles, 
  Activity, 
  Smartphone, 
  Volume2, 
  Instagram,
  Facebook,
  Youtube,
  Video
} from 'lucide-react';

export const COLORS = {
  primary: '#ef4444', // Red-500
  background: '#0a0a0a',
  surface: '#171717',
};

export const SERVICES = [
  {
    title: 'AI Visuals Integration',
    description: 'Sử dụng công nghệ Generative AI để tạo bối cảnh, nhân vật và các hiệu ứng biến hình đặc biệt mà quay phim truyền thống không thể thực hiện.',
    icon: <Sparkles className="w-8 h-8 text-red-500" />
  },
  {
    title: '2D Animation & Motion Graphics',
    description: 'Thiết kế chuyển động, xử lý Typography và các hiệu ứng đồ họa 2D giúp video sinh động và chuyên nghiệp hơn.',
    icon: <Activity className="w-8 h-8 text-red-500" />
  },
  {
    title: 'High-Impact Editing (TikTok/Reels)',
    description: 'Tối ưu hóa "3 giây đầu". Cắt cúp đúng nhịp (On-beat) và sắp xếp cấu trúc nội dung để tối đa hóa tỷ lệ giữ chân người xem.',
    icon: <Smartphone className="w-8 h-8 text-red-500" />
  },
  {
    title: 'Sound Design',
    description: 'Xử lý âm thanh chi tiết, từ hiệu ứng chuyển cảnh đến âm trường môi trường, đảm bảo trải nghiệm nghe - nhìn đồng bộ tuyệt đối.',
    icon: <Volume2 className="w-8 h-8 text-red-500" />
  }
];

export const SKILLS = [
  { name: 'CapCut Master', level: 100 },
  { name: 'Google Flow', level: 100 },
  { name: 'AI Generative Tools', level: 88 },
  { name: 'Sound Mixing', level: 85 },
  { name: 'Adobe Premiere Pro', level: 60 },
  { name: 'After Effects', level: 60 }
];

export const SOCIAL_LINKS = [
  { icon: <Facebook className="w-5 h-5" />, href: '#' },
  { icon: <Instagram className="w-5 h-5" />, href: '#' },
  { icon: <Youtube className="w-5 h-5" />, href: '#' },
  { icon: <Video className="w-5 h-5" />, href: '#' }
];
