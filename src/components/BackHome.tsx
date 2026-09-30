import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

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
