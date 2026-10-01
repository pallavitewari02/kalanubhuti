import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { GallerySlide } from '../data/gallery';
import { ZoomPhoto } from './ZoomPhoto';

type ArtworkPopupProps = {
  slide: GallerySlide;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

export function ArtworkPopup({ slide, onClose, onPrev, onNext }: ArtworkPopupProps) {
  return (
    <div className="exhibition-lightbox" role="dialog" aria-modal="true" aria-label={slide.name}>
      <button className="exhibition-close" type="button" aria-label="Close" onClick={onClose}>
        <X size={22} />
      </button>
      {onPrev ? (
        <button className="exhibition-nav exhibition-prev" type="button" aria-label="Previous photo" onClick={onPrev}>
          <ChevronLeft size={28} />
        </button>
      ) : null}
      <div className="artwork-popup">
        <div className="artwork-popup-main">
          <ZoomPhoto src={slide.image} alt={slide.name} controlsBelow />
        </div>
        <aside className="artwork-summary">
          <h2>{slide.name}</h2>
          <div className="artwork-row">
            <span>Art Form:</span>
            <strong>{slide.artForm}</strong>
          </div>
          <div className="artwork-row">
            <span>Painting Type</span>
            <strong>{slide.paintingType}</strong>
          </div>
          <div className="artwork-row">
            <span>Size:</span>
            <strong>{slide.size}</strong>
          </div>
          <div className="artwork-row artwork-price">
            <span>Price:</span>
            <strong>{slide.price}</strong>
          </div>
          <Link
            className="artwork-buy"
            to={`/buy-now?product=${encodeURIComponent(slide.name)}&image=${encodeURIComponent(slide.image)}`}
          >
            Buy now
          </Link>
        </aside>
      </div>
      {onNext ? (
        <button className="exhibition-nav exhibition-next" type="button" aria-label="Next photo" onClick={onNext}>
          <ChevronRight size={28} />
        </button>
      ) : null}
    </div>
  );
}
