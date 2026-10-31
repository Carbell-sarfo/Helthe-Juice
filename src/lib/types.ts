export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number; // Stored in the smallest currency unit (e.g., pesewas)
  stock: number;
  imageUrl?: string;
  active: boolean;
  fruits: string[];
  volume: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  imageUrl?: string;
};

export type Order = {
  id: string;
  items: Array<{ productId: string; name: string; price: number; qty: number }>;
  total: number;
  currency: string;
  status: 'pending' | 'paid' | 'fulfilled' | 'failed' | 'review';
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  createdAt: any;
  paidAt?: any;
};