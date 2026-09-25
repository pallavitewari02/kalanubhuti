import { Link, useParams } from 'react-router-dom';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { findCategoryById } from '../data/artCategories';

export function CategoryPage() {
  const { id } = useParams();
  const category = id ? findCategoryById(id) : undefined;

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
      <img className="category-page-cover" src={category.coverImage} alt={category.name} />
      <Link className="brick-button gallery-button" to="/#gallery">
        Back to Gallery
      </Link>
    </main>
  );
}
