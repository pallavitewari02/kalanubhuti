import type { ReactNode } from 'react';

const highlight = /(Diploma in Textile Design|Diploma in Art & Craft|Neha|Kalanubhuti|Kala \(art\)|Anubhuti \(experience\))/g;

export function formatAboutParagraph(text: string): ReactNode[] {
  return text.split(highlight).map((part, index) => {
    if (part === 'Neha' || part === 'Kalanubhuti' || part === 'Diploma in Textile Design' || part === 'Diploma in Art & Craft') {
      return <strong key={`${part}-${index}`}>{part}</strong>;
    }
    if (part === 'Kala (art)' || part === 'Anubhuti (experience)') {
      return (
        <strong key={`${part}-${index}`}>
          <em>{part}</em>
        </strong>
      );
    }
    return part;
  });
}
