import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

export default function Layout({ loading }) {
  return <div className="flex flex-col min-h-screen"><Navbar />{loading ? <div className="flex-1 flex items-center justify-center text-gray-500 text-xl">Loading the shelves...</div> : <div className="flex-1"><Outlet /></div>}<Footer /></div>;
}
