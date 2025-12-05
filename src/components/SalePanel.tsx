import { useState, useEffect } from "react";
import { User, Phone, FileText, Minus, Plus, ShoppingCart, Receipt, CheckCircle } from "lucide-react";
import { Product, Customer } from "@/types/inventory";
import { toast } from "@/hooks/use-toast";

interface SalePanelProps {
  selectedProduct: Product | null;
}

const SalePanel = ({ selectedProduct }: SalePanelProps) => {
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    notes: "",
  });
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
  }, [selectedProduct?.id]);

  const lineTotal = selectedProduct ? selectedProduct.price * quantity : 0;
  const grandTotal = lineTotal; // Can be extended for multiple items

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (selectedProduct?.quantityInStock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleGenerateInvoice = async () => {
    if (!selectedProduct) {
      toast({
        title: "No Product Selected",
        description: "Please select a product from the search results.",
        variant: "destructive",
      });
      return;
    }

    if (!customer.name.trim()) {
      toast({
        title: "Customer Name Required",
        description: "Please enter the customer's name.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;
    
    toast({
      title: "Invoice Generated",
      description: (
        <div className="mt-2">
          <p className="font-mono text-sm">{invoiceNumber}</p>
          <p className="text-xs mt-1">Total: ${grandTotal.toFixed(2)}</p>
        </div>
      ),
    });

    setIsProcessing(false);
  };

  const handleConfirmSale = async () => {
    if (!selectedProduct) {
      toast({
        title: "No Product Selected",
        description: "Please select a product from the search results.",
        variant: "destructive",
      });
      return;
    }

    if (!customer.name.trim()) {
      toast({
        title: "Customer Name Required",
        description: "Please enter the customer's name.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;

    toast({
      title: "Sale Confirmed",
      description: (
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle className="w-4 h-4" />
            <span>Invoice {invoiceNumber} created</span>
          </div>
          <div className="flex items-center gap-2 text-success">
            <CheckCircle className="w-4 h-4" />
            <span>Inventory updated successfully</span>
          </div>
        </div>
      ),
    });

    // Reset form
    setCustomer({ name: "", phone: "", notes: "" });
    setQuantity(1);
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Customer Details */}
      <div className="glass-card p-4">
        <div className="section-title flex items-center gap-2">
          <User className="w-4 h-4" />
          Customer Details
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Customer Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                placeholder="Enter customer name"
                className="input-field w-full pl-10 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="tel"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                placeholder="Enter phone number"
                className="input-field w-full pl-10 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Notes (Optional)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <textarea
                value={customer.notes}
                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                placeholder="Add any notes..."
                rows={2}
                className="input-field w-full pl-10 py-2 text-sm resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sale Details */}
      <div className="glass-card p-4 flex-1">
        <div className="section-title flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Sale Details
        </div>

        {selectedProduct ? (
          <div className="space-y-4">
            {/* Selected Product */}
            <div className="p-3 rounded-md bg-muted/30 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Selected Product</p>
              <p className="font-medium text-foreground">{selectedProduct.name}</p>
              <p className="text-sm text-muted-foreground">{selectedProduct.id} • {selectedProduct.category}</p>
            </div>

            {/* Quantity Selector */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-md bg-muted flex items-center justify-center hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    if (val >= 1 && val <= selectedProduct.quantityInStock) {
                      setQuantity(val);
                    }
                  }}
                  className="input-field w-20 text-center font-medium"
                  min={1}
                  max={selectedProduct.quantityInStock}
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= selectedProduct.quantityInStock}
                  className="w-10 h-10 rounded-md bg-muted flex items-center justify-center hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-xs text-muted-foreground">
                  (max: {selectedProduct.quantityInStock})
                </span>
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-3 border-t border-border/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Unit Price</span>
                <span className="text-foreground">${selectedProduct.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Line Total</span>
                <span className="text-foreground">${lineTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border/50">
                <span className="font-semibold text-foreground">Grand Total</span>
                <span className="text-2xl font-bold text-secondary">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <ShoppingCart className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-sm">No product selected</p>
            <p className="text-xs">Search and select a product to begin</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleGenerateInvoice}
          disabled={!selectedProduct || isProcessing}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Receipt className="w-4 h-4" />
          Generate Invoice
        </button>
        <button
          onClick={handleConfirmSale}
          disabled={!selectedProduct || isProcessing}
          className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="w-4 h-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
          ) : (
            <CheckCircle className="w-4 h-4" />
          )}
          Confirm Sale & Update Inventory
        </button>
      </div>
    </div>
  );
};

export default SalePanel;
