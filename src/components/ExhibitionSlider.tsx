import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { exhibition } from '../data/exhibition';
import { OrnamentalHeading } from './OrnamentalHeading';

export function ExhibitionSlider() {
  const [hovered, setHovered] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenIndex(null);
      if (event.key === 'ArrowRight') setOpenIndex((current) => (current === null ? 0 : (current + 1) % exhibition.length));
      if (event.key === 'ArrowLeft') {
        setOpenIndex((current) => (current === null ? 0 : (current - 1 + exhibition.length) % exhibition.length));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex]);

  const paused = hovered || openIndex !== null || reduceMotion;
  const loop = reduceMotion ? exhibition : [...exhibition, ...exhibition];
  const openPiece = openIndex === null ? undefined : exhibition[openIndex];

  const step = (direction: number) => {
    setOpenIndex((current) => {
      if (current === null) return 0;
      return (current + direction + exhibition.length) % exhibition.length;
    });
  };

  return (
    <section className="paper-section exhibition-home" aria-label="My art Exhibition collection">
      <OrnamentalHeading>My art Exhibition collection</OrnamentalHeading>
      <div
        className={`exhibition-marquee${paused ? ' is-paused' : ''}${reduceMotion ? ' is-still' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="exhibition-track">
          {loop.map((piece, index) => {
            const realIndex = index % exhibition.length;
            return (
              <button
                className="exhibition-slide"
                type="button"
                key={`${piece.image}-${index}`}
                onClick={() => setOpenIndex(realIndex)}
              >
                <img src={piece.image} alt={piece.title} />
              </button>
            );
          })}
        </div>
      </div>

      {openPiece && openIndex !== null && (
        <div className="exhibition-lightbox" role="dialog" aria-modal="true" aria-label={openPiece.title}>
          <button className="exhibition-close" type="button" aria-label="Close" onClick={() => setOpenIndex(null)}>
            <X size={22} />
          </button>
          <button className="exhibition-nav exhibition-prev" type="button" aria-label="Previous photo" onClick={() => step(-1)}>
            <ChevronLeft size={28} />
          </button>
          <img src={openPiece.image} alt={openPiece.title} />
          <button className="exhibition-nav exhibition-next" type="button" aria-label="Next photo" onClick={() => step(1)}>
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
