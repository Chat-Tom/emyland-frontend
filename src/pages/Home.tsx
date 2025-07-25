import { SearchFilters } from "@/components/SearchFilters";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyDetailModal } from "@/components/PropertyDetailModal";
import { PropertyValuationModal } from "@/components/PropertyValuationModal";
import { ShareModal } from "@/components/ShareModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Search, MapPin, Calculator, Share2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isValuationModalOpen, setIsValuationModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Listen for custom event from header
  useEffect(() => {
    const handleOpenModal = () => {
      setIsValuationModalOpen(true);
    };
    window.addEventListener('openValuationModal', handleOpenModal);
    return () => window.removeEventListener('openValuationModal', handleOpenModal);
  }, []);

  const { data: featuredProperties, isLoading } = useQuery({
    queryKey: ["/api/properties", { limit: 6, page: 1 }],
    queryFn: async () => {
      const response = await fetch("/api/properties?limit=6&page=1");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
  });

  const handleSearch = (filters: any) => {
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value.toString());
      }
    });
    setLocation(`/properties?${searchParams.toString()}`);
  };

  const handleViewDetails = (id: string) => {
    const property = featuredProperties?.properties?.find((p: any) => p.id === id);
    if (property) {
      setSelectedProperty(property);
      setIsDetailModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-8 md:py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <p className="text-lg md:text-xl text-yellow-300 font-semibold mb-2 animate-pulse flex items-center justify-center gap-2">
              <span className="star-spin">⭐</span>
              Cổng thông tin nhà đất chính chủ
              <span className="star-spin">⭐</span>
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Tìm ngôi nhà mơ ước của bạn
          </h1>

          
          {/* Search and Share Buttons */}
          <div className="max-w-lg mx-auto space-y-4">
            <Button 
              onClick={() => setLocation("/properties")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full"
            >
              🔍 Tìm kiếm nhà đất thông minh
            </Button>
            
            <div className="flex justify-center">
              <Button 
                onClick={() => setIsShareModalOpen(true)}
                variant="outline"
                className="bg-white/90 hover:bg-white border-orange-300 text-orange-600 hover:text-orange-700 px-6 py-2 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Share2 className="w-4 h-4 mr-2" />
                📱 Chia sẻ với bạn bè
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-3 md:px-4">
          <div className="text-center mb-6">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full mb-3">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                🏆 Bất động sản nổi bật 🏆
              </h2>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 sm:p-3 mx-2 sm:max-w-md sm:mx-auto">
              <p className="text-orange-600 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1 text-center leading-tight">
                <span className="star-spin text-xs flex-shrink-0">⭐</span>
                <span className="flex-shrink-0">100% tin đăng từ chính chủ - Không qua trung gian - Chủ nhà uy tín</span>
                <span className="star-spin text-xs flex-shrink-0">⭐</span>
              </p>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {featuredProperties && featuredProperties.properties && featuredProperties.properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {featuredProperties.properties.map((property: any) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Không có bất động sản nổi bật</p>
                </div>
              )}
            </>
          )}
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setLocation("/properties")}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Xem tất cả bất động sản
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tại sao chọn emyland.vn?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm tìm kiếm bất động sản tốt nhất
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Chính chủ 100%</h3>
                <p className="text-gray-600">
                  Tất cả tin đăng đều từ chủ nhà, không qua trung gian, đảm bảo thông tin chính xác
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-secondary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-secondary w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Tìm kiếm thông minh</h3>
                <p className="text-gray-600">
                  Bộ lọc chi tiết giúp bạn tìm được bất động sản phù hợp với nhu cầu và ngân sách
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-accent bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-accent w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Tra cứu quy hoạch</h3>
                <p className="text-gray-600 mb-4">
                  Thông tin quy hoạch chi tiết giúp bạn đưa ra quyết định đầu tư thông minh
                </p>
                <Button
                  onClick={() => alert('Tính năng tra cứu quy hoạch đang được phát triển!')}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Tra cứu ngay
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 border-orange-200 bg-orange-50">
              <CardContent className="p-8">
                <div className="bg-orange-500 bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Calculator className="text-orange-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-orange-800">🏢 Thẩm định giá toàn quốc - Chứng thư</h3>
                <p className="text-gray-700 mb-3 font-medium">
                  Dịch vụ thẩm định giá chuyên nghiệp từ Công ty Đất Việt - Chứng thư được cấp phép
                </p>
                <div className="text-sm text-orange-700 font-semibold mb-4 space-y-1 bg-white p-3 rounded-lg border border-orange-300">
                  <p>📞 Hotline: 0903496118</p>
                  <p>📧 Email: giataisan.vn@gmail.com</p>
                </div>
                <Button
                  onClick={() => setIsValuationModalOpen(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 text-lg animate-bounce"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  📋 Yêu cầu định giá ngay
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedProperty(null);
        }}
      />

      {/* Property Valuation Modal */}
      <PropertyValuationModal
        isOpen={isValuationModalOpen}
        onClose={() => setIsValuationModalOpen(false)}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
