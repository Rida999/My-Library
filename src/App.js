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
import Checklist from './components/adminpages/Checklist';
import No from './components/userpages/notfound/No';

const categories = ['Horror', 'Detective-and-Mystery', 'Romance', 'Kid-Zone', 'Historical', 'Comic-Book', 'Action-and-Adventure'];

export default function App() {
  const { profile, isAdmin, isDelivery, login, signup, logout } = useAuth();
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = profile || { id: 'guest', name: '', email: '', role: 'guest' };
  const navigationUser = {...user,email:isAdmin?'admin@admin.com':isDelivery?'delivery@delivery.com':user.email};
  const cartItems = profile?.cart || [];
  const adminUsers=useMemo(()=>Object.values(orders.reduce((groups,order)=>{
    if(!groups[order.userId]) groups[order.userId]={id:order.userId,name:order.customerName,email:order.customerEmail,country:order.address?.country||'',city:order.address?.city||'',street:order.address?.street||'',number:order.address?.number||'',pending:[]};
    if(!['delivered','cancelled'].includes(order.status)) groups[order.userId].pending.push(...(order.items||[]).map((item)=>({...item,orderId:order.id,createdAt:order.id})));
    return groups;
  },{})),[orders]);

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
    <Route element={<Layout User={navigationUser} Logout={(event)=>{event?.preventDefault();logout();}} CartItems={cartItems} Loading={loading} url={profile?.photoURL||''} db={db} />}>
      <Route path="/home" element={<Books {...shared} />} />
      <Route path="/categories" element={<Categories books={books} />} />
      {categories.map((category) => <Route key={category} path={`/categories/${category}`} element={<Books {...shared} books={books.filter((book) => book.category === category)} />} />)}
      <Route path="/about" element={<About />} />
      <Route element={<ProtectedRoute />}><Route path="/purchased" element={<Bookshelf Purchased={orders.filter((order)=>order.status==='delivered').flatMap((order)=>order.items||[])} />} /><Route path="/checkout" element={cartItems.length ? <CheckOut CartItems={cartItems} User={user} db={db} /> : <Navigate to="/home" replace />} /></Route>
      <Route path="/favorites" element={<Books {...shared} books={books.filter((book)=>profile?.favorites?.includes(book.id))}/>} />
      <Route element={<ProtectedRoute roles={['admin']} />}><Route path="/addbooks" element={<BookAdding colRefBooks={collection(db,'books')} />} /><Route path="/admin" element={<Navigate to="/addbooks" replace/>}/></Route>
      <Route element={<ProtectedRoute roles={['admin', 'delivery']} />}><Route path="/orders" element={<Users adminUsers={adminUsers} />} /><Route path="/users" element={<Users adminUsers={adminUsers} />}/>{adminUsers.map((item)=><Route key={item.id} path={`/users/${item.id}`} element={<Checklist user={item} db={db} Delivery={isDelivery}/>}/>)}</Route>
      <Route path="*" element={<No />} />
    </Route>
    <Route element={<Layout2 />}><Route path="/" element={<Welcome />} /><Route path="/signin" element={profile?<Navigate to="/home" replace/>:<Signin Login={login} error=""/>} /><Route path="/signup" element={profile?<Navigate to="/home" replace/>:<Signup SignupInfo={signup} adminUsers={[]} userImgHandler={()=>{}}/>} /></Route>
  </Routes></BrowserRouter>;
}
