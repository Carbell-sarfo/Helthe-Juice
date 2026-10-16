export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  deliveryDate: string;
  bundleSize: number;
  flavors: Record<string, number>;
  totalAmount: number;
  status: 'Pending' | 'Paid' | 'Delivered';
  createdAt: string;
}

const orders: Order[] = [];

export function addOrder(order: Order) {
  orders.unshift(order);
}

export function getOrders(): Order[] {
  return orders;
}