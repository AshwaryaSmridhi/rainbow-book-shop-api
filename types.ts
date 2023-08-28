export type Book = {
    title: string; 
    description: string; 
    price: number; 
    stock: number;
  }
  
export type Order = {
    id: string;
    title: string;
    quantity: number;
    shipping: {
      trackingCompany: string;
      trackingNumber: string;
    }
    status: string;
  }