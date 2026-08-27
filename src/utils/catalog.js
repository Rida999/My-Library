export function filterAndSortBooks(books, { search = '', language = 'all', sort = 'title' } = {}) {
  const term = search.trim().toLowerCase();
  return books.filter((book) => (!term || `${book.title} ${book.author}`.toLowerCase().includes(term)) && (language === 'all' || book.language === language)).sort((a, b) => {
    if (sort === 'price-low') return Number(a.price) - Number(b.price);
    if (sort === 'price-high') return Number(b.price) - Number(a.price);
    return String(a.title).localeCompare(String(b.title));
  });
}

export function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);
}
