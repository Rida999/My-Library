import { describe, expect, it } from 'vitest';
import { calculateSubtotal, filterAndSortBooks } from './catalog';

const books = [
  { title: 'Zebra', author: 'Jane Doe', language: 'English', price: 9 },
  { title: 'Amber', author: 'Jean Dupont', language: 'French', price: 15 },
  { title: 'Ocean', author: 'Jane Doe', language: 'English', price: 7 },
];

describe('filterAndSortBooks', () => {
  it('searches titles and authors case-insensitively', () => expect(filterAndSortBooks(books, { search: 'JANE' })).toHaveLength(2));
  it('combines language filtering and price sorting', () => expect(filterAndSortBooks(books, { language: 'English', sort: 'price-low' }).map((book) => book.title)).toEqual(['Ocean', 'Zebra']));
  it('does not mutate the original catalog', () => { filterAndSortBooks(books); expect(books[0].title).toBe('Zebra'); });
});

describe('calculateSubtotal', () => {
  it('normalizes numeric strings', () => expect(calculateSubtotal([{ price: '12.50', qty: '2' }, { price: 5, qty: 1 }])).toBe(30));
});
