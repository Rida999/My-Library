import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { addBookToCart, toggleFavorite } from '../../../services/library';

export default function Cards({ books }) {
  const { firebaseUser, profile } = useAuth();
  const navigate = useNavigate();
  const favorites = profile?.favorites || [];
  const add = async (book) => {
    if (!firebaseUser) return navigate('/signin');
    await addBookToCart(profile.id, book);
  };
  const favorite = async (bookId) => {
    if (!firebaseUser) return navigate('/signin');
    await toggleFavorite(profile.id, bookId, favorites.includes(bookId));
  };

  if (!books.length) return <div className="empty-state"><h2>No books match those filters.</h2><p>Try another title, language, or category.</p></div>;
  return <div className="book-grid">{books.map((book) => {
    const liked = favorites.includes(book.id);
    return <article className="book-card" key={book.id}><div className="cover-wrap"><Link to={`/books/${book.id}`}><img src={book.url} alt={`Cover of ${book.title}`} /></Link><button className={`favorite-button ${liked ? 'is-active' : ''}`} onClick={() => favorite(book.id)} aria-label={`${liked ? 'Remove' : 'Add'} ${book.title} ${liked ? 'from' : 'to'} favorites`}>{liked ? <HeartSolidIcon /> : <HeartIcon />}</button></div><div className="book-meta"><p>{book.category?.replaceAll('-', ' ') || 'General'}</p><h2><Link to={`/books/${book.id}`}>{book.title}</Link></h2><span>{book.author}</span><footer><strong>${Number(book.price).toFixed(2)}</strong><button className="icon-button add-button" onClick={() => add(book)} aria-label={`Add ${book.title} to cart`}><ShoppingBagIcon /></button></footer></div></article>;
  })}</div>;
}
