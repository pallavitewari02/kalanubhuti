import { Link, useParams } from 'react-router-dom';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { findGallery } from '../data/gallery';

export function ArtFormPage() {
  const { slug } = useParams();
  const form = slug ? findGallery(slug) : undefined;

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

  return (
    <main className="paper-section art-form-page">
      <OrnamentalHeading>{form.name} Art</OrnamentalHeading>
      {'typeOfPainting' in form && form.typeOfPainting && form.typeOfPainting.length > 0 && (
        <p className="order-product">{form.typeOfPainting.join(', ')}</p>
      )}
      <div className="art-form-grid">
        <article className="gallery-card">
          <img src={form.image} alt={form.name} />
          <h3>{form.name}</h3>
        </article>
        {'products' in form &&
          form.products.map((product) => (
            <article className="gallery-card" key={product.image}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <strong>{product.price}</strong>
            </article>
          ))}
      </div>
      <Link className="brick-button gallery-button" to="/#gallery">
        Back to Gallery
      </Link>
    </main>
  );
}
