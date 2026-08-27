import { Link } from 'react-router-dom';

export default function No() { return <main className="page"><div className="empty-state not-found"><p className="eyebrow">404</p><h1>This page slipped between the shelves.</h1><p>The link may be old, or the page may have moved.</p><Link className="button button-primary" to="/home">Return to the books</Link></div></main>; }
