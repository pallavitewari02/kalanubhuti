import { formatAboutParagraph } from '../components/AboutCopy';
import { BackHome } from '../components/BackHome';
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

      <BackHome className="brick-button gallery-button">Back to Home</BackHome>
    </main>
  );
}
