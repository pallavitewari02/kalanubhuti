import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { findGallery } from '../data/gallery';

export function CategoryPage() {
  const { id } = useParams();
  const category = id ? findGallery(id) : undefined;
  const children = category && 'children' in category ? category.children?.filter((child) => child.image) : undefined;
  const paintings = category && 'products' in category ? category.products : undefined;
  const [openImage, setOpenImage] = useState<{ src: string; name: string } | null>(null);

  useEffect(() => {
    if (!openImage) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenImage(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openImage]);

  if (!category) {
    return (
      <main className="paper-section art-form-page">
        <OrnamentalHeading>Artwork not found</OrnamentalHeading>
        <p className="art-form-empty">This collection is not in the gallery yet.</p>
        <Link className="brick-button gallery-button" to="/#gallery">
          Back to Gallery
        </Link>
      </main>
    );
  }

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
            <Link className="gallery-card" key={child.id} to={`/art/${child.id}`}>
              <img src={child.image} alt={child.name} />
              <h3>{child.name}</h3>
            </Link>
          ))}
        </div>
      )}
      {paintings && paintings.length > 0 && (
        <div className="art-form-grid">
          {paintings.map((painting) => (
            <button
              className="gallery-card"
              type="button"
              key={painting.image}
              onClick={() => setOpenImage({ src: painting.image, name: painting.name })}
            >
              <img src={painting.image} alt={painting.name} />
              <h3>{painting.name}</h3>
            </button>
          ))}
        </div>
      )}
      <Link className="brick-button gallery-button" to="/#gallery">
        Back to Gallery
      </Link>
      {openImage && (
        <div className="exhibition-lightbox" role="dialog" aria-modal="true" aria-label={openImage.name}>
          <button className="exhibition-close" type="button" aria-label="Close" onClick={() => setOpenImage(null)}>
            <X size={22} />
          </button>
          <img src={openImage.src} alt={openImage.name} />
        </div>
      )}
    </main>
  );
}
