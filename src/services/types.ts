export interface Product {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    stockQuantity: number;
    edition: string;
    rarity: string;
}

export interface User {
    id?: number;
    username: string;
    email: string;
    passwordHash: string;
    role: 'Admin' | 'Customer';
}

export interface OrderItem {
    id?: number;
    orderId?: number;
    productId: number;
    quantity: number;
    price: number;
}

export interface ShippingInfo {
    id?: number;
    orderId?: number;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    shippingCost: number;
    status: string;
    trackingNumber: string;
    estimatedDelivery?: Date;
    shippedDate?: Date;
    deliveredDate?: Date;
}

export interface Order {
    id?: number;
    userId: number;
    status?: string;
    totalPrice?: number;
    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;
    createdAt?: string;
}

export type PaymentMethod =
  | 'PayPal'
  | 'CreditCard'
  | 'DebitCard'
  | 'Pix'
  | 'Boleto'
  | 'ApplePay'
  | 'GooglePay'
  | 'Venmo'
  | 'Oxxo'
  | 'Cash'
  | 'Alternative';

export type PaymentStatus =
  | 'Pending'
  | 'Completed'
  | 'Denied'
  | 'Refunded'
  | 'Reverted'
  | 'Undefined';

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  createdAt: string;
  completedAt?: string;
}
