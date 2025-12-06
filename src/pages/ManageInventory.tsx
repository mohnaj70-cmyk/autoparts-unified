import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  AlertTriangle, 
  Plus, 
  Save,
  MapPin,
  Boxes,
  Edit3,
  RefreshCw
} from "lucide-react";
import { mockProducts } from "@/data/mockProducts";
import { Product } from "@/types/inventory";

const LOW_STOCK_THRESHOLD = 10;

const ManageInventory = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    quantityInStock: "",
    adjustment: "",
    supplier: "",
    aisle: "",
    shelf: "",
    description: "",
    brand: "",
    sku: "",
  });

  const lowStockProducts = products.filter(
    (p) => p.quantityInStock <= LOW_STOCK_THRESHOLD
  );

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsAddingNew(false);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      quantityInStock: product.quantityInStock.toString(),
      adjustment: "",
      supplier: "",
      aisle: product.location.aisle,
      shelf: product.location.shelf,
      description: product.description || "",
      brand: product.brand || "",
      sku: product.sku || "",
    });
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsAddingNew(true);
    setFormData({
      id: `AP-${String(products.length + 1).padStart(3, "0")}`,
      name: "",
      category: "",
      price: "",
      quantityInStock: "",
      adjustment: "",
      supplier: "",
      aisle: "",
      shelf: "",
      description: "",
      brand: "",
      sku: "",
    });
  };

  const handleUpdateStock = () => {
    if (!selectedProduct) return;

    const adjustment = parseInt(formData.adjustment) || 0;
    const currentStock = parseInt(formData.quantityInStock) || 0;
    const newStock = currentStock + adjustment;

    if (newStock < 0) {
      toast({
        title: "Invalid Adjustment",
        description: "Stock cannot be negative.",
        variant: "destructive",
      });
      return;
    }

    setProducts(
      products.map((p) =>
        p.id === selectedProduct.id
          ? { ...p, quantityInStock: newStock }
          : p
      )
    );

    toast({
      title: "Stock Updated",
      description: `${selectedProduct.name} stock adjusted by ${adjustment > 0 ? "+" : ""}${adjustment}. New stock: ${newStock} units.`,
    });

    setFormData({ ...formData, quantityInStock: newStock.toString(), adjustment: "" });
    setSelectedProduct({ ...selectedProduct, quantityInStock: newStock });
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.category || !formData.price || !formData.quantityInStock) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newProduct: Product = {
      id: formData.id,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      quantityInStock: parseInt(formData.quantityInStock),
      location: { aisle: formData.aisle, shelf: formData.shelf },
      description: formData.description,
      brand: formData.brand,
      sku: formData.sku,
    };

    setProducts([...products, newProduct]);
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added to inventory.`,
    });

    setIsAddingNew(false);
    handleSelectProduct(newProduct);
  };

  const getStockBadge = (quantity: number) => {
    if (quantity === 0) {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Out of Stock</Badge>;
    }
    if (quantity <= 5) {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Critical</Badge>;
    }
    if (quantity <= LOW_STOCK_THRESHOLD) {
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Low Stock</Badge>;
    }
    return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">In Stock</Badge>;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Left Panel - Low Stock Alerts */}
          <div className="lg:col-span-1 bg-card rounded-lg border border-border p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Low Stock Alerts
              </h2>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                {lowStockProducts.length} items
              </Badge>
            </div>

            <div className="flex-1 overflow-auto space-y-2">
              {lowStockProducts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">All products are well stocked</p>
                </div>
              ) : (
                lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedProduct?.id === product.id
                        ? "bg-secondary/10 border-secondary"
                        : "bg-muted/20 border-border/50 hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {product.id} • {product.category}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Aisle {product.location.aisle}, Shelf {product.location.shelf}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStockBadge(product.quantityInStock)}
                        <p className="text-lg font-bold text-foreground mt-1">
                          {product.quantityInStock}
                        </p>
                        <p className="text-xs text-muted-foreground">units</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* All Products Section */}
            <div className="mt-4 pt-4 border-t border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Boxes className="w-4 h-4" />
                All Products ({products.length})
              </h3>
              <div className="max-h-48 overflow-auto space-y-1">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className={`w-full text-left p-2 rounded text-sm transition-colors ${
                      selectedProduct?.id === product.id
                        ? "bg-secondary/20 text-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    <span className="font-mono text-xs">{product.id}</span> - {product.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Add/Update Stock Form */}
          <div className="lg:col-span-2 bg-card rounded-lg border border-border p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                {isAddingNew ? (
                  <>
                    <Plus className="w-5 h-5 text-secondary" />
                    Add New Product
                  </>
                ) : selectedProduct ? (
                  <>
                    <Edit3 className="w-5 h-5 text-secondary" />
                    Update Stock Data
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5 text-secondary" />
                    Inventory Management
                  </>
                )}
              </h2>
              <Button
                onClick={handleAddNew}
                variant="outline"
                size="sm"
                className="border-secondary/50 text-secondary hover:bg-secondary/10"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add New Product
              </Button>
            </div>

            {!selectedProduct && !isAddingNew ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Select a product from the alerts or list to manage inventory</p>
                  <p className="text-xs mt-2">Or click "Add New Product" to add a new item</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-2 gap-4">
                  {/* Product ID */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Product ID {isAddingNew ? "" : "(Read-only)"}
                    </label>
                    <input
                      type="text"
                      value={formData.id}
                      onChange={(e) => isAddingNew && setFormData({ ...formData, id: e.target.value })}
                      readOnly={!isAddingNew}
                      className="input-field w-full bg-muted/30"
                    />
                  </div>

                  {/* SKU */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">SKU</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="Enter SKU"
                      className="input-field w-full"
                    />
                  </div>

                  {/* Product Name */}
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1 block">Product Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter product name"
                      className="input-field w-full"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="input-field w-full"
                    >
                      <option value="">Select category</option>
                      <option value="Brakes">Brakes</option>
                      <option value="Filters">Filters</option>
                      <option value="Ignition">Ignition</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Fluids">Fluids</option>
                      <option value="Belts & Hoses">Belts & Hoses</option>
                      <option value="Suspension">Suspension</option>
                      <option value="Lighting">Lighting</option>
                    </select>
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Brand</label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="Enter brand"
                      className="input-field w-full"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Unit Price (SAR) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      className="input-field w-full"
                    />
                  </div>

                  {/* Current Stock */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Current Stock *</label>
                    <input
                      type="number"
                      value={formData.quantityInStock}
                      onChange={(e) => setFormData({ ...formData, quantityInStock: e.target.value })}
                      placeholder="0"
                      className="input-field w-full"
                      readOnly={!isAddingNew}
                    />
                  </div>

                  {/* Stock Adjustment - Only for existing products */}
                  {!isAddingNew && (
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Stock Adjustment (+/-)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={formData.adjustment}
                          onChange={(e) => setFormData({ ...formData, adjustment: e.target.value })}
                          placeholder="+10 or -5"
                          className="input-field flex-1"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter positive number to add stock, negative to reduce
                      </p>
                    </div>
                  )}

                  {/* Supplier */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Supplier (Optional)</label>
                    <input
                      type="text"
                      value={formData.supplier}
                      onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                      placeholder="Enter supplier name"
                      className="input-field w-full"
                    />
                  </div>

                  {/* Location - Aisle */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Store Location - Aisle</label>
                    <select
                      value={formData.aisle}
                      onChange={(e) => setFormData({ ...formData, aisle: e.target.value })}
                      className="input-field w-full"
                    >
                      <option value="">Select aisle</option>
                      <option value="A">Aisle A</option>
                      <option value="B">Aisle B</option>
                      <option value="C">Aisle C</option>
                      <option value="D">Aisle D</option>
                    </select>
                  </div>

                  {/* Location - Shelf */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Store Location - Shelf</label>
                    <select
                      value={formData.shelf}
                      onChange={(e) => setFormData({ ...formData, shelf: e.target.value })}
                      className="input-field w-full"
                    >
                      <option value="">Select shelf</option>
                      <option value="1">Shelf 1</option>
                      <option value="2">Shelf 2</option>
                      <option value="3">Shelf 3</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter product description"
                      rows={3}
                      className="input-field w-full resize-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                  {isAddingNew ? (
                    <Button
                      onClick={handleAddProduct}
                      className="bg-secondary hover:bg-secondary/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Product
                    </Button>
                  ) : (
                    <Button
                      onClick={handleUpdateStock}
                      className="bg-secondary hover:bg-secondary/90"
                      disabled={!formData.adjustment}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Update Stock
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedProduct(null);
                      setIsAddingNew(false);
                    }}
                    className="border-muted-foreground/30 text-muted-foreground hover:bg-muted/30"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageInventory;
