import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import { fetchProducts, fetchProductDetail } from './api';

// PUBLIC_INTERFACE
function App() {
  /** Main application component for Beauty Product Catalogue.
   * Features:
   * - Top navbar with search
   * - Responsive grid of product cards
   * - Modal for product details
   * - Loading and error handling
   */
  const [theme, setTheme] = useState('light');
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(count / pageSize)),
    [count]
  );

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchProducts({ search: query, page, page_size: pageSize });
      setProducts(Array.isArray(data.results) ? data.results : data);
      setCount(typeof data.count === 'number' ? data.count : (Array.isArray(data) ? data.length : 0));
    } catch (e) {
      setError(e.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  const onOpenDetail = async (id) => {
    setDetailLoading(true);
    setDetailError('');
    try {
      const data = await fetchProductDetail(id);
      setSelected(data);
    } catch (e) {
      setDetailError(e.message || 'Failed to load product detail');
    } finally {
      setDetailLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App" style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <header>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <Navbar initialQuery={query} onSearch={(q) => { setPage(1); setQuery(q); }} />
      </header>

      <main
        className="container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "1rem",
        }}
      >
        {error ? (
          <div
            role="alert"
            style={{
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              color: "#991B1B",
              padding: "12px 14px",
              borderRadius: 12,
              marginBottom: 12,
            }}
          >
            {error}
          </div>
        ) : null}

        {loading ? (
          <div style={{ display: "grid", placeItems: "center", padding: 40, color: "#2563EB" }}>
            Loading products...
          </div>
        ) : (
          <>
            <section
              aria-label="Products"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                gap: 16,
              }}
            >
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onClick={() => onOpenDetail(p.id)}
                />
              ))}
            </section>

            {products.length === 0 && !error ? (
              <div style={{ padding: 24, color: "#6b7280" }}>No products found.</div>
            ) : null}

            <section
              aria-label="Pagination"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 20,
              }}
            >
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                style={{
                  background: page <= 1 ? "#E5E7EB" : "#ffffff",
                  color: "#111827",
                  border: "1px solid #E5E7EB",
                  borderRadius: 10,
                  padding: "8px 12px",
                  cursor: page <= 1 ? "not-allowed" : "pointer",
                }}
              >
                Prev
              </button>
              <div
                style={{
                  background: "#2563EB",
                  color: "#ffffff",
                  borderRadius: 10,
                  padding: "8px 12px",
                  fontWeight: 600,
                  boxShadow: "0 6px 20px rgba(37,99,235,0.25)",
                }}
              >
                {page} / {totalPages}
              </div>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                style={{
                  background: page >= totalPages ? "#E5E7EB" : "#ffffff",
                  color: "#111827",
                  border: "1px solid #E5E7EB",
                  borderRadius: 10,
                  padding: "8px 12px",
                  cursor: page >= totalPages ? "not-allowed" : "pointer",
                }}
              >
                Next
              </button>
            </section>
          </>
        )}
      </main>

      {detailError ? (
        <div
          role="alert"
          style={{
            position: "fixed",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            color: "#991B1B",
            padding: "10px 12px",
            borderRadius: 12,
            zIndex: 60,
          }}
        >
          {detailError}
        </div>
      ) : null}

      {detailLoading ? (
        <div
          style={{
            position: "fixed",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#DBEAFE",
            border: "1px solid #BFDBFE",
            color: "#1E3A8A",
            padding: "10px 12px",
            borderRadius: 12,
            zIndex: 60,
          }}
        >
          Loading details...
        </div>
      ) : null}

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default App;
