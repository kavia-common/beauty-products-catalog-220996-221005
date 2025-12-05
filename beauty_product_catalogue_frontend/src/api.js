const API_BASE = process.env.REACT_APP_API_BASE;

/**
 * Build a URL with query parameters from an object.
 * @param {string} base
 * @param {Record<string, string | number | undefined>} params
 */
function withQuery(base, params = {}) {
  const url = new URL(base, API_BASE || window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).length > 0) {
      url.searchParams.set(k, String(v));
    }
  });
  return url.toString();
}

// PUBLIC_INTERFACE
export async function fetchProducts({ search, category, page, page_size } = {}) {
  /** Fetch a paginated list of products with optional search and filters.
   * Returns: { results: Product[], count: number, next?: string, previous?: string }
   */
  const url = withQuery("/api/products/", { search, category, page, page_size });
  const res = await fetch(url, { credentials: "include", mode: "cors" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch products: ${res.status} ${text}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchProductDetail(id) {
  /** Fetch product detail by ID.
   * Returns: Product
   */
  const url = withQuery(`/api/products/${id}/`);
  const res = await fetch(url, { credentials: "include", mode: "cors" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch product ${id}: ${res.status} ${text}`);
  }
  return res.json();
}
