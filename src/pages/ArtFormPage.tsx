import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { findGallery } from '../data/gallery';

export function ArtFormPage() {
  const { slug } = useParams();
  const form = slug ? findGallery(slug) : undefined;
  const [openImage, setOpenImage] = useState<{ src: string; name: string } | null>(null);

  useEffect(() => {
    if (!openImage) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenImage(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openImage]);

  if (!form) {
    return (
      <main className="paper-section art-form-page">
        <OrnamentalHeading>Artwork not found</OrnamentalHeading>
        <p className="art-form-empty">This art form is not in the gallery yet.</p>
        <Link className="brick-button gallery-button" to="/#gallery">
          Back to Gallery
        </Link>
      </main>
    );
  }

  const photos =
    'products' in form && form.products.length > 0
      ? form.products
      : form.image
        ? [{ name: form.name, image: form.image, price: '' }]
        : [];

  return (
    <main className="paper-section art-form-page">
      <OrnamentalHeading>{form.name} Art</OrnamentalHeading>
      {'typeOfPainting' in form && form.typeOfPainting && form.typeOfPainting.length > 0 && (
        <p className="order-product">{form.typeOfPainting.join(', ')}</p>
      )}
      {photos.length === 0 ? (
        <p className="art-form-empty">Updating soon</p>
      ) : (
        <div className="art-form-grid">
          {photos.map((photo) => (
            <button
              className="gallery-card"
              type="button"
              key={photo.image}
              onClick={() => setOpenImage({ src: photo.image, name: photo.name })}
            >
              <img src={photo.image} alt={photo.name} />
              <h3>{photo.name}</h3>
              {photo.price && <strong>{photo.price}</strong>}
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
