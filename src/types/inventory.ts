export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantityInStock: number;
  location: {
    aisle: string;
    shelf: string;
  };
  description?: string;
  brand?: string;
  sku?: string;
}

export interface Customer {
  name: string;
  phone: string;
  notes?: string;
}

export interface SaleItem {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  customer: Customer;
  grandTotal: number;
  timestamp: Date;
  invoiceNumber: string;
}
