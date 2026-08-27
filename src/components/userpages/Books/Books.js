import { useMemo, useState } from 'react';
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Cards from './Cards';

export default function Books({ books, title = 'Find your next book', description = 'Search the collection, compare editions, and choose a story worth keeping.' }) {
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('all');
  const [sort, setSort] = useState('title');
  const languages = useMemo(() => [...new Set(books.map((book) => book.language).filter(Boolean))].sort(), [books]);
  const results = useMemo(() => books.filter((book) => {
    const term = search.toLowerCase();
    return (!term || `${book.title} ${book.author}`.toLowerCase().includes(term)) && (language === 'all' || book.language === language);
  }).sort((a, b) => sort === 'price-low' ? Number(a.price) - Number(b.price) : sort === 'price-high' ? Number(b.price) - Number(a.price) : String(a.title).localeCompare(String(b.title))), [books, search, language, sort]);

  return <main className="page catalog-page"><div className="page-heading"><p className="eyebrow">Curated collection</p><h1>{title}</h1><p>{description}</p></div><section className="catalog-toolbar" aria-label="Book filters"><label className="search-field"><MagnifyingGlassIcon /><span className="sr-only">Search books</span><input type="search" placeholder="Search title or author" value={search} onChange={(event) => setSearch(event.target.value)} /></label><div className="select-field"><AdjustmentsHorizontalIcon /><select aria-label="Filter by language" value={language} onChange={(event) => setLanguage(event.target.value)}><option value="all">All languages</option>{languages.map((item) => <option key={item}>{item}</option>)}</select></div><select aria-label="Sort books" value={sort} onChange={(event) => setSort(event.target.value)}><option value="title">Title A-Z</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><span className="result-count">{results.length} {results.length === 1 ? 'book' : 'books'}</span></section><Cards books={results} /></main>;
}
