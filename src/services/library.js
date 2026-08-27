import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, runTransaction, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../DataBase/Data';

export function addBookToCart(userId, book) {
  return updateDoc(doc(db, 'users', userId), { cart: arrayUnion({ id: book.id, qty: 1, title: book.title, author: book.author, price: Number(book.price), url: book.url || '' }) });
}

export function saveCart(userId, cart) {
  return updateDoc(doc(db, 'users', userId), { cart });
}

export function toggleFavorite(userId, bookId, isFavorite) {
  return updateDoc(doc(db, 'users', userId), { favorites: isFavorite ? arrayRemove(bookId) : arrayUnion(bookId) });
}

export async function placeOrder(user) {
  return runTransaction(db, async (transaction) => {
    const userRef = doc(db, 'users', user.id);
    const userSnapshot = await transaction.get(userRef);
    const cart = userSnapshot.data()?.cart || [];
    if (!cart.length) throw new Error('Your cart is empty.');

    const items = [];
    for (const cartItem of cart) {
      const bookSnapshot = await transaction.get(doc(db, 'books', cartItem.id));
      if (!bookSnapshot.exists()) throw new Error(`${cartItem.title} is no longer available.`);
      const book = bookSnapshot.data();
      items.push({ id: cartItem.id, title: book.title, author: book.author, url: book.url || '', price: Number(book.price), qty: Number(cartItem.qty) || 1 });
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal > 0 ? 2 : 0;
    const orderRef = doc(collection(db, 'orders'));
    transaction.set(orderRef, {
      userId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      address: { country: user.country, city: user.city, street: user.street, number: user.number },
      items,
      subtotal,
      shipping,
      total: subtotal + shipping,
      status: 'placed',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    transaction.update(userRef, { cart: [] });
    return orderRef.id;
  });
}

export function updateOrderStatus(orderId, status) {
  return updateDoc(doc(db, 'orders', orderId), { status, updatedAt: serverTimestamp() });
}

export function saveBook(book) {
  const payload = { ...book, price: Number(book.price), stock: Number(book.stock), updatedAt: serverTimestamp() };
  if (book.id) {
    const { id, ...changes } = payload;
    return updateDoc(doc(db, 'books', id), changes);
  }
  return addDoc(collection(db, 'books'), { ...payload, createdAt: serverTimestamp() });
}

export function removeBook(bookId) {
  return deleteDoc(doc(db, 'books', bookId));
}
