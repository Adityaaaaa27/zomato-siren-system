import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../lib/auth-context";
import { Lock, AtSign, Shield, ChevronDown, ArrowRight, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate({ to: "/dashboard" });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password, role || "admin");
    setLoading(false);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-b from-siren-light to-background relative">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold text-primary font-display">SIREN</span>
            <div className="h-6 w-px bg-muted-foreground/30 mx-1" />
            <div className="text-xs leading-tight text-muted-foreground">
              <div>Operational</div>
              <div>Intel</div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-5xl font-extrabold leading-tight font-display text-foreground">
            Command the <span className="text-primary">Pulse</span>
            <br />of Logistics.
          </h1>
          <p className="mt-6 text-base text-muted-foreground max-w-md leading-relaxed">
            Access real-time order predictions, merchant signals, and simulation tools in one clinical interface.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-xl px-4 py-3 w-fit">
          <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
            <BarChart3 size={20} className="text-success" />
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">System Status</div>
            <div className="text-sm font-bold text-foreground">99.9% Signal Quality</div>
          </div>
        </div>
      </div>

      {/* Right panel — Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold font-display text-foreground">Welcome Back</h2>
            <p className="mt-1 text-sm text-muted-foreground">Log in to your operational dashboard</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-1.5">Access Level</label>
              <div className="relative">
                <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-input rounded-lg py-3 pl-10 pr-10 text-sm font-medium text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select your role</option>
                  <option value="admin">Admin</option>
                  <option value="ops_manager">Operations Manager</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-1.5">Email Address</label>
              <div className="relative">
                <AtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@zomato.com"
                  className="w-full bg-input rounded-lg py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Password</label>
                <button type="button" className="text-[10px] font-bold tracking-wide text-primary uppercase">Forgot?</button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-input rounded-lg py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <div className="h-4 w-4 rounded border border-border bg-card" />
              <span className="text-sm text-muted-foreground">Remember this session</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-bold text-base py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            Sign In <ArrowRight size={18} />
          </button>

          <div className="text-center space-y-2 pt-4">
            <p className="text-xs text-muted-foreground">Secured by <span className="font-bold text-foreground">SIREN Core Identity</span></p>
            <div className="flex items-center justify-center gap-4 text-xs text-primary font-medium">
              <span>Security Policy</span>
              <span>Internal Support</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
