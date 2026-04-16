import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, RotateCcw, Sliders } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip, Legend, Area, AreaChart } from "recharts";

export const Route = createFileRoute("/_app/simulation")({
  component: SimulationPage,
});

const accuracyData = [
  { name: "BASELINE", precision: 60, recall: 45 },
  { name: "SIREN", precision: 85, recall: 75 },
  { name: "FILTERED", precision: 90, recall: 80 },
];

const kptDistDensity = [
  { x: 0, simulated: 5, actual: 8 },
  { x: 200, simulated: 12, actual: 15 },
  { x: 500, simulated: 35, actual: 30 },
  { x: 800, simulated: 45, actual: 28 },
  { x: 1000, simulated: 40, actual: 35 },
  { x: 1200, simulated: 30, actual: 42 },
  { x: 1500, simulated: 18, actual: 38 },
  { x: 1800, simulated: 8, actual: 20 },
  { x: 2000, simulated: 3, actual: 10 },
];

function SimulationPage() {
  const [contamination, setContamination] = useState(14.2);
  const [theta, setTheta] = useState(0.82);
  const [riderOffset, setRiderOffset] = useState(1.2);
  const [bootstrap, setBootstrap] = useState(true);
  const [outlierClip, setOutlierClip] = useState(false);

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold font-display">Bias Simulation</h1>
          <p className="text-sm text-muted-foreground mt-1">Modeling noise and structural offsets for hyper-local delivery prediction.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-border bg-card font-bold text-sm px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-accent transition-colors">
            <RotateCcw size={14} /> Reset Values
          </button>
          <button className="bg-primary text-primary-foreground font-bold text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Play size={14} /> Run Simulation
          </button>
        </div>
      </div>

      {/* Top row: params + metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4">
        {/* Parameters */}
        <div className="bg-card rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Sliders size={16} className="text-primary" />
            <h3 className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Parameters</h3>
          </div>

          {[
            { label: "Contamination", value: contamination, set: setContamination, min: 0, max: 80, step: 0.1, format: (v: number) => `${v.toFixed(1)}%`, sub: "Signal pollution from neighbor zones" },
            { label: "Theta (Sensitivity)", value: theta, set: setTheta, min: 0.1, max: 1.0, step: 0.01, format: (v: number) => v.toFixed(2), sub: "Model adaptation rate to real-time spikes" },
            { label: "Rider Offset", value: riderOffset, set: setRiderOffset, min: 0, max: 10, step: 0.1, format: (v: number) => `+${v.toFixed(1)}m`, sub: "Average variance in fleet-reported arrival" },
          ].map((param) => (
            <div key={param.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold">{param.label}</span>
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-0.5 rounded">{param.format(param.value)}</span>
              </div>
              <input
                type="range" min={param.min} max={param.max} step={param.step}
                value={param.value}
                onChange={(e) => param.set(Number(e.target.value))}
                className="w-full accent-primary h-1.5"
              />
              <p className="text-[10px] text-muted-foreground mt-1 italic">{param.sub}</p>
            </div>
          ))}

          <div className="space-y-3 pt-2">
            {[
              { label: "Bootstrap Re-sampling", checked: bootstrap, set: setBootstrap },
              { label: "Outlier Clipping", checked: outlierClip, set: setOutlierClip },
            ].map((toggle) => (
              <div key={toggle.label} className="flex items-center justify-between">
                <span className="text-sm">{toggle.label}</span>
                <button
                  onClick={() => toggle.set(!toggle.checked)}
                  className={`w-10 h-5.5 rounded-full transition-colors relative ${toggle.checked ? "bg-teal" : "bg-muted"}`}
                >
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-card shadow transition-transform ${toggle.checked ? "left-5.5" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics + Charts */}
        <div className="space-y-4">
          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-xl p-4 border-l-4 border-primary">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Baseline vs SIREN MAE</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold font-display">4.2</span>
                <span className="text-sm font-bold text-primary">(-18%)</span>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Labels Filtered</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold font-display">1,842</span>
                <span className="text-xs text-teal font-medium">Quality High</span>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Wait Reduction</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold font-display">2.4m</span>
                <span className="text-xs text-teal font-bold">+14.2s Saved</span>
              </div>
            </div>
          </div>

          {/* Chart row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-xl p-5">
              <h3 className="text-base font-bold font-display mb-4">Model Accuracy Profile</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={accuracyData} barGap={4}>
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)", fontWeight: 700 }} />
                    <YAxis hide />
                    <Bar dataKey="precision" fill="var(--color-primary)" radius={[3, 3, 0, 0]} barSize={24} opacity={0.3} />
                    <Bar dataKey="recall" fill="var(--color-primary)" radius={[3, 3, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-4 text-xs mt-2">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Precision</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary/40" /> Recall</span>
              </div>
            </div>

            <div className="bg-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold font-display">KPT Distribution Density</h3>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Simulated</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-muted-foreground/40" /> Actual</span>
                </div>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={kptDistDensity}>
                    <XAxis dataKey="x" tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: "var(--color-muted-foreground)" }} tickFormatter={(v) => `${v}ms`} />
                    <Tooltip />
                    <Area type="monotone" dataKey="simulated" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.15} strokeWidth={2} />
                    <Area type="monotone" dataKey="actual" stroke="var(--color-muted-foreground)" fill="var(--color-muted-foreground)" fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 4" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] italic text-muted-foreground mt-2">
                <strong>Insight:</strong> Rider Offset of 1.2m pushes the peak density left, indicating a reduction in arrival false-positives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-4">
        <div className="bg-primary rounded-xl p-6 text-primary-foreground">
          <h3 className="text-xl font-bold font-display">Live Analysis Engine</h3>
          <p className="text-sm opacity-80 mt-1">SIREN is currently processing 14,200 active order signals from Mumbai South to simulate these adjustments.</p>
          <div className="flex gap-2 mt-4">
            <span className="bg-primary-foreground/20 text-xs font-bold px-3 py-1 rounded">STABLE V2.4</span>
            <span className="bg-primary-foreground/20 text-xs font-bold px-3 py-1 rounded">99.8% UPTIME</span>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold font-display">Zone Impact Simulation</h3>
            <div className="flex gap-2">
              {["Colaba", "Bandra West", "Andheri"].map((zone, i) => (
                <span key={zone} className={`text-xs font-bold px-3 py-1 rounded-full ${i === 1 ? "bg-primary text-primary-foreground" : "border border-border"}`}>{zone}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "LATENCY SHIFT", value: "-142ms" },
              { label: "NOISE FLOOR", value: "0.02" },
              { label: "THROUGHPUT", value: "+8.2%" },
              { label: "MODEL CONFIDENCE", value: "High" },
            ].map((stat) => (
              <div key={stat.label} className="bg-accent rounded-lg p-3">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{stat.label}</span>
                <div className="text-lg font-extrabold font-display mt-1">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
