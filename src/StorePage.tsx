import React, { useMemo, useState } from "react";
const BRAND = {
  name: "Magia Buena",
  primary: "#0ea5e9", // azul tailwind 500 aproximado
  accent: "#22c55e", // verde tailwind 500 aproximado
  currency: "MXN",
  hero: {
    title: "Todo lo que amas, en una sola tienda",
    subtitle: "Catálogo modular, diseño limpio y proceso de compra simple.",
    cta: "Explorar productos",
  },
};

// --- Datos de ejemplo (edítalos libremente) ---
export type Product = {
  id: string;
  name: string;
  price: number; // en MXN
  description: string;
  tags: string[];
  image?: string; // URL opcional
  stock?: number; // opcional
};

const PRODUCTS: Product[] = [
  {
    id: "P-001",
    name: "Playera Logo Minimal",
    price: 349,
    description: "Algodón 100% premium, ideal para uso diario.",
    tags: ["ropa", "básicos"],
    image:
      "https://images.unsplash.com/photo-1520975922203-b6cd49f7b2e9?q=80&w=800&auto=format&fit=crop",
    stock: 24,
  },
  {
    id: "P-002",
    name: "Gorra Snapback",
    price: 299,
    description: "Ajustable y ligera. Combina con todo.",
    tags: ["accesorios"],
    image:
      "https://images.unsplash.com/photo-1520975693416-35c5d93b2c5a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "P-003",
    name: "Termo Inox 600ml",
    price: 429,
    description: "Mantiene temperatura hasta 12h frío / 6h caliente.",
    tags: ["hogar", "termo"],
    image:
      "https://images.unsplash.com/photo-1593033304438-84f2fbd5587d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "P-004",
    name: "Sudadera Oversize",
    price: 799,
    description: "Tejido grueso, suave por dentro, corte unisex.",
    tags: ["ropa", "invierno"],
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
  },
];

// --- Utilidades ---
function classNames(...xs: (string | false | null | undefined)[]) {
  return xs.filter(Boolean).join(" ");
}

function formatCurrency(n: number, currency = BRAND.currency) {
  try {
    return new Intl.NumberFormat("es-MX", { style: "currency", currency }).format(n);
  } catch {
    return `$${n.toFixed(2)} ${currency}`;
  }
}

// --- Componentes base ---
const Container: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Section: React.FC<React.PropsWithChildren<{ id?: string; className?: string }>> = ({ id, className, children }) => (
  <section id={id} className={classNames("py-12 sm:py-16", className)}>
    <Container>{children}</Container>
  </section>
);

// --- Navbar ---
const Navbar: React.FC<{ onOpenCart: () => void }>
= ({ onOpenCart }) => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur bg-white/70 border-b border-slate-200">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-7 w-7 rounded-lg"
              style={{ background: BRAND.primary }}
            />
            <span className="font-bold tracking-tight">{BRAND.name}</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
            <a href="#catalogo" className="hover:text-slate-900">Catálogo</a>
            <a href="#destacados" className="hover:text-slate-900">Destacados</a>
            <a href="#contacto" className="hover:text-slate-900">Contacto</a>
          </div>
          <div className="flex items-center gap-3">
            <SearchBar />
            <button
              onClick={onOpenCart}
              className="relative rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              Carrito
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

// --- Hero ---
const Hero: React.FC = () => (
  <Section className="pt-10 pb-16 bg-gradient-to-b from-white to-slate-50">
    <div className="grid items-center gap-8 md:grid-cols-2">
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          {BRAND.hero.title}
        </h1>
        <p className="mt-3 text-slate-600 text-base sm:text-lg">
          {BRAND.hero.subtitle}
        </p>
        <div className="mt-6 flex gap-3">
          <a
            href="#catalogo"
            className="rounded-xl px-4 py-2 font-medium text-white shadow hover:shadow-md"
            style={{ background: BRAND.primary }}
          >
            {BRAND.hero.cta}
          </a>
          <a
            href="#destacados"
            className="rounded-xl px-4 py-2 font-medium border border-slate-300 hover:bg-slate-50"
          >
            Ver destacados
          </a>
        </div>
      </div>
      <div className="relative">
        <div className="aspect-[4/3] w-full rounded-3xl bg-slate-200 overflow-hidden shadow-lg">
          {/* Imagen decorativa */}
          <img
            src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop"
            alt="Colección de productos"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </Section>
);

// --- Buscador simple (estado global simulado mediante window) ---
const SearchBar: React.FC = () => {
  const [q, setQ] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const ev = new CustomEvent("store:search", { detail: q });
        window.dispatchEvent(ev);
      }}
      className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-1.5"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar"
        className="w-36 text-sm outline-none bg-transparent"
      />
      <button type="submit" className="text-sm px-2 py-1 rounded-lg hover:bg-slate-100">
        Ir
      </button>
    </form>
  );
};

// --- Tarjeta de producto ---
const ProductCard: React.FC<{ product: Product; onAdd: (p: Product) => void }>
= ({ product, onAdd }) => {
  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-400">Sin imagen</div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          {product.tags.slice(0, 2).map((t) => (
            <span key={t} className="rounded-full bg-white/90 px-2 py-0.5 text-xs border border-slate-200">
              #{t}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{product.name}</h3>
          <span className="font-bold text-slate-900">{formatCurrency(product.price)}</span>
        </div>
        <p className="mt-1 text-sm text-slate-600 line-clamp-2">{product.description}</p>
        {typeof product.stock === "number" && (
          <p className="mt-2 text-xs text-slate-500">Stock: {product.stock}</p>
        )}
        <div className="mt-auto pt-3">
          <button
            onClick={() => onAdd(product)}
            className="w-full rounded-xl px-3 py-2 text-sm font-medium text-white"
            style={{ background: BRAND.primary }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Grilla de productos (filtrable) ---
const ProductGrid: React.FC<{ products: Product[]; onAdd: (p: Product) => void }>
= ({ products, onAdd }) => {
  const [query, setQuery] = useState<string>("");

  // escuchar eventos del SearchBar
  React.useEffect(() => {
    const h = (e: any) => setQuery(String(e.detail || ""));
    window.addEventListener("store:search", h);
    return () => window.removeEventListener("store:search", h);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.description, p.tags.join(" ")].some((s) => s.toLowerCase().includes(q))
    );
  }, [products, query]);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
      {filtered.length === 0 && (
        <div className="col-span-full text-center text-slate-500">Sin resultados para "{query}".</div>
      )}
    </div>
  );
};

// --- Carrito ---
export type CartItem = { id: string; qty: number; product: Product };

const CartDrawer: React.FC<{
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onChangeQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}> = ({ open, items, onClose, onChangeQty, onRemove }) => {
  const subtotal = items.reduce((acc, it) => acc + it.qty * it.product.price, 0);
  const envio = items.length > 0 ? 99 : 0; // tarifa plana ejemplo
  const total = subtotal + envio;

  return (
    <div className={classNames(
      "fixed inset-0 z-50 flex",
      open ? "pointer-events-auto" : "pointer-events-none"
    )}>
      {/* backdrop */}
      <div
        className={classNames(
          "flex-1 bg-black/30 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* panel */}
      <aside
        className={classNames(
          "w-full max-w-md bg-white h-full shadow-2xl transform transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="font-semibold">Tu carrito</h2>
          <button onClick={onClose} className="rounded-lg border px-2 py-1 text-sm hover:bg-slate-50">Cerrar</button>
        </div>

        <div className="p-4 space-y-3 max-h-[60vh] overflow-auto">
          {items.length === 0 && (
            <p className="text-sm text-slate-600">Aún no has agregado productos.</p>
          )}
          {items.map((it) => (
            <div key={it.id} className="flex gap-3 items-center border rounded-xl p-3">
              <div className="h-16 w-16 bg-slate-100 rounded-lg overflow-hidden">
                {it.product.image ? (
                  <img src={it.product.image} alt={it.product.name} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{it.product.name}</p>
                <p className="text-sm text-slate-600">{formatCurrency(it.product.price)}</p>
                <div className="mt-1 flex items-center gap-2">
                  <label className="text-xs text-slate-500">Cantidad</label>
                  <input
                    type="number"
                    min={1}
                    value={it.qty}
                    onChange={(e) => onChangeQty(it.id, Math.max(1, parseInt(e.target.value || "1", 10)))}
                    className="w-16 rounded-lg border px-2 py-1 text-sm"
                  />
                  <button onClick={() => onRemove(it.id)} className="ml-auto text-xs text-red-600 hover:underline">Quitar</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto p-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Envío</span>
            <span>{envio === 0 ? "Gratis" : formatCurrency(envio)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <button
            className="w-full rounded-xl px-4 py-2 text-white font-medium mt-2"
            style={{ background: BRAND.accent }}
            onClick={() => alert("Aquí integrarías tu pasarela de pago / checkout")}
          >
            Pagar ahora
          </button>
          <p className="text-xs text-slate-500">Al continuar aceptas nuestros Términos y Política de Privacidad.</p>
        </div>
      </aside>
    </div>
  );
};

// --- Pie de página ---
const Footer: React.FC = () => (
  <footer className="mt-16 border-t bg-white">
    <Container>
      <div className="py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <h4 className="font-semibold">{BRAND.name}</h4>
          <p className="text-sm text-slate-600 mt-2">Tienda modular, rápida y flexible.</p>
        </div>
        <div>
          <h4 className="font-semibold">Enlaces</h4>
          <ul className="mt-2 text-sm text-slate-600 space-y-1">
            <li><a href="#catalogo" className="hover:underline">Catálogo</a></li>
            <li><a href="#destacados" className="hover:underline">Destacados</a></li>
            <li><a href="#contacto" className="hover:underline">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Contacto</h4>
          <p className="text-sm text-slate-600 mt-2">Ecatepec, Estado de México</p>
          <p className="text-sm text-slate-600">correo@tu-marca.mx</p>
        </div>
      </div>
      <div className="pb-6 text-xs text-slate-500">© {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.</div>
    </Container>
  </footer>
);

// --- Sección de destacados (grid simple con 3 tarjetas grandes) ---
const Featured: React.FC<{ products: Product[]; onAdd: (p: Product) => void }>
= ({ products, onAdd }) => {
  const top3 = products.slice(0, 3);
  return (
    <Section id="destacados">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Destacados</h2>
        <a href="#catalogo" className="text-sm hover:underline">Ver todo</a>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {top3.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </Section>
  );
};

// --- Página principal ---
export default function StorePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const handleAdd = (p: Product) => {
    setItems((prev) => {
      const found = prev.find((it) => it.id === p.id);
      if (found) {
        return prev.map((it) => (it.id === p.id ? { ...it, qty: it.qty + 1 } : it));
      }
      return [...prev, { id: p.id, qty: 1, product: p }];
    });
    setCartOpen(true);
  };

  const handleChangeQty = (id: string, qty: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty } : it)));
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar onOpenCart={() => setCartOpen(true)} />
      <Hero />
      <Featured products={PRODUCTS} onAdd={handleAdd} />

      <Section id="catalogo">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Catálogo</h2>
          <div className="text-sm text-slate-600">{PRODUCTS.length} productos</div>
        </div>
        <ProductGrid products={PRODUCTS} onAdd={handleAdd} />
      </Section>

      <Section id="contacto" className="bg-slate-50 rounded-t-[2.5rem]">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">¿Tienes dudas?</h3>
            <p className="text-slate-600 mt-2">Escríbenos y te ayudamos a elegir lo mejor para ti.</p>
            <ul className="mt-4 text-sm text-slate-600 space-y-1">
              <li>WhatsApp: +52 55 0000 0000</li>
              <li>Correo: contacto@tu-marca.mx</li>
              <li>Horario: Lun–Vie 9:00–18:00</li>
            </ul>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Aquí conectarías tu backend o servicio de formularios");
            }}
            className="bg-white p-4 rounded-2xl border space-y-3"
          >
            <div>
              <label className="block text-sm mb-1">Nombre</label>
              <input className="w-full rounded-xl border px-3 py-2" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input type="email" className="w-full rounded-xl border px-3 py-2" placeholder="correo@ejemplo.com" />
            </div>
            <div>
              <label className="block text-sm mb-1">Mensaje</label>
              <textarea className="w-full rounded-xl border px-3 py-2" rows={4} placeholder="¿Cómo podemos ayudarte?" />
            </div>
            <button
              type="submit"
              className="rounded-xl px-4 py-2 text-white font-medium"
              style={{ background: BRAND.primary }}
            >
              Enviar
            </button>
          </form>
        </div>
      </Section>

      <Footer />

      <CartDrawer
        open={cartOpen}
        items={items}
        onClose={() => setCartOpen(false)}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
      />

      {/* Detalle visual del tema */}
      <style>{`
        :root {
          --brand: ${BRAND.primary};
          --accent: ${BRAND.accent};
        }
        .brand-gradient { background-image: linear-gradient(135deg, var(--brand), var(--accent)); }
      `}</style>
    </div>
  );
}
