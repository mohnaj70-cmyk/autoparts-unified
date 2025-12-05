import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductSearch from "@/components/ProductSearch";
import SalePanel from "@/components/SalePanel";
import { Product } from "@/types/inventory";

const InStoreSale = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 p-6">
        <div className="h-full grid grid-cols-1 lg:grid-cols-5 gap-6" style={{ minHeight: "calc(100vh - 112px)" }}>
          {/* Left Column - Product Search & Info (3/5 width) */}
          <div className="lg:col-span-3">
            <ProductSearch 
              onSelectProduct={setSelectedProduct}
              selectedProductId={selectedProduct?.id}
            />
          </div>

          {/* Right Column - Customer & Sale Details (2/5 width) */}
          <div className="lg:col-span-2">
            <SalePanel selectedProduct={selectedProduct} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default InStoreSale;
