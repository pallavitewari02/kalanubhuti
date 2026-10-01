import { useEffect, useLayoutEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { artFormPath, categoryPath, gallery } from '../data/gallery';
import { rememberScroll, restoreScroll } from './BackHome';

export function Layout() {
  const location = useLocation();
  useEffect(() => rememberScroll(location.key), [location.key]);
  useLayoutEffect(() => restoreScroll(location.key), [location.key]);
  return (
    <div className="kala-site">
      <div className="top-border" />
      <header className="kala-header">
        <Link className="kala-brand" to="/">
          <img className="brand-logo" src="/logo.jpg" alt="" />
          <span>Kalanubhuti</span>
        </Link>
        <nav className="kala-nav" aria-label="Main navigation">
          <div className="nav-dropdown">
            <Link to="/gallery">Gallery</Link>
            <ul className="nav-menu">
              {gallery
                .filter((category) => category.id !== '2')
                .map((category) => (
                <li key={category.id}>
                  <Link className="nav-parent" to={categoryPath(category)}>
                    {category.name}
                  </Link>
                  {category.children
                    ?.filter((child) => child.image)
                    .map((child) => (
                      <Link className="nav-child" key={child.id} to={artFormPath(category, child)}>
                        {child.name}
                      </Link>
                    ))}
                </li>
              ))}
            </ul>
          </div>
          <Link to="/shop">Shop</Link>
          <Link to="/custom-order">Custom Order</Link>
          <Link to="/contact">Get in Touch</Link>
        </nav>
        <span className="header-spacer" aria-hidden="true" />
      </header>
      <Outlet />
      <footer className="kala-footer">© 2026 Kalanubhuti · Handmade with love and heritage</footer>
    </div>
  );
}
