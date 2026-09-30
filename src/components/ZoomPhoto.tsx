import { useEffect, useRef, useState } from 'react';

type ZoomPhotoProps = {
  src: string;
  alt: string;
};

export function ZoomPhoto({ src, alt }: ZoomPhotoProps) {
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScale(1);
  }, [src]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setScale((current) => Math.min(3, Math.max(1, current + (event.deltaY < 0 ? 0.15 : -0.15))));
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, []);

  const fitted = scale <= 1;

  return (
    <>
      <div className="zoom-controls">
        <button type="button" aria-label="Zoom out" onClick={() => setScale((current) => Math.max(1, current - 0.25))}>
          −
        </button>
        <button type="button" aria-label="Zoom in" onClick={() => setScale((current) => Math.min(3, current + 0.25))}>
          +
        </button>
      </div>
      <div className="zoom-stage" ref={stageRef}>
        <img
          src={src}
          alt={alt}
          style={fitted ? undefined : { width: `${Math.round(scale * 100)}%`, maxWidth: 'none', maxHeight: 'none' }}
        />
      </div>
    </>
  );
}
