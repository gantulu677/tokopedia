import React, { useEffect, useMemo, useState } from "react";

/**
 * Tokopedia-inspired single-file demo application.
 * App contract: v2.4.1
 *
 * Security boundary:
 * - This file contains demo profile/catalog data only.
 * - Passwords and PINs are intentionally not embedded in frontend source.
 * - Production authentication and admin authorization must be enforced by a backend.
 */

export const APP_CONFIG = {
  version: "2.4.1",
  application: {
    name: "Tokopedia",
    designLanguage: "Tokopedia Inspired",
    platform: "Mobile First",
  },
  designSystem: {
    name: "Tokopedia Mobile Design System",
    version: "1.0.0",
    colors: {
      primary: "#03AC0E",
      primaryDark: "#038C0B",
      primaryLight: "#E8F8E9",
      secondary: "#00AA5B",
      background: "#F5F5F5",
      surface: "#FFFFFF",
      text: "#212121",
      textSecondary: "#6D7588",
      border: "#E5E7EB",
      success: "#03AC0E",
      warning: "#F0A000",
      error: "#E53935",
      info: "#2196F3",
    },
    typography: {
      fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontWeights: [400, 500, 600, 700],
      fontSizes: [12, 14, 16, 18, 20, 24, 28, 32],
    },
    spacing: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
    sizing: {
      buttonHeight: 44,
      inputHeight: 48,
      headerHeight: 56,
      bottomNavHeight: 64,
      minTouchTarget: 44,
    },
    radius: [0, 4, 8, 12, 16, 20, 999],
    responsive: {
      mobile: { min: 0, max: 767 },
      tablet: { min: 768, max: 1023 },
      desktop: { min: 1024 },
    },
    accessibility: {
      minimumTouchTarget: 44,
      keyboardNavigation: true,
      visibleFocus: true,
      semanticColors: true,
      reducedMotion: true,
    },
  },
  rootLayout: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    overflow: "hidden",
  },
  pageRegistry: {
    ProductDetailPage: { type: "main", layoutId: "AppShell" },
    CheckoutPage: { type: "standalone", layoutId: "StandalonePages" },
    AdminPage: { type: "standalone", layoutId: "StandalonePages" },
    NotFoundPage: { type: "shared", layoutId: "StandalonePages" },
  },
  routes: [
    { routeId: "checkout", path: "/checkout", pageId: "CheckoutPage", priority: 100 },
    { routeId: "admin", path: "/admin", pageId: "AdminPage", priority: 100 },
    { routeId: "product-detail", path: "/:slug", pageId: "ProductDetailPage", priority: 10 },
  ],
  fallback: { routeId: "not-found", path: "*", pageId: "NotFoundPage", statusCode: 404 },
  overlays: ["Modal", "Drawer", "Dialog", "Toast"],
};

// Demo directory data. Credentials are deliberately excluded from frontend code.
export const USERS = [
  { id: "USR001", name: "Budi Santoso", phone: "081234567801", is_admin: false },
  { id: "USR002", name: "Andi Wijaya", phone: "081234567802", is_admin: false },
  { id: "USR003", name: "Rizky Pratama", phone: "081234567803", is_admin: false },
  { id: "USR004", name: "Dewi Anggraini", phone: "081234567804", is_admin: false },
  { id: "USR005", name: "Fajar Ramadhan", phone: "081234567805", is_admin: false },
  { id: "USR006", name: "Siti Rahma", phone: "081234567806", is_admin: false },
  { id: "USR007", name: "Agus Setiawan", phone: "081234567807", is_admin: false },
  { id: "USR008", name: "Maya Putri", phone: "081234567808", is_admin: false },
  { id: "USR009", name: "Super Admin", phone: "081234567809", is_admin: true },
  { id: "USR010", name: "Admin Makassar", phone: "081234567810", is_admin: true },
];

export const PRODUCTS = [
  {
    id: "PRD001",
    slug: "wireless-bluetooth-headphone",
    name: "Wireless Bluetooth Headphone",
    description: "Headphone wireless dengan kualitas suara jernih, active noise cancellation, dan baterai tahan hingga 30 jam.",
    images: [
      "https://example.com/images/headphone-1.jpg",
      "https://example.com/images/headphone-2.jpg",
      "https://example.com/images/headphone-3.jpg",
    ],
    price: 450000,
    sender_user_id: "USR001",
    sender_city: "Jakarta",
  },
  {
    id: "PRD002",
    slug: "smart-watch-series-x",
    name: "Smart Watch Series X",
    description: "Smartwatch modern dengan fitur pemantau kesehatan, detak jantung, penghitung langkah, dan notifikasi smartphone.",
    images: [
      "https://example.com/images/smartwatch-1.jpg",
      "https://example.com/images/smartwatch-2.jpg",
    ],
    price: 799000,
    sender_user_id: "USR002",
    sender_city: "Bandung",
  },
  {
    id: "PRD003",
    slug: "mechanical-gaming-keyboard",
    name: "Mechanical Gaming Keyboard",
    description: "Keyboard mechanical RGB dengan switch tactile, desain ergonomis, dan koneksi USB-C.",
    images: [
      "https://example.com/images/keyboard-1.jpg",
      "https://example.com/images/keyboard-2.jpg",
    ],
    price: 650000,
    sender_user_id: "USR003",
    sender_city: "Surabaya",
  },
  {
    id: "PRD004",
    slug: "portable-bluetooth-speaker",
    name: "Portable Bluetooth Speaker",
    description: "Speaker Bluetooth portable dengan suara stereo, bass kuat, tahan air IPX7, dan baterai hingga 12 jam.",
    images: [
      "https://example.com/images/speaker-1.jpg",
      "https://example.com/images/speaker-2.jpg",
      "https://example.com/images/speaker-3.jpg",
    ],
    price: 350000,
    sender_user_id: "USR004",
    sender_city: "Yogyakarta",
  },
  {
    id: "PRD005",
    slug: "premium-backpack",
    name: "Premium Backpack",
    description: "Tas ransel premium kapasitas 25 liter dengan kompartemen laptop 15 inci dan material tahan air.",
    images: [
      "https://example.com/images/backpack-1.jpg",
      "https://example.com/images/backpack-2.jpg",
    ],
    price: 275000,
    sender_user_id: "USR005",
    sender_city: "Makassar",
  },
];

export const getSeller = (product) =>
  USERS.find((user) => user.id === product.sender_user_id) ?? null;

export const formatRupiah = (amount) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

export const resolveRoute = (pathname) => {
  // Static paths are checked before the dynamic /:slug route.
  if (pathname === "/checkout") return { pageId: "CheckoutPage" };
  if (pathname === "/admin") return { pageId: "AdminPage" };

  const match = pathname.match(/^\/([^/]+)\/?$/);
  if (!match || !match[1]) return { pageId: "NotFoundPage", statusCode: 404 };

  const slug = decodeURIComponent(match[1]);
  const product = PRODUCTS.find((item) => item.slug === slug);
  return product
    ? { pageId: "ProductDetailPage", params: { slug }, product }
    : { pageId: "NotFoundPage", statusCode: 404 };
};

export const validateSeedData = () => {
  const userIds = new Set(USERS.map((user) => user.id));
  const productIds = new Set(PRODUCTS.map((product) => product.id));
  const slugs = new Set(PRODUCTS.map((product) => product.slug));
  return {
    uniqueUserIds: userIds.size === USERS.length,
    uniqueProductIds: productIds.size === PRODUCTS.length,
    uniqueProductSlugs: slugs.size === PRODUCTS.length,
    validSellerReferences: PRODUCTS.every((product) => userIds.has(product.sender_user_id)),
    validPrices: PRODUCTS.every((product) => Number.isFinite(product.price) && product.price >= 0),
  };
};

const styles = `
:root { font-family: ${APP_CONFIG.designSystem.typography.fontFamily}; color: #212121; background: #f5f5f5; font-synthesis: none; }
* { box-sizing: border-box; }
html, body, #root { width: 100%; min-height: 100%; height: 100%; margin: 0; }
body { overflow: hidden; }
button, input, textarea { font: inherit; }
button { cursor: pointer; }
button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible { outline: 3px solid rgba(3,172,14,.28); outline-offset: 2px; }
.app-viewport { width: 100%; height: 100%; min-height: 0; display: flex; justify-content: center; overflow: hidden; background: #f5f5f5; }
.app-root { width: 100%; max-width: 500px; height: 100%; min-height: 0; display: flex; flex-direction: column; overflow: hidden; background: #fff; box-shadow: 0 0 24px rgba(0,0,0,.06); }
.app-header { height: 56px; flex: 0 0 56px; display:flex; align-items:center; gap:12px; padding:0 16px; border-bottom:1px solid #eee; background:#fff; }
.brand { color:#03ac0e; font-size:21px; font-weight:800; letter-spacing:-.8px; white-space:nowrap; }
.header-search { flex:1; min-width:0; height:38px; display:flex; align-items:center; gap:8px; padding:0 12px; background:#f5f5f5; border:1px solid #eee; border-radius:9px; color:#888; }
.header-search input { width:100%; border:0; outline:0; background:transparent; min-width:0; font-size:13px; }
.header-link { color:#555; font-size:13px; text-decoration:none; white-space:nowrap; }
.content-scroll { flex:1; min-height:0; overflow-y:auto; overscroll-behavior:contain; background:#f5f5f5; }
.bottom-nav { height:64px; flex:0 0 64px; display:flex; justify-content:space-around; align-items:center; border-top:1px solid #eee; background:#fff; }
.nav-button { border:0; background:none; color:#777; min-width:64px; min-height:44px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; font-size:10px; }
.nav-button.active { color:#03ac0e; font-weight:700; }
.nav-icon { font-size:19px; line-height:20px; }
.page-pad { padding:16px; }
.product-image-wrap { position:relative; background:#fff; aspect-ratio:1/1; display:flex; align-items:center; justify-content:center; overflow:hidden; }
.product-image { width:100%; height:100%; object-fit:contain; }
.image-fallback { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; width:100%; height:100%; color:#9ca3af; background:linear-gradient(135deg,#f8fafc,#eef2f7); font-size:52px; }
.image-fallback small { font-size:12px; }
.product-title { font-size:19px; line-height:1.35; font-weight:700; margin:12px 0 8px; }
.price { font-size:24px; font-weight:800; margin:8px 0 12px; }
.muted { color:#777; font-size:13px; line-height:1.5; }
.card { background:#fff; border-radius:12px; padding:16px; margin-bottom:12px; border:1px solid #eee; }
.primary-btn { width:100%; min-height:44px; border:0; border-radius:9px; background:#03ac0e; color:#fff; font-weight:700; padding:11px 16px; }
.primary-btn:hover { background:#038c0b; }
.secondary-btn { min-height:44px; border:1px solid #03ac0e; border-radius:9px; background:#fff; color:#03ac0e; font-weight:700; padding:10px 14px; }
.row { display:flex; align-items:center; justify-content:space-between; gap:12px; }
.section-title { font-size:16px; font-weight:700; margin:0 0 12px; }
.seller-avatar { width:40px; height:40px; border-radius:50%; display:grid; place-items:center; background:#e8f8e9; color:#038c0b; font-weight:800; }
.qty-control { display:flex; align-items:center; gap:12px; }
.qty-control button { width:32px; height:32px; border:1px solid #ddd; border-radius:8px; background:#fff; }
.field { width:100%; min-height:46px; border:1px solid #ddd; border-radius:8px; padding:10px 12px; background:#fff; }
.field-label { display:block; font-size:13px; font-weight:600; margin:12px 0 6px; }
.product-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.product-tile { min-width:0; background:#fff; border:1px solid #eee; border-radius:10px; overflow:hidden; color:inherit; text-align:left; padding:0; }
.tile-image { width:100%; aspect-ratio:1/1; display:grid; place-items:center; background:#f5f7f8; font-size:40px; color:#9ca3af; }
.tile-body { padding:10px; }
.tile-name { font-size:13px; line-height:1.4; min-height:36px; }
.tile-price { font-size:14px; font-weight:800; margin-top:7px; }
.standalone { flex:1; min-height:0; overflow-y:auto; background:#f5f5f5; }
.admin-stat { background:#fff; border:1px solid #eee; border-radius:10px; padding:14px; }
.admin-stat strong { display:block; font-size:22px; margin-top:4px; }
.data-row { display:flex; justify-content:space-between; gap:12px; padding:12px 0; border-bottom:1px solid #eee; font-size:13px; }
.pill { border-radius:999px; background:#e8f8e9; color:#038c0b; padding:4px 8px; font-size:11px; font-weight:700; }
.error-page { min-height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:32px; text-align:center; }
.error-code { font-size:64px; font-weight:800; color:#03ac0e; line-height:1; }
.toast { position:absolute; left:16px; right:16px; bottom:76px; padding:12px 14px; border-radius:10px; background:#212121; color:#fff; font-size:13px; box-shadow:0 4px 16px #0002; }
@media (min-width: 501px) { .app-root { border-left:1px solid #eee; border-right:1px solid #eee; } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior:auto !important; transition:none !important; animation:none !important; } }
`;

function useAppStyles() {
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-app-styles", "tokopedia-single-file");
    style.textContent = styles;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
}

function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

function ProductVisual({ product, compact = false }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const symbols = { PRD001: "🎧", PRD002: "⌚", PRD003: "⌨️", PRD004: "🔊", PRD005: "🎒" };
  const image = product.images?.[imageIndex];
  return (
    <div className={compact ? "tile-image" : "product-image-wrap"}>
      {!failed && image ? (
        <img
          className={compact ? "" : "product-image"}
          src={image}
          alt={product.name}
          onError={() => setFailed(true)}
          onLoad={() => setFailed(false)}
          style={compact ? { width: "100%", height: "100%", objectFit: "contain" } : undefined}
        />
      ) : (
        <div className="image-fallback">
          <span>{symbols[product.id] || "🛍️"}</span>
          {!compact && <small>Gambar produk belum tersedia</small>}
        </div>
      )}
      {!compact && product.images.length > 1 && (
        <div style={{ position: "absolute", bottom: 10, right: 10, display: "flex", gap: 5 }}>
          {product.images.map((_, index) => (
            <button
              key={index}
              aria-label={`Lihat gambar ${index + 1}`}
              onClick={() => { setImageIndex(index); setFailed(false); }}
              style={{ width: 8, height: 8, padding: 0, border: 0, borderRadius: 20, background: index === imageIndex ? "#03ac0e" : "#bbb" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Header({ query, setQuery }) {
  return (
    <header className="app-header">
      <button className="brand" onClick={() => navigate("/")} aria-label="Tokopedia">tokopedia</button>
      <label className="header-search">
        <span aria-hidden="true">⌕</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari produk" aria-label="Cari produk" />
      </label>
      <a className="header-link" href="/admin" onClick={(event) => { event.preventDefault(); navigate("/admin"); }}>Admin</a>
    </header>
  );
}

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      <button className="nav-button" onClick={() => navigate("/")}><span className="nav-icon">⌂</span>Beranda</button>
      <button className="nav-button" onClick={() => navigate("/checkout")}><span className="nav-icon">🛒</span>Checkout</button>
      <button className="nav-button" onClick={() => navigate("/admin")}><span className="nav-icon">▦</span>Admin</button>
    </nav>
  );
}

function ProductDetailPage({ product, onAddToCart }) {
  const seller = getSeller(product);
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="content-scroll">
      <ProductVisual product={product} />
      <section className="page-pad" style={{ background: "#fff" }}>
        <div className="muted">Elektronik &nbsp;›&nbsp; Produk</div>
        <h1 className="product-title">{product.name}</h1>
        <div className="price">{formatRupiah(product.price)}</div>
        <div className="muted">ID Produk: {product.id}</div>
        <div className="row" style={{ marginTop: 18, padding: "12px 0", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
          <strong style={{ fontSize: 13 }}>Jumlah</strong>
          <div className="qty-control">
            <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Kurangi jumlah">−</button>
            <strong>{quantity}</strong>
            <button onClick={() => setQuantity((value) => value + 1)} aria-label="Tambah jumlah">+</button>
          </div>
        </div>
        <div className="row" style={{ marginTop: 14 }}>
          <button className="secondary-btn" style={{ flex: 1 }} onClick={() => onAddToCart(product, quantity, false)}>+ Keranjang</button>
          <button className="primary-btn" style={{ flex: 1 }} onClick={() => onAddToCart(product, quantity, true)}>Beli sekarang</button>
        </div>
      </section>
      <section className="page-pad">
        <div className="card">
          <h2 className="section-title">Deskripsi produk</h2>
          <p className="muted" style={{ fontSize: 14, color: "#444" }}>{product.description}</p>
        </div>
        <div className="card">
          <h2 className="section-title">Informasi penjual</h2>
          <div className="row">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="seller-avatar">{seller?.name?.charAt(0) || "P"}</div>
              <div>
                <strong style={{ fontSize: 14 }}>{seller?.name || "Penjual"}</strong>
                <div className="muted">{product.sender_city}</div>
              </div>
            </div>
            <span className="pill">Penjual</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckoutPage({ cart, setCart, onToast }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const updateQuantity = (id, delta) =>
    setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const removeItem = (id) => setCart((items) => items.filter((item) => item.id !== id));
  const submit = (event) => {
    event.preventDefault();
    if (!cart.length) return onToast("Keranjang masih kosong.");
    if (!name.trim() || !phone.trim() || !address.trim()) return onToast("Lengkapi informasi penerima terlebih dahulu.");
    onToast("Simulasi checkout berhasil. Belum ada pesanan atau pembayaran yang dikirim.");
  };
  return (
    <main className="standalone page-pad">
      <h1 style={{ fontSize: 22, margin: "4px 0 16px" }}>Checkout</h1>
      <section className="card">
        <h2 className="section-title">Produk yang dibeli ({cart.length})</h2>
        {!cart.length ? <p className="muted">Keranjang Anda masih kosong.</p> : cart.map((item) => (
          <div className="data-row" key={item.id} style={{ alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <strong>{item.name}</strong>
              <div className="muted">{formatRupiah(item.price)} / produk</div>
              <div className="qty-control" style={{ marginTop: 8 }}>
                <button onClick={() => updateQuantity(item.id, -1)} aria-label="Kurangi jumlah">−</button>
                <strong>{item.quantity}</strong>
                <button onClick={() => updateQuantity(item.id, 1)} aria-label="Tambah jumlah">+</button>
                <button className="secondary-btn" style={{ minHeight: 32, padding: "4px 8px", borderColor: "#ddd", color: "#b42318" }} onClick={() => removeItem(item.id)}>Hapus</button>
              </div>
            </div>
            <strong>{formatRupiah(item.price * item.quantity)}</strong>
          </div>
        ))}
        <div className="row" style={{ paddingTop: 14 }}><strong>Total produk</strong><strong>{formatRupiah(total)}</strong></div>
      </section>
      <form className="card" onSubmit={submit}>
        <h2 className="section-title">Informasi penerima</h2>
        <label className="field-label">Nama penerima</label>
        <input className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama lengkap" />
        <label className="field-label">Nomor telepon</label>
        <input className="field" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08xxxxxxxxxx" inputMode="tel" />
        <label className="field-label">Alamat pengiriman</label>
        <textarea className="field" rows={3} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat lengkap" />
        <button className="primary-btn" type="submit" style={{ marginTop: 16 }}>Buat pesanan (simulasi)</button>
        <p className="muted" style={{ marginBottom: 0 }}>Demo frontend: belum terhubung ke backend, stok, ongkir, atau payment gateway.</p>
      </form>
    </main>
  );
}

function AdminPage() {
  const adminCount = USERS.filter((user) => user.is_admin).length;
  const checks = validateSeedData();
  return (
    <main className="standalone page-pad">
      <div className="row" style={{ marginBottom: 16 }}>
        <div><div className="muted">TOKOPEDIA / ADMIN</div><h1 style={{ fontSize: 22, margin: "4px 0" }}>Dashboard Admin</h1></div>
        <span className="pill">Demo</span>
      </div>
      <div className="muted" style={{ marginBottom: 14 }}>Tampilan administrasi menggunakan data seed lokal. Otorisasi produksi wajib dilakukan oleh backend.</div>
      <div className="product-grid" style={{ marginBottom: 14 }}>
        <div className="admin-stat"><span className="muted">Total pengguna</span><strong>{USERS.length}</strong></div>
        <div className="admin-stat"><span className="muted">Administrator</span><strong>{adminCount}</strong></div>
        <div className="admin-stat"><span className="muted">Total produk</span><strong>{PRODUCTS.length}</strong></div>
        <div className="admin-stat"><span className="muted">Validasi data</span><strong>{Object.values(checks).every(Boolean) ? "Lulus" : "Gagal"}</strong></div>
      </div>
      <section className="card">
        <h2 className="section-title">Daftar produk</h2>
        {PRODUCTS.map((product) => (
          <div className="data-row" key={product.id}>
            <div><strong>{product.name}</strong><div className="muted">{product.id} · /{product.slug}</div></div>
            <strong>{formatRupiah(product.price)}</strong>
          </div>
        ))}
      </section>
      <section className="card">
        <h2 className="section-title">Daftar pengguna</h2>
        {USERS.map((user) => (
          <div className="data-row" key={user.id}>
            <div><strong>{user.name}</strong><div className="muted">{user.id} · {user.phone}</div></div>
            <span className="pill">{user.is_admin ? "Admin" : "User"}</span>
          </div>
        ))}
      </section>
      <section className="card">
        <h2 className="section-title">Validasi seed data</h2>
        {Object.entries(checks).map(([key, value]) => (
          <div className="data-row" key={key}><span>{key}</span><strong style={{ color: value ? "#038c0b" : "#e53935" }}>{value ? "OK" : "Gagal"}</strong></div>
        ))}
      </section>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="standalone">
      <div className="error-page">
        <div className="error-code">404</div>
        <h1 style={{ fontSize: 20, margin: "14px 0 6px" }}>Halaman tidak ditemukan</h1>
        <p className="muted">Alamat yang Anda buka tidak tersedia atau produk tidak ditemukan.</p>
        <button className="primary-btn" style={{ maxWidth: 220, marginTop: 12 }} onClick={() => navigate("/wireless-bluetooth-headphone")}>Lihat produk demo</button>
      </div>
    </main>
  );
}

export default function App() {
  useAppStyles();
  const [pathname, setPathname] = useState(window.location.pathname);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");
  const route = useMemo(() => resolveRoute(pathname), [pathname]);
  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term ? PRODUCTS.filter((product) => product.name.toLowerCase().includes(term)) : PRODUCTS;
  }, [query]);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const addToCart = (product, quantity, goToCheckout) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      return existing
        ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...items, { id: product.id, name: product.name, price: product.price, quantity }];
    });
    if (goToCheckout) navigate("/checkout");
    else setToast(`${product.name} ditambahkan ke keranjang.`);
  };

  const standalone = route.pageId !== "ProductDetailPage";
  return (
    <div className="app-viewport">
      <div className="app-root">
        {!standalone && <Header query={query} setQuery={setQuery} />}
        {route.pageId === "ProductDetailPage" && route.product ? (
          query.trim() ? (
            <div className="content-scroll page-pad">
              <h1 className="section-title">Hasil pencarian</h1>
              {filteredProducts.length ? (
                <div className="product-grid">
                  {filteredProducts.map((product) => (
                    <button className="product-tile" key={product.id} onClick={() => navigate(`/${product.slug}`)}>
                      <ProductVisual product={product} compact />
                      <div className="tile-body"><div className="tile-name">{product.name}</div><div className="tile-price">{formatRupiah(product.price)}</div></div>
                    </button>
                  ))}
                </div>
              ) : <p className="muted">Produk tidak ditemukan.</p>}
            </div>
          ) : (
            <ProductDetailPage product={route.product} onAddToCart={addToCart} />
          )
        ) : route.pageId === "CheckoutPage" ? (
          <CheckoutPage cart={cart} setCart={setCart} onToast={setToast} />
        ) : route.pageId === "AdminPage" ? (
          <AdminPage />
        ) : (
          <NotFoundPage />
        )}
        {!standalone && <BottomNav />}
        {toast && <div className="toast" role="status">{toast}</div>}
      </div>
    </div>
  );
}
