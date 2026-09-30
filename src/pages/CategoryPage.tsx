import { Link, useParams } from 'react-router-dom';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { artFormPath, findCategoryBySlug, paintingPath } from '../data/gallery';

export function CategoryPage() {
  const { categorySlug } = useParams();
  const category = categorySlug ? findCategoryBySlug(categorySlug) : undefined;
  const children = category && 'children' in category ? category.children?.filter((child) => child.image) : undefined;
  const paintings = category && 'products' in category ? category.products : undefined;

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
      {paintings && paintings.length > 0 && (
        <div className="art-form-grid">
          {paintings.map((painting) => (
            <Link className="gallery-card" key={painting.image} to={paintingPath(category, painting)}>
              <img src={painting.image} alt={painting.name} />
              <h3>{painting.name}</h3>
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
