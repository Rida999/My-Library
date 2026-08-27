import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { placeOrder } from '../../../services/library';

export default function CheckOut({ CartItems, User }) {
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const subtotal = useMemo(() => CartItems.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0), [CartItems]);
  const shipping = 2;

  const submit = async () => {
    setSubmitting(true);
    setError('');
    try {
      await placeOrder(User);
      navigate('/purchased', { replace: true, state: { ordered: true } });
    } catch (orderError) {
      setError(orderError.message || 'Your order could not be placed.');
    } finally {
      setSubmitting(false);
    }
  };

  return <main className="page checkout-page">
    <div className="page-heading"><p className="eyebrow">Review and place</p><h1>Checkout</h1><p>Your order uses the latest catalog price before it is confirmed.</p></div>
    <div className="checkout-grid"><section className="checkout-items" aria-label="Order items">
      {CartItems.map((item) => <article className="checkout-item" key={item.id}><img src={item.url} alt={`Cover of ${item.title}`} /><div><h2>{item.title}</h2><p>{item.author}</p><p>Quantity {item.qty}</p></div><strong>${(Number(item.price) * Number(item.qty)).toFixed(2)}</strong></article>)}
    </section><aside className="order-summary"><h2>Order summary</h2><dl><div><dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div><div><dt>Shipping</dt><dd>${shipping.toFixed(2)}</dd></div><div className="summary-total"><dt>Total</dt><dd>${(subtotal + shipping).toFixed(2)}</dd></div></dl><div className="delivery-address"><h3>Delivery address</h3><p>{User.name}</p><p>{User.street}, {User.city}</p><p>{User.country} · {User.number}</p></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary" disabled={submitting} onClick={submit}>{submitting ? 'Placing order...' : 'Place order'}</button><Link className="text-link" to="/home">Continue browsing</Link></aside></div>
  </main>;
}
