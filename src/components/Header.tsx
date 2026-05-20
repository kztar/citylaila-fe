"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, ChevronDown, Search } from "lucide-react";
import { Container, Form, InputGroup, Button, Dropdown, Badge } from "react-bootstrap";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Activities", href: "/activities" },
  { label: "Packages", href: "/packages" },
  { label: "Visa", href: "https://visa.citylaila.com/", external: true },
  { label: "All Categories", href: "/categories", hasDropdown: true },
  { label: "Contact Us", href: "/contact-us" },
];

const categoryDropdown = [
  { label: "City Tours", href: "/city-tours/tours-by-type/city-tours-290159.aspx" },
  { label: "Adventure Tours", href: "/city-tours/tours-by-type/Adventure-Tours-290170.aspx" },
  { label: "Theme Parks", href: "/city-tours/tours-by-type/Theme-Parks-11692.aspx" },
  { label: "Dhow Cruise", href: "/city-tours/tours-by-type/Dhow-Cruise-289851.aspx" },
  { label: "Desert Safari Tours", href: "/city-tour/tour-details/Desert-Safari-Dubai-Online-Tickets-13247.aspx" },
  { label: "Water Activities", href: "/city-tours/tours-by-type/Water-Activities-289867.aspx" },
  { label: "Combo Deals", href: "/combo-deals" },
  { label: "Free Ticket Offer", href: "/Free-Ticket-Offer" },
];

const languages = [
  { code: "EN", flag: "🇦🇪", label: "English" },
  { code: "AR", flag: "🇸🇦", label: "العربية" },
  { code: "RU", flag: "🇷🇺", label: "Русский" },
  { code: "ES", flag: "🇪🇸", label: "Español" },
  { code: "ZH", flag: "🇨🇳", label: "中文" },
  { code: "FR", flag: "🇫🇷", label: "Français" },
];

const currencies = [
  { code: "AED", name: "UAE Dirham",          symbol: "د.إ" },
  { code: "USD", name: "US Dollar",           symbol: "$"   },
  { code: "EUR", name: "Euro",                symbol: "€"   },
  { code: "GBP", name: "British Pound",       symbol: "£"   },
  { code: "SAR", name: "Saudi Riyal",         symbol: "ر.س" },
  { code: "INR", name: "Indian Rupee",        symbol: "₹"   },
  { code: "MYR", name: "Malaysian Ringgit",   symbol: "RM"  },
  { code: "OMR", name: "Omani Rial",          symbol: "ر.ع." },
  { code: "THB", name: "Thai Baht",           symbol: "฿"   },
  { code: "NZD", name: "New Zealand Dollar",  symbol: "NZ$" },
  { code: "EGP", name: "Egyptian Pound",      symbol: "E£"  },
  { code: "KWD", name: "Kuwaiti Dinar",       symbol: "د.ك" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(0);
  const [query, setQuery] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [language, setLanguage] = useState(languages[0]);
  const [currency, setCurrency] = useState(currencies[0]);
  const router = useRouter();
  const pathname = usePathname();

  // Routes that render their own search UI in the page body — hide the header's
  // site-wide search strip on these so it doesn't duplicate.
  const HIDE_SEARCH_STRIP_ON = ["/packages"];
  const showSearchStrip = !HIDE_SEARCH_STRIP_ON.some((p) => pathname === p || pathname?.startsWith(`${p}/`));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className={cn("cl-header", scrolled && "scrolled")}>
      {/* ── Top nav row ── */}
      <Container className="d-flex align-items-center justify-content-between" style={{ height: 58 }}>
        {/* Logo */}
        <Link href="/" className="d-flex align-items-center flex-shrink-0">
          <img
            alt="CityLaila"
            width={100}
            height={32}
            src="https://d3gvlpbdidhqp.cloudfront.net/assets/WhitelableLogo/1/2/logo.webp?v4"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="d-none d-lg-flex align-items-center gap-4">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                className="position-relative"
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                <button className="cl-nav-link d-inline-flex align-items-center gap-1">
                  {link.label}
                  <ChevronDown
                    size={13}
                    className={cn("transition", catOpen && "rotate-180")}
                    style={{ transform: catOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}
                  />
                </button>
                {catOpen && (
                  <div className="cl-cat-dropdown">
                    {categoryDropdown.map((item) => (
                      <Link key={item.href} href={item.href}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                className="cl-nav-link"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right actions (desktop) */}
        <div className="d-none d-lg-flex align-items-center gap-3">
          {/* Language dropdown */}
          <Dropdown align="end" className="cl-header-dd">
            <Dropdown.Toggle
              as="button"
              className="cl-nav-link cl-header-dd-toggle d-inline-flex align-items-center gap-1 border-0 bg-transparent"
              style={{ fontSize: 12 }}
              aria-label="Select language"
            >
              <span>{language.flag}</span>
              <span>{language.code}</span>
              <ChevronDown size={11} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="cl-header-dd-menu">
              {languages.map((lang) => (
                <Dropdown.Item
                  key={lang.code}
                  active={lang.code === language.code}
                  onClick={() => setLanguage(lang)}
                >
                  <span className="me-2">{lang.flag}</span>
                  {lang.label} <span className="text-secondary ms-1">({lang.code})</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {/* Currency dropdown */}
          <Dropdown align="end" className="cl-header-dd">
            <Dropdown.Toggle
              as="button"
              className="cl-nav-link cl-header-dd-toggle d-inline-flex align-items-center gap-1 border-0 bg-transparent"
              style={{ fontSize: 12 }}
              aria-label="Select currency"
            >
              {currency.code}
              <ChevronDown size={11} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="cl-header-dd-menu cl-currency-menu">
              {currencies.map((cur) => (
                <Dropdown.Item
                  key={cur.code}
                  active={cur.code === currency.code}
                  onClick={() => setCurrency(cur)}
                  className="d-flex align-items-center"
                >
                  <span>
                    <span className="fw-semibold">{cur.code}</span>
                    <span className="text-secondary ms-2">{cur.name}</span>
                  </span>
                  <span className="ms-auto cl-currency-symbol">{cur.symbol}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Button variant="link" className="position-relative p-1 border-0 cl-cart-btn" aria-label="Cart">
            <ShoppingCart size={20} className="cl-text-muted" />
            {cartCount > 0 && (
              <Badge pill bg="" className="cl-cart-badge">
                {cartCount}
              </Badge>
            )}
          </Button>
          <Button as={Link as unknown as "a"} href="/login" className="btn-cta btn-cta-pill">
            Log in / sign up
          </Button>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="d-flex d-lg-none align-items-center gap-3">
          <Button variant="link" className="position-relative p-1 border-0 cl-cart-btn" aria-label="Cart">
            <ShoppingCart size={20} className="cl-text-muted" />
            {cartCount > 0 && (
              <Badge pill bg="" className="cl-cart-badge">
                {cartCount}
              </Badge>
            )}
          </Button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="btn p-1 border-0 bg-transparent"
            style={{ color: "var(--cl-text-dark)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* ── Search bar strip (hidden on pages that render their own search UI) ── */}
      {showSearchStrip && (
        <div className="cl-search-strip">
          <Container>
            <Form onSubmit={handleSearch}>
              <InputGroup className="cl-search-group">
                <InputGroup.Text className="cl-search-icon" aria-hidden="true">
                  <Search size={15} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={query}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                  placeholder="Find your activities"
                  aria-label="Find your activities"
                />
                <Button type="submit" className="btn-cta cl-search-submit" aria-label="Search">
                  <Search size={18} />
                </Button>
              </InputGroup>
            </Form>
          </Container>
        </div>
      )}

      {/* ── Mobile drawer ── */}
      <div className={cn("cl-mobile-overlay d-lg-none", mobileOpen && "open")}>
        <div className="position-absolute top-0 start-0 end-0 bottom-0" onClick={() => setMobileOpen(false)} />
        <div className="cl-mobile-drawer">
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <span className="cl-logo-wordmark sm">
              City <span className="script">Laila</span>
            </span>
            <button onClick={() => setMobileOpen(false)} className="btn p-0 border-0 bg-transparent text-secondary">
              <X size={22} />
            </button>
          </div>
          <nav className="flex-grow-1 overflow-auto">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-3 border-top">
            <Button
              as={Link as unknown as "a"}
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="btn-cta w-100 rounded-pill py-2 fw-semibold"
            >
              Log in / sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}