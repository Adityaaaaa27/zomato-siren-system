import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Search, X, Flag } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";
import { merchants } from "../../lib/mock-data";

export const Route = createFileRoute("/_app/merchant-management")({
  component: MerchantManagementPage,
});

const kptDistData = [
  { range: "5m", count: 8 },
  { range: "15m", count: 22 },
  { range: "25m", count: 35 },
  { range: "35m", count: 18 },
  { range: "45m", count: 8 },
];

const biasTrendData = [
  { day: 1, bias: 0.6 },
  { day: 5, bias: 0.65 },
  { day: 10, bias: 0.7 },
  { day: 15, bias: 0.72 },
  { day: 20, bias: 0.78 },
  { day: 25, bias: 0.82 },
  { day: 30, bias: 0.84 },
];

function MerchantManagementPage() {
  const [selected, setSelected] = useState<typeof merchants[0] | null>(merchants[1]);

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold font-display">Merchant Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time performance auditing and behavior classification</p>
        </div>
        <button className="bg-primary text-primary-foreground font-bold text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {["All Cuisines", "All Tiers", "All Classes"].map((label) => (
          <select key={label} className="bg-input rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[140px]">
            <option>{label}</option>
          </select>
        ))}
        <div className="flex-1" />
        <div className="bg-primary text-primary-foreground rounded-xl px-5 py-3 text-center">
          <div className="text-[10px] font-bold tracking-widest uppercase">Total Entities</div>
          <div className="text-2xl font-extrabold font-display">12,482</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Table */}
        <div className="bg-card rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Merchant Name</th>
                <th className="text-left p-4">Cuisine</th>
                <th className="text-left p-4">Tier</th>
                <th className="text-left p-4">City</th>
                <th className="text-right p-4">Avg KPT</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((m) => (
                <tr
                  key={m.id}
                  onClick={() => setSelected(m)}
                  className={`border-t border-border/30 cursor-pointer transition-colors hover:bg-accent/50 ${
                    selected?.id === m.id ? "bg-accent/50" : ""
                  }`}
                >
                  <td className="p-4 text-xs text-muted-foreground">{m.id}</td>
                  <td className="p-4 text-sm font-bold">{m.name}</td>
                  <td className="p-4 text-sm text-muted-foreground">{m.cuisine}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded ${
                      m.tier === 1 ? "bg-teal text-teal-foreground" :
                      m.tier === 2 ? "bg-primary/20 text-primary" :
                      "bg-accent text-foreground"
                    }`}>TIER {m.tier}</span>
                  </td>
                  <td className="p-4 text-sm">{m.city}</td>
                  <td className="p-4 text-sm font-bold text-right">{m.avgKpt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing 1-10 of 12,482 merchants</span>
            <div className="flex items-center gap-1">
              <button className="h-7 w-7 rounded flex items-center justify-center hover:bg-accent">‹</button>
              <button className="h-7 w-7 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">1</button>
              <button className="h-7 w-7 rounded flex items-center justify-center hover:bg-accent">2</button>
              <button className="h-7 w-7 rounded flex items-center justify-center hover:bg-accent">3</button>
              <button className="h-7 w-7 rounded flex items-center justify-center hover:bg-accent">›</button>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="bg-card rounded-xl p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="bg-primary/10 text-primary text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase">High Bias Warning</span>
                <h3 className="text-xl font-bold font-display mt-2">{selected.name}</h3>
                <p className="text-xs text-muted-foreground">{selected.id} · {selected.city}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-accent rounded-lg p-3">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Avg KPT</span>
                <div className="text-lg font-extrabold font-display text-primary">{selected.avgKpt.replace("m", " min")}</div>
              </div>
              <div className="bg-accent rounded-lg p-3">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Bias Score</span>
                <div className="text-lg font-extrabold font-display">{selected.biasOffset}</div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">KPT Distribution</span>
                <span className="text-xs text-primary font-medium">Last 30 Days</span>
              </div>
              <div className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={kptDistData}>
                    <XAxis dataKey="range" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                    <Bar dataKey="count" fill="var(--color-primary)" radius={[3, 3, 0, 0]} opacity={0.7} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Bias Trend</span>
                <span className="flex items-center gap-1 text-xs"><span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Live</span>
              </div>
              <div className="h-[100px] bg-siren-light rounded-lg p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={biasTrendData}>
                    <Line type="monotone" dataKey="bias" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] italic text-muted-foreground mt-2">
                "Bias increased by 14% since the last operational audit. Recommend immediate merchant re-training."
              </p>
            </div>

            <button className="w-full bg-foreground text-background font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Flag size={16} /> Flag for Audit
            </button>
            <button className="w-full border border-border font-bold py-3 rounded-lg text-foreground hover:bg-accent transition-colors">
              View Merchant Full Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
