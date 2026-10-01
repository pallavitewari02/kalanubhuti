import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Facebook, Instagram, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ArtworkPopup } from '../components/ArtworkPopup';
import { ZoomPhoto } from '../components/ZoomPhoto';
import { ExhibitionSlider } from '../components/ExhibitionSlider';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { formatAboutParagraph } from '../components/AboutCopy';
import { aboutImage, aboutPreviewParagraphs } from '../data/about';
import { blogPosts } from '../data/blog';
import { gallerySlides, products } from '../data/gallery';

const images = {
  hero: '/hero.jpg',
  brushes: '/custom-orders.jpg',
};

export function HomePage() {
  const location = useLocation();
  const slides = gallerySlides();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openProduct, setOpenProduct] = useState<{ name: string; image: string } | null>(null);
  const [paused, setPaused] = useState(false);
  const openSlide = openIndex === null ? null : slides[openIndex];
  const featuredRow = useRef<HTMLDivElement>(null);
  const scrollFeatured = (direction: number) => {
    const row = featuredRow.current;
    if (!row) return;
    row.scrollBy({ left: direction * row.clientWidth, behavior: 'smooth' });
  };

  const stepSlide = (direction: number) => {
    setOpenIndex((current) => {
      if (current === null || slides.length === 0) return 0;
      return (current + direction + slides.length) % slides.length;
    });
  };

  useEffect(() => {
    if (!openProduct && !openSlide) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenProduct(null);
        setOpenIndex(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openProduct, openSlide]);

  useEffect(() => {
    const section = location.pathname === '/gallery' ? 'gallery' : location.pathname === '/shop' ? 'shop' : '';
    if (!section) return;
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.pathname]);

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
          <Link to="/gallery" className="brick-button">
            Explore Gallery
          </Link>
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
        <OrnamentalHeading>My gallery</OrnamentalHeading>
        <div
          className={`studio-marquee${paused || openSlide ? ' is-paused' : ''}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="studio-track">
            {[...slides, ...slides].map((slide, index) => (
              <button
                className="studio-slide"
                type="button"
                key={`${slide.image}-${index}`}
                onClick={() => setOpenIndex(index % slides.length)}
              >
                <img src={slide.image} alt={slide.name} />
                <span>{slide.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-strip" id="shop">
        <div className="shop-inner">
          <OrnamentalHeading>Shop: Featured Products</OrnamentalHeading>
          <div className="featured-row">
            <div className="product-grid" ref={featuredRow}>
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
            <button className="featured-prev" type="button" aria-label="Previous featured products" onClick={() => scrollFeatured(-1)}>
              <ChevronLeft size={28} />
            </button>
            <button className="featured-next" type="button" aria-label="More featured products" onClick={() => scrollFeatured(1)}>
              <ChevronRight size={28} />
            </button>
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
          <Link to="/contact">Get in Touch</Link>
        </OrnamentalHeading>
        <p className="contact-invite">Have a question about a painting or a custom piece? Write to us.</p>
        <Link to="/contact" className="brick-button">
          Get in Touch
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
      {openSlide && (
        <ArtworkPopup
          slide={openSlide}
          onClose={() => setOpenIndex(null)}
          onPrev={() => stepSlide(-1)}
          onNext={() => stepSlide(1)}
        />
      )}
    </main>
  );
}
