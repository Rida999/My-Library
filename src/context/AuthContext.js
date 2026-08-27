import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../DataBase/Data';

const AuthContext = createContext(null);
const emptyProfile = { name: '', email: '', role: 'user', country: '', city: '', street: '', number: '', photoURL: '' };

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile = () => {};
    const unsubscribeAuth = onAuthStateChanged(auth, (nextUser) => {
    unsubscribeProfile();
    setFirebaseUser(nextUser);
    if (!nextUser) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    unsubscribeProfile = onSnapshot(doc(db, 'users', nextUser.uid), (snapshot) => {
      setProfile(snapshot.exists() ? { id: nextUser.uid, ...emptyProfile, ...snapshot.data() } : { id: nextUser.uid, ...emptyProfile, name: nextUser.displayName || '', email: nextUser.email || '' });
      setLoading(false);
    }, () => setLoading(false));
    });
    return () => { unsubscribeProfile(); unsubscribeAuth(); };
  }, []);

  const login = ({ email, password }) => signInWithEmailAndPassword(auth, email.trim(), password);
  const signup = async ({ password, ...details }) => {
    const credential = await createUserWithEmailAndPassword(auth, details.email.trim(), password);
    const userProfile = { ...emptyProfile, ...details, email: credential.user.email, name: details.name.trim(), role: 'user', createdAt: serverTimestamp() };
    await Promise.all([updateProfile(credential.user, { displayName: userProfile.name }), setDoc(doc(db, 'users', credential.user.uid), userProfile)]);
    setProfile({ id: credential.user.uid, ...userProfile });
  };

  const value = useMemo(() => ({ firebaseUser, profile, loading, login, signup, logout: () => signOut(auth), isAdmin: profile?.role === 'admin', isDelivery: profile?.role === 'delivery' }), [firebaseUser, profile, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
