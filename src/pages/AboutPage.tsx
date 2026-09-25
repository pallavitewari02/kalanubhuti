import { Link } from 'react-router-dom';
import { formatAboutParagraph } from '../components/AboutCopy';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { aboutImage, aboutParagraphs } from '../data/about';

const exhibition = [
  {
    title: 'Folk Portraits',
    image: 'https://images.pexels.com/photos/29625840/pexels-photo-29625840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Sacred Patterns',
    image: 'https://images.pexels.com/photos/22820069/pexels-photo-22820069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Lippan Stories',
    image: 'https://images.pexels.com/photos/22820076/pexels-photo-22820076.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Heritage Walls',
    image: 'https://images.pexels.com/photos/368727/pexels-photo-368727.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Studio Light',
    image: 'https://images.pexels.com/photos/9609267/pexels-photo-9609267.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

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

      <section className="exhibition-section" aria-labelledby="exhibition-heading">
        <OrnamentalHeading>My art Exhibition collection</OrnamentalHeading>
        <div className="exhibition-grid">
          {exhibition.map((item) => (
            <article className="gallery-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <Link className="brick-button gallery-button" to="/#about">
        Back to Home
      </Link>
    </main>
  );
}
