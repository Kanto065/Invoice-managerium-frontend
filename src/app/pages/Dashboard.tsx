import { useState } from "react";
import { useNavigate } from "react-router";

/* ────────────────────────────────────────────────────────────────────────── */
/*  Helpers                                                                  */
/* ────────────────────────────────────────────────────────────────────────── */

function getSession() {
  return {
    name: sessionStorage.getItem("userName") ?? "Shop Owner",
    email: sessionStorage.getItem("userEmail") ?? "",
    role: sessionStorage.getItem("userRole") ?? "owner",
  };
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Demo data                                                                */
/* ────────────────────────────────────────────────────────────────────────── */

const DEMO_PRODUCTS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 2499,
    buyingPrice: 1800,
    stock: 12,
    status: "active",
    emoji: "🎧",
  },
  {
    id: 2,
    name: "Leather Executive Wallet",
    category: "Accessories",
    price: 899,
    buyingPrice: 450,
    stock: 28,
    status: "active",
    emoji: "👜",
  },
  {
    id: 3,
    name: "Ergonomic Desk Chair",
    category: "Furniture",
    price: 9500,
    buyingPrice: 6200,
    stock: 4,
    status: "active",
    emoji: "🪑",
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    category: "Lifestyle",
    price: 650,
    buyingPrice: 280,
    stock: 60,
    status: "active",
    emoji: "🧴",
  },
  {
    id: 5,
    name: "Mechanical Gaming Keyboard",
    category: "Electronics",
    price: 3800,
    buyingPrice: 2500,
    stock: 0,
    status: "inactive",
    emoji: "⌨️",
  },
];

const PLANS = [
  {
    slug: "free",
    name: "Free",
    price: 0,
    label: "Current Plan",
    isCurrent: true,
    color: "#70787d",
    bg: "var(--ds-surface-container-low)",
    border: "var(--ds-outline-variant)",
    features: ["1 Shop", "10 Products", "20 Invoices/mo", "No moderators"],
  },
  {
    slug: "starter",
    name: "Starter",
    price: 499,
    label: "Upgrade",
    isCurrent: false,
    color: "#005C72",
    bg: "rgba(0,92,114,0.04)",
    border: "#005C72",
    features: ["2 Shops", "50 Products", "100 Invoices/mo", "2 Moderators"],
  },
  {
    slug: "business",
    name: "Business",
    price: 999,
    label: "Upgrade",
    isCurrent: false,
    color: "#5d3300",
    bg: "rgba(93,51,0,0.04)",
    border: "var(--ds-on-tertiary-container)",
    features: [
      "5 Shops",
      "200 Products",
      "Unlimited Invoices",
      "5 Moderators",
      "Receipt Branding",
    ],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    price: 2499,
    label: "Contact Us",
    isCurrent: false,
    color: "#005C72",
    bg: "rgba(0,92,114,0.08)",
    border: "#005C72",
    features: [
      "Unlimited Shops",
      "Unlimited Products",
      "Unlimited Invoices",
      "10 Moderators",
      "Analytics",
    ],
  },
];

const DEMO_INVOICE = {
  number: "INV-2026-0001",
  date: "16 Apr, 2026",
  shopName: "Tech Haven BD",
  shopAddress: "BIRDEM Hospital, Shahbagh, Dhaka 1000",
  shopPhone: "+880 1712-345678",
  customer: { name: "Rahim Ahmed", phone: "+880 1934-567890" },
  items: [
    { name: "Premium Wireless Headphones", qty: 1, price: 2499 },
    { name: "Stainless Steel Water Bottle", qty: 2, price: 650 },
  ],
  subtotal: 3799,
  discount: 200,
  tax: 0,
  grandTotal: 3599,
};

/* ────────────────────────────────────────────────────────────────────────── */
/*  Tabs                                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

const TABS = [
  { key: "plan", icon: "workspace_premium", label: "Buy Plan" },
  { key: "products", icon: "inventory_2", label: "Products" },
  { key: "invoice", icon: "receipt_long", label: "Demo Invoice" },
  { key: "profile", icon: "manage_accounts", label: "Profile" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

/* ════════════════════════════════════════════════════════════════════════════ */
/*  Root                                                                      */
/* ════════════════════════════════════════════════════════════════════════════ */

export function Dashboard() {
  const navigate = useNavigate();
  const session = getSession();
  const [activeTab, setActiveTab] = useState<TabKey>("plan");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-ds-background text-ds-on-background"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Top App Bar ── */}
      <header
        className="sticky top-0 z-30 bg-ds-surface-container-lowest/95 backdrop-blur-md border-b border-ds-outline-variant/50"
      >
        <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-xl flex items-center justify-center"
              style={{ background: "var(--ds-primary-container)" }}
            >
              <span
                className="material-symbols-outlined text-white text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                storefront
              </span>
            </div>
            <span
              className="text-ds-primary font-extrabold text-base"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Kanto Invoice
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Free badge */}
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
              style={{
                color: "var(--ds-outline)",
                borderColor: "var(--ds-outline-variant)",
                background: "var(--ds-surface-container-low)",
              }}
            >
              Free
            </span>
            <button
              onClick={handleLogout}
              className="ml-1 p-2 rounded-full text-ds-outline hover:bg-ds-surface-container-high transition-colors"
              title="Logout"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="flex-1 overflow-y-auto pb-24 max-w-lg mx-auto w-full">
        {activeTab === "plan" && <TabBuyPlan session={session} />}
        {activeTab === "products" && <TabProducts />}
        {activeTab === "invoice" && <TabDemoInvoice />}
        {activeTab === "profile" && <TabProfile session={session} onLogout={handleLogout} />}
      </main>

      {/* ── Bottom Nav ── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t"
        style={{
          background: "rgba(248,250,251,0.97)",
          borderColor: "var(--ds-outline-variant)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-lg mx-auto flex items-stretch h-16">
          {TABS.map((tab) => {
            const active = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95"
              >
                <span
                  className="material-symbols-outlined text-[22px] transition-all"
                  style={{
                    fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
                    color: active
                      ? "var(--ds-primary-container)"
                      : "var(--ds-outline)",
                  }}
                >
                  {tab.icon}
                </span>
                <span
                  className="text-[10px] font-semibold tracking-wide transition-colors"
                  style={{
                    color: active
                      ? "var(--ds-primary-container)"
                      : "var(--ds-outline)",
                  }}
                >
                  {tab.label}
                </span>
                {active && (
                  <div
                    className="absolute bottom-0 h-0.5 w-10 rounded-full"
                    style={{ background: "var(--ds-primary-container)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════ */
/*  Tab 1 — Buy Plan                                                          */
/* ════════════════════════════════════════════════════════════════════════════ */

function TabBuyPlan({ session }: { session: { name: string } }) {
  return (
    <div className="px-4 pt-5 pb-4 space-y-4">
      {/* Welcome banner */}
      <div
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{ background: "var(--ds-primary-container)" }}
      >
        <div className="relative z-10">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
            Welcome back
          </p>
          <h2
            className="text-white text-xl font-extrabold mb-0.5"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            {session.name}
          </h2>
          <p className="text-white/60 text-xs">
            You're on the <strong className="text-white">Free</strong> plan.
            Upgrade anytime to unlock more.
          </p>
        </div>
        {/* Decorative circle */}
        <div
          className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-10"
          style={{ background: "white" }}
        />
        <div
          className="absolute bottom-0 right-4 w-16 h-16 rounded-full opacity-10"
          style={{ background: "white" }}
        />
      </div>

      <h3
        className="text-sm font-bold text-ds-on-surface uppercase tracking-widest pt-1"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        Subscription Plans
      </h3>

      {PLANS.map((plan) => (
        <div
          key={plan.slug}
          className="rounded-2xl border p-5 transition-all"
          style={{
            background: plan.bg,
            borderColor: plan.border,
            borderWidth: plan.isCurrent ? 1 : plan.slug === "starter" ? 2 : 1,
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <span
                className="text-lg font-extrabold"
                style={{ color: plan.color, fontFamily: "'Manrope', sans-serif" }}
              >
                {plan.name}
              </span>
              {plan.isCurrent && (
                <span
                  className="ml-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                  style={{
                    background: "var(--ds-surface-container-high)",
                    color: "var(--ds-outline)",
                  }}
                >
                  Active
                </span>
              )}
            </div>
            <div className="text-right">
              {plan.price === 0 ? (
                <span className="text-xl font-bold" style={{ color: plan.color }}>
                  Free
                </span>
              ) : (
                <div>
                  <span className="text-xl font-bold" style={{ color: plan.color }}>
                    ৳{plan.price}
                  </span>
                  <span className="text-xs text-ds-outline">/mo</span>
                </div>
              )}
            </div>
          </div>

          <ul className="space-y-1.5 mb-4">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-ds-on-surface-variant">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1", color: plan.color }}
                >
                  check_circle
                </span>
                {f}
              </li>
            ))}
          </ul>

          {!plan.isCurrent && (
            <button
              className="w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98] text-white"
              style={{ background: plan.color }}
            >
              {plan.label} →
            </button>
          )}
          {plan.isCurrent && (
            <div
              className="text-center text-xs font-semibold py-2 rounded-xl"
              style={{
                color: "var(--ds-outline)",
                background: "var(--ds-surface-container)",
              }}
            >
              Current plan
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════ */
/*  Tab 2 — Products                                                          */
/* ════════════════════════════════════════════════════════════════════════════ */

function TabProducts() {
  const limitReached = true; // Free plan: 10 max, 5 demo loaded

  return (
    <div className="px-4 pt-5 pb-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2
            className="text-lg font-extrabold text-ds-primary"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            My Products
          </h2>
          <p className="text-xs text-ds-outline">5 of 10 used · Free plan</p>
        </div>
        <button
          className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl text-white active:scale-95 transition-all"
          style={{ background: "var(--ds-primary-container)" }}
        >
          <span className="material-symbols-outlined text-base">add</span>
          Add
        </button>
      </div>

      {/* Free plan nudge */}
      {limitReached && (
        <div
          className="flex items-center gap-3 rounded-xl p-3 mb-4 border"
          style={{
            background: "rgba(254,187,125,0.12)",
            borderColor: "var(--ds-on-tertiary-container)",
          }}
        >
          <span
            className="material-symbols-outlined text-xl flex-shrink-0"
            style={{
              color: "var(--ds-tertiary)",
              fontVariationSettings: "'FILL' 1",
            }}
          >
            lock
          </span>
          <p className="text-xs text-ds-on-surface-variant leading-relaxed">
            <strong className="text-ds-on-surface">Free plan</strong> allows up to 10 products.{" "}
            <span className="font-semibold" style={{ color: "var(--ds-primary-container)" }}>
              Upgrade to add more.
            </span>
          </p>
        </div>
      )}

      {/* Product cards */}
      <div className="space-y-3">
        {DEMO_PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border p-4 flex items-center gap-4 transition-all active:scale-[0.99]"
            style={{
              background: "var(--ds-surface-container-lowest)",
              borderColor: "var(--ds-outline-variant)",
            }}
          >
            {/* Emoji avatar */}
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: "var(--ds-surface-container-low)" }}
            >
              {product.emoji}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ds-on-surface truncate">
                {product.name}
              </p>
              <p className="text-xs text-ds-outline mt-0.5">{product.category}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-sm font-bold" style={{ color: "var(--ds-primary-container)" }}>
                  ৳{product.price.toLocaleString()}
                </span>
                <span className="text-xs text-ds-outline">
                  Stock: {product.stock === 0 ? (
                    <span className="text-red-500 font-semibold">Out</span>
                  ) : (
                    product.stock
                  )}
                </span>
              </div>
            </div>

            {/* Status + actions */}
            <div className="flex flex-col items-end gap-2">
              <span
                className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                style={{
                  background:
                    product.status === "active"
                      ? "rgba(0,92,114,0.1)"
                      : "var(--ds-surface-container-high)",
                  color:
                    product.status === "active"
                      ? "var(--ds-primary-container)"
                      : "var(--ds-outline)",
                }}
              >
                {product.status}
              </span>
              <button className="p-1.5 rounded-lg text-ds-outline hover:bg-ds-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-base">edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Demo label */}
      <p className="text-center text-xs text-ds-outline mt-5">
        ✦ These are demo products loaded for preview
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════ */
/*  Tab 3 — Demo Invoice                                                      */
/* ════════════════════════════════════════════════════════════════════════════ */

function TabDemoInvoice() {
  const inv = DEMO_INVOICE;
  const shopName =
    sessionStorage.getItem("shopName") ?? inv.shopName;

  return (
    <div className="px-4 pt-5 pb-4">
      <div className="mb-4">
        <h2
          className="text-lg font-extrabold text-ds-primary"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Demo Receipt
        </h2>
        <p className="text-xs text-ds-outline mt-0.5">
          Preview how your invoices will look to customers.
        </p>
      </div>

      {/* Unlock banner */}
      <div
        className="flex items-center gap-3 rounded-xl p-3 mb-5 border"
        style={{
          background: "rgba(0,92,114,0.06)",
          borderColor: "var(--ds-primary-container)",
        }}
      >
        <span
          className="material-symbols-outlined text-xl flex-shrink-0"
          style={{
            color: "var(--ds-primary-container)",
            fontVariationSettings: "'FILL' 1",
          }}
        >
          star
        </span>
        <p className="text-xs text-ds-on-surface-variant leading-relaxed">
          Unlock <strong className="text-ds-on-surface">receipt branding</strong> and custom colors on the{" "}
          <span className="font-semibold" style={{ color: "var(--ds-primary-container)" }}>
            Business plan
          </span>.
        </p>
      </div>

      {/* Receipt card */}
      <div
        className="rounded-2xl border overflow-hidden shadow-sm"
        style={{
          background: "var(--ds-surface-container-lowest)",
          borderColor: "var(--ds-outline-variant)",
        }}
      >
        {/* Receipt header */}
        <div
          className="py-5 px-5 text-center text-white"
          style={{ background: "var(--ds-primary-container)" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
            Tax Invoice
          </p>
          <h3
            className="text-xl font-extrabold"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            {shopName}
          </h3>
          <p className="text-xs text-white/70 mt-0.5">{inv.shopAddress}</p>
          <p className="text-xs text-white/70">{inv.shopPhone}</p>
        </div>

        {/* Meta row */}
        <div
          className="flex justify-between px-5 py-3 text-xs border-b"
          style={{ borderColor: "var(--ds-outline-variant)" }}
        >
          <div>
            <p className="text-ds-outline font-medium">Invoice No.</p>
            <p className="text-ds-on-surface font-bold mt-0.5">{inv.number}</p>
          </div>
          <div className="text-right">
            <p className="text-ds-outline font-medium">Date</p>
            <p className="text-ds-on-surface font-bold mt-0.5">{inv.date}</p>
          </div>
        </div>

        {/* Customer */}
        <div
          className="px-5 py-3 border-b"
          style={{ borderColor: "var(--ds-outline-variant)" }}
        >
          <p className="text-ds-outline text-[10px] font-bold uppercase tracking-wider mb-1">
            Billed To
          </p>
          <p className="text-ds-on-surface text-sm font-semibold">{inv.customer.name}</p>
          <p className="text-ds-outline text-xs">{inv.customer.phone}</p>
        </div>

        {/* Items */}
        <div className="px-5 py-3">
          <p className="text-ds-outline text-[10px] font-bold uppercase tracking-wider mb-2">
            Items
          </p>
          <div className="space-y-2">
            {inv.items.map((item, i) => (
              <div key={i} className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <p className="text-ds-on-surface text-xs font-medium">{item.name}</p>
                  <p className="text-ds-outline text-[11px]">
                    {item.qty} × ৳{item.price.toLocaleString()}
                  </p>
                </div>
                <p className="text-ds-on-surface text-xs font-bold">
                  ৳{(item.qty * item.price).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div
          className="px-5 py-3 border-t space-y-1.5"
          style={{ borderColor: "var(--ds-outline-variant)" }}
        >
          <div className="flex justify-between text-xs text-ds-on-surface-variant">
            <span>Subtotal</span>
            <span>৳{inv.subtotal.toLocaleString()}</span>
          </div>
          {inv.discount > 0 && (
            <div className="flex justify-between text-xs text-green-600">
              <span>Discount</span>
              <span>−৳{inv.discount.toLocaleString()}</span>
            </div>
          )}
          {inv.tax > 0 && (
            <div className="flex justify-between text-xs text-ds-on-surface-variant">
              <span>Tax</span>
              <span>৳{inv.tax.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Grand total */}
        <div
          className="mx-5 mb-5 rounded-xl px-4 py-3 flex justify-between items-center"
          style={{ background: "var(--ds-surface-container-low)" }}
        >
          <span
            className="font-extrabold text-ds-primary"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Grand Total
          </span>
          <span
            className="text-xl font-extrabold"
            style={{
              color: "var(--ds-primary-container)",
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            ৳{inv.grandTotal.toLocaleString()}
          </span>
        </div>

        {/* Footer */}
        <div
          className="text-center px-5 py-4 border-t"
          style={{ borderColor: "var(--ds-outline-variant)" }}
        >
          <p className="text-ds-outline text-xs">Thank you for your purchase!</p>
          <p className="text-[10px] text-ds-outline/60 mt-1">
            ✦ Demo receipt — upgrade for real invoicing
          </p>
        </div>
      </div>

      {/* Print / share (disabled for demo) */}
      <div className="flex gap-3 mt-4">
        <button
          className="flex-1 py-3 rounded-xl border text-sm font-bold text-ds-outline flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
          disabled
          style={{ borderColor: "var(--ds-outline-variant)" }}
        >
          <span className="material-symbols-outlined text-base">print</span>
          Print
        </button>
        <button
          className="flex-1 py-3 rounded-xl border text-sm font-bold text-ds-outline flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
          disabled
          style={{ borderColor: "var(--ds-outline-variant)" }}
        >
          <span className="material-symbols-outlined text-base">share</span>
          Share
        </button>
      </div>
      <p className="text-center text-[10px] text-ds-outline mt-2">
        Print & Share unlocked on Starter plan+
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════ */
/*  Tab 4 — Profile                                                           */
/* ════════════════════════════════════════════════════════════════════════════ */

function TabProfile({
  session,
  onLogout,
}: {
  session: { name: string; email: string; role: string };
  onLogout: () => void;
}) {
  return (
    <div className="px-4 pt-5 pb-4 space-y-4">
      {/* Avatar + name */}
      <div
        className="rounded-2xl p-5 flex items-center gap-4 border"
        style={{
          background: "var(--ds-surface-container-lowest)",
          borderColor: "var(--ds-outline-variant)",
        }}
      >
        <div
          className="h-14 w-14 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white flex-shrink-0"
          style={{ background: "var(--ds-primary-container)" }}
        >
          {session.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-ds-on-surface font-extrabold text-base truncate"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            {session.name}
          </p>
          <p className="text-ds-outline text-xs truncate mt-0.5">
            {session.email || "No email stored"}
          </p>
          <div className="mt-1.5">
            <span
              className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(0,92,114,0.08)",
                color: "var(--ds-primary-container)",
              }}
            >
              Shop Owner
            </span>
          </div>
        </div>
      </div>

      {/* Email verification notice */}
      <div
        className="rounded-xl px-4 py-3.5 flex items-center gap-3 border"
        style={{
          background: "rgba(254,187,125,0.10)",
          borderColor: "var(--ds-on-tertiary-container)",
        }}
      >
        <span
          className="material-symbols-outlined text-xl flex-shrink-0"
          style={{
            color: "var(--ds-tertiary)",
            fontVariationSettings: "'FILL' 1",
          }}
        >
          mark_email_unread
        </span>
        <div className="flex-1">
          <p className="text-xs font-semibold text-ds-on-surface">
            Email not verified
          </p>
          <p className="text-[11px] text-ds-on-surface-variant mt-0.5">
            Verify your email to secure your account.
          </p>
        </div>
        <button
          className="text-xs font-bold px-2.5 py-1.5 rounded-lg text-white flex-shrink-0"
          style={{ background: "var(--ds-tertiary)" }}
        >
          Verify
        </button>
      </div>

      {/* Info tiles */}
      {[
        { icon: "storefront", label: "Shop Name", value: sessionStorage.getItem("shopName") ?? "Tech Haven BD" },
        { icon: "badge", label: "Account Type", value: "Free Plan" },
        { icon: "calendar_today", label: "Member Since", value: "Apr 2026" },
      ].map((row) => (
        <div
          key={row.label}
          className="rounded-xl px-4 py-3.5 flex items-center gap-3 border"
          style={{
            background: "var(--ds-surface-container-lowest)",
            borderColor: "var(--ds-outline-variant)",
          }}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ color: "var(--ds-primary-container)", fontVariationSettings: "'FILL' 1" }}
          >
            {row.icon}
          </span>
          <div className="flex-1">
            <p className="text-[10px] text-ds-outline font-semibold uppercase tracking-wider">
              {row.label}
            </p>
            <p className="text-sm font-semibold text-ds-on-surface mt-0.5">{row.value}</p>
          </div>
          <span className="material-symbols-outlined text-base text-ds-outline-variant">
            chevron_right
          </span>
        </div>
      ))}

      {/* Settings row */}
      <div className="pt-1 space-y-2">
        {[
          { icon: "edit", label: "Edit Profile" },
          { icon: "lock", label: "Change Password" },
          { icon: "help", label: "Help & Support" },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all active:scale-[0.98]"
            style={{
              background: "var(--ds-surface-container-lowest)",
              borderColor: "var(--ds-outline-variant)",
            }}
          >
            <span className="material-symbols-outlined text-xl text-ds-on-surface-variant">
              {item.icon}
            </span>
            <span className="text-sm font-medium text-ds-on-surface flex-1 text-left">
              {item.label}
            </span>
            <span className="material-symbols-outlined text-base text-ds-outline-variant">
              chevron_right
            </span>
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border transition-all active:scale-[0.98]"
        style={{
          color: "var(--ds-error)",
          borderColor: "var(--ds-error)",
          background: "rgba(186,26,26,0.04)",
        }}
      >
        <span className="material-symbols-outlined text-xl">logout</span>
        Logout
      </button>
    </div>
  );
}