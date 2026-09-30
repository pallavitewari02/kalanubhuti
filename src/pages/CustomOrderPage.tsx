import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { paintingTypes } from '../data/customOrder';
import { subcategoriesForType } from '../data/gallery';
import { submitWeb3Form } from '../lib/web3forms';

const initialType = paintingTypes[0]?.name ?? '';

export function CustomOrderPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    paintingType: initialType,
    subcategory: subcategoriesForType(initialType)[0]?.id ?? '',
    mobile: '',
    email: '',
    length: '',
    breadth: '',
    address: '',
    pincode: '',
  });
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const artForms = subcategoriesForType(form.paintingType).filter((item) => item.image);

  const update = (field: keyof typeof form) => (event: { target: { value: string } }) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const onPaintingType = (event: { target: { value: string } }) => {
    const paintingType = event.target.value;
    const matches = subcategoriesForType(paintingType).filter((item) => item.image);
    setForm((current) => ({
      ...current,
      paintingType,
      subcategory: matches.some((item) => item.id === current.subcategory) ? current.subcategory : (matches[0]?.id ?? ''),
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSending(true);
    const artForm = artForms.find((item) => item.id === form.subcategory)?.name ?? '';
    try {
      await submitWeb3Form(
        'Kalanubhuti custom order',
        {
          name: form.name,
          paintingType: form.paintingType,
          artForm,
          mobile: `+91 ${form.mobile}`,
          ...(form.email ? { email: form.email } : {}),
          length: form.length,
          breadth: form.breadth,
          address: form.address,
          pincode: form.pincode,
        },
      );
      navigate('/thank-you');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The message could not be sent.');
      setSending(false);
    }
  };

  return (
    <main className="paper-section order-page">
      <OrnamentalHeading>Custom Order details</OrnamentalHeading>
      <form className="order-form custom-order-form" onSubmit={onSubmit}>
        <label className="order-field">
          <span>Name *</span>
          <input name="name" type="text" required autoComplete="name" value={form.name} onChange={update('name')} />
        </label>

        <label className="order-field">
          <span>Type of painting *</span>
          <select name="paintingType" required value={form.paintingType} onChange={onPaintingType}>
            {paintingTypes.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </label>

        <label className="order-field">
          <span>Art form *</span>
          <select name="subcategory" required={artForms.length > 0} value={form.subcategory} onChange={update('subcategory')}>
            {artForms.length === 0 && <option value="">No art forms for this type yet</option>}
            {artForms.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

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
          <span>Email ID *</span>
          <input name="email" type="email" required autoComplete="email" value={form.email} onChange={update('email')} />
        </label>

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

        {error && <p className="order-note">{error}</p>}
        <button type="submit" className="brick-button" disabled={sending}>
          Submit
        </button>
      </form>

      <Link className="brick-button gallery-button" to="/#custom-order">
        Back to Home
      </Link>
    </main>
  );
}
