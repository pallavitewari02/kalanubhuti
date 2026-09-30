import { useEffect, useState } from 'react';
import { Facebook, Instagram, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CategoryExplorer } from '../components/CategoryExplorer';
import { ZoomPhoto } from '../components/ZoomPhoto';
import { ExhibitionSlider } from '../components/ExhibitionSlider';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { formatAboutParagraph } from '../components/AboutCopy';
import { aboutImage, aboutPreviewParagraphs } from '../data/about';
import { blogPosts } from '../data/blog';
import { products } from '../data/gallery';

const images = {
  hero: '/hero.jpg',
  brushes: '/custom-orders.jpg',
};

export function HomePage() {
  const location = useLocation();
  const [openProduct, setOpenProduct] = useState<{ name: string; image: string } | null>(null);

  useEffect(() => {
    if (!openProduct) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenProduct(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openProduct]);

  useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location]);

  return (
    <main>
      <section className="kala-hero" id="home">
        <img src={images.hero} alt="Handmade Tradition, Modern Expression folk art illustration" />
        <div className="hero-message">
          <h1>
            Handmade Traditions,
            <br />
            Modern Expressions
          </h1>
          <a href="#gallery" className="brick-button">
            Explore Gallery
          </a>
        </div>
      </section>

      <section className="paper-section about-section" id="about">
        <OrnamentalHeading>About Me</OrnamentalHeading>
        <div className="about-layout">
          <img src={aboutImage} alt="Neha painting a traditional Indian artwork" />
          <div className="about-copy">
            {aboutPreviewParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{formatAboutParagraph(paragraph)}</p>
            ))}
            <Link to="/about" className="brick-button">
              Read More
            </Link>
          </div>
        </div>
      </section>

      <section className="paper-section gallery-section" id="gallery">
        <OrnamentalHeading>My Gallery</OrnamentalHeading>
        <CategoryExplorer />
      </section>

      <section className="shop-strip" id="shop">
        <div className="shop-inner">
          <OrnamentalHeading>Shop: Featured Products</OrnamentalHeading>
          <div className="product-grid">
            {products.map((product, index) => (
              <article className="product-card" key={`${product.name}-${index}`}>
                <button
                  className="product-photo"
                  type="button"
                  onClick={() => setOpenProduct({ name: product.name, image: product.image })}
                >
                  <img src={product.image} alt={product.name} />
                </button>
                <h3>{product.name}</h3>
                <strong>{product.price}</strong>
                <Link
                  className="brick-button"
                  to={`/buy-now?product=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}`}
                >
                  Buy now
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ExhibitionSlider />

      <section className="paper-section custom-section" id="custom-order">
        <div className="custom-copy">
          <OrnamentalHeading>Custom Orders</OrnamentalHeading>
          <p>
            <strong>Create Your Own Artwork!</strong> Have a unique idea?
          </p>
          <p>I can craft a custom piece just for you.</p>
          <Link to="/custom-order" className="brick-button">
            Request a Custom Piece
          </Link>
        </div>
        <img src={images.brushes} alt="Custom orders studio table with folk painting, pigments, and brushes" />
      </section>

      <section className="paper-section lower-section">
        <div className="blog-column">
          <OrnamentalHeading>From the Blog</OrnamentalHeading>
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.slug}>
                <Link to={`/blog/${post.slug}`}>
                  <img src={post.image} alt={post.imageAlt} />
                  <h3>{post.title}</h3>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-section contact-section" id="contact">
        <OrnamentalHeading>
          <Link to="/contact">Contact us</Link>
        </OrnamentalHeading>
        <p className="contact-invite">Have a question about a painting or a custom piece? Write to us.</p>
        <Link to="/contact" className="brick-button">
          Contact us
        </Link>
        <h3>Follow Me</h3>
        <div className="social-links">
          <a href="https://www.facebook.com/share/19ZWbmJWU2/" aria-label="Facebook" target="_blank" rel="noreferrer">
            <Facebook size={18} />
          </a>
          <a href="https://www.instagram.com/v.neha13?stkn=YjN5YjhxZ2hrd2Qy" aria-label="Instagram" target="_blank" rel="noreferrer">
            <Instagram size={18} />
          </a>
        </div>
      </section>
      {openProduct && (
        <div className="exhibition-lightbox" role="dialog" aria-modal="true" aria-label={openProduct.name}>
          <button className="exhibition-close" type="button" aria-label="Close" onClick={() => setOpenProduct(null)}>
            <X size={22} />
          </button>
          <ZoomPhoto src={openProduct.image} alt={openProduct.name} />
        </div>
      )}
    </main>
  );
}
