import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ArtForm } from '../data/artCategories';

type ArtCoverflowProps = {
  forms: ArtForm[];
};

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export function ArtCoverflow({ forms }: ArtCoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const ignoreSlideHovers = useRef(false);

  const goTo = (index: number) => {
    setActiveIndex(wrapIndex(index, forms.length));
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') goTo(activeIndex - 1);
      if (event.key === 'ArrowRight') goTo(activeIndex + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, forms.length]);

  if (forms.length === 0) return null;

  return (
    <div
      className="art-coverflow"
      role="region"
      aria-roledescription="carousel"
      aria-label="Indian folk art forms"
      onMouseLeave={() => {
        ignoreSlideHovers.current = false;
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current == null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        if (delta > 40) goTo(activeIndex - 1);
        if (delta < -40) goTo(activeIndex + 1);
        touchStartX.current = null;
      }}
    >
      <button
        type="button"
        className="coverflow-arrow coverflow-arrow-left"
        aria-label="Previous art form"
        onClick={() => goTo(activeIndex - 1)}
      >
        <ChevronLeft size={22} />
      </button>

      <div className="coverflow-stage">
        {forms.map((form, index) => {
          let offset = index - activeIndex;
          const half = Math.floor(forms.length / 2);
          if (offset > half) offset -= forms.length;
          if (offset < -half) offset += forms.length;

          const isCenter = offset === 0;
          const abs = Math.min(Math.abs(offset), 3);
          const scaleByDistance = [1, 0.78, 0.62, 0.5];
          const xByDistance = [0, 90, 156, 208];
          const scale = scaleByDistance[abs];
          const translateX = Math.sign(offset) * xByDistance[abs];

          return (
            <Link
              key={form.slug}
              to={`/art/${form.slug}`}
              className={`coverflow-card${isCenter ? ' is-center' : ''} depth-${abs}`}
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                zIndex: isCenter ? 30 : 20 - abs,
              }}
              aria-current={isCenter ? 'true' : undefined}
              aria-label={`${form.name} art`}
              tabIndex={isCenter ? 0 : -1}
              onMouseEnter={() => {
                if (index === activeIndex) {
                  ignoreSlideHovers.current = false;
                  return;
                }
                if (ignoreSlideHovers.current) return;
                ignoreSlideHovers.current = true;
                goTo(index);
              }}
              onFocus={() => goTo(index)}
              onClick={(event) => {
                if (!isCenter) {
                  event.preventDefault();
                  ignoreSlideHovers.current = true;
                  goTo(index);
                }
              }}
            >
              <img src={form.image} alt="" />
              <h3>{form.name}</h3>
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        className="coverflow-arrow coverflow-arrow-right"
        aria-label="Next art form"
        onClick={() => goTo(activeIndex + 1)}
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
