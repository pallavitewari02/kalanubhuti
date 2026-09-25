import { FormEvent, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { OrnamentalHeading } from '../components/OrnamentalHeading';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.94.52 3.76 1.44 5.33L2 22l4.97-1.55a10.05 10.05 0 0 0 5.07 1.37h.01c5.46 0 9.89-4.4 9.89-9.83 0-5.43-4.44-9.99-9.9-9.99Zm5.72 13.99c-.24.67-1.18 1.22-1.93 1.38-.52.11-1.2.2-3.49-.75-2.93-1.21-4.82-4.17-4.96-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.2-.14.31-.29.48-.14.16-.3.36-.43.49-.14.14-.29.29-.12.56.16.27.73 1.2 1.56 1.94 1.07.96 1.97 1.26 2.24 1.4.27.14.43.12.59-.07.16-.2.67-.78.85-1.05.18-.27.36-.22.6-.13.25.08 1.57.74 1.84.87.27.14.45.2.52.31.07.11.07.64-.17 1.31Z"
      />
    </svg>
  );
}

export function BuyNowPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const product = searchParams.get('product') ?? 'Handmade Painting';
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    address: '',
    pincode: '',
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/thank-you');
  };

  return (
    <main className="paper-section order-page">
      <OrnamentalHeading>Buy now</OrnamentalHeading>
      <p className="order-product">You are ordering: <strong>{product}</strong></p>

      <form className="order-form" onSubmit={onSubmit}>
          <label className="order-field">
            <span>Name*</span>
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            />
          </label>

          <label className="order-field">
            <span className="order-mobile-label">
              Mobile Number*
              <span className="whatsapp-icon" title="WhatsApp">
                <WhatsAppIcon />
              </span>
            </span>
            <input
              name="mobile"
              type="tel"
              required
              inputMode="numeric"
              autoComplete="tel"
              pattern="[0-9]{10}"
              title="Enter a 10 digit mobile number"
              value={form.mobile}
              onChange={(event) => setForm((current) => ({ ...current, mobile: event.target.value }))}
            />
          </label>

          <label className="order-field">
            <span>Address*</span>
            <textarea
              name="address"
              required
              rows={4}
              autoComplete="street-address"
              value={form.address}
              onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
            />
          </label>

          <label className="order-field">
            <span>Pincode*</span>
            <input
              name="pincode"
              type="text"
              required
              inputMode="numeric"
              autoComplete="postal-code"
              pattern="[0-9]{6}"
              title="Enter a 6 digit pincode"
              value={form.pincode}
              onChange={(event) => setForm((current) => ({ ...current, pincode: event.target.value }))}
            />
          </label>

          <p className="order-note">
            Delivery charges applies &amp; vary based on the size of painting &amp; delivery location
          </p>

          <button type="submit" className="brick-button">
            Submit
          </button>
        </form>

      <Link className="brick-button gallery-button" to="/#shop">
        Back to Shop
      </Link>
    </main>
  );
}
