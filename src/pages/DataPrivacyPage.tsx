import { OrnamentalHeading } from '../components/OrnamentalHeading';

export function DataPrivacyPage() {
  return (
    <main className="paper-section">
      <OrnamentalHeading>Data Privacy & Protection</OrnamentalHeading>
      <article className="blog-post privacy-page">
        <h2>Data Privacy & Data Protection</h2>
        <p>
          At Kalanubhuti, we value your trust and are committed to safeguarding your personal information.
          This page outlines how we collect, use, and protect your data when you interact with our website
          and services.
        </p>
        <ul>
          <li>
            Image Ownership & Usage Policy
            <ul>
              <li>All images, artworks, and visual content displayed on Kalanubhuti are the exclusive property of the artist.</li>
              <li>You are <strong>not permitted</strong> to download, copy, reproduce, or use these images elsewhere without prior written consent.</li>
              <li>You may not claim ownership, watermark, or redistribute any artwork from this website.</li>
              <li>Unauthorized use of images will be considered a violation of intellectual property rights and may lead to legal action.</li>
            </ul>
          </li>
          <li>
            Information We Collect
            <ul>
              <li>Personal details (name, email, contact info)</li>
              <li>Transaction data (billing, shipping)</li>
              <li>Website usage data (cookies, IP, browsing behavior)</li>
              <li>Art submissions/forms (images or text you upload)</li>
            </ul>
          </li>
          <li>
            How We Use Your Data
            <ul>
              <li>Process and deliver orders securely</li>
              <li>Respond to inquiries and support requests</li>
              <li>Send updates/newsletters (opt-in only)</li>
              <li>Improve website functionality and personalization</li>
            </ul>
          </li>
          <li>
            Data Protection Measures
            <ul>
              <li>Secure encrypted servers</li>
              <li>SSL encryption for safe transmission</li>
              <li>Limited access to sensitive data</li>
              <li>Compliance with trusted third-party services</li>
            </ul>
          </li>
          <li>
            Sharing of Information
            <ul>
              <li>Never sold or traded</li>
              <li>Shared only with trusted providers (payments, shipping)</li>
              <li>Disclosed to legal authorities if required</li>
            </ul>
          </li>
          <li>
            Your Rights
            <ul>
              <li>Access your personal data</li>
              <li>Request corrections or updates</li>
              <li>Request deletion (subject to obligations)</li>
              <li>Withdraw consent for marketing anytime</li>
            </ul>
          </li>
          <li>
            Cookies & Tracking
            <ul>
              <li>Used to enhance navigation and analyze behavior</li>
              <li>Can be disabled in browser settings (may affect functionality)</li>
            </ul>
          </li>
        </ul>
      </article>
    </main>
  );
}
