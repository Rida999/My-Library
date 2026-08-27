import { useState } from 'react';
import { PencilSquareIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { removeBook, saveBook } from '../../services/library';

const emptyBook = { title: '', author: '', description: '', category: 'Horror', language: 'English', format: 'Paperback', price: '', stock: '', url: '' };
const categories = ['Horror', 'Detective-and-Mystery', 'Romance', 'Kid-Zone', 'Historical', 'Comic-Book', 'Action-and-Adventure'];

export default function BookAdding({ books }) {
  const [form, setForm] = useState(emptyBook);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });
  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setError('');
    try { await saveBook(form); setForm(emptyBook); } catch { setError('The book could not be saved. Check the fields and try again.'); } finally { setSaving(false); }
  };
  const edit = (book) => { setForm({ ...emptyBook, ...book }); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const remove = async (book) => { if (window.confirm(`Delete “${book.title}”? This cannot be undone.`)) await removeBook(book.id); };

  return <main className="page admin-page"><div className="page-heading"><p className="eyebrow">Catalog workspace</p><h1>{form.id ? 'Edit this book' : 'Add a book'}</h1><p>Keep titles, cover art, prices, and availability accurate from one place.</p></div><form className="book-form" onSubmit={submit}><div className="form-grid"><label>Title<input required value={form.title} onChange={update('title')} /></label><label>Author<input required value={form.author} onChange={update('author')} /></label><label>Category<select value={form.category} onChange={update('category')}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><label>Language<select value={form.language} onChange={update('language')}><option>English</option><option>Arabic</option><option>French</option></select></label><label>Price<input required min="0" step="0.01" type="number" value={form.price} onChange={update('price')} /></label><label>Stock<input required min="0" type="number" value={form.stock} onChange={update('stock')} /></label><label className="span-two">Cover image URL<input required type="url" value={form.url} onChange={update('url')} /></label><label className="span-two">Description<textarea rows="4" required value={form.description} onChange={update('description')} /></label></div>{error && <p className="form-error">{error}</p>}<div className="form-actions"><button className="button button-primary" disabled={saving} type="submit"><PlusIcon />{saving ? 'Saving...' : form.id ? 'Save changes' : 'Add book'}</button>{form.id && <button className="button button-secondary" type="button" onClick={() => setForm(emptyBook)}><XMarkIcon />Cancel editing</button>}</div></form><section className="catalog-admin"><div><h2>Catalog</h2><span>{books.length} titles</span></div><div className="catalog-admin-list">{books.map((book) => <article key={book.id}><img src={book.url} alt="" /><div><h3>{book.title}</h3><p>{book.author}</p><span>{Number(book.stock) || 0} in stock · ${Number(book.price).toFixed(2)}</span></div><button className="icon-button" onClick={() => edit(book)} aria-label={`Edit ${book.title}`}><PencilSquareIcon /></button><button className="icon-button danger" onClick={() => remove(book)} aria-label={`Delete ${book.title}`}><TrashIcon /></button></article>)}</div></section></main>;
}
