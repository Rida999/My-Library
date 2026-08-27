import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bars3Icon, HeartIcon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import Cart from './cart/Cart';

const navigation = [{ name: 'Home', href: '/home' }, { name: 'Categories', href: '/categories' }, { name: 'Purchased', href: '/purchased' }, { name: 'About', href: '/about' }];

export default function Navbar() {
  const { firebaseUser, profile, logout, isAdmin, isDelivery } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  return <><nav className="bg-gray-800 text-gray-300 shadow-lg"><div className="max-w-7xl mx-auto px-4 sm:px-6"><div className="flex items-center justify-between h-16">
    <div className="flex items-center"><Link to="/home" className="h-9 w-9 flex items-center justify-center rounded bg-indigo-600 text-white font-bold">ML</Link><div className="hidden md:flex ml-10 space-x-2">{navigation.map((item)=><NavLink key={item.href} to={item.href} className={({isActive})=>`${isActive?'bg-gray-900 text-white':'hover:bg-gray-700 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}>{item.name}</NavLink>)}{(isAdmin||isDelivery)&&<NavLink to="/orders" className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Orders</NavLink>}{isAdmin&&<NavLink to="/addbooks" className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Books</NavLink>}</div></div>
    <div className="hidden md:flex items-center gap-2"><Link to="/favorites" className="p-2 hover:text-white" aria-label="Favorites"><HeartIcon className="w-6"/></Link><button onClick={()=>setCartOpen(true)} className="relative p-2 hover:text-white" aria-label="Cart"><ShoppingCartIcon className="w-6"/>{profile?.cart?.length>0&&<span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs rounded-full px-1">{profile.cart.length}</span>}</button>{firebaseUser?<><span className="text-sm ml-2">{profile?.name}</span><button onClick={logout} className="px-3 py-2 text-sm hover:text-white">Sign out</button></>:<Link to="/signin" className="px-3 py-2 text-sm hover:text-white">Sign in</Link>}</div>
    <button onClick={()=>setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded hover:bg-gray-700" aria-label="Toggle menu">{menuOpen?<XMarkIcon className="w-6"/>:<Bars3Icon className="w-6"/>}</button>
  </div></div>{menuOpen&&<div className="md:hidden px-3 pb-4 space-y-1">{navigation.map((item)=><Link onClick={()=>setMenuOpen(false)} key={item.href} to={item.href} className="block px-3 py-2 rounded hover:bg-gray-700">{item.name}</Link>)}{(isAdmin||isDelivery)&&<Link to="/orders" className="block px-3 py-2 rounded hover:bg-gray-700">Orders</Link>}{isAdmin&&<Link to="/addbooks" className="block px-3 py-2 rounded hover:bg-gray-700">Add Books</Link>}<button onClick={()=>setCartOpen(true)} className="w-full text-left px-3 py-2 rounded hover:bg-gray-700">Cart ({profile?.cart?.length||0})</button>{firebaseUser?<button onClick={logout} className="w-full text-left px-3 py-2 rounded hover:bg-gray-700">Sign out</button>:<Link to="/signin" className="block px-3 py-2">Sign in</Link>}</div>}</nav>{cartOpen&&<Cart onClose={()=>setCartOpen(false)}/>}</>;
}
