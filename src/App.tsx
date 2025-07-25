import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResetPasswordModal } from "@/components/ResetPasswordModal";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateDeviceFingerprint, isDeviceRemembered } from "@/utils/deviceFingerprint";
import { apiRequest } from "@/lib/queryClient";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

import ResetPassword from "@/pages/ResetPassword";
import PrivacyPage from "@/pages/PrivacyPage";

function App() {
  const [user, setUser] = useState<any>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  
  // Debug logging
  useEffect(() => {
    console.log("🔍 App state changed:", { 
      user: user ? `${user.name} (${user.phone})` : null, 
      isAuthChecked,
      hasToken: !!localStorage.getItem("auth_token"),
      hasUserData: !!localStorage.getItem("user")
    });
  }, [user, isAuthChecked]);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const { toast } = useToast();
  const [location] = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("auth_token");
      const userData = localStorage.getItem("user");
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          
          // Verify token is still valid
          fetch("/api/auth/me", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }).then(res => {
            if (!res.ok) {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("user");
              setUser(null);
            }
          }).catch(() => {
            // Network error, keep user logged in locally
          });
        } catch (error) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user");
        }
      }
      
      setIsAuthChecked(true);
    };

    checkAuthentication();

    // Listen for storage changes across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_token" || e.key === "user") {
        const token = localStorage.getItem("auth_token");
        const userData = localStorage.getItem("user");
        
        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
          } catch (error) {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also listen for focus events to recheck authentication
    const handleFocus = () => {
      checkAuthentication();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Check for reset password parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset-password') === 'true') {
      const token = urlParams.get('token') || '';
      if (token) {
        setResetToken(token);
        setShowResetPasswordModal(true);
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser(null);
    
    // Force trigger storage event for other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'auth_token',
      newValue: null,
      oldValue: localStorage.getItem('auth_token')
    }));
    
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại bạn!",
    });
  };

  // Add a custom refresh method
  const refreshUserState = () => {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user");
    
    console.log("🔄 Refreshing user state:", { 
      hasToken: !!token, 
      hasUserData: !!userData,
      tokenLength: token?.length || 0
    });
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("✅ Setting user:", parsedUser.name);
        setUser(parsedUser);
      } catch (error) {
        console.log("❌ JSON parse error:", error);
        setUser(null);
      }
    } else {
      console.log("🚫 No token or user data, clearing user");
      setUser(null);
    }
  };

  // Listen for custom events to refresh state
  useEffect(() => {
    const handleRefreshAuth = () => {
      console.log("🔄 RefreshAuth event triggered");
      refreshUserState();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("👁️ Page became visible, refreshing auth");
        refreshUserState();
      }
    };

    window.addEventListener('refreshAuth', handleRefreshAuth);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('refreshAuth', handleRefreshAuth);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header user={user} onLogout={handleLogout} />
          
          <main className="flex-1">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/properties" component={Properties} />
              <Route path="/properties/:id">
                {(params) => (
                  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-4">Chi tiết bất động sản</h2>
                      <p className="text-gray-600">
                        Đang phát triển trang chi tiết cho property ID: {params.id}
                      </p>
                    </div>
                  </div>
                )}
              </Route>
              <Route path="/dashboard" component={Dashboard} />

              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/privacy" component={PrivacyPage} />
              <Route path="/planning">
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Tra cứu quy hoạch</h2>
                    <p className="text-gray-600">
                      Tính năng này sẽ được phát triển sau
                    </p>
                  </div>
                </div>
              </Route>
              <Route component={NotFound} />
            </Switch>
          </main>
          
          <Footer />
        </div>
        
        {/* Reset Password Modal */}
        <ResetPasswordModal
          isOpen={showResetPasswordModal}
          onClose={() => setShowResetPasswordModal(false)}
          token={resetToken}
        />
        
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
