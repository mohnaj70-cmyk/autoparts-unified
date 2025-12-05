import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, Store, Globe } from "lucide-react";
import ahsaLogo from "@/assets/ahsa-logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

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
          <button
            onClick={() => navigate("/sale")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/sale")
                ? "bg-secondary/20 text-secondary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Store className="w-4 h-4" />
            In-Store Sale
          </button>
          <button
            onClick={() => navigate("/online-orders")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/online-orders")
                ? "bg-secondary/20 text-secondary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Globe className="w-4 h-4" />
            Online Orders
          </button>
        </nav>
      </div>

      {/* Right - User Profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 rounded-md bg-muted/50">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
            <User className="w-4 h-4 text-secondary" />
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Sales Employee</p>
            <p className="text-xs text-muted-foreground">Active</p>
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
