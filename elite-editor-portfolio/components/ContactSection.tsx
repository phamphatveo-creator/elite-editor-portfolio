
import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, CheckCircle2, Edit3, Check, X } from 'lucide-react';

interface ContactSectionProps {
  isAdmin: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ isAdmin }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  
  const [contactInfo, setContactInfo] = useState({
    email: 'contact@tronmedia.vn',
    phone: '+84 987 654 321',
    address: 'TP. Hồ Chí Minh, Việt Nam'
  });

  const [tempInfo, setTempInfo] = useState({ ...contactInfo });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Giả lập gửi mail sau 2 giây
    setTimeout(() => {
      setStatus('success');
      // Reset sau 5 giây để khách khác có thể gửi
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };

  const handleSaveInfo = () => {
    setContactInfo({ ...tempInfo });
    setIsEditingInfo(false);
  };

  const handleCancelInfo = () => {
    setTempInfo({ ...contactInfo });
    setIsEditingInfo(false);
  };

  return (
    <section id="contact" className="py-24 px-8 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-red-500 font-bold uppercase tracking-[0.2em] text-sm mb-4">Kết nối</h4>
          <h2 className="text-4xl md:text-6xl font-black">Cùng nhau <span className="text-neutral-700">Kiến tạo</span></h2>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 space-y-8 relative">
            {isAdmin && !isEditingInfo && (
              <button 
                onClick={() => setIsEditingInfo(true)}
                className="absolute -top-10 right-0 flex items-center space-x-2 text-xs font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest"
              >
                <Edit3 className="w-4 h-4" />
                <span>Sửa thông tin</span>
              </button>
            )}

            {isEditingInfo ? (
              <div className="space-y-6 bg-neutral-900/50 p-6 rounded-2xl border border-red-500/30">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Email</label>
                  <input 
                    type="text" 
                    value={tempInfo.email}
                    onChange={(e) => setTempInfo({...tempInfo, email: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-red-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Điện thoại</label>
                  <input 
                    type="text" 
                    value={tempInfo.phone}
                    onChange={(e) => setTempInfo({...tempInfo, phone: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-red-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Địa chỉ</label>
                  <input 
                    type="text" 
                    value={tempInfo.address}
                    onChange={(e) => setTempInfo({...tempInfo, address: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-red-500 outline-none"
                  />
                </div>
                <div className="flex space-x-2 pt-2">
                  <button 
                    onClick={handleSaveInfo}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 rounded flex items-center justify-center space-x-1"
                  >
                    <Check className="w-3 h-3" /> <span>Lưu</span>
                  </button>
                  <button 
                    onClick={handleCancelInfo}
                    className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white text-xs font-bold py-2 rounded flex items-center justify-center space-x-1"
                  >
                    <X className="w-3 h-3" /> <span>Hủy</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start space-x-4">
                  <div className="p-4 bg-neutral-900 rounded-xl">
                    <Mail className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email</h4>
                    <p className="text-gray-400">{contactInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-4 bg-neutral-900 rounded-xl">
                    <Phone className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Điện thoại</h4>
                    <p className="text-gray-400">{contactInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-4 bg-neutral-900 rounded-xl">
                    <MapPin className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Địa chỉ</h4>
                    <p className="text-gray-400">{contactInfo.address}</p>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="lg:w-2/3">
            {status === 'success' ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-neutral-900 rounded-2xl border border-red-500/20 p-12 text-center">
                <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                <h3 className="text-3xl font-bold mb-4">Gửi thành công!</h3>
                <p className="text-gray-400 text-lg">Cảm ơn bạn đã quan tâm. Eddie sẽ xem thông tin và liên hệ lại với bạn qua email sớm nhất có thể.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    required
                    type="text" 
                    placeholder="Họ và tên" 
                    className="w-full bg-neutral-900 border border-white/5 rounded-xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors"
                  />
                  <input 
                    required
                    type="email" 
                    placeholder="Địa chỉ Email" 
                    className="w-full bg-neutral-900 border border-white/5 rounded-xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                <input 
                  required
                  type="text" 
                  placeholder="Chủ đề (VD: Dựng video TikTok/YouTube...)" 
                  className="w-full bg-neutral-900 border border-white/5 rounded-xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors"
                />
                <textarea 
                  required
                  rows={5} 
                  placeholder="Mô tả ngắn gọn yêu cầu hoặc dự án của bạn..." 
                  className="w-full bg-neutral-900 border border-white/5 rounded-xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors resize-none"
                ></textarea>
                <button 
                  disabled={status === 'submitting'}
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  <span>{status === 'submitting' ? 'Đang gửi...' : 'Gửi Yêu Cầu Cho Eddie'}</span>
                </button>
                <p className="text-[10px] text-neutral-600 text-center uppercase tracking-widest">Thông tin sẽ được gửi trực tiếp đến hệ thống của Eddie Phạm</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
