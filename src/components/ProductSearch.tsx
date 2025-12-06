import { useState, useMemo } from "react";
import { Search, Package, MapPin, Box } from "lucide-react";
import { Product } from "@/types/inventory";
import { mockProducts } from "@/data/mockProducts";

interface ProductSearchProps {
  onSelectProduct: (product: Product) => void;
  selectedProductId?: string;
}

const ProductSearch = ({ onSelectProduct, selectedProductId }: ProductSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return mockProducts;
    
    const query = searchQuery.toLowerCase();
    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    onSelectProduct(product);
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: "Out of Stock", class: "badge-danger" };
    if (quantity < 10) return { label: "Low Stock", class: "badge-warning" };
    return { label: "In Stock", class: "badge-success" };
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search product by name, ID, or category..."
          className="input-field w-full pl-12 py-3 text-base"
          autoFocus
        />
      </div>

      {/* Product Results Table */}
      <div className="flex-1 glass-card overflow-hidden flex flex-col">
        <div className="section-title px-4 pt-4">
          Product Results ({filteredProducts.length})
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-card border-b border-border">
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Product ID</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium text-right">Price (SAR)</th>
                <th className="px-4 py-3 font-medium text-center">Stock</th>
                <th className="px-4 py-3 font-medium">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className={`table-row-hover ${
                    selectedProductId === product.id 
                      ? "bg-secondary/10 border-l-2 border-l-secondary" 
                      : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-secondary">{product.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      {product.brand && (
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{product.category}</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">
                    SAR {product.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={getStockStatus(product.quantityInStock).class}>
                      {product.quantityInStock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Aisle {product.location.aisle}, Shelf {product.location.shelf}
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No products found matching "{searchQuery}"</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Product Detail */}
      {selectedProduct && (
        <div className="glass-card p-4 animate-slide-up">
          <div className="section-title">Product Details</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Box className="w-5 h-5 text-secondary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Product</p>
                <p className="font-medium text-foreground">{selectedProduct.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{selectedProduct.description}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 flex items-center justify-center text-secondary mt-0.5 font-bold text-sm">
                SAR
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unit Price</p>
                <p className="font-bold text-xl text-foreground">SAR {selectedProduct.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-secondary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Available Stock</p>
                <p className="font-medium text-foreground">{selectedProduct.quantityInStock} units</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-secondary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Store Location</p>
                <p className="font-medium text-foreground">
                  Aisle {selectedProduct.location.aisle}, Shelf {selectedProduct.location.shelf}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
