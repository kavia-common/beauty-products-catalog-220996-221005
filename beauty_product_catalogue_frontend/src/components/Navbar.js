import React, { useState, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * Navbar component with search input and optional category filter.
 * Props:
 * - initialQuery: string
 * - onSearch: (query: string) => void
 */
export default function Navbar({ initialQuery = "", onSearch }) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <nav
      aria-label="Top navigation"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "linear-gradient(90deg, rgba(37,99,235,0.08), rgba(249,250,251,1))",
        backdropFilter: "saturate(180%) blur(8px)",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            aria-hidden
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background:
                "linear-gradient(135deg, #2563EB 0%, #60A5FA 50%, #F59E0B 100%)",
              boxShadow: "0 6px 20px rgba(37,99,235,0.25)",
            }}
          />
          <div style={{ fontWeight: 700, fontSize: 18, color: "#111827" }}>
            Beauty Catalogue
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          role="search"
          aria-label="Search products"
          style={{ flex: 1, display: "flex", gap: 8 }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: "8px 12px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <span aria-hidden style={{ color: "#6b7280" }}>🔍</span>
            <input
              type="search"
              placeholder="Search products, brands, or categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 14,
                color: "#111827",
                background: "transparent",
              }}
              aria-label="Search query"
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 16px",
              fontWeight: 600,
              boxShadow: "0 6px 20px rgba(37,99,235,0.25)",
              transition: "transform .15s ease",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
