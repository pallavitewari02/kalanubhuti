import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrnamentalHeading } from '../components/OrnamentalHeading';
import { submitWeb3Form } from '../lib/web3forms';

export function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    query: '',
  });
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const update = (field: keyof typeof form) => (event: { target: { value: string } }) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSending(true);
    try {
      await submitWeb3Form('Kalanubhuti contact', {
        name: form.name,
        phone: `+91 ${form.phone}`,
        query: form.query,
      });
      navigate('/thank-you?kind=contact');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The message could not be sent.');
      setSending(false);
    }
  };

  return (
    <main className="paper-section order-page">
      <OrnamentalHeading>Contact us</OrnamentalHeading>
      <form className="order-form custom-order-form" onSubmit={onSubmit}>
        <label className="order-field">
          <span>Name *</span>
          <input name="name" type="text" required autoComplete="name" value={form.name} onChange={update('name')} />
        </label>

        <label className="order-field">
          <span>Phone number *</span>
          <span className="mobile-input">
            <span className="mobile-prefix">+91</span>
            <input
              name="phone"
              type="tel"
              required
              inputMode="numeric"
              autoComplete="tel"
              pattern="[0-9]{10}"
              title="Enter a 10 digit phone number"
              value={form.phone}
              onChange={update('phone')}
            />
          </span>
        </label>

        <label className="order-field">
          <span>Your Query</span>
          <textarea name="query" rows={5} value={form.query} onChange={update('query')} />
        </label>

        {error && <p className="order-note">{error}</p>}
        <button type="submit" className="brick-button" disabled={sending}>
          Submit
        </button>
      </form>

      <Link className="brick-button gallery-button" to="/#contact">
        Back to Home
      </Link>
    </main>
  );
}
