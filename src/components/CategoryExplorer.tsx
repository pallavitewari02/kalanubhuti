import { useState } from 'react';
import { Link } from 'react-router-dom';
import { gallery } from '../data/gallery';
import { ArtCoverflow } from './ArtCoverflow';

export function CategoryExplorer() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const expandedCategory = gallery.find(
    (category) => category.id === activeId && (category.children?.length ?? 0) > 0,
  );

  return (
    <div
      className={`category-explorer${expandedCategory ? ' has-slider' : ''}`}
      onMouseLeave={() => {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          setActiveId(null);
        }
      }}
    >
      <div className="category-row">
        {gallery.map((category) => {
          const isActive = activeId === category.id;
          const canExpand = (category.children?.length ?? 0) > 0;

          const triggerContent = (
            <>
              <img src={category.image} alt="" />
              <span className="category-trigger-copy">
                <h3>{category.name}</h3>
              </span>
            </>
          );

          return (
            <article
              key={category.id}
              className={`category-panel${isActive ? ' is-active' : ''}`}
              onMouseEnter={() => {
                if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
                setActiveId(canExpand ? category.id : null);
              }}
            >
              {canExpand ? (
                <button
                  type="button"
                  className="category-trigger"
                  aria-expanded={Boolean(expandedCategory && expandedCategory.id === category.id)}
                  onClick={() => {
                    const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
                    if (hoverCapable) {
                      setActiveId(category.id);
                      return;
                    }
                    setActiveId((current) => (current === category.id ? null : category.id));
                  }}
                >
                  {triggerContent}
                </button>
              ) : (
                <Link className="category-trigger" to={`/category/${category.id}`}>
                  {triggerContent}
                </Link>
              )}
            </article>
          );
        })}
      </div>
      {expandedCategory?.children && <ArtCoverflow nodes={expandedCategory.children} />}
    </div>
  );
}
