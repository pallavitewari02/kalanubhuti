import type { ReactNode } from 'react';

export function OrnamentalHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="ornamental-heading">
      <span>❧</span>
      {children}
      <span>❧</span>
    </h2>
  );
}
