import { Product } from "@/types/inventory";

export const mockProducts: Product[] = [
  {
    id: "AP-001",
    name: "Brake Pad Set - Front",
    category: "Brakes",
    price: 337.46,
    quantityInStock: 24,
    location: { aisle: "A", shelf: "1" },
    description: "High-performance ceramic brake pads for front wheels. Compatible with most sedan models.",
    brand: "Bosch",
    sku: "BSH-BP-2024"
  },
  {
    id: "AP-002",
    name: "Oil Filter - Universal",
    category: "Filters",
    price: 48.71,
    quantityInStock: 156,
    location: { aisle: "A", shelf: "2" },
    description: "Universal fit oil filter for 4-cylinder engines.",
    brand: "Fram",
    sku: "FRM-OF-1001"
  },
  {
    id: "AP-003",
    name: "Spark Plug Set (4pc)",
    category: "Ignition",
    price: 131.21,
    quantityInStock: 48,
    location: { aisle: "B", shelf: "1" },
    description: "Iridium spark plugs for improved performance and fuel efficiency.",
    brand: "NGK",
    sku: "NGK-SP-4001"
  },
  {
    id: "AP-004",
    name: "Alternator - 12V 150A",
    category: "Electrical",
    price: 918.75,
    quantityInStock: 8,
    location: { aisle: "B", shelf: "2" },
    description: "High-output alternator for vehicles with heavy electrical loads.",
    brand: "Denso",
    sku: "DNS-ALT-150"
  },
  {
    id: "AP-005",
    name: "Air Filter - Performance",
    category: "Filters",
    price: 172.46,
    quantityInStock: 3,
    location: { aisle: "A", shelf: "3" },
    description: "Reusable high-flow air filter for increased horsepower.",
    brand: "K&N",
    sku: "KN-AF-2024"
  },
  {
    id: "AP-006",
    name: "Transmission Fluid - ATF",
    category: "Fluids",
    price: 108.71,
    quantityInStock: 64,
    location: { aisle: "C", shelf: "1" },
    description: "Synthetic automatic transmission fluid, 1 gallon.",
    brand: "Valvoline",
    sku: "VAL-ATF-1G"
  },
  {
    id: "AP-007",
    name: "Serpentine Belt",
    category: "Belts & Hoses",
    price: 121.88,
    quantityInStock: 5,
    location: { aisle: "C", shelf: "2" },
    description: "EPDM rubber serpentine belt, 6-rib design.",
    brand: "Gates",
    sku: "GTS-SB-6RB"
  },
  {
    id: "AP-008",
    name: "Wheel Bearing Hub Assembly",
    category: "Suspension",
    price: 667.50,
    quantityInStock: 6,
    location: { aisle: "B", shelf: "3" },
    description: "Complete wheel bearing hub assembly for front wheels.",
    brand: "Timken",
    sku: "TMK-WBH-001"
  },
  {
    id: "AP-009",
    name: "Headlight Bulb - LED",
    category: "Lighting",
    price: 337.46,
    quantityInStock: 42,
    location: { aisle: "C", shelf: "3" },
    description: "6000K white LED headlight bulbs, pair.",
    brand: "Philips",
    sku: "PHL-LED-6K"
  },
  {
    id: "AP-010",
    name: "Coolant - 50/50 Premix",
    category: "Fluids",
    price: 71.21,
    quantityInStock: 72,
    location: { aisle: "D", shelf: "1" },
    description: "Ready-to-use antifreeze coolant, 1 gallon.",
    brand: "Prestone",
    sku: "PRS-CL-1G"
  },
  {
    id: "AP-011",
    name: "Shock Absorber - Rear",
    category: "Suspension",
    price: 468.71,
    quantityInStock: 4,
    location: { aisle: "D", shelf: "2" },
    description: "Gas-charged shock absorber for rear suspension.",
    brand: "Monroe",
    sku: "MNR-SH-R01"
  },
  {
    id: "AP-012",
    name: "Battery - 12V 650CCA",
    category: "Electrical",
    price: 599.96,
    quantityInStock: 12,
    location: { aisle: "D", shelf: "3" },
    description: "Maintenance-free automotive battery with 3-year warranty.",
    brand: "DieHard",
    sku: "DH-BAT-650"
  }
];
