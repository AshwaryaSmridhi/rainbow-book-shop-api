import { Router } from 'express';
import { readBooks, writeBooks, readOrders, writeOrders } from './data';
import { Book, Order } from './types';
import { v4 as uuidv4 } from 'uuid';

const router = Router();


  // Create/update a book
  router.post('/books', (req, res) => {
    const { title, description, price, stock } = req.body;
    const books = readBooks();
  
    const existingBook = books.find((book: Book) => book.title === title);
  
    if (existingBook) {
      res.status(400).json({ message: 'Book is already available' });
    } else {
      const newBook = { title, description, price, stock };
      books.push(newBook);
      writeBooks(books)
      res.json(books);
    }
});

// Get a list of books
router.get('/books', (_, res) => {
    const books = readBooks();
    res.json(books);
})
  
  
router.put('/books/:titleParam', (req, res) => {
    const { titleParam } = req.params; // Get the title from the URL parameter
    const { title, description, price, stock } = req.body;
    const books = readBooks();
  
    const existingBook = books.find((book: Book) => book.title === titleParam);
    if (existingBook) {
      existingBook.title = title;
      existingBook.description = description;
      existingBook.price = price;
      existingBook.stock = stock;
    } else {
      // Handle case where book with given title doesn't exist
      return res.status(404).json({ message: 'Book not found' });
    }
    writeBooks(books);
    res.json(books);
})
  
  // Get a list of orders
  router.get('/orders', (_, res) => {
    const orders = readOrders();
    res.json(orders);
  })
  
  // Create an order
  router.post('/orders', (req, res) => {
    const { title, quantity } = req.body;
    const books = readBooks();
    const orders = readOrders();
  
    const book = books.find((b: Book) => b.title === title);
    if (!book || book.stock < quantity) {
      res.status(400).json({ message: 'Book not available in requested quantity' });
      return;
    }
  
    const id = uuidv4();
    const newOrder = { id, title, quantity, shipping: {}, status: 'processing' };
    orders.push(newOrder);
  
    // Deduct stock from the book
    book.stock -= quantity;
  
    
    // Write the updated orders array to a JSON file
    writeBooks(books);
    writeOrders(orders);
  
    res.json(newOrder);
  });
  
  // Update order with shipping information
  router.put('/orders/:orderId/shipping', (req, res) => {
    const { orderId } = req.params;
    const { trackingCompany, trackingNumber } = req.body;
    const orders = readOrders();
  
    const order = orders.find((o: Order) => o.id === orderId);
    if (order) {
      order.shipping = { trackingCompany, trackingNumber };
      writeOrders(orders);
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  });
  
  // Update order status
  router.put('/orders/:orderId/status', (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = readOrders();
  
    const order = orders.find((o: Order) => o.id === orderId);
    if (order) {
      order.status = status;
      writeOrders(orders);
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  });

export default router;
