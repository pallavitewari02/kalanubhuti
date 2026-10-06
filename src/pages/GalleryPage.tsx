import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArtworkPopup } from '../components/ArtworkPopup';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { categoryPath, gallery, gallerySlides } from '../data/gallery';
import { publicUrl } from '../lib/publicUrl';

const categoryImages: Record<string, string> = {
  'Indian Folk Art': publicUrl('/Art%20pics/Indian%20Folk%20Art/Lippan/Lippan-Jagganathji.jpeg'),
  'Modern Contemporary': publicUrl('/Art%20pics/Modern%20Contemporary/Bihar%20Cultural%20theme.jpg'),
};

export function GalleryPage() {
  const categories = gallery.filter((category) => categoryImages[category.name]);
  const slides = gallerySlides();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [galleryShift, setGalleryShift] = useState(0);
  const openSlide = openIndex === null ? null : slides[openIndex];

  const nudgeGallery = (direction: number) => {
    const step = 258;
    const span = Math.max(slides.length, 1) * step;
    setPaused(true);
    setGalleryShift((current) => {
      let next = current + direction * -step;
      if (next <= -span) next += span;
      if (next > 0) next -= span;
      return next;
    });
    window.setTimeout(() => setPaused(false), 700);
  };

  const stepSlide = (direction: number) => {
    setOpenIndex((current) => {
      if (current === null || slides.length === 0) return 0;
      return (current + direction + slides.length) % slides.length;
    });
  };

  useEffect(() => {
    if (!openSlide) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openSlide]);

  return (
    <main className="paper-section gallery-page">
      <OrnamentalHeading>Gallery</OrnamentalHeading>
      <p className="gallery-landing-intro">
        Indian Folk Art gathers paintings that grew in villages and courts across the country. Madhubani
        fills the surface with fine line and symbol. Lippan sets mirrors into clay, while Meenakari and
        Pichwai bring enamel colour and devotional scenes. Rajasthani, Gond, and Warli each keep their own
        marks, stories, and way of seeing the world. Modern Contemporary work uses today&apos;s compositions
        while staying handmade, so each piece can sit in a current home without losing the warmth of the
        studio.
      </p>
      <div className="gallery-landing-grid">
        {categories.map((category) => (
          <Link className="gallery-card" key={category.id} to={categoryPath(category)}>
            <img src={categoryImages[category.name]} alt={category.name} />
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
      <div className="studio-marquee-wrap gallery-page-slider">
        <button className="studio-arrow studio-arrow-left" type="button" aria-label="Previous gallery images" onClick={() => nudgeGallery(-1)}>
          <ChevronLeft size={28} />
        </button>
        <div
          className={`studio-marquee${paused || openSlide ? ' is-paused' : ''}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="studio-shift" style={{ transform: `translateX(${galleryShift}px)` }}>
            <div className="studio-track">
              {[...slides, ...slides].map((slide, index) => (
                <button
                  className="studio-slide"
                  type="button"
                  key={`${slide.image}-${index}`}
                  onClick={() => setOpenIndex(index % slides.length)}
                >
                  <img src={slide.image} alt={slide.name} />
                  <span>{slide.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <button className="studio-arrow studio-arrow-right" type="button" aria-label="Next gallery images" onClick={() => nudgeGallery(1)}>
          <ChevronRight size={28} />
        </button>
      </div>
      {openSlide && (
        <ArtworkPopup
          slide={openSlide}
          onClose={() => setOpenIndex(null)}
          onPrev={() => stepSlide(-1)}
          onNext={() => stepSlide(1)}
        />
      )}
    </main>
  );
}
