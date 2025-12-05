import React from "react";

/**
 * PUBLIC_INTERFACE
 * ProductCard displays a single product summary.
 * Props:
 * - product: { id, name, brand, price, image_url, rating, short_description }
 * - onClick: () => void
 */
export default function ProductCard({ product, onClick }) {
  const {
    name,
    brand,
    price,
    image_url,
    rating,
    short_description,
  } = product || {};

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" ? onClick?.() : null)}
      style={{
        background: "#ffffff",
        borderRadius: 16,
        border: "1px solid #e5e7eb",
        boxShadow: "0 8px 24px rgba(2,6,23,0.06)",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "transform .15s ease, box-shadow .2s ease",
      }}
      aria-label={`${name} by ${brand}`}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(245,158,11,0.08))",
          height: 180,
          display: "grid",
          placeItems: "center",
        }}
      >
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            style={{
              maxHeight: 150,
              objectFit: "contain",
            }}
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden
            style={{
              width: 120,
              height: 120,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, #DBEAFE, #FEF3C7)",
            }}
          />
        )}
      </div>
      <div style={{ padding: "12px 14px", display: "grid", gap: 6 }}>
        <div style={{ fontSize: 14, color: "#6b7280" }}>{brand || "Brand"}</div>
        <h3 style={{ margin: 0, fontSize: 16, color: "#111827" }}>{name}</h3>
        {short_description ? (
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: 13,
              color: "#4b5563",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {short_description}
          </p>
        ) : null}
        <div
          style={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontWeight: 700, color: "#2563EB" }}>
            {price != null ? `$${Number(price).toFixed(2)}` : "—"}
          </div>
          <div
            aria-label={`Rating ${rating || 0} of 5`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              background: "#F3F4F6",
              color: "#111827",
              borderRadius: 999,
              padding: "4px 8px",
              fontSize: 12,
            }}
          >
            ⭐ {rating != null ? Number(rating).toFixed(1) : "0.0"}
          </div>
        </div>
      </div>
    </article>
  );
}
