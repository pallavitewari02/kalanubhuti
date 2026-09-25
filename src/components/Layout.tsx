import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="kala-site">
      <div className="top-border" />
      <header className="kala-header">
        <Link className="kala-brand" to="/#home">
          <span>Kalanubhuti</span>
        </Link>
        <nav className="kala-nav" aria-label="Main navigation">
          <Link to="/#home">Home</Link>
          <Link to="/#gallery">Gallery</Link>
          <Link to="/#shop">Shop</Link>
          <Link to="/custom-order">Custom Order</Link>
        </nav>
        <span className="header-spacer" aria-hidden="true" />
      </header>
      <Outlet />
      <footer className="kala-footer">© 2025 Kalanubhuti · Handmade with love and heritage</footer>
    </div>
  );
}
