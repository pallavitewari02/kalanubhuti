import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArtworkPopup } from '../components/ArtworkPopup';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { findArtForm, type GallerySlide } from '../data/gallery';

export function ArtFormPage() {
  const { categorySlug, artSlug } = useParams();
  const match = categorySlug && artSlug ? findArtForm(categorySlug, artSlug) : undefined;
  const form = match?.child;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!form || !match) {
    return (
      <main className="paper-section art-form-page">
        <OrnamentalHeading>Artwork not found</OrnamentalHeading>
        <p className="art-form-empty">This art form is not in the gallery yet.</p>
        <Link className="brick-button gallery-button" to="/gallery">
          Back to Gallery
        </Link>
      </main>
    );
  }

  const slides: GallerySlide[] = form.products
    .filter((product) => product.image)
    .map((product) => ({
      name: product.name,
      image: product.image,
      artForm: form.name,
      detail: form.detail ?? '',
      paintingType: product.paintingType ?? '',
      price: product.price,
      size: product.size,
    }));
  const openSlide = openIndex === null ? null : slides[openIndex];

  return (
    <main className="paper-section art-form-page">
      <OrnamentalHeading>{form.name} Art</OrnamentalHeading>
      {form.typeOfPainting && form.typeOfPainting.length > 0 && (
        <p className="order-product">{form.typeOfPainting.join(', ')}</p>
      )}
      {slides.length === 0 ? (
        <p className="art-form-empty">Updating soon</p>
      ) : (
        <div className="art-form-grid">
          {slides.map((slide, index) => (
            <button className="gallery-card" key={slide.image} type="button" onClick={() => setOpenIndex(index)}>
              <img src={slide.image} alt={slide.name} />
              <h3>{slide.name}</h3>
            </button>
          ))}
        </div>
      )}
      <Link className="brick-button gallery-button" to="/gallery">
        Back to Gallery
      </Link>
      {openSlide && (
        <ArtworkPopup
          slide={openSlide}
          onClose={() => setOpenIndex(null)}
          onPrev={() => setOpenIndex((current) => (current === null ? 0 : (current - 1 + slides.length) % slides.length))}
          onNext={() => setOpenIndex((current) => (current === null ? 0 : (current + 1) % slides.length))}
        />
      )}
    </main>
  );
}
