// data.ts

import fs from 'fs';
import { Book, Order } from './types';

const BOOKS_FILE = './data/books.json';
const ORDERS_FILE = './data/orders.json';

export function readBooks() {
  const booksData = fs.readFileSync(BOOKS_FILE, 'utf8');
  return JSON.parse(booksData);
}

export function writeBooks(books: Book[]) {
  fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2));
}

export function readOrders() {
  const ordersData = fs.readFileSync(ORDERS_FILE, 'utf8');
  return JSON.parse(ordersData);
}

export function writeOrders(orders: Order[]) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}
