import { useEffect } from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CategoryExplorer } from '../components/CategoryExplorer';
import { formatAboutParagraph } from '../components/AboutCopy';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { aboutPreviewParagraphs } from '../data/about';

const images = {
  hero: '/hero.jpg',
  about: 'https://images.pexels.com/photos/22820070/pexels-photo-22820070.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  galleryOne: 'https://images.pexels.com/photos/29625840/pexels-photo-29625840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  galleryTwo: 'https://images.pexels.com/photos/22820069/pexels-photo-22820069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  galleryThree: 'https://images.pexels.com/photos/22820076/pexels-photo-22820076.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  brushes: '/custom-orders.jpg',
  shopFour: 'https://images.pexels.com/photos/368727/pexels-photo-368727.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const products = [
  { title: 'Handmade Painting', image: images.galleryOne },
  { title: 'Handmade Painting', image: images.galleryTwo },
  { title: 'Handmade Painting', image: images.galleryThree },
  { title: 'Handmade Painting', image: images.shopFour },
];

export function HomePage() {
  const location = useLocation();

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
          <img src={images.about} alt="Neha painting a traditional Indian artwork" />
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
              <article className="product-card" key={`${product.title}-${index}`}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <strong>₹2,500</strong>
                <Link className="brick-button" to={`/buy-now?product=${encodeURIComponent(product.title)}`}>
                  Buy now
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

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
            <article>
              <Link to="/blog/art-of-madhubani">
                <img src={images.galleryTwo} alt="Colorful traditional painting" />
                <h3>The Art of Madhubani</h3>
              </Link>
            </article>
            <article>
              <Link to="/blog/magic-of-meenakari">
                <img src={images.galleryOne} alt="Traditional Indian artwork" />
                <h3>The Magic of Meenakari</h3>
              </Link>
            </article>
            <article>
              <Link to="/blog/lippan-art">
                <img src={images.galleryThree} alt="Lippan mud mirror artwork" />
                <h3>Lippan Art</h3>
              </Link>
            </article>
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
          <a href="#contact" aria-label="Facebook">
            <Facebook size={18} />
          </a>
          <a href="#contact" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href="#contact" aria-label="Instagram">
            <Instagram size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}
