import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { artFormPathById, findArtForm, findCategoryPainting } from './data/gallery';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { ArtFormPage } from './pages/ArtFormPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { BuyNowPage } from './pages/BuyNowPage';
import { CategoryPage } from './pages/CategoryPage';
import { ContactPage } from './pages/ContactPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { GalleryPage } from './pages/GalleryPage';
import { HomePage } from './pages/HomePage';
import { PaintingPage } from './pages/PaintingPage';
import { ThankYouPage } from './pages/ThankYouPage';

function CategoryRedirect() {
  return <Navigate to="/gallery" replace />;
}

function ArtFormRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? artFormPathById(slug) : '/'} replace />;
}

function GalleryTwoSegment() {
  const { categorySlug = '', artSlug = '' } = useParams();
  if (findArtForm(categorySlug, artSlug)) return <ArtFormPage />;
  if (findCategoryPainting(categorySlug, artSlug)) return <PaintingPage />;
  return <ArtFormPage />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/shop" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/buy-now" element={<BuyNowPage />} />
          <Route path="/custom-order" element={<CustomOrderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/art/:slug" element={<ArtFormRedirect />} />
          <Route path="/category/:id" element={<CategoryRedirect />} />
          <Route path="/:categorySlug/:artSlug/:paintingSlug" element={<PaintingPage />} />
          <Route path="/:categorySlug/:artSlug" element={<GalleryTwoSegment />} />
          <Route path="/:categorySlug" element={<CategoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
