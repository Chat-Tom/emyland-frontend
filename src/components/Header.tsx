import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Share2 } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { PropertyListingModal } from "./PropertyListingModal";
import { ShareModal } from "./ShareModal";
import { isDeviceRemembered, generateDeviceFingerprint } from "@/utils/deviceFingerprint";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  user: any;
  onLogout: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const { toast } = useToast();

  // Sync user state with props and localStorage
  useEffect(() => {
    const syncUserState = () => {
      const token = localStorage.getItem("auth_token");
      const userData = localStorage.getItem("user");
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setCurrentUser(parsedUser);
        } catch (error) {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    syncUserState();
    
    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_token" || e.key === "user") {
        syncUserState();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [user]);

  // Update current user when prop changes
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const checkDeviceSession = async () => {
    if (isDeviceRemembered()) {
      try {
        const deviceFingerprint = generateDeviceFingerprint();
        const response = await apiRequest("POST", "/api/auth/check-device", {
          deviceFingerprint
        });
        const result = await response.json();
        
        if (result.isValid && result.token) {
          // Thiết bị đã được nhớ, tự động đăng nhập
          localStorage.setItem("auth_token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
          
          toast({
            title: "Đăng nhập tự động",
            description: "Thiết bị đã được nhớ. Chuyển đến trang đăng tin...",
          });
          
          // Chuyển đến PropertyListingModal
          setTimeout(() => {
            setIsListingModalOpen(true);
          }, 1000);
          
          return true;
        }
      } catch (error) {
        console.error("Device session check failed:", error);
      }
    }
    return false;
  };

  const handleListingClick = async () => {
    console.log("🎯 Đăng tin clicked. User status:", !!currentUser);
    console.log("👤 User data:", currentUser);
    
    if (currentUser) {
      console.log("✅ User logged in, opening listing modal");
      setIsListingModalOpen(true);
    } else {
      console.log("🔐 User not logged in, checking device session...");
      // Kiểm tra thiết bị đã nhớ
      const autoLoginSuccess = await checkDeviceSession();
      if (!autoLoginSuccess) {
        console.log("❌ Auto login failed, opening auth modal");
        setIsAuthModalOpen(true);
      }
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthModalOpen(false);
    setTimeout(() => {
      setIsListingModalOpen(true);
    }, 500);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">emyland.vn</span>
                <span className="text-xs text-orange-500 font-medium -mt-1 flex items-center gap-1">
                  <span className="star-spin text-xs">⭐</span>
                  Cổng thông tin nhà đất chính chủ
                  <span className="star-spin text-xs">⭐</span>
                </span>
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className={`text-gray-700 hover:text-primary transition-colors font-medium ${location === '/' ? 'text-primary' : ''}`}>
                Trang chủ
              </Link>
              <Link href="/properties?type=sale" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                Nhà đất bán
              </Link>
              <Link href="/properties?type=rent" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                Nhà đất cho thuê
              </Link>
              <Link href="/planning">
                <Button className="bg-blue-500 text-white hover:bg-blue-600 button-hover-animation">
                  Tra cứu quy hoạch
                </Button>
              </Link>
              <Button 
                onClick={() => {
                  const event = new CustomEvent('openValuationModal');
                  window.dispatchEvent(event);
                }}
                className="bg-orange-500 text-white hover:bg-orange-600 button-hover-animation"
              >
                🏢 Thẩm định giá - Chứng thư
              </Button>
            </nav>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button onClick={handleListingClick} className="bg-orange-500 text-white hover:bg-orange-600 button-hover-animation">
                Đăng tin miễn phí
              </Button>
              
              {/* Hidden logout button - keep logged in state clean */}
              
              <Button variant="ghost" size="icon" className="md:hidden text-gray-700 hover:text-primary" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t">
              <nav className="flex flex-col space-y-2 pt-4">
                <Link href="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Trang chủ
                </Link>
                <Link href="/properties?type=sale" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                  Nhà đất bán
                </Link>
                <Link href="/properties?type=rent" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                  Nhà đất cho thuê
                </Link>
                <Link href="/planning" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Tra cứu quy hoạch
                </Link>
                <button 
                  onClick={() => {
                    const event = new CustomEvent('openValuationModal');
                    window.dispatchEvent(event);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-orange-500 hover:text-orange-600 transition-colors font-medium text-left"
                >
                  🏢 Thẩm định giá - Chứng thư
                </button>
                <button 
                  onClick={() => {
                    setIsShareModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-orange-500 hover:text-orange-600 transition-colors font-medium text-left flex items-center"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  📱 Chia sẻ với bạn bè
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      
      <PropertyListingModal 
        isOpen={isListingModalOpen} 
        onClose={() => setIsListingModalOpen(false)}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </>
  );
}
