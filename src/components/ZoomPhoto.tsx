import { useEffect, useRef, useState, type MouseEvent } from 'react';

type ZoomPhotoProps = {
  src: string;
  alt: string;
  controlsBelow?: boolean;
};

type LensSpot = {
  x: number;
  y: number;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
};

export function ZoomPhoto({ src, alt, controlsBelow = false }: ZoomPhotoProps) {
  const [scale, setScale] = useState(1);
  const [lensOn, setLensOn] = useState(false);
  const [spot, setSpot] = useState<LensSpot | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setScale(1);
    setLensOn(false);
    setSpot(null);
  }, [src]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || controlsBelow) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setScale((current) => Math.min(3, Math.max(1, current + (event.deltaY < 0 ? 0.15 : -0.15))));
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, [controlsBelow]);

  const fitted = scale <= 1;

  const moveLens = (event: MouseEvent<HTMLDivElement>) => {
    if (!lensOn || !imageRef.current || !stageRef.current) return;
    const image = imageRef.current.getBoundingClientRect();
    const stage = stageRef.current.getBoundingClientRect();
    const x = event.clientX - image.left;
    const y = event.clientY - image.top;
    if (x < 0 || y < 0 || x > image.width || y > image.height) {
      setSpot(null);
      return;
    }
    const zoom = 2.5;
    const radius = 72;
    setSpot({
      x: event.clientX - stage.left,
      y: event.clientY - stage.top,
      width: image.width * zoom,
      height: image.height * zoom,
      offsetX: -(x * zoom - radius),
      offsetY: -(y * zoom - radius),
    });
  };

  const controls = (
    <div className={`zoom-controls${controlsBelow ? ' is-below' : ''}`}>
      <button type="button" aria-label="Zoom out" onClick={() => setScale((current) => Math.max(1, current - 0.25))}>
        −
      </button>
      <button type="button" aria-label="Zoom in" onClick={() => setScale((current) => Math.min(3, current + 0.25))}>
        +
      </button>
      {controlsBelow ? (
        <button
          type="button"
          aria-label="Magnifying lens"
          aria-pressed={lensOn}
          className={lensOn ? 'is-on' : undefined}
          onClick={() => {
            setLensOn((current) => !current);
            setSpot(null);
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M14.5 14.5 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );

  return (
    <div className={controlsBelow ? 'zoom-photo is-below' : 'zoom-photo'}>
      {controlsBelow ? null : controls}
      <div
        className="zoom-stage"
        ref={stageRef}
        onMouseMove={controlsBelow ? moveLens : undefined}
        onMouseLeave={controlsBelow ? () => setSpot(null) : undefined}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          style={fitted ? undefined : { width: `${Math.round(scale * 100)}%`, maxWidth: 'none', maxHeight: 'none' }}
        />
        {spot ? (
          <div
            className="zoom-lens"
            style={{
              left: spot.x,
              top: spot.y,
              backgroundImage: `url("${src}")`,
              backgroundSize: `${spot.width}px ${spot.height}px`,
              backgroundPosition: `${spot.offsetX}px ${spot.offsetY}px`,
            }}
          />
        ) : null}
      </div>
      {controlsBelow ? controls : null}
    </div>
  );
}
