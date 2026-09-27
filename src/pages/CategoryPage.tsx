import { Link, useParams } from 'react-router-dom';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { findGallery } from '../data/gallery';

export function CategoryPage() {
  const { id } = useParams();
  const category = id ? findGallery(id) : undefined;

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
      <img className="category-page-cover" src={category.image} alt={category.name} />
      {'price' in category && category.price && <p className="order-product">{category.price}</p>}
      <Link className="brick-button gallery-button" to="/#gallery">
        Back to Gallery
      </Link>
    </main>
  );
}
