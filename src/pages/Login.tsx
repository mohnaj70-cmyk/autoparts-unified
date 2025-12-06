import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole, ROLE_LABELS, ROLE_PERMISSIONS } from "@/types/auth";
import ahsaLogo from "@/assets/ahsa-logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("sales_employee");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setIsLoading(true);

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock authentication - accept any credentials for demo
    if (username && password) {
      login(username, role);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${username}! Logged in as ${ROLE_LABELS[role]}.`,
      });
      
      // Navigate based on role
      const defaultRoute = ROLE_PERMISSIONS[role][0];
      navigate(defaultRoute);
    } else {
      setError("Invalid username or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={ahsaLogo} 
              alt="AHSA Spare Parts" 
              className="w-32 h-32 object-contain rounded-full bg-foreground/10 p-2"
            />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Unified Commerce Platform
          </h1>
          <p className="text-muted-foreground text-sm">
            AHSA Spare Parts - Point of Sale System
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-foreground">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="input-field w-full pl-11"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field w-full pl-11 pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium text-foreground">
                Role
              </label>
              <div className="relative">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="input-field w-full appearance-none pr-10"
                >
                  <option value="sales_employee">Sales Employee</option>
                  <option value="inventory_manager">Inventory Manager</option>
                  <option value="general_manager">General Manager</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm animate-fade-in">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                "Login"
              )}
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-xs mt-6">
          © 2025 AHSA Spare Parts. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
