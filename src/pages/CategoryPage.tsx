import { Link, useParams } from 'react-router-dom';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { findGallery } from '../data/gallery';

export function CategoryPage() {
  const { id } = useParams();
  const category = id ? findGallery(id) : undefined;
  const children = category && 'children' in category ? category.children : undefined;

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
      {category.desc && <p className="category-intro">{category.desc}</p>}
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
      <Link className="brick-button gallery-button" to="/#gallery">
        Back to Gallery
      </Link>
    </main>
  );
}
