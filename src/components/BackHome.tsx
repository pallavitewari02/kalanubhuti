import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const scrollPositions = new Map<string, number>();

export function rememberScroll(key: string) {
  const save = () => scrollPositions.set(key, window.scrollY);
  save();
  window.addEventListener('scroll', save, { passive: true });
  return () => {
    save();
    window.removeEventListener('scroll', save);
  };
}

export function restoreScroll(key: string) {
  const saved = scrollPositions.get(key);
  if (saved === undefined) return;
  window.scrollTo(0, saved);
}

export function BackHome({ className, children }: { className?: string; children: ReactNode }) {
  const navigate = useNavigate();

  return (
    <button
      className={className}
      type="button"
      onClick={() => {
        const index = window.history.state?.idx;
        if (typeof index === 'number' && index > 0) navigate(-1);
        else navigate('/');
      }}
    >
      {children}
    </button>
  );
}
