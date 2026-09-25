import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { ArtFormPage } from './pages/ArtFormPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { BuyNowPage } from './pages/BuyNowPage';
import { CategoryPage } from './pages/CategoryPage';
import { ContactPage } from './pages/ContactPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { HomePage } from './pages/HomePage';
import { ThankYouPage } from './pages/ThankYouPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/buy-now" element={<BuyNowPage />} />
          <Route path="/custom-order" element={<CustomOrderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/art/:slug" element={<ArtFormPage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
