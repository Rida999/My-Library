import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

export default function Layout({ loading }) {
  return <div className="site-shell"><Navbar />{loading ? <div className="page-status">Loading the shelves...</div> : <Outlet />}<Footer /></div>;
}
