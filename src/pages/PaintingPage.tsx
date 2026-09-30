import { Link, useParams } from 'react-router-dom';
import { ZoomPhoto } from '../components/ZoomPhoto';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { artFormPath, findCategoryPainting, findChildPainting } from '../data/gallery';

export function PaintingPage() {
  const { categorySlug = '', artSlug = '', paintingSlug } = useParams();
  const childMatch = paintingSlug ? findChildPainting(categorySlug, artSlug, paintingSlug) : undefined;
  const categoryMatch = paintingSlug ? undefined : findCategoryPainting(categorySlug, artSlug);
  const product = childMatch?.product ?? categoryMatch?.product;
  const category = childMatch?.category ?? categoryMatch?.category;
  const child = childMatch?.child;

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
