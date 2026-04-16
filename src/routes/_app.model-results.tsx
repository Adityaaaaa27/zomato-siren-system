import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ScatterChart, Scatter, Tooltip, Line, LineChart, CartesianGrid, ReferenceLine } from "recharts";
import { modelResults } from "../../lib/mock-data";

export const Route = createFileRoute("/_app/model-results")({
  component: ModelResultsPage,
});

function ModelResultsPage() {
  const { comparison, featureImportance, tiers, scatterData, residualData, bottomStats } = modelResults;

  const categoryColor: Record<string, string> = {
    KINETIC: "var(--color-primary)",
    STATIC: "var(--color-teal)",
    ENVIRONMENTAL: "var(--color-destructive)",
  };

  return (
    <div className="space-y-6 max-w-[1200px]">
      <h1 className="text-3xl font-extrabold font-display">Performance Benchmarking</h1>

      {/* Comparison Table */}
      <div className="bg-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              <th className="text-left p-4 w-[35%]">Metric</th>
              <th className="text-left p-4">Baseline XGB</th>
              <th className="text-left p-4 text-primary">SIREN XGB (V4.2)</th>
              <th className="text-left p-4">Delta %</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.metric} className="border-t border-border/30">
                <td className="p-4 text-sm font-bold">{row.metric}</td>
                <td className="p-4 text-sm text-muted-foreground">{row.baseline}</td>
                <td className="p-4 text-sm font-bold text-primary">{row.siren}</td>
                <td className="p-4">
                  <span className={`text-sm font-bold ${row.delta.startsWith("-") ? "text-teal" : row.delta.startsWith("+") && row.metric === "R-Squared" ? "text-teal" : "text-primary"}`}>{row.delta}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feature Importance + Tier MAE */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
        <div className="bg-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold font-display">Feature Importance Ranking</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Kinetic</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-teal" /> Static</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" /> Environmental</span>
            </div>
          </div>
          <div className="space-y-4">
            {featureImportance.map((f) => (
              <div key={f.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">{f.name}</span>
                  <span className="font-bold">{f.value}</span>
                </div>
                <div className="h-2.5 bg-accent rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${f.value}%`, backgroundColor: categoryColor[f.category] }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold font-display">Tier Performance MAE</h3>
          {tiers.map((tier) => (
            <div key={tier.id} className="flex items-center gap-4 bg-accent rounded-xl p-4">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                tier.id === "P1" ? "bg-teal/20 text-teal" :
                tier.id === "P2" ? "bg-primary/20 text-primary" :
                "bg-success/20 text-success"
              }`}>{tier.id}</div>
              <div className="flex-1">
                <div className="text-sm font-bold">{tier.name}</div>
                <div className="text-xs text-muted-foreground">Target: {tier.target}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-extrabold font-display">{tier.mae}</div>
                <div className="text-xs text-teal font-medium">↑ {tier.accuracy} acc</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scatter + Residual */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl p-6">
          <h3 className="text-lg font-bold font-display mb-4">Predicted vs Actual</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="actual" name="Actual (min)" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                <YAxis dataKey="predicted" name="Predicted" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                <Tooltip />
                <Scatter data={scatterData} fill="var(--color-primary)" fillOpacity={0.6} r={3} />
                <ReferenceLine segment={[{ x: 5, y: 5 }, { x: 35, y: 35 }]} stroke="var(--color-primary)" strokeDasharray="4 4" strokeOpacity={0.5} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6">
          <h3 className="text-lg font-bold font-display mb-4">Residual Distribution</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={residualData} barGap={2}>
                <XAxis dataKey="range" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="baseline" fill="var(--color-muted)" radius={[3, 3, 0, 0]} barSize={20} />
                <Bar dataKey="siren" fill="var(--color-primary)" radius={[3, 3, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-[10px] font-bold tracking-widest text-muted-foreground uppercase mt-2">
            <span>Under-Predict</span>
            <span>Error = 0</span>
            <span>Over-Predict</span>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {bottomStats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-4">
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{stat.label}</span>
            <div className={`text-2xl font-extrabold font-display mt-1 ${stat.highlight ? "text-teal" : ""}`}>{stat.value}</div>
            <span className="text-xs text-muted-foreground">{stat.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
