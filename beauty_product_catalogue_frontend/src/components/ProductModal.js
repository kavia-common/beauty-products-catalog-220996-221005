import React, { useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * ProductModal displays product details in a centered overlay.
 * Props:
 * - product: Product | null
 * - onClose: () => void
 */
export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!product) return null;
  const {
    name,
    brand,
    price,
    image_url,
    rating,
    description,
    category,
  } = product;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} details`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(17,24,39,0.45)",
        display: "grid",
        placeItems: "center",
        padding: 16,
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: 16,
          width: "min(900px, 100%)",
          maxHeight: "85vh",
          overflow: "auto",
          boxShadow: "0 20px 48px rgba(2,6,23,0.24)",
          border: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(245,158,11,0.08))",
              padding: 16,
              display: "grid",
              placeItems: "center",
            }}
          >
            {image_url ? (
              <img
                src={image_url}
                alt={name}
                style={{ maxHeight: 280, objectFit: "contain" }}
              />
            ) : (
              <div
                aria-hidden
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 16,
                  background:
                    "linear-gradient(135deg, #DBEAFE, #FEF3C7)",
                }}
              />
            )}
          </div>
          <div style={{ padding: 20, display: "grid", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ color: "#6b7280", fontSize: 14 }}>{brand}</div>
                <h2 style={{ margin: "4px 0", color: "#111827" }}>{name}</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  alignSelf: "start",
                  background: "#F3F4F6",
                  border: "1px solid #E5E7EB",
                  color: "#111827",
                  borderRadius: 10,
                  padding: "8px 12px",
                  fontWeight: 600,
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  background: "#EEF2FF",
                  color: "#3730A3",
                  borderRadius: 999,
                  padding: "6px 10px",
                  fontSize: 12,
                  border: "1px solid #E0E7FF",
                }}
              >
                {category || "General"}
              </span>
              <span
                aria-label={`Rating ${rating || 0} of 5`}
                style={{
                  background: "#F3F4F6",
                  color: "#111827",
                  borderRadius: 999,
                  padding: "6px 10px",
                  fontSize: 12,
                }}
              >
                ⭐ {rating != null ? Number(rating).toFixed(1) : "0.0"}
              </span>
              <span style={{ fontWeight: 700, color: "#2563EB" }}>
                {price != null ? `$${Number(price).toFixed(2)}` : "—"}
              </span>
            </div>

            {description ? (
              <p style={{ color: "#374151", lineHeight: 1.6, marginTop: 4 }}>
                {description}
              </p>
            ) : (
              <p style={{ color: "#6b7280", fontStyle: "italic" }}>
                No detailed description available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
