import { Link, useParams } from 'react-router-dom';
import { ZoomPhoto } from '../components/ZoomPhoto';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { artFormPath, findCategoryPainting, findChildPainting } from '../data/gallery';

export function PaintingPage() {
  const { categorySlug = '', artSlug = '', paintingSlug } = useParams();
  const match = paintingSlug
    ? findChildPainting(categorySlug, artSlug, paintingSlug)
    : findCategoryPainting(categorySlug, artSlug);
  const product = match?.product;
  const category = match?.category;
  const child = match && 'child' in match ? match.child : undefined;

  if (!product || !category) {
    return (
      <main className="paper-section art-form-page">
        <OrnamentalHeading>Artwork not found</OrnamentalHeading>
        <p className="art-form-empty">This painting is not in the gallery yet.</p>
        <Link className="brick-button gallery-button" to="/gallery">
          Back to Gallery
        </Link>
      </main>
    );
  }

  const back = child ? artFormPath(category, child) : `/${category.slug}`;

  return (
    <main className="paper-section art-form-page painting-page">
      <OrnamentalHeading>{product.name}</OrnamentalHeading>
      {product.price && <p className="order-product">{product.price}</p>}
      <div className="painting-zoom">
        <ZoomPhoto src={product.image} alt={product.name} />
      </div>
      <Link className="brick-button gallery-button" to={back}>
        Back
      </Link>
    </main>
  );
}
