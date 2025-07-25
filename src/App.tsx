function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            emyland.vn
          </h1>
          <p className="text-white/90 text-lg">
            Cổng thông tin nhà đất chính chủ
          </p>
        </header>
        
        <main className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎉 Website đã được deploy thành công!
            </h2>
            <p className="text-gray-600 mb-6">
              Chào mừng bạn đến với nền tảng bất động sản hàng đầu Việt Nam
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">
                  Nhà đất bán
                </h3>
                <p className="text-orange-600 text-sm">
                  Tìm kiếm và mua bán nhà đất trực tiếp từ chủ sở hữu
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Nhà đất cho thuê
                </h3>
                <p className="text-blue-600 text-sm">
                  Cho thuê và tìm thuê bất động sản uy tín, chính chủ
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 font-medium">
                📞 Hotline: 0903496118
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;