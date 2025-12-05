import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import ahsaLogo from "@/assets/ahsa-logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      {/* Left - Logo and System Name */}
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
          <p className="text-xs text-muted-foreground">
            In-Store Point of Sale
          </p>
        </div>
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
