import { Link, useParams } from 'react-router-dom';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { findArtForm, paintingPath } from '../data/gallery';

export function ArtFormPage() {
  const { categorySlug, artSlug } = useParams();
  const match = categorySlug && artSlug ? findArtForm(categorySlug, artSlug) : undefined;
  const form = match?.child;

  if (!form) {
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
            <Link className="gallery-card" key={photo.image} to={match && 'slug' in photo ? paintingPath(match.category, photo, match.child) : '#'}>
              <img src={photo.image} alt={photo.name} />
              <h3>{photo.name}</h3>
              {photo.price && <strong>{photo.price}</strong>}
            </Link>
          ))}
        </div>
      )}
      <Link className="brick-button gallery-button" to="/gallery">
        Back to Gallery
      </Link>
    </main>
  );
}
