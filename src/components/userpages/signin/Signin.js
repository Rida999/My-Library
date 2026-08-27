import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function Signin() {
  const { firebaseUser, login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  if (firebaseUser) return <Navigate to="/home" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form);
      navigate(location.state?.from?.pathname || '/home', { replace: true });
    } catch {
      setError('We could not sign you in. Check your email and password.');
    } finally {
      setSubmitting(false);
    }
  };

  return <main className="auth-page"><form className="auth-panel" onSubmit={handleSubmit}>
    <Link className="wordmark" to="/">MY LIBRARY</Link>
    <div><p className="eyebrow">Welcome back</p><h1>Sign in to your shelf</h1><p className="muted">Continue browsing, ordering, and tracking your books.</p></div>
    <label>Email<input type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
    <label>Password<input type="password" autoComplete="current-password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button button-primary" disabled={submitting} type="submit">{submitting ? 'Signing in...' : 'Sign in'}</button>
    <p className="auth-switch">New here? <Link to="/signup">Create an account</Link></p>
  </form></main>;
}
