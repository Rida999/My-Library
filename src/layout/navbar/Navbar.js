import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import Cart from './cart/Cart';

const links = [{ label: 'Browse', to: '/home' }, { label: 'Categories', to: '/categories' }, { label: 'Favorites', to: '/favorites' }, { label: 'My orders', to: '/purchased' }, { label: 'About', to: '/about' }];

export default function Navbar() {
  const { firebaseUser, profile, logout, isAdmin, isDelivery } = useAuth();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const nav = [...links, ...((isAdmin || isDelivery) ? [{ label: 'Orders', to: '/orders' }] : []), ...(isAdmin ? [{ label: 'Catalog', to: '/addbooks' }] : [])];
  return <header className="site-header"><nav className="nav-shell" aria-label="Main navigation">
    <Link className="wordmark" to="/home">MY LIBRARY</Link>
    <button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <XMarkIcon /> : <Bars3Icon />}</button>
    <div className={`nav-links ${open ? 'is-open' : ''}`}>{nav.map((item) => <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>{item.label}</NavLink>)}</div>
    <div className="nav-account">{firebaseUser ? <><button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${profile?.cart?.length || 0} items`}><ShoppingBagIcon /><span>{profile?.cart?.length || 0}</span></button><span>{profile?.name || firebaseUser.email}</span><button className="text-button" onClick={logout}>Sign out</button></> : <><Link to="/signin">Sign in</Link><Link className="button button-small" to="/signup">Join</Link></>}</div>
  </nav>{cartOpen && <Cart onClose={() => setCartOpen(false)} />}</header>;
}
