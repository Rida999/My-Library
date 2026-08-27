import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const initialForm = { name: '', email: '', password: '', country: '', city: '', street: '', number: '' };

export default function Signup() {
  const { firebaseUser, signup } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  if (firebaseUser) return <Navigate to="/home" replace />;

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.password.length < 8) return setError('Use at least 8 characters for your password.');
    setSubmitting(true);
    setError('');
    try {
      await signup(form);
      navigate('/home', { replace: true });
    } catch (authError) {
      setError(authError.code === 'auth/email-already-in-use' ? 'That email already has an account.' : 'We could not create your account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return <main className="auth-page"><form className="auth-panel auth-panel-wide" onSubmit={handleSubmit}>
    <Link className="wordmark" to="/">MY LIBRARY</Link>
    <div><p className="eyebrow">Join the library</p><h1>Create your account</h1><p className="muted">Your delivery details stay with your profile for a faster checkout.</p></div>
    <div className="form-grid">
      <label className="span-two">Full name<input required value={form.name} onChange={update('name')} /></label>
      <label className="span-two">Email<input type="email" autoComplete="email" required value={form.email} onChange={update('email')} /></label>
      <label className="span-two">Password<input type="password" autoComplete="new-password" minLength="8" required value={form.password} onChange={update('password')} /></label>
      <label>Country<input required value={form.country} onChange={update('country')} /></label><label>City<input required value={form.city} onChange={update('city')} /></label>
      <label>Street<input required value={form.street} onChange={update('street')} /></label><label>Phone<input type="tel" required value={form.number} onChange={update('number')} /></label>
    </div>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button button-primary" disabled={submitting} type="submit">{submitting ? 'Creating account...' : 'Create account'}</button>
    <p className="auth-switch">Already a member? <Link to="/signin">Sign in</Link></p>
  </form></main>;
}
