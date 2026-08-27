import { useMemo, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { updateOrderStatus } from '../../services/library';

const statuses = ['placed', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled'];
const labels = { placed: 'Placed', confirmed: 'Confirmed', out_for_delivery: 'Out for delivery', delivered: 'Delivered', cancelled: 'Cancelled' };

export default function Users({ orders }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const filtered = useMemo(() => orders.filter((order) => `${order.customerName} ${order.customerEmail} ${order.id}`.toLowerCase().includes(search.toLowerCase()) && (status === 'all' || order.status === status)), [orders, search, status]);
  return <main className="page admin-page"><div className="page-heading"><p className="eyebrow">Staff workspace</p><h1>Orders</h1><p>Confirm new orders, hand them to delivery, and keep customers informed through each status.</p></div><div className="admin-toolbar"><label className="search-field"><MagnifyingGlassIcon /><input aria-label="Search orders" placeholder="Search customer or order ID" value={search} onChange={(event) => setSearch(event.target.value)} /></label><select aria-label="Filter order status" value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All statuses</option>{statuses.map((item) => <option key={item} value={item}>{labels[item]}</option>)}</select></div><div className="table-wrap"><table className="admin-table"><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr></thead><tbody>{filtered.map((order) => <tr key={order.id}><td><strong>{order.id.slice(0, 8).toUpperCase()}</strong></td><td><strong>{order.customerName}</strong><span>{order.customerEmail}</span></td><td>{order.items?.reduce((sum, item) => sum + Number(item.qty), 0) || 0}</td><td>${Number(order.total).toFixed(2)}</td><td><select className={`status status-${order.status}`} value={order.status} onChange={(event) => updateOrderStatus(order.id, event.target.value)}>{statuses.map((item) => <option key={item} value={item}>{labels[item]}</option>)}</select></td><td>{order.createdAt?.toDate?.().toLocaleDateString() || 'Just now'}</td></tr>)}</tbody></table>{!filtered.length && <div className="table-empty">No orders match this view.</div>}</div></main>;
}
