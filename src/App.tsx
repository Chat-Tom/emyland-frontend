import React from 'react';

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #2563eb 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '0.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            emyland.vn
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.9)',
            margin: 0
          }}>
            Cổng thông tin nhà đất chính chủ
          </p>
        </header>

        <main style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          padding: '3rem 2rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              🎉 Website đã được deploy thành công!
            </h2>
            <p style={{
              color: '#6b7280',
              marginBottom: '3rem',
              fontSize: '1.1rem'
            }}>
              Chào mừng bạn đến với nền tảng bất động sản hàng đầu Việt Nam
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginTop: '3rem'
            }}>
              <div style={{
                backgroundColor: '#fff7ed',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #fed7aa'
              }}>
                <h3 style={{
                  fontWeight: '600',
                  color: '#9a3412',
                  marginBottom: '1rem',
                  fontSize: '1.3rem'
                }}>
                  🏠 Nhà đất bán
                </h3>
                <p style={{
                  color: '#ea580c',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Tìm kiếm và mua bán nhà đất trực tiếp từ chủ sở hữu, không qua môi giới
                </p>
              </div>

              <div style={{
                backgroundColor: '#eff6ff',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #bfdbfe'
              }}>
                <h3 style={{
                  fontWeight: '600',
                  color: '#1e40af',
                  marginBottom: '1rem',
                  fontSize: '1.3rem'
                }}>
                  🏘️ Nhà đất cho thuê
                </h3>
                <p style={{
                  color: '#2563eb',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Cho thuê và tìm thuê bất động sản uy tín, chính chủ, giá cả hợp lý
                </p>
              </div>
            </div>

            <div style={{
              marginTop: '3rem',
              padding: '2rem',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{
                color: '#374151',
                fontSize: '1rem',
                margin: 0,
                fontWeight: '500'
              }}>
                📞 Hotline hỗ trợ: <strong>0903496118</strong>
              </p>
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                margin: '0.5rem 0 0 0'
              }}>
                Hỗ trợ 24/7 - Tư vấn miễn phí
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}