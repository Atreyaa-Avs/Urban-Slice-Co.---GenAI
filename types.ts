export interface ProductSize {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  tags: string[];
  rating: number;
  image: string;
  sizes: ProductSize[];
  featured?: boolean;
}

export interface ProductExtra {
  id: string;
  name: string;
  price: number;
  category?: 'party' | 'savoury';
}

export interface CartItem {
  id: string; // unique instance id (e.g. productid + timestamp)
  productId: string;
  productName: string;
  productImage: string;
  selectedSize: ProductSize;
  quantity: number;
  customization?: {
    occasion?: string;
    message?: string;
  };
  extras: ProductExtra[];
  bundleId?: string; // if part of a bundle
}

export interface BundleItem {
  cake: Product;
  cakeSize: ProductSize;
  gift: ProductExtra;
  card: ProductExtra;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: Address;
}

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
}

export interface PromoCode {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrder: number;
}
