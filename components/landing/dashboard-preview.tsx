import {
  ArrowUpRight,
  BarChart3,
  Database,
  Filter,
  LineChart,
  PieChart,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const weeklyRevenue = [34, 46, 40, 62, 74, 67, 86]
const categories = [
  { label: "North", value: "42%", tone: "bg-primary" },
  { label: "West", value: "31%", tone: "bg-cyan-400" },
  { label: "EMEA", value: "19%", tone: "bg-slate-400" },
]

export function DashboardPreview() {
  return (
    <Card className="relative border-0 bg-[#071116]/95 py-0 text-white shadow-[0_28px_80px_rgba(3,12,18,0.38)] ring-1 ring-white/10">
      <CardContent className="space-y-5 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-white/10 bg-white/5 p-2">
              <BarChart3 className="size-4 text-cyan-200" />
            </div>
            <div>
              <p className="text-sm font-medium">Executive overview</p>
              <p className="text-xs text-white/55">
                Last refreshed 2 minutes ago
              </p>
            </div>
          </div>
          <Badge className="rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-medium tracking-[0.24em] text-cyan-100 uppercase hover:bg-white/10">
            Live
          </Badge>
        </div>

        <div className="grid gap-3 md:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs tracking-[0.24em] text-white/45 uppercase">
                  Revenue
                </p>
                <p className="mt-2 text-2xl font-medium">$1.84M</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-200">
                +18.4%
                <ArrowUpRight className="size-3" />
              </div>
            </div>
            <div className="flex h-28 items-end gap-2">
              {weeklyRevenue.map((value, index) => (
                <div
                  key={value}
                  className="flex-1 rounded-t-full bg-gradient-to-t from-cyan-500/30 via-cyan-300/70 to-white"
                  style={{ height: `${value}%`, opacity: 0.55 + index * 0.06 }}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs tracking-[0.24em] text-white/45 uppercase">
                  Regions
                </p>
                <PieChart className="size-4 text-cyan-200" />
              </div>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-white/70">
                      <span>{category.label}</span>
                      <span>{category.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10">
                      <div
                        className={`${category.tone} h-full rounded-full`}
                        style={{ width: category.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center justify-between text-xs text-white/55">
                <span>Query latency</span>
                <LineChart className="size-4 text-cyan-200" />
              </div>
              <p className="mt-3 text-2xl font-medium">184 ms</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Database,
              label: "Datasets",
              value: "28",
            },
            {
              icon: Filter,
              label: "Saved filters",
              value: "14",
            },
            {
              icon: BarChart3,
              label: "Dashboards",
              value: "9",
            },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <Icon className="size-4 text-cyan-200" />
              <p className="mt-5 text-2xl font-medium">{value}</p>
              <p className="mt-1 text-xs text-white/55">{label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
