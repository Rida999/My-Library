import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import './App.css';
import { db } from './DataBase/Data';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './layout/Layout';
import Layout2 from './layout/Layout2';
import Welcome from './components/userpages/WelcomePage/Welcome';
import Signin from './components/userpages/signin/Signin';
import Signup from './components/userpages/signup/Signup';
import Books from './components/userpages/Books/Books';
import Categories from './components/userpages/Categories/Categories';
import Bookshelf from './components/userpages/Bookshelf/Bookshelf';
import About from './components/userpages/About/About';
import CheckOut from './components/userpages/Checkout/CheckOut';
import BookAdding from './components/adminpages/BookAdding';
import Users from './components/adminpages/Users';
import No from './components/userpages/notfound/No';

const categories = ['Horror', 'Detective-and-Mystery', 'Romance', 'Kid-Zone', 'Historical', 'Comic-Book', 'Action-and-Adventure'];

export default function App() {
  const { profile, isAdmin, isDelivery } = useAuth();
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = profile || { id: '', name: '', email: '', role: 'guest' };
  const cartItems = profile?.cart || [];

  useEffect(() => onSnapshot(collection(db, 'books'), (snapshot) => {
    setBooks(snapshot.docs.map((book) => ({ id: book.id, qty: 1, ...book.data() })));
    setLoading(false);
  }, () => setLoading(false)), []);

  useEffect(() => {
    if (!profile?.id) { setOrders([]); return undefined; }
    const ordersQuery=isAdmin||isDelivery?collection(db,'orders'):query(collection(db,'orders'),where('userId','==',profile.id));
    return onSnapshot(ordersQuery, (snapshot) => setOrders(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))));
  }, [profile?.id,isAdmin,isDelivery]);

  const shared = useMemo(() => ({ books, CartItems: cartItems, Admin: isAdmin, db, User: user }), [books, cartItems, isAdmin, user]);
  return <BrowserRouter><Routes>
    <Route element={<Layout loading={loading} />}>
      <Route path="/home" element={<Books {...shared} />} />
      <Route path="/categories" element={<Categories books={books} />} />
      {categories.map((category) => <Route key={category} path={`/categories/${category}`} element={<Books {...shared} books={books.filter((book) => book.category === category)} />} />)}
      <Route path="/about" element={<About />} />
      <Route element={<ProtectedRoute />}><Route path="/purchased" element={<Bookshelf orders={orders} />} /><Route path="/checkout" element={cartItems.length ? <CheckOut CartItems={cartItems} User={user} /> : <Navigate to="/home" replace />} /></Route>
      <Route path="/favorites" element={<Books {...shared} books={books.filter((book)=>profile?.favorites?.includes(book.id))}/>} />
      <Route element={<ProtectedRoute roles={['admin']} />}><Route path="/addbooks" element={<BookAdding books={books} />} /></Route>
      <Route element={<ProtectedRoute roles={['admin', 'delivery']} />}><Route path="/orders" element={<Users orders={orders} />} /><Route path="/users" element={<Navigate to="/orders" replace/>}/></Route>
      <Route path="*" element={<No />} />
    </Route>
    <Route element={<Layout2 />}><Route path="/" element={<Welcome />} /><Route path="/signin" element={<Signin />} /><Route path="/signup" element={<Signup />} /></Route>
  </Routes></BrowserRouter>;
}
