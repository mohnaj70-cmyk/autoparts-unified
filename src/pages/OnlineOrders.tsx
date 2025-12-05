import { useState } from "react";
import Navbar from "@/components/Navbar";
import { mockOrders, OnlineOrder } from "@/data/mockOrders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileText, CheckCircle, XCircle, Package, User, Phone, MapPin, CreditCard, MessageSquare } from "lucide-react";

const OnlineOrders = () => {
  const [orders, setOrders] = useState<OnlineOrder[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<OnlineOrder | null>(null);
  const { toast } = useToast();

  const getStatusColor = (status: OnlineOrder["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Confirmed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Shipped":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPaymentStatusColor = (status: OnlineOrder["paymentStatus"]) => {
    switch (status) {
      case "Paid":
        return "text-green-400";
      case "Pending":
        return "text-yellow-400";
      case "Failed":
        return "text-red-400";
      default:
        return "text-muted-foreground";
    }
  };

  const handleApproveInvoice = () => {
    if (!selectedOrder) return;
    toast({
      title: "Invoice Generated",
      description: `Invoice for order ${selectedOrder.id} has been generated successfully.`,
    });
  };

  const handleConfirmSale = () => {
    if (!selectedOrder) return;
    setOrders(orders.map(o => 
      o.id === selectedOrder.id ? { ...o, status: "Confirmed" as const } : o
    ));
    setSelectedOrder({ ...selectedOrder, status: "Confirmed" });
    toast({
      title: "Sale Confirmed",
      description: `Order ${selectedOrder.id} confirmed and inventory updated.`,
    });
  };

  const handleRejectOrder = () => {
    if (!selectedOrder) return;
    setOrders(orders.map(o => 
      o.id === selectedOrder.id ? { ...o, status: "Cancelled" as const } : o
    ));
    setSelectedOrder({ ...selectedOrder, status: "Cancelled" });
    toast({
      title: "Order Rejected",
      description: `Order ${selectedOrder.id} has been rejected.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Orders Table */}
          <div className="lg:col-span-2 bg-card rounded-lg border border-border p-4">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-secondary" />
              Online Orders
            </h2>
            
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              <table className="w-full">
                <thead className="bg-muted/50 sticky top-0">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Order ID</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Date & Time</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Channel</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-3 text-sm font-medium text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`border-b border-border/50 cursor-pointer transition-colors hover:bg-muted/30 ${
                        selectedOrder?.id === order.id ? "bg-secondary/10" : ""
                      }`}
                    >
                      <td className="p-3 text-sm font-mono text-foreground">{order.id}</td>
                      <td className="p-3 text-sm text-foreground">{order.customerName}</td>
                      <td className="p-3 text-sm text-muted-foreground">{order.orderDate}</td>
                      <td className="p-3 text-sm">
                        <Badge variant="outline" className="text-secondary border-secondary/30">
                          {order.channel}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm text-right font-medium text-foreground">
                        SAR {order.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Details Panel */}
          <div className="bg-card rounded-lg border border-border p-4 flex flex-col">
            <h2 className="text-lg font-semibold text-foreground mb-4">Order Details</h2>
            
            {selectedOrder ? (
              <div className="flex-1 flex flex-col overflow-auto">
                {/* Customer Details */}
                <div className="mb-4 p-3 bg-muted/30 rounded-md">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Customer Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-secondary" />
                      <span className="text-foreground">{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-secondary" />
                      <span className="text-muted-foreground">{selectedOrder.customerPhone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-secondary mt-0.5" />
                      <span className="text-muted-foreground">{selectedOrder.customerAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Products List */}
                <div className="mb-4 flex-1 overflow-auto">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="p-2 bg-muted/20 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.product.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.quantity} × SAR {item.unitPrice.toFixed(2)}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            SAR {item.lineTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Status */}
                <div className="mb-4 p-3 bg-muted/30 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-secondary" />
                      <span className="text-sm text-muted-foreground">Payment Status</span>
                    </div>
                    <span className={`text-sm font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Order Notes */}
                {selectedOrder.notes && (
                  <div className="mb-4 p-3 bg-muted/30 rounded-md">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-secondary mt-0.5" />
                      <div>
                        <span className="text-sm text-muted-foreground">Notes:</span>
                        <p className="text-sm text-foreground">{selectedOrder.notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="mb-4 p-3 bg-secondary/10 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">Grand Total</span>
                    <span className="text-lg font-bold text-secondary">
                      SAR {selectedOrder.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 mt-auto">
                  <Button
                    onClick={handleApproveInvoice}
                    className="w-full bg-secondary hover:bg-secondary/90"
                    disabled={selectedOrder.status === "Cancelled"}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Approve & Generate Invoice
                  </Button>
                  <Button
                    onClick={handleConfirmSale}
                    variant="outline"
                    className="w-full border-secondary/50 text-secondary hover:bg-secondary/10"
                    disabled={selectedOrder.status === "Confirmed" || selectedOrder.status === "Shipped" || selectedOrder.status === "Cancelled"}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Sale & Update Inventory
                  </Button>
                  <Button
                    onClick={handleRejectOrder}
                    variant="outline"
                    className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
                    disabled={selectedOrder.status === "Cancelled" || selectedOrder.status === "Shipped"}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Order
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                Select an order to view details
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnlineOrders;
