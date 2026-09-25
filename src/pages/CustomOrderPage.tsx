import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { paintingTypes } from '../data/customOrder';

export function CustomOrderPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    paintingType: 'Canvas Painting',
    mobile: '',
    email: '',
    length: '',
    breadth: '',
    address: '',
    pincode: '',
  });

  const update = (field: keyof typeof form) => (event: { target: { value: string } }) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/thank-you');
  };

  return (
    <main className="paper-section order-page">
      <OrnamentalHeading>Painting Order Form</OrnamentalHeading>
      <form className="order-form custom-order-form" onSubmit={onSubmit}>
        <label className="order-field">
          <span>Name *</span>
          <input name="name" type="text" required autoComplete="name" value={form.name} onChange={update('name')} />
        </label>

        <label className="order-field">
          <span>Type of painting *</span>
          <select name="paintingType" required value={form.paintingType} onChange={update('paintingType')}>
            {paintingTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <div className="order-row">
          <label className="order-field">
            <span>Mobile number *</span>
            <span className="mobile-input">
              <span className="mobile-prefix">+91</span>
              <input
                name="mobile"
                type="tel"
                required
                inputMode="numeric"
                autoComplete="tel"
                pattern="[0-9]{10}"
                title="Enter a 10 digit mobile number"
                value={form.mobile}
                onChange={update('mobile')}
              />
            </span>
            <small>We will reach out via WhatsApp or phone call</small>
          </label>

          <label className="order-field">
            <span>Email ID (optional)</span>
            <input name="email" type="email" autoComplete="email" value={form.email} onChange={update('email')} />
          </label>
        </div>

        <div className="order-row">
          <label className="order-field">
            <span>Length (cm) *</span>
            <input
              name="length"
              type="number"
              required
              min="1"
              step="0.1"
              value={form.length}
              onChange={update('length')}
            />
          </label>
          <label className="order-field">
            <span>Breadth (cm) *</span>
            <input
              name="breadth"
              type="number"
              required
              min="1"
              step="0.1"
              value={form.breadth}
              onChange={update('breadth')}
            />
          </label>
        </div>

        <div className="order-row">
          <label className="order-field">
            <span>Address *</span>
            <input
              name="address"
              type="text"
              required
              autoComplete="street-address"
              value={form.address}
              onChange={update('address')}
            />
          </label>
          <label className="order-field">
            <span>Pin Code *</span>
            <input
              name="pincode"
              type="text"
              required
              inputMode="numeric"
              autoComplete="postal-code"
              pattern="[0-9]{6}"
              title="Enter a 6 digit pincode"
              value={form.pincode}
              onChange={update('pincode')}
            />
          </label>
        </div>

        <p className="order-note">
          Delivery charges may apply and vary based on the size of painting and delivery location.
        </p>

        <button type="submit" className="brick-button">
          Submit
        </button>
      </form>

      <Link className="brick-button gallery-button" to="/#custom-order">
        Back to Home
      </Link>
    </main>
  );
}
