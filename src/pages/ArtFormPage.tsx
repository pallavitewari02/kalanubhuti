import { Link, useParams } from 'react-router-dom';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { findArtFormBySlug } from '../data/artCategories';

export function ArtFormPage() {
  const { slug } = useParams();
  const form = slug ? findArtFormBySlug(slug) : undefined;

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
      <div className="art-form-grid">
        {form.paintings.map((painting) => (
          <article className="gallery-card" key={painting.id}>
            <img src={painting.image} alt={painting.title} />
            <h3>{painting.title}</h3>
          </article>
        ))}
      </div>
      <Link className="brick-button gallery-button" to="/#gallery">
        Back to Gallery
      </Link>
    </main>
  );
}
