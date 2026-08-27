import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="site-footer"><div><Link className="wordmark wordmark-light" to="/home">MY LIBRARY</Link><p>A quieter place to find your next story.</p></div><nav aria-label="Footer navigation"><Link to="/home">Books</Link><Link to="/categories">Categories</Link><Link to="/about">About</Link></nav><span>© {new Date().getFullYear()} My Library</span></footer>;
}
