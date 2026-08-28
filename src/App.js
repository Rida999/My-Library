import React,{useState,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom";
import Welcome from "./components/userpages/WelcomePage/Welcome";
import Signin from "./components/userpages/signin/Signin"
import No from "./components/userpages/notfound/No";
import Signup from './components/userpages/signup/Signup';
import Bookshelf from './components/userpages/Bookshelf/Bookshelf';
import Categories from './components/userpages/Categories/Categories';
import Books from './components/userpages/Books/Books';
import Layout from './layout/Layout';
import Layout2 from './layout/Layout2';
import About from './components/userpages/About/About';
import BookAdding from './components/adminpages/BookAdding';
import Users from './components/adminpages/Users';
import { collection, getFirestore, onSnapshot,addDoc, doc, query, orderBy } from 'firebase/firestore';
import Test from './Test';
import {storage_bucket} from "./DataBase/Data";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import CheckOut from './components/userpages/Checkout/CheckOut';
import Checklist from './components/adminpages/Checklist';
import bcrypt from 'bcryptjs/dist/bcrypt';

export default function App() {
  const db=getFirestore();
  const colRefBooks=collection(db,"books");
  const colRefUsers=collection(db,"users")
  // query for order by pending
  const q=query(colRefUsers,orderBy("pending","desc"));
  const [books, setbooks] = useState([]);
  const CategoriesPages=["Horror","Detective-and-Mystery","Romance","Kid-Zone","Historical","Comic-Book","Action-and-Adventure",];
  // users
  const [url, seturl] = useState("https://manager.almadarisp.com/user/img/user.png");
  const [User, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userImg, setuserImg] = useState("");
  const [adminUsers, setadminUsers] = useState([]);
  const [isSignedin, setisSignedin] = useState(JSON.parse(localStorage.getItem("isSignedin")));
  const [Admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")));
  const [Delivery, setDelivery] = useState(JSON.parse(localStorage.getItem("delivery")));
  const [Loading, setLoading] = useState(false);
  const [error, seterror] = useState("");
  const [CartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")):[]);
  const [Purchased, setPurchased] = useState(JSON.parse(localStorage.getItem("purchased"))?JSON.parse(localStorage.getItem("purchased")):[]);
  const [Pending, setPending] = useState(JSON.parse(localStorage.getItem("pending"))?JSON.parse(localStorage.getItem("pending")):[])

  const userImgHandler=(details)=>{
    setuserImg(details);
  }
  
  const Login=(details)=>{
    seterror("");
    adminUsers.map((adminUser)=>{
    if(details.email===adminUser.email && bcrypt.compareSync(details.password,adminUser.password)){
      setUser({
        id:adminUser.id,
        cart:adminUser.cart,
        pending:adminUser.pending,
        purchased:adminUser.purchased,
        name:adminUser.name,
        email:adminUser.email,
        country:adminUser.country,
        city:adminUser.city,
        street:adminUser.street,
        number:adminUser.number,
        img:adminUser.img
      });
      setisSignedin(true);
      if (details.email==="admin@admin.com") {
        setAdmin(true);
      };
      if (details.email==="delivery@delivery.com") {
        setDelivery(true);
      };
    }
    else{
      seterror("wrong user or password !!!")
    }
  })
};

  const SignupInfo=(details)=>{
    addDoc(colRefUsers,details)
    .then((data)=>{
      setUser({
        cart:[],
        pending:[],
        purchased:[],
        id:data.id,
        name:details.name,
        email:details.email,
        country:details.country,
        city:details.city,
        street:details.street,
        number:details.number,
        img:details.img,
      });
      const imgRef=ref(storage_bucket,`users-images/${data.id}.png`);
      uploadBytes(imgRef,userImg).then((snapshot)=>{
        console.log("photo has been uploaded");
    });
    })
    setisSignedin(true);
  }

  const Logout=(e)=>{
    e.preventDefault();
    setUser({cart:[],name:"",email:"",id:"rida"});
    setisSignedin(false);
    setAdmin(false);
    setDelivery(false);
    setCartItems([]);
    setPurchased([]);
    setPending([]);
    seturl("https://manager.almadarisp.com/user/img/user.png");
  }
  // useEffect for data rendering
  useEffect(() => {
    setLoading(true)
    // database books
    onSnapshot(colRefBooks,(snapshot)=>{
      let prebooks=[];
        snapshot.docs.map((doc)=>{
          prebooks.push({...doc.data(),id:doc.id,qty:1});
        });
        setbooks(prebooks);
    })
    // database Users
    onSnapshot(q,(snapshot)=>{
      let Users=[];
        snapshot.docs.map((doc)=>{
          Users.push({...doc.data(),id:doc.id})
        });
        setadminUsers(Users)
        setLoading(false)
    });
  }, []);
// useEffect for database Cart
useEffect(()=>{
  if(isSignedin){
  const docRefUser=doc(db,"users",User.id);
  onSnapshot(docRefUser,(doc)=>{
    setCartItems(doc.data().cart);
    setPurchased(doc.data().purchased);
    setPending(doc.data().pending);
  });
};
  seterror("");
},[User])
// useEffect for signed in
  useEffect(()=>{
    localStorage.setItem("isSignedin",JSON.stringify(isSignedin));
  },[isSignedin]);
  // useEffect for User item + User img
  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(User));
    if(User.img){
      setTimeout(() => {
        const imgRef=ref(storage_bucket,`users-images/${User.id}.png`);
        getDownloadURL(imgRef)
                  .then((url)=>{
                      seturl(url)
            })
      }, 500);
    };
  },[User])
  // useEffect for Cart item
  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(CartItems))
  },[CartItems])
  // useEffect for Purchased item
  useEffect(()=>{
    localStorage.setItem("purchased",JSON.stringify(Purchased))
  },[CartItems])
  // useEffect for Pending item
  useEffect(()=>{
    localStorage.setItem("pending",JSON.stringify(Pending))
  },[CartItems])
  // useEffect for admin item
  useEffect(()=>{
    localStorage.setItem("admin",JSON.stringify(Admin))
  },[Admin])
  // useEffect for delivery item
  useEffect(()=>{
    localStorage.setItem("delivery",JSON.stringify(Delivery))
  },[Delivery])
  return (
      <Router>
      <div className='min-h-full'>
          <Routes>
              <Route element={<Layout User={User} Logout={Logout} CartItems={CartItems} Loading={Loading} url={url} db={db} />}>
                <Route path='/home' element={<Books books={books} CartItems={CartItems} Admin={Admin} db={db} User={User} />} />
                <Route path='/categories' element={<Categories books={books} />} />
                <Route path='/purchased' element={<Bookshelf Purchased={Purchased} />} />
                <Route path='/about' element={<About />} />
                {CartItems.length!==0?
                <Route path='/checkout' element={<CheckOut CartItems={CartItems} User={User} db={db} />} />:<Route path="/checkout" element={<Navigate to="/home" />} />}
                {
                  CategoriesPages.map((Category)=>{
                    return <Route path={`/categories/${Category}`} key={Category} element={<Books books={books.filter((book)=>book.category===Category)} CartItems={CartItems} Admin={Admin} db={db} User={User} />} />
                  })
                }
                <Route path='*' element={<No />} />
                {/* routes for admin */}
                {Admin?
                <Route>
                  <Route path='/addbooks' element={<BookAdding colRefBooks={colRefBooks} />} />
                  <Route path='/users' element={<Users adminUsers={adminUsers} />} />
                  {adminUsers.map((user)=>{
                    return <Route path={'/users/'+user.id} element={<Checklist user={user} db={db} Delivery={Delivery} />} key={user.id} />
                  }
                  )}
                </Route>
                :""}
                {/* routes for delivery */}
                {Delivery?
                <Route>
                  <Route path='/users' element={<Users adminUsers={adminUsers} />} />
                  {adminUsers.map((user)=>{
                    return <Route path={'/users/'+user.id} element={<Checklist user={user} db={db} Delivery={Delivery} />} key={user.id} />
                  }
                  )}
                </Route>
                :""}
              </Route>
              )
              <Route element={<Layout2 />}>
                <Route path="/" element={<Welcome />} />
                {!isSignedin?
                <Route path='/signin' element={<Signin adminUsers={adminUsers} Login={Login} error={error} />} />:<Route path='/signin' element={<Navigate to="/home"/>} />}
                {!isSignedin?
                <Route path='/signup' element={<Signup SignupInfo={SignupInfo} adminUsers={adminUsers} userImgHandler={userImgHandler}/>} />:<Route path='/signup' element={<Navigate to="/home"/>} />}
                <Route path="/test" element={<Test User={User}/>} />
              </Route>
          </Routes>
      </div>
    </Router>
  )
}
