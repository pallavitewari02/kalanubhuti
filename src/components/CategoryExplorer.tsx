import { Link } from 'react-router-dom';
import { categoryPath, gallery } from '../data/gallery';

export function CategoryExplorer() {
  return (
    <div className="category-explorer">
      <div className="category-row">
        {gallery
          .filter((category) => category.id !== '2')
          .map((category) => (
          <article key={category.id} className="category-panel">
            <Link className="category-trigger" to={categoryPath(category)}>
              <img src={category.image} alt="" />
              <span className="category-trigger-copy">
                <h3>{category.name}</h3>
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
