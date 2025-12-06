export interface SalesRecord {
  id: string;
  date: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  channel: "In-Store" | "Online";
  customerName: string;
}

export interface InventoryMovement {
  id: string;
  date: string;
  productId: string;
  productName: string;
  type: "Sale" | "Restock" | "Adjustment";
  quantityChange: number;
  previousStock: number;
  newStock: number;
}

export interface LowStockEvent {
  id: string;
  date: string;
  productId: string;
  productName: string;
  stockLevel: number;
  threshold: number;
}

export const mockSalesRecords: SalesRecord[] = [
  { id: "SR-001", date: "2025-12-01", productId: "AP-001", productName: "Brake Pad Set - Front", quantity: 2, unitPrice: 337.46, total: 674.92, channel: "In-Store", customerName: "Ahmed Al-Hassan" },
  { id: "SR-002", date: "2025-12-01", productId: "AP-002", productName: "Oil Filter - Universal", quantity: 5, unitPrice: 48.71, total: 243.55, channel: "In-Store", customerName: "Saad Al-Qahtani" },
  { id: "SR-003", date: "2025-12-02", productId: "AP-003", productName: "Spark Plug Set (4pc)", quantity: 3, unitPrice: 131.21, total: 393.63, channel: "Online", customerName: "Abdullah Al-Rashid" },
  { id: "SR-004", date: "2025-12-02", productId: "AP-004", productName: "Alternator - 12V 150A", quantity: 1, unitPrice: 918.75, total: 918.75, channel: "In-Store", customerName: "Mohammed Al-Saud" },
  { id: "SR-005", date: "2025-12-03", productId: "AP-005", productName: "Air Filter - Performance", quantity: 4, unitPrice: 172.46, total: 689.84, channel: "Online", customerName: "Khalid bin Hamad" },
  { id: "SR-006", date: "2025-12-03", productId: "AP-006", productName: "Transmission Fluid - ATF", quantity: 6, unitPrice: 108.71, total: 652.26, channel: "In-Store", customerName: "Omar Al-Faisal" },
  { id: "SR-007", date: "2025-12-04", productId: "AP-007", productName: "Serpentine Belt", quantity: 2, unitPrice: 121.88, total: 243.76, channel: "In-Store", customerName: "Youssef Al-Ahmad" },
  { id: "SR-008", date: "2025-12-04", productId: "AP-008", productName: "Wheel Bearing Hub Assembly", quantity: 1, unitPrice: 667.50, total: 667.50, channel: "Online", customerName: "Fahad Al-Turki" },
  { id: "SR-009", date: "2025-12-05", productId: "AP-009", productName: "Headlight Bulb - LED", quantity: 3, unitPrice: 337.46, total: 1012.38, channel: "In-Store", customerName: "Nasser Al-Dossary" },
  { id: "SR-010", date: "2025-12-05", productId: "AP-010", productName: "Coolant - 50/50 Premix", quantity: 8, unitPrice: 71.21, total: 569.68, channel: "Online", customerName: "Sultan Al-Otaibi" },
];

export const mockInventoryMovements: InventoryMovement[] = [
  { id: "IM-001", date: "2025-12-01", productId: "AP-001", productName: "Brake Pad Set - Front", type: "Sale", quantityChange: -2, previousStock: 26, newStock: 24 },
  { id: "IM-002", date: "2025-12-01", productId: "AP-002", productName: "Oil Filter - Universal", type: "Restock", quantityChange: 50, previousStock: 106, newStock: 156 },
  { id: "IM-003", date: "2025-12-02", productId: "AP-005", productName: "Air Filter - Performance", type: "Sale", quantityChange: -4, previousStock: 7, newStock: 3 },
  { id: "IM-004", date: "2025-12-03", productId: "AP-007", productName: "Serpentine Belt", type: "Sale", quantityChange: -2, previousStock: 7, newStock: 5 },
  { id: "IM-005", date: "2025-12-04", productId: "AP-011", productName: "Shock Absorber - Rear", type: "Adjustment", quantityChange: -2, previousStock: 6, newStock: 4 },
  { id: "IM-006", date: "2025-12-05", productId: "AP-003", productName: "Spark Plug Set (4pc)", type: "Restock", quantityChange: 20, previousStock: 28, newStock: 48 },
];

export const mockLowStockEvents: LowStockEvent[] = [
  { id: "LS-001", date: "2025-12-02", productId: "AP-005", productName: "Air Filter - Performance", stockLevel: 3, threshold: 10 },
  { id: "LS-002", date: "2025-12-03", productId: "AP-007", productName: "Serpentine Belt", stockLevel: 5, threshold: 10 },
  { id: "LS-003", date: "2025-12-04", productId: "AP-011", productName: "Shock Absorber - Rear", stockLevel: 4, threshold: 10 },
  { id: "LS-004", date: "2025-12-05", productId: "AP-008", productName: "Wheel Bearing Hub Assembly", stockLevel: 6, threshold: 10 },
];

export const getMonthlyMetrics = () => {
  const totalSales = mockSalesRecords.reduce((acc, record) => acc + record.total, 0);
  const totalTransactions = mockSalesRecords.length;
  const inStoreSales = mockSalesRecords.filter(r => r.channel === "In-Store").reduce((acc, r) => acc + r.total, 0);
  const onlineSales = mockSalesRecords.filter(r => r.channel === "Online").reduce((acc, r) => acc + r.total, 0);
  const totalInventoryMovements = mockInventoryMovements.length;
  const lowStockEvents = mockLowStockEvents.length;
  
  return {
    totalSales,
    totalTransactions,
    inStoreSales,
    onlineSales,
    totalInventoryMovements,
    lowStockEvents,
    averageTransactionValue: totalSales / totalTransactions,
  };
};
