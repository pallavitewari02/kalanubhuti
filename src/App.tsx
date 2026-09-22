import { useState } from 'react';
import { ArrowRight, Facebook, Instagram, Linkedin, ShoppingCart } from 'lucide-react';

const images = {
  hero: 'https://images.pexels.com/photos/368727/pexels-photo-368727.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
  about: 'https://images.pexels.com/photos/22820070/pexels-photo-22820070.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  galleryOne: 'https://images.pexels.com/photos/29625840/pexels-photo-29625840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  galleryTwo: 'https://images.pexels.com/photos/22820069/pexels-photo-22820069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  galleryThree: 'https://images.pexels.com/photos/22820076/pexels-photo-22820076.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  brushes: 'https://images.pexels.com/photos/9609267/pexels-photo-9609267.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const gallery = [
  { title: 'Madhubani Art', image: images.galleryOne },
  { title: 'Meenakari Art', image: images.galleryTwo },
  { title: 'Lippan Art', image: images.galleryThree },
];

const products = [
  { title: 'Handmade Painting', image: images.galleryOne },
  { title: 'Handmade Painting', image: images.galleryTwo },
  { title: 'Handmade Painting', image: images.galleryThree },
  { title: 'Handmade Painting', image: images.hero },
];

function OrnamentalHeading({ children }: { children: string }) {
  return <h2 className="ornamental-heading"><span>❧</span>{children}<span>❧</span></h2>;
}

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="kala-site">
      <div className="top-border" />
      <header className="kala-header">
        <a className="kala-brand" href="#home"><span className="brand-sun">✺</span><span>Art by Your Name</span></a>
        <nav className="kala-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#gallery">Gallery</a>
          <a href="#shop">Shop</a>
          <a href="#custom-order">Custom Order</a>
        </nav>
        <button className="cart-button" onClick={() => setCartCount((count) => count + 1)} aria-label="Add a featured painting to cart">
          <ShoppingCart size={17} /> {cartCount > 0 && <span>{cartCount}</span>}
        </button>
      </header>

      <main>
        <section className="kala-hero" id="home">
          <img src={images.hero} alt="Women in traditional Indian dress surrounded by colorful folk art" />
          <div className="hero-overlay" />
          <div className="hero-message"><h1>Handmade Traditions,<br />Modern Expressions</h1><a href="#gallery" className="brick-button">Explore Gallery</a></div>
        </section>

        <section className="paper-section about-section" id="about">
          <OrnamentalHeading>About Me</OrnamentalHeading>
          <div className="about-layout">
            <img src={images.about} alt="Artist painting a traditional Indian artwork" />
            <div className="about-copy"><p>Welcome! I am <strong>[Your Name]</strong>, an artist passionate about traditional Indian art forms like Madhubani, Meenakari, and Lippan Art. Creating with love and heritage.</p><a href="#custom-order" className="brick-button">Read More</a></div>
          </div>
        </section>

        <section className="paper-section gallery-section" id="gallery">
          <OrnamentalHeading>My Gallery</OrnamentalHeading>
          <div className="gallery-grid">{gallery.map((item) => <a className="gallery-card" href="#shop" key={item.title}><img src={item.image} alt={item.title} /><h3>{item.title}</h3></a>)}</div>
          <a href="#shop" className="brick-button gallery-button">View More</a>
        </section>

        <section className="shop-strip" id="shop">
          <div className="shop-inner"><OrnamentalHeading>Shop: Featured Products</OrnamentalHeading><div className="product-grid">{products.map((product, index) => <article className="product-card" key={`${product.title}-${index}`}><img src={product.image} alt={product.title} /><h3>{product.title}</h3><strong>₹2,500</strong><button className="brick-button" onClick={() => setCartCount((count) => count + 1)}>Add to Cart</button></article>)}</div></div>
        </section>

        <section className="paper-section custom-section" id="custom-order">
          <div className="custom-copy"><OrnamentalHeading>Custom Orders</OrnamentalHeading><p><strong>Create Your Own Artwork!</strong> Have a unique idea?</p><p>I can craft a custom piece just for you.</p><a className="brick-button" href="mailto:hello@aangan.art">Request a Custom Piece</a></div>
          <img src={images.brushes} alt="Paint brushes and colorful art supplies on a studio table" />
        </section>

        <section className="paper-section lower-section">
          <div className="blog-column"><OrnamentalHeading>From the Blog</OrnamentalHeading><div className="blog-grid"><article><img src={images.galleryTwo} alt="Colorful traditional painting" /><h3>The Art of Madhubani</h3></article><article><img src={images.galleryOne} alt="Traditional Indian artwork" /><h3>The Magic of Meenakari</h3></article></div></div>
          <div className="contact-column"><OrnamentalHeading>Contact</OrnamentalHeading><h3>Testimonials</h3><div className="testimonial"><img src={images.galleryThree} alt="Traditional figures in a colorful painting" /><p>“Beautiful work, made with so much heart.”</p></div><h3>Follow Me</h3><div className="social-links"><a href="#contact" aria-label="Facebook"><Facebook size={18} /></a><a href="#contact" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="#contact" aria-label="Instagram"><Instagram size={18} /></a></div></div>
        </section>
      </main>
      <footer className="kala-footer">© 2025 Art by Your Name · Handmade with love and heritage</footer>
    </div>
  );
}

export default App;
