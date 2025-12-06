export type UserRole = "sales_employee" | "inventory_manager" | "general_manager";

export interface User {
  id: string;
  username: string;
  role: UserRole;
  displayName: string;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  sales_employee: "Sales Employee",
  inventory_manager: "Inventory Manager",
  general_manager: "General Manager",
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  sales_employee: ["/sale", "/online-orders"],
  inventory_manager: ["/manage-inventory"],
  general_manager: ["/reports"],
};
