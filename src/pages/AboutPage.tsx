import { Link } from 'react-router-dom';
import { formatAboutParagraph } from '../components/AboutCopy';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { aboutImage, aboutParagraphs } from '../data/about';

export function AboutPage() {
  return (
    <main className="paper-section about-page">
      <OrnamentalHeading>About Me</OrnamentalHeading>
      <div className="about-page-intro">
        <img src={aboutImage} alt="Neha, founder of Kalanubhuti, painting traditional artwork" />
        <div className="about-page-story">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{formatAboutParagraph(paragraph)}</p>
          ))}
        </div>
      </div>

      <Link className="brick-button gallery-button" to="/" state={{ section: 'about' }}>
        Back to Home
      </Link>
    </main>
  );
}
