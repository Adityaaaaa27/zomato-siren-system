import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sliders, Zap, Sun, Cloud } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/_app/order-prediction")({
  component: OrderPredictionPage,
});

const impactData = [
  { name: "Kitchen Busyness", value: 85, impact: "+4.2m" },
  { name: "Complexity", value: 55, impact: "+2.1m" },
  { name: "Peak Time Factor", value: 45, impact: "+1.8m" },
  { name: "Weather Effect", value: 8, impact: "Neutral" },
];

function OrderPredictionPage() {
  const [complexity, setComplexity] = useState(7);
  const [busyness, setBusyness] = useState(82);
  const [weather, setWeather] = useState<"clear" | "rain">("clear");
  const [predicted, setPredicted] = useState(true);

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div>
        <h1 className="text-3xl font-extrabold font-display">Order Prediction</h1>
        <p className="text-sm text-muted-foreground mt-1">Kitchen Preparation Time (KPT) manual forecasting engine.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Prediction Parameters */}
        <div className="bg-card rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-primary" />
            <h2 className="text-lg font-bold font-display">Prediction Parameters</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-1.5">Merchant ID</label>
              <select className="w-full bg-input rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option>Select Merchant...</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-1.5">Cuisine Type</label>
              <div className="bg-input rounded-lg py-3 px-4 text-sm flex items-center justify-between">
                <span>Fast Food / American</span>
                <Lock size={14} className="text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-1.5">Order Time</label>
              <div className="bg-input rounded-lg py-3 px-4 text-sm flex items-center justify-between">
                <span>07:30 PM</span>
                <span className="text-muted-foreground text-xs">⏰</span>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-1.5">Current Weather</label>
              <div className="flex rounded-lg overflow-hidden border border-border">
                <button onClick={() => setWeather("clear")} className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors ${weather === "clear" ? "bg-card text-primary" : "bg-input text-muted-foreground"}`}>
                  <Sun size={14} /> Clear
                </button>
                <button onClick={() => setWeather("rain")} className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors ${weather === "rain" ? "bg-card text-primary" : "bg-input text-muted-foreground"}`}>
                  <Cloud size={14} /> Rain
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Order Complexity</label>
              <span className="text-sm font-bold text-primary">Level {String(complexity).padStart(2, "0")}</span>
            </div>
            <input
              type="range" min={1} max={10} value={complexity}
              onChange={(e) => setComplexity(Number(e.target.value))}
              className="w-full accent-primary h-1.5"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-bold tracking-wider uppercase">
              <span>Simple (Single Item)</span>
              <span>Complex (Bulk/Special)</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Kitchen Busyness</label>
              <span className="text-sm font-bold text-primary">{busyness}%</span>
            </div>
            <input
              type="range" min={0} max={100} value={busyness}
              onChange={(e) => setBusyness(Number(e.target.value))}
              className="w-full accent-primary h-1.5"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-bold tracking-wider uppercase">
              <span>Quiet</span>
              <span>Peak Load</span>
            </div>
          </div>

          <button className="w-full bg-primary text-primary-foreground font-bold text-base py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Zap size={18} /> Run Prediction Model
          </button>
        </div>

        {/* Results Panel */}
        <div className="space-y-4">
          {predicted && (
            <>
              <div className="bg-card rounded-xl p-6 text-center">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Predicted KPT</span>
                <div className="mt-2">
                  <span className="text-6xl font-extrabold font-display">14.2</span>
                  <span className="text-lg font-bold text-muted-foreground ml-1">MINS</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-teal font-medium">
                  <span className="h-2 w-2 rounded-full bg-teal" />
                  Confidence Interval: 13.1 - 15.4 mins
                </div>

                <div className="mt-4 bg-warning/10 rounded-lg p-3 text-left">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-warning">
                    <span>⚠</span> Low Signal Quality Warning
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    High variance in local weather signals may affect precision by ±2.5 mins.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6">
                <h3 className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-4">Impact Analysis</h3>
                {impactData.map((item) => (
                  <div key={item.name} className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-bold text-primary">{item.impact}</span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
                  <span>Model: XGBoost-v4.2</span>
                  <span className="text-primary font-medium cursor-pointer">View Raw Logs</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-card rounded-xl p-4">
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">R-Squared</span>
                  <div className="text-2xl font-extrabold font-display mt-1">0.942</div>
                </div>
                <div className="bg-card rounded-xl p-4">
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Last Training</span>
                  <div className="text-2xl font-extrabold font-display mt-1">4h ago</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: "⏱", label: "AVG DELAY", value: "1.4m", color: "primary" },
          { icon: "⚡", label: "THROUGHPUT", value: "142/hr", color: "teal" },
          { icon: "📊", label: "MAE", value: "±0.8s", color: "primary" },
          { icon: "👥", label: "VALET DENSITY", value: "Optimal", color: "primary" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-4 flex items-center gap-3">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-lg ${
              stat.color === "teal" ? "bg-teal/10" : "bg-primary/10"
            }`}>
              {stat.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{stat.label}</span>
              <div className="text-lg font-extrabold font-display">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Lock({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
