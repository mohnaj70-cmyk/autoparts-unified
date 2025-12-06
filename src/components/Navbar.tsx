import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, Store, Globe, BarChart3, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ROLE_LABELS, ROLE_PERMISSIONS } from "@/types/auth";
import ahsaLogo from "@/assets/ahsa-logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const canAccess = (path: string) => {
    if (!user) return false;
    return ROLE_PERMISSIONS[user.role].includes(path);
  };

  const navItems = [
    { path: "/sale", label: "In-Store Sale", icon: Store },
    { path: "/online-orders", label: "Online Orders", icon: Globe },
    { path: "/manage-inventory", label: "Manage Inventory", icon: Package },
    { path: "/reports", label: "Generate Reports", icon: BarChart3 },
  ];

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      {/* Left - Logo and System Name */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <img 
            src={ahsaLogo} 
            alt="AHSA Logo" 
            className="w-10 h-10 object-contain rounded-full bg-foreground/10"
          />
          <div>
            <h1 className="text-lg font-semibold text-foreground leading-tight">
              Unified Commerce Platform
            </h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 ml-4">
          {navItems
            .filter((item) => canAccess(item.path))
            .map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-secondary/20 text-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
        </nav>
      </div>

      {/* Right - User Profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 rounded-md bg-muted/50">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
            <User className="w-4 h-4 text-secondary" />
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-muted-foreground">
              {user ? ROLE_LABELS[user.role] : "Active"}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="btn-ghost flex items-center gap-2 text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
