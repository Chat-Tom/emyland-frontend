import { useState, useEffect } from "react";
import { SearchFilters } from "@/components/SearchFilters";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

export default function Properties() {
  const [location, setLocation] = useLocation();
  const [filters, setFilters] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialFilters: any = {};
    
    urlParams.forEach((value, key) => {
      if (key === "page") {
        setCurrentPage(parseInt(value));
      } else {
        initialFilters[key] = value;
      }
    });
    
    setFilters(initialFilters);
  }, [location]);

  const { data: propertiesData, isLoading } = useQuery({
    queryKey: ["/api/properties", { ...filters, page: currentPage, limit: 12 }],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      Object.entries({ ...filters, page: currentPage, limit: 12 }).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, value.toString());
        }
      });
      
      const response = await fetch(`/api/properties?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    enabled: true, // Always enabled to show properties
  });

  const handleSearch = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
    
    const searchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value.toString());
      }
    });
    
    setLocation(`/properties?${searchParams.toString()}`);
  };

  const handleViewDetails = (id: string) => {
    setLocation(`/properties/${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value.toString());
      }
    });
    searchParams.append("page", page.toString());
    
    setLocation(`/properties?${searchParams.toString()}`);
  };

  const totalPages = Math.ceil(((propertiesData as any)?.total || 0) / 12);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <SearchFilters 
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {filters.type === "rent" ? "Nhà đất cho thuê" : "Nhà đất bán"}
          </h1>
          <div className="text-gray-600">
            {(propertiesData as any)?.total || 0} kết quả
          </div>
        </div>

        {/* Properties Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
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
        ) : (propertiesData as any)?.properties?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {((propertiesData as any)?.properties || []).map((property: any) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Trước
                </Button>
                
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? "bg-primary" : ""}
                      >
                        {page}
                      </Button>
                    );
                  }
                  return null;
                })}
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Sau
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              Không tìm thấy bất động sản phù hợp
            </div>
            <p className="text-gray-400">
              Hãy thử điều chỉnh bộ lọc tìm kiếm của bạn
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
