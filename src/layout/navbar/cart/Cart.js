import { Link } from 'react-router-dom';
import { MinusIcon, PlusIcon, ShoppingBagIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../context/AuthContext';
import { saveCart } from '../../../services/library';
import { calculateSubtotal } from '../../../utils/catalog';

export default function Cart({ onClose }) {
  const { profile } = useAuth();
  const items = profile?.cart || [];
  const subtotal = calculateSubtotal(items);
  const changeQuantity = (id, delta) => saveCart(profile.id, items.map((item) => item.id === id ? { ...item, qty: Math.max(1, Math.min(9, Number(item.qty) + delta)) } : item));
  const remove = (id) => saveCart(profile.id, items.filter((item) => item.id !== id));

  return <div className="drawer-backdrop" role="presentation" onMouseDown={onClose}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag" onMouseDown={(event) => event.stopPropagation()}>
    <header><div><p className="eyebrow">Your selection</p><h2>Shopping bag</h2></div><button className="icon-button" onClick={onClose} aria-label="Close cart"><XMarkIcon /></button></header>
    {!items.length ? <div className="empty-cart"><ShoppingBagIcon /><h3>Your bag is empty</h3><p>Pick a story and it will be waiting here.</p></div> : <><div className="cart-items">{items.map((item) => <article className="cart-item" key={item.id}><img src={item.url} alt={`Cover of ${item.title}`} /><div><h3>{item.title}</h3><p>{item.author}</p><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Decrease ${item.title} quantity`}><MinusIcon /></button><span>{item.qty}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Increase ${item.title} quantity`}><PlusIcon /></button></div></div><div className="cart-item-end"><strong>${(Number(item.price) * Number(item.qty)).toFixed(2)}</strong><button className="icon-button danger" onClick={() => remove(item.id)} aria-label={`Remove ${item.title}`}><TrashIcon /></button></div></article>)}</div><footer><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><p>Shipping is calculated at checkout.</p><Link className="button button-primary" to="/checkout" onClick={onClose}>Go to checkout</Link></footer></>}
  </aside></div>;
}
