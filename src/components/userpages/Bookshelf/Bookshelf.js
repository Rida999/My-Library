import { Link, useLocation } from 'react-router-dom';

const labels = { placed: 'Placed', confirmed: 'Confirmed', out_for_delivery: 'Out for delivery', delivered: 'Delivered', cancelled: 'Cancelled' };

export default function Bookshelf({ orders = [] }) {
  const location = useLocation();
  return <main className="page orders-page"><div className="page-heading"><p className="eyebrow">Your reading journey</p><h1>My orders</h1><p>Track current deliveries and revisit every title you have ordered.</p></div>
    {location.state?.ordered && <div className="notice-success">Your order is in. We will keep the status updated here.</div>}
    {!orders.length ? <div className="empty-state"><h2>Your shelf is ready for its first story.</h2><p>Books you order will appear here with their delivery status.</p><Link className="button button-primary" to="/home">Browse books</Link></div> : <div className="order-list">{orders.map((order) => <article className="order-card" key={order.id}><header><div><p className="eyebrow">Order {order.id.slice(0, 8).toUpperCase()}</p><h2>{order.items?.length || 0} {(order.items?.length || 0) === 1 ? 'book' : 'books'}</h2></div><span className={`status status-${order.status}`}>{labels[order.status] || order.status}</span></header><div className="order-books">{order.items?.map((item) => <div key={item.id}><img src={item.url} alt={`Cover of ${item.title}`} /><span>{item.title}</span></div>)}</div><footer><span>{order.createdAt?.toDate?.().toLocaleDateString() || 'Just now'}</span><strong>${Number(order.total).toFixed(2)}</strong></footer></article>)}</div>}
  </main>;
}
