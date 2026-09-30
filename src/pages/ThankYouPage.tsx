import { useSearchParams } from 'react-router-dom';
import { BackHome } from '../components/BackHome';
import { OrnamentalHeading } from '../components/OrnamentalHeading';

export function ThankYouPage() {
  const [searchParams] = useSearchParams();
  const isContact = searchParams.get('kind') === 'contact';

  return (
    <main className="paper-section order-page">
      <OrnamentalHeading>{isContact ? 'Message received' : 'Order received'}</OrnamentalHeading>
      <p className="order-thanks" role="status">
        {isContact
          ? 'Thank you for reaching out. Our team will review your query and contact you soon.'
          : 'Thank you for placing your order. Our team will review your request and contact you within 24 hours.'}
      </p>
      <BackHome className="brick-button gallery-button">Back to Home</BackHome>
    </main>
  );
}
