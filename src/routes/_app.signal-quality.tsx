import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";
import { signalQualityData } from "../lib/mock-data";
import { Zap, CloudRain } from "lucide-react";

export const Route = createFileRoute("/_app/signal-quality")({
  component: SignalQualityPage,
});

function SignalQualityPage() {
  const { layer1, layer2, layer3 } = signalQualityData;

  return (
    <div className="space-y-8 max-w-[1200px]">
      {/* Layer 1 */}
      <section>
        <h1 className="text-2xl font-extrabold font-display">Layer 1: De-noising Analysis</h1>
        <p className="text-sm text-muted-foreground mt-1">Quantifying KPT label error reduction across operational signal streams.</p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mt-4">
          <div className="bg-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold font-display">KPT Label Error: Before vs After</h3>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-primary" /> Raw Data</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-teal" /> De-noised</span>
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={layer1.kptErrorBefore} barGap={8}>
                  <XAxis dataKey="range" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickFormatter={(v) => `${v}MS`} />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="raw" fill="var(--color-primary)" radius={[3, 3, 0, 0]} barSize={24} opacity={0.8} />
                  <Bar dataKey="denoised" fill="var(--color-teal)" radius={[3, 3, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-primary rounded-xl p-5 text-primary-foreground">
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">Mean Error Reduction</span>
              <div className="text-4xl font-extrabold font-display mt-1">{layer1.meanErrorReduction}%</div>
              <p className="text-xs mt-1 opacity-75">↓ Significant noise suppression</p>
            </div>
            <div className="bg-primary rounded-xl p-5 text-primary-foreground">
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">Confidence Score</span>
              <div className="text-4xl font-extrabold font-display mt-1">{layer1.confidenceScore}</div>
              <p className="text-xs mt-1 opacity-75">✓ Post-processing validity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 2 */}
      <section>
        <h2 className="text-2xl font-extrabold font-display">Layer 2: Enrichment Metrics</h2>
        <p className="text-sm text-muted-foreground mt-1">Dynamic adjustment factors based on contextual environmental events.</p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mt-4">
          <div className="bg-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold font-display">Theta Sensitivity Curve</h3>
                <p className="text-xs text-muted-foreground">Draggable marker for threshold simulation</p>
              </div>
              <span className="bg-teal/10 text-teal text-xs font-bold px-3 py-1 rounded-full">Current θ: 0.72</span>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={layer2.thetaCurve}>
                  <XAxis dataKey="x" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="y" stroke="var(--color-primary)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-[10px] font-bold tracking-widest text-muted-foreground uppercase -mt-2">
              <span>Low Impact</span>
              <span>Operational Equilibrium</span>
              <span>High Sensitivity</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={16} className="text-primary" />
                <span className="text-sm font-bold">Rush Multiplier</span>
              </div>
              <div className="text-3xl font-extrabold font-display">x{layer2.rushMultiplier}</div>
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mt-1 block">Peak Intensity Tracking</span>
              <div className="h-1.5 bg-accent rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "70%" }} />
              </div>
            </div>
            <div className="bg-card rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <CloudRain size={16} className="text-teal" />
                <span className="text-sm font-bold">Rain Events</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold font-display">{layer2.rainEvents}</span>
                <span className="text-sm text-muted-foreground">Today</span>
              </div>
              <div className="flex gap-1 mt-2">
                {["10a", "12p", "2p", "4p"].map((t, i) => (
                  <span key={t} className={`text-[10px] font-bold px-2 py-0.5 rounded ${i === 2 ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 3 */}
      <section>
        <h2 className="text-2xl font-extrabold font-display">Layer 3: Bias Attribution</h2>
        <p className="text-sm text-muted-foreground mt-1">Identifying non-stochastic merchant behavior patterns and distribution anomalies.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="bg-card rounded-xl p-6">
            <h3 className="text-base font-bold font-display mb-4">Merchant Behavior Attribution</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-40">
                <div className="w-32 h-40 rounded-lg bg-teal flex items-center justify-center flex-col">
                  <span className="text-3xl font-extrabold text-teal-foreground">{layer3.classified}%</span>
                  <span className="text-[10px] font-bold tracking-wider text-teal-foreground uppercase">Classified</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {layer3.behaviors.map((b: typeof layer3.behaviors[0]) => (
                <div key={b.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                    <span>{b.name}</span>
                  </div>
                  <span className="font-bold">{b.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold font-display">Bias Value Distribution</h3>
              <span className="text-xs text-muted-foreground">N = 4,281 Merchants</span>
            </div>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={layer3.biasDistribution}>
                  <XAxis dataKey="range" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                  <YAxis hide />
                  <Bar dataKey="value" fill="var(--color-muted)" radius={[3, 3, 0, 0]} barSize={28}>
                    {layer3.biasDistribution.map((entry, index) => (
                      <Bar key={index} dataKey="value" fill={entry.range === "0" ? "var(--color-primary)" : "var(--color-muted)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-[10px] font-bold tracking-widest text-muted-foreground uppercase mt-1">
              <span>Negative Bias</span>
              <span>Neutral</span>
              <span>Positive Bias</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-accent rounded-lg p-3">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Skewness</span>
                <div className="text-lg font-extrabold font-display">+{layer3.skewness}</div>
              </div>
              <div className="bg-accent rounded-lg p-3">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Kurtosis</span>
                <div className="text-lg font-extrabold font-display">{layer3.kurtosis}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
