import { Product } from "@/types/inventory";

export interface OnlineOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  orderDate: string;
  channel: "Online";
  status: "Pending" | "Confirmed" | "Shipped" | "Cancelled";
  totalAmount: number;
  paymentStatus: "Paid" | "Pending" | "Failed";
  notes?: string;
  items: {
    product: Product;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
}

export const mockOrders: OnlineOrder[] = [
  {
    id: "ORD-001",
    customerName: "Ahmed Al-Hassan",
    customerPhone: "+966 50 123 4567",
    customerAddress: "123 King Fahd Road, Riyadh, Saudi Arabia",
    orderDate: "2025-12-05 09:30",
    channel: "Online",
    status: "Pending",
    totalAmount: 285.00,
    paymentStatus: "Paid",
    notes: "Please deliver before 5 PM",
    items: [
      {
        product: { id: "SKU-001", name: "Brake Pad Set - Front", category: "Brakes", price: 85.00, quantityInStock: 45, location: { aisle: "A1", shelf: "S2" } },
        quantity: 2,
        unitPrice: 85.00,
        lineTotal: 170.00
      },
      {
        product: { id: "SKU-003", name: "Engine Oil 5W-30 (5L)", category: "Fluids", price: 45.00, quantityInStock: 120, location: { aisle: "B2", shelf: "S1" } },
        quantity: 1,
        unitPrice: 45.00,
        lineTotal: 45.00
      },
      {
        product: { id: "SKU-005", name: "Air Filter - Universal", category: "Filters", price: 35.00, quantityInStock: 80, location: { aisle: "C1", shelf: "S3" } },
        quantity: 2,
        unitPrice: 35.00,
        lineTotal: 70.00
      }
    ]
  },
  {
    id: "ORD-002",
    customerName: "Fatima Mohammed",
    customerPhone: "+966 55 987 6543",
    customerAddress: "456 Olaya Street, Jeddah, Saudi Arabia",
    orderDate: "2025-12-05 11:15",
    channel: "Online",
    status: "Confirmed",
    totalAmount: 420.00,
    paymentStatus: "Paid",
    items: [
      {
        product: { id: "SKU-002", name: "Oil Filter - Toyota", category: "Filters", price: 25.00, quantityInStock: 78, location: { aisle: "A2", shelf: "S1" } },
        quantity: 3,
        unitPrice: 25.00,
        lineTotal: 75.00
      },
      {
        product: { id: "SKU-006", name: "Spark Plug Set (4pc)", category: "Ignition", price: 55.00, quantityInStock: 60, location: { aisle: "D1", shelf: "S2" } },
        quantity: 2,
        unitPrice: 55.00,
        lineTotal: 110.00
      },
      {
        product: { id: "SKU-007", name: "Alternator Belt", category: "Belts", price: 65.00, quantityInStock: 35, location: { aisle: "E1", shelf: "S1" } },
        quantity: 1,
        unitPrice: 65.00,
        lineTotal: 65.00
      },
      {
        product: { id: "SKU-001", name: "Brake Pad Set - Front", category: "Brakes", price: 85.00, quantityInStock: 45, location: { aisle: "A1", shelf: "S2" } },
        quantity: 2,
        unitPrice: 85.00,
        lineTotal: 170.00
      }
    ]
  },
  {
    id: "ORD-003",
    customerName: "Omar Abdullah",
    customerPhone: "+966 56 555 1234",
    customerAddress: "789 Tahlia Street, Dammam, Saudi Arabia",
    orderDate: "2025-12-04 16:45",
    channel: "Online",
    status: "Shipped",
    totalAmount: 195.00,
    paymentStatus: "Paid",
    notes: "Customer requested express shipping",
    items: [
      {
        product: { id: "SKU-004", name: "Coolant Antifreeze (4L)", category: "Fluids", price: 38.00, quantityInStock: 95, location: { aisle: "B2", shelf: "S2" } },
        quantity: 2,
        unitPrice: 38.00,
        lineTotal: 76.00
      },
      {
        product: { id: "SKU-008", name: "Headlight Bulb H7", category: "Lighting", price: 28.00, quantityInStock: 150, location: { aisle: "F1", shelf: "S1" } },
        quantity: 4,
        unitPrice: 28.00,
        lineTotal: 112.00
      }
    ]
  },
  {
    id: "ORD-004",
    customerName: "Khalid Ibrahim",
    customerPhone: "+966 54 777 8899",
    customerAddress: "321 Prince Sultan Road, Riyadh, Saudi Arabia",
    orderDate: "2025-12-04 10:20",
    channel: "Online",
    status: "Cancelled",
    totalAmount: 130.00,
    paymentStatus: "Failed",
    notes: "Payment failed - customer requested cancellation",
    items: [
      {
        product: { id: "SKU-009", name: "Windshield Wipers (Pair)", category: "Accessories", price: 42.00, quantityInStock: 65, location: { aisle: "G1", shelf: "S2" } },
        quantity: 1,
        unitPrice: 42.00,
        lineTotal: 42.00
      },
      {
        product: { id: "SKU-010", name: "Battery Terminal Cleaner", category: "Maintenance", price: 18.00, quantityInStock: 200, location: { aisle: "H1", shelf: "S1" } },
        quantity: 2,
        unitPrice: 18.00,
        lineTotal: 36.00
      },
      {
        product: { id: "SKU-005", name: "Air Filter - Universal", category: "Filters", price: 35.00, quantityInStock: 80, location: { aisle: "C1", shelf: "S3" } },
        quantity: 1,
        unitPrice: 35.00,
        lineTotal: 35.00
      }
    ]
  },
  {
    id: "ORD-005",
    customerName: "Noura Al-Qahtani",
    customerPhone: "+966 50 333 4455",
    customerAddress: "567 Corniche Road, Jeddah, Saudi Arabia",
    orderDate: "2025-12-05 14:00",
    channel: "Online",
    status: "Pending",
    totalAmount: 310.00,
    paymentStatus: "Pending",
    items: [
      {
        product: { id: "SKU-006", name: "Spark Plug Set (4pc)", category: "Ignition", price: 55.00, quantityInStock: 60, location: { aisle: "D1", shelf: "S2" } },
        quantity: 4,
        unitPrice: 55.00,
        lineTotal: 220.00
      },
      {
        product: { id: "SKU-003", name: "Engine Oil 5W-30 (5L)", category: "Fluids", price: 45.00, quantityInStock: 120, location: { aisle: "B2", shelf: "S1" } },
        quantity: 2,
        unitPrice: 45.00,
        lineTotal: 90.00
      }
    ]
  }
];
