import { ArrowLeftIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { addBookToCart, toggleFavorite } from '../../../services/library';

export default function BookDetails({ books }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { firebaseUser, profile } = useAuth();
  const book = books.find((item) => item.id === id);
  if (!book) return <main className="page"><div className="empty-state"><h1>That book is not on the shelf.</h1><Link to="/home">Return to the collection</Link></div></main>;
  const liked = profile?.favorites?.includes(book.id);
  const requireAccount = (action) => firebaseUser ? action() : navigate('/signin');
  return <main className="page detail-page"><Link className="back-link" to="/home"><ArrowLeftIcon /> Back to books</Link><div className="book-detail"><div className="detail-cover"><img src={book.url} alt={`Cover of ${book.title}`} /></div><section><p className="eyebrow">{book.category?.replaceAll('-', ' ')} · {book.language}</p><h1>{book.title}</h1><p className="detail-author">by {book.author}</p><p className="detail-description">{book.description || 'A memorable addition to any reader’s shelf.'}</p><div className="detail-facts"><div><span>Format</span><strong>{book.format || 'Paperback'}</strong></div><div><span>Availability</span><strong>{Number(book.stock) === 0 ? 'Out of stock' : 'In stock'}</strong></div></div><div className="detail-actions"><strong>${Number(book.price).toFixed(2)}</strong><button className="button button-primary" onClick={() => requireAccount(() => addBookToCart(profile.id, book))}><ShoppingBagIcon /> Add to bag</button><button className="icon-button favorite-detail" onClick={() => requireAccount(() => toggleFavorite(profile.id, book.id, liked))} aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}>{liked ? <HeartSolidIcon /> : <HeartIcon />}</button></div></section></div></main>;
}
