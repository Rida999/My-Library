import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
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
import Checklist from './components/adminpages/Checklist';
import No from './components/userpages/notfound/No';

const categories = ['Horror', 'Detective-and-Mystery', 'Romance', 'Kid-Zone', 'Historical', 'Comic-Book', 'Action-and-Adventure'];

export default function App() {
  const { profile, isAdmin, isDelivery } = useAuth();
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = profile || { id: '', name: '', email: '', role: 'guest' };
  const cartItems = profile?.cart || [];

  useEffect(() => onSnapshot(collection(db, 'books'), (snapshot) => {
    setBooks(snapshot.docs.map((book) => ({ id: book.id, qty: 1, ...book.data() })));
    setLoading(false);
  }, () => setLoading(false)), []);

  useEffect(() => {
    if (!isAdmin && !isDelivery) { setUsers([]); return undefined; }
    return onSnapshot(query(collection(db, 'users'), orderBy('name')), (snapshot) => setUsers(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))));
  }, [isAdmin, isDelivery]);

  const shared = useMemo(() => ({ books, CartItems: cartItems, Admin: isAdmin, db, User: user }), [books, cartItems, isAdmin, user]);
  return <BrowserRouter><Routes>
    <Route element={<Layout loading={loading} />}>
      <Route path="/home" element={<Books {...shared} />} />
      <Route path="/categories" element={<Categories books={books} />} />
      {categories.map((category) => <Route key={category} path={`/categories/${category}`} element={<Books {...shared} books={books.filter((book) => book.category === category)} />} />)}
      <Route path="/about" element={<About />} />
      <Route element={<ProtectedRoute />}><Route path="/purchased" element={<Bookshelf Purchased={profile?.purchased || []} />} /><Route path="/checkout" element={cartItems.length ? <CheckOut CartItems={cartItems} User={user} db={db} /> : <Navigate to="/home" replace />} /></Route>
      <Route element={<ProtectedRoute roles={['admin']} />}><Route path="/addbooks" element={<BookAdding colRefBooks={collection(db, 'books')} />} /></Route>
      <Route element={<ProtectedRoute roles={['admin', 'delivery']} />}><Route path="/users" element={<Users adminUsers={users} />} />{users.map((item) => <Route key={item.id} path={`/users/${item.id}`} element={<Checklist user={item} db={db} Delivery={isDelivery} />} />)}</Route>
      <Route path="*" element={<No />} />
    </Route>
    <Route element={<Layout2 />}><Route path="/" element={<Welcome />} /><Route path="/signin" element={<Signin />} /><Route path="/signup" element={<Signup />} /></Route>
  </Routes></BrowserRouter>;
}
