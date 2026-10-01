import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArtworkPopup } from '../components/ArtworkPopup';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { artFormPath, findCategoryBySlug, type GallerySlide } from '../data/gallery';

export function CategoryPage() {
  const { categorySlug } = useParams();
  const category = categorySlug ? findCategoryBySlug(categorySlug) : undefined;
  const children = category && 'children' in category ? category.children?.filter((child) => child.image) : undefined;
  const paintings = category && 'products' in category ? category.products : undefined;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!category) {
    return (
      <main className="paper-section art-form-page">
        <OrnamentalHeading>Artwork not found</OrnamentalHeading>
        <p className="art-form-empty">This collection is not in the gallery yet.</p>
        <Link className="brick-button gallery-button" to="/gallery">
          Back to Gallery
        </Link>
      </main>
    );
  }

  const slides: GallerySlide[] = (paintings ?? [])
    .filter((product) => product.image)
    .map((product) => ({
      name: product.name,
      image: product.image,
      artForm: category.name,
      detail: category.detail ?? '',
      paintingType: product.paintingType ?? '',
      price: product.price,
      size: product.size,
    }));
  const openSlide = openIndex === null ? null : slides[openIndex];

  return (
    <main className="paper-section art-form-page">
      <OrnamentalHeading>{category.name}</OrnamentalHeading>
      <div className="category-split">
        <img className="category-page-cover" src={category.image} alt={category.name} />
        {category.desc && <p className="category-intro">{category.desc}</p>}
      </div>
      {children && children.length > 0 && (
        <div className="art-form-grid">
          {children.map((child) => (
            <Link className="gallery-card" key={child.id} to={artFormPath(category, child)}>
              <img src={child.image} alt={child.name} />
              <h3>{child.name}</h3>
            </Link>
          ))}
        </div>
      )}
      {slides.length > 0 && (
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
