import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Package, 
  AlertTriangle,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import {
  mockSalesRecords,
  mockInventoryMovements,
  mockLowStockEvents,
  getMonthlyMetrics,
  SalesRecord,
  InventoryMovement,
} from "@/data/mockReports";

type ReportType = "sales" | "inventory" | "combined";

const GenerateReports = () => {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState("2025-12-01");
  const [endDate, setEndDate] = useState("2025-12-05");
  const [reportType, setReportType] = useState<ReportType>("combined");
  const [customReportGenerated, setCustomReportGenerated] = useState(false);

  const monthlyMetrics = getMonthlyMetrics();

  const filteredData = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const filteredSales = mockSalesRecords.filter(r => {
      const date = new Date(r.date);
      return date >= start && date <= end;
    });

    const filteredInventory = mockInventoryMovements.filter(m => {
      const date = new Date(m.date);
      return date >= start && date <= end;
    });

    const salesTotal = filteredSales.reduce((acc, r) => acc + r.total, 0);
    const salesCount = filteredSales.length;

    return {
      sales: filteredSales,
      inventory: filteredInventory,
      salesTotal,
      salesCount,
      hasData: filteredSales.length > 0 || filteredInventory.length > 0,
    };
  }, [startDate, endDate]);

  const handleGenerateCustomReport = () => {
    if (!filteredData.hasData) {
      toast({
        title: "No Data Available",
        description: "No data available for the selected date range.",
        variant: "destructive",
      });
      return;
    }
    setCustomReportGenerated(true);
    toast({
      title: "Report Generated",
      description: `Custom ${reportType} report for ${startDate} to ${endDate} has been generated.`,
    });
  };

  const handleExportPDF = (reportName: string) => {
    toast({
      title: "PDF Export Started",
      description: `${reportName} is being exported as PDF...`,
    });
  };

  const handleExportCSV = (reportName: string) => {
    toast({
      title: "CSV Export Started",
      description: `${reportName} is being exported as CSV...`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <BarChart3 className="w-7 h-7 text-secondary" />
                Generate Reports
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                View automated monthly reports or generate custom reports
              </p>
            </div>
          </div>

          {/* Auto-Generated Monthly Report Section */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Auto-Generated Monthly Report (Latest Month)
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Automatically generated on the 1st of each month • December 2025
                  </p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Auto-Generated
              </Badge>
            </div>

            {/* Monthly Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  <ArrowUpRight className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-foreground">
                  SAR {monthlyMetrics.totalSales.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">Total Sales</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="w-5 h-5 text-secondary" />
                  <span className="text-xs text-muted-foreground">{monthlyMetrics.totalTransactions}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  SAR {monthlyMetrics.averageTransactionValue.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">Avg. Transaction Value</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Package className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {monthlyMetrics.totalInventoryMovements}
                </p>
                <p className="text-xs text-muted-foreground">Inventory Movements</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <ArrowDownRight className="w-4 h-4 text-yellow-400" />
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {monthlyMetrics.lowStockEvents}
                </p>
                <p className="text-xs text-muted-foreground">Low Stock Events</p>
              </div>
            </div>

            {/* Sales Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Sales by Channel</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">In-Store Sales</span>
                    <span className="font-medium text-foreground">SAR {monthlyMetrics.inStoreSales.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">Online Sales</span>
                    <span className="font-medium text-foreground">SAR {monthlyMetrics.onlineSales.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">Total Transactions</span>
                    <span className="font-medium text-foreground">{monthlyMetrics.totalTransactions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">Products Sold</span>
                    <span className="font-medium text-foreground">{mockSalesRecords.reduce((acc, r) => acc + r.quantity, 0)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => handleExportPDF("Monthly Report")}
                className="bg-secondary hover:bg-secondary/90"
              >
                <Download className="w-4 h-4 mr-2" />
                Export as PDF
              </Button>
              <Button
                onClick={() => handleExportCSV("Monthly Report")}
                variant="outline"
                className="border-secondary/50 text-secondary hover:bg-secondary/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Export as CSV
              </Button>
            </div>
          </div>

          {/* Custom Report Section */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Generate Custom Report
                </h2>
                <p className="text-sm text-muted-foreground">
                  Select date range and report type to generate a custom report
                </p>
              </div>
            </div>

            {/* Report Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value as ReportType)}
                  className="input-field w-full"
                >
                  <option value="sales">Sales Only</option>
                  <option value="inventory">Inventory Only</option>
                  <option value="combined">Combined (Sales + Inventory)</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleGenerateCustomReport}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>

            {/* Custom Report Results */}
            {customReportGenerated && (
              <div className="mt-6 animate-fade-in">
                {!filteredData.hasData ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No data available for the selected date range.</p>
                  </div>
                ) : (
                  <>
                    {/* Summary */}
                    <div className="bg-muted/30 rounded-lg p-4 mb-4">
                      <h3 className="text-sm font-medium text-foreground mb-3">Report Summary</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(reportType === "sales" || reportType === "combined") && (
                          <>
                            <div>
                              <p className="text-xs text-muted-foreground">Total Sales</p>
                              <p className="text-lg font-bold text-foreground">SAR {filteredData.salesTotal.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Transactions</p>
                              <p className="text-lg font-bold text-foreground">{filteredData.salesCount}</p>
                            </div>
                          </>
                        )}
                        {(reportType === "inventory" || reportType === "combined") && (
                          <div>
                            <p className="text-xs text-muted-foreground">Inventory Movements</p>
                            <p className="text-lg font-bold text-foreground">{filteredData.inventory.length}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sales Table */}
                    {(reportType === "sales" || reportType === "combined") && filteredData.sales.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-foreground mb-2">Sales Records</h3>
                        <div className="overflow-auto max-h-64 rounded-lg border border-border">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/50 sticky top-0">
                              <tr>
                                <th className="text-left p-2 text-muted-foreground">Date</th>
                                <th className="text-left p-2 text-muted-foreground">Product</th>
                                <th className="text-left p-2 text-muted-foreground">Customer</th>
                                <th className="text-left p-2 text-muted-foreground">Channel</th>
                                <th className="text-right p-2 text-muted-foreground">Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                              {filteredData.sales.map((record) => (
                                <tr key={record.id} className="hover:bg-muted/30">
                                  <td className="p-2 text-foreground">{record.date}</td>
                                  <td className="p-2 text-foreground">{record.productName}</td>
                                  <td className="p-2 text-muted-foreground">{record.customerName}</td>
                                  <td className="p-2">
                                    <Badge variant="outline" className="text-xs">
                                      {record.channel}
                                    </Badge>
                                  </td>
                                  <td className="p-2 text-right font-medium text-foreground">
                                    SAR {record.total.toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Inventory Table */}
                    {(reportType === "inventory" || reportType === "combined") && filteredData.inventory.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-foreground mb-2">Inventory Movements</h3>
                        <div className="overflow-auto max-h-64 rounded-lg border border-border">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/50 sticky top-0">
                              <tr>
                                <th className="text-left p-2 text-muted-foreground">Date</th>
                                <th className="text-left p-2 text-muted-foreground">Product</th>
                                <th className="text-left p-2 text-muted-foreground">Type</th>
                                <th className="text-right p-2 text-muted-foreground">Change</th>
                                <th className="text-right p-2 text-muted-foreground">New Stock</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                              {filteredData.inventory.map((movement) => (
                                <tr key={movement.id} className="hover:bg-muted/30">
                                  <td className="p-2 text-foreground">{movement.date}</td>
                                  <td className="p-2 text-foreground">{movement.productName}</td>
                                  <td className="p-2">
                                    <Badge
                                      className={
                                        movement.type === "Sale"
                                          ? "bg-blue-500/20 text-blue-400"
                                          : movement.type === "Restock"
                                          ? "bg-green-500/20 text-green-400"
                                          : "bg-yellow-500/20 text-yellow-400"
                                      }
                                    >
                                      {movement.type}
                                    </Badge>
                                  </td>
                                  <td className={`p-2 text-right font-medium ${
                                    movement.quantityChange > 0 ? "text-green-400" : "text-red-400"
                                  }`}>
                                    {movement.quantityChange > 0 ? "+" : ""}{movement.quantityChange}
                                  </td>
                                  <td className="p-2 text-right text-foreground">{movement.newStock}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Export Buttons for Custom Report */}
                    <div className="flex gap-3 mt-4">
                      <Button
                        onClick={() => handleExportPDF("Custom Report")}
                        className="bg-secondary hover:bg-secondary/90"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export as PDF
                      </Button>
                      <Button
                        onClick={() => handleExportCSV("Custom Report")}
                        variant="outline"
                        className="border-secondary/50 text-secondary hover:bg-secondary/10"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export as CSV
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GenerateReports;
