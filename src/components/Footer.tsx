import { Home, Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="text-primary text-2xl" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">emyland.vn</span>
                <span className="text-sm text-accent font-medium -mt-1 flex items-center gap-1">
                  <span className="star-spin text-xs">⭐</span>
                  Cổng thông tin nhà đất chính chủ
                  <span className="star-spin text-xs">⭐</span>
                </span>
              </div>
            </div>
            <p className="text-white mb-4 text-left">
              Nền tảng bất động sản chính chủ hàng đầu Việt Nam
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Dịch vụ</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Nhà đất bán</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nhà đất cho thuê</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tra cứu quy hoạch</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Đăng tin</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Hỗ trợ</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Điều khoản</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liên hệ</h3>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                0903496118
              </p>
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                support@emyland.vn
              </p>
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                TP. Hồ Chí Minh
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-white">
          <div className="mb-4">
            <p className="bounce-text text-accent font-bold text-lg flex items-center justify-center gap-2">
              <span className="star-spin">⭐</span>
              Cổng thông tin nhà đất chính chủ
              <span className="star-spin">⭐</span>
            </p>
          </div>
          <p>&copy; 2024 emyland.vn. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
