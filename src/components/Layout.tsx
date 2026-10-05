import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigationType } from 'react-router-dom';
import { artFormPath, categoryPath, gallery } from '../data/gallery';
import { rememberScroll, restoreScroll } from './BackHome';

export function Layout() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousPath = useRef(location.pathname);
  useEffect(() => rememberScroll(location.key), [location.key]);
  useLayoutEffect(() => {
    const fromBlog = navigationType === 'POP' && previousPath.current.startsWith('/blog') && location.pathname === '/';
    const fromCustomOrder = navigationType === 'POP' && previousPath.current === '/custom-order' && location.pathname === '/';
    const sectionState = (location.state as { section?: string } | null)?.section;
    const toBlog = sectionState === 'blog';
    const toAbout = sectionState === 'about';
    previousPath.current = location.pathname;
    if (location.pathname.startsWith('/blog/')) {
      window.scrollTo(0, 0);
      return;
    }
    const section = location.pathname === '/shop' ? 'shop' : toBlog || fromBlog ? 'blog' : toAbout ? 'about' : fromCustomOrder ? 'custom-order' : '';
    if (section) {
      document.getElementById(section)?.scrollIntoView({ block: 'start' });
      return;
    }
    if (location.pathname === '/gallery' || location.pathname === '/buy-now') {
      window.scrollTo(0, 0);
      return;
    }
    restoreScroll(location.key);
  }, [location, navigationType]);
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
      <footer className="kala-footer">
        © 2026 Kalanubhuti · Handmade with love and heritage
        <Link to="/data-privacy">Data Privacy & Protection</Link>
      </footer>
    </div>
  );
}
