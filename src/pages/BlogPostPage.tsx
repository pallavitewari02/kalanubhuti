import { Navigate, useParams } from 'react-router-dom';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { findBlogPost } from '../data/blog';

export function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? findBlogPost(slug) : undefined;

  if (!post) return <Navigate to="/" replace />;

  return (
    <main className="paper-section about-page">
      <OrnamentalHeading>{post.title}</OrnamentalHeading>
      <article className="blog-post">
        <p>{post.intro}</p>
        <h2>{post.heading}</h2>
        {post.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </article>
    </main>
  );
}
