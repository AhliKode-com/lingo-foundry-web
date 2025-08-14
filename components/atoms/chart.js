/*
 * @Author: danteclericuzio
 * @Date: 2025-08-14 11:08:44
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-08-14 18:12:32
 */

"use client";

import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid,ReferenceLine,ReferenceDot} from "recharts";
import { useMemo } from "react";
import { GrMoney } from "react-icons/gr";
import { IoWalletOutline } from "react-icons/io5";
import { PiWarningCircleLight } from "react-icons/pi";

const formatRupiah = (num = 0) => {
    const n = Math.round(Number(num) || 0);
    return "Rp " + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Helpers
const toISODate = (d) => d.toLocaleDateString("en-CA"); // YYYY-MM-DD
const displayDay = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // "Aug 1"
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);

// Accepts "August, 1" / "Aug, 1"
function parseDailyTimeLabel(raw) {
    if (!raw || typeof raw !== "string") return null;
    const cleaned = raw.replace(/\s+/g, " ").replace(/,\s*/g, ", ").trim();
    const year = new Date().getFullYear();
    const dt = new Date(`${cleaned} ${year}`);
    return isNaN(dt) ? null : dt;
}

function daysBetween(start, end) {
    const res = [];
    const dayMs = 24 * 60 * 60 * 1000;
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    for (let t = s; t <= e; t = new Date(t.getTime() + dayMs)) {
        res.push(new Date(t));
    }
    return res;
}

const formatIDR = (n = 0) => (Math.round(n)).toLocaleString("id-ID");

export function RupiahChart({ data, interval, loading, label1, label2, totalEarning }) {
    // Normalize to array
    const earningData = Array.isArray(data) ? data : (data?.data ?? []);

    const chartData = useMemo(() => {
        if (interval === "daily") {
            // Anchor is always "today"
            const today = new Date();
            const monthStart = startOfMonth(today);

            // Parse incoming rows and aggregate by day, but only for *this* month up to today
            const byDay = new Map(); // iso -> amount
            (earningData || []).forEach((item) => {
                const parsed = parseDailyTimeLabel(item?.time);
                if (!parsed) return;

                // must be same month/year as today and not after today
                if (
                parsed.getFullYear() === today.getFullYear() &&
                parsed.getMonth() === today.getMonth() &&
                parsed <= today
                ) {
                const iso = toISODate(parsed);
                const amount = Number(item?.totalEarning) || 0;
                byDay.set(iso, (byDay.get(iso) || 0) + amount);
                }
            });

            // Build series from 1st -> today, fill missing days with 0
            return daysBetween(monthStart, today).map((d) => {
                const iso = toISODate(d);
                return {
                    time: iso,
                    totalEarning: byDay.get(iso) || 0,
                    displayTime: displayDay(d), // "Aug 1" ... "Aug 14"
                };
            });
        }

        if (interval === "monthly") {
            const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC",];
            return months.map((m) => {
                const hit = (earningData || []).find(
                    (it) => String(it?.time || "").toUpperCase() === m
                );
                const val = hit ? Number(hit.totalEarning) || 0 : 0;
                return {
                    time: m,
                    totalEarning: val,
                    displayTime: m.charAt(0) + m.slice(1).toLowerCase(), // "Jan"
                };
            });
        }

        // yearly (or others)
        if (!earningData || earningData.length === 0) {
            const y = String(new Date().getFullYear());
            return [{ time: y, totalEarning: 0, displayTime: y }];
        }

        return earningData.map((it) => ({
            time: String(it?.time ?? ""),
            totalEarning: Number(it?.totalEarning) || 0,
            displayTime: String(it?.time ?? ""),
        }));
    }, [earningData, interval]);

    // Y max + 5% headroom
    const maxAmount = chartData.length
        ? Math.max(...chartData.map((d) => Number(d.totalEarning) || 0))
        : 0;
    const upperBoundRaw = maxAmount + Math.ceil(maxAmount * 0.05);
    const upperBound = Number.isFinite(upperBoundRaw) && upperBoundRaw > 0 ? upperBoundRaw : 1;

    if (loading) {
        return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[500px] h-[400px] rounded bg-gray-200 animate-pulse" />
        </div>
        );
    }

    if (!chartData.length) {
        return <div className="text-center text-gray-500 py-10">No data available</div>;
    }

    return (
        <div className="w-full overflow-x-auto">
            <div className="flex gap-[12px] mb-[30px]">
                <IoWalletOutline className="text-[45px]"/>
                <div className="flex flex-col">
                    <span className="text-[24px] md:text-[32px] font-medium">Rp.{formatIDR(totalEarning)}</span>
                    <div className="flex items-center gap-[8px]">
                        <span className="text-[12px] text-[#050507]">
                            {interval === 'monthly' ? label2 : label1}
                        </span>
                        <PiWarningCircleLight/>
                    </div>
                </div>
            </div>
            <div className="min-w-[500px] h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="displayTime" tick={{ fontSize: 12 }} />
                        <YAxis
                            domain={[0, upperBound]}
                            tickFormatter={(value) => `Rp${Math.round((Number(value) || 0) / 1000)}k`}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            formatter={(value) => formatRupiah(value)}
                            labelFormatter={(label) => String(label)}
                            contentStyle={{ borderRadius: 8 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="totalEarning"
                            stroke="#E15C31"
                            strokeWidth={2}
                            dot={{ r: 5 }}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

// Commission brackets (from your image)
const BRACKETS = [
    { min: 0,         max: 4_999_999,  maxPct: 30, minPct: 26 },
    { min: 5_000_000, max: 8_999_999,  maxPct: 25, minPct: 21 },
    { min: 9_000_000, max: 12_999_999, maxPct: 20, minPct: 16 },
    { min: 13_000_000,max: 16_999_999, maxPct: 15, minPct: 11 },
    { min: 17_000_000,max: 21_999_999, maxPct: 10, minPct:  6 },
    { min: 22_000_000,max: 28_000_000, maxPct:  5, minPct:  0 },
  ];
  
  const DOMAIN_MAX = BRACKETS[BRACKETS.length - 1].max;
  
  const formatAxisIDR = (n = 0) => {
    if (n >= 1_000_000) return `Rp${Math.round(n / 1_000_000)}M`;
    if (n >= 1_000) return `Rp${Math.round(n / 1_000)}K`;
    return `Rp${n}`;
  };
  
  // Build line data: two lines (Max% and Min%) across bracket edges
  const bandData = BRACKETS.flatMap(b => ([
    { income: b.min, maxPct: b.maxPct, minPct: b.minPct },
    { income: b.max, maxPct: b.minPct, minPct: b.minPct }, // note: top line slopes down within bracket
  ]));
  
  // Linear interpolation of percentage within a bracket
  function commissionPctFor(income) {
    if (income <= BRACKETS[0].min) return BRACKETS[0].maxPct;
    if (income >= BRACKETS[BRACKETS.length - 1].max) return BRACKETS[BRACKETS.length - 1].minPct;
  
    const b = BRACKETS.find(b => income >= b.min && income <= b.max);
    if (!b) return 0;
  
    if (income <= b.min) return b.maxPct;
    if (income >= b.max) return b.minPct;
  
    const t = (income - b.min) / (b.max - b.min);
    return b.maxPct + (b.minPct - b.maxPct) * t; // linear decrease
  }
  
  export function CommissionChart({ data , label1, label2}) {
    const totalIncome = Number(data) || 0;
    const pct = commissionPctFor(totalIncome);
    const commissionAmount = (totalIncome * pct) / 100;
    const nett = totalIncome - commissionAmount
  
    return (
      <div className="w-full">
        {/* Numbers summary */}
        <div className="flex gap-[12px] mb-[30px] items-center">
            <GrMoney className="text-[30px] md:text-[45px]"/>
            <div className="flex flex-col">
                <span className="text-[18px] sm:text-[24px] md:text-[32px] font-medium">Rp.{formatIDR(totalIncome)}</span>
                <div className="flex items-center gap-[8px]">
                    <span className="text-[10px] md:text-[12px] text-[#050507]">
                        {label1}
                    </span>
                    <PiWarningCircleLight/>
                </div>
            </div>
        </div>
        <div className="flex gap-[12px] mb-[30px]">
            <div className="flex flex-col ml-[50px] md:ml-[56px]">
                <span className="text-[18px] sm:text-[24px] md:text-[32px] font-medium">Rp.{formatIDR(nett)}</span>
                <div className="flex items-center gap-[8px]">
                    <span className="text-[10px] md:text-[12px] text-[#050507]">
                        {label2}
                    </span>
                    <PiWarningCircleLight/>
                </div>
            </div>
        </div>
        <div className="mb-3 text-sm text-[#4D4C5C]">
          <div>Income: <span className="font-medium">Rp{formatIDR(totalIncome)}</span></div>
          <div>
            Estimated commission: <span className="font-medium">{pct.toFixed(0)}%</span>
            {" "}(<span className="font-medium">Rp{formatIDR(commissionAmount)}</span>)
          </div>
        </div>
  
        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bandData} margin={{ top: 8, right: 20, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="income"
                type="number"
                domain={[0, DOMAIN_MAX]}
                tickFormatter={formatAxisIDR}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={[0, 32]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value, name) =>
                  name === "maxPct" || name === "minPct"
                    ? [`${Number(value).toFixed(1)}%`, name === "maxPct" ? "Max %" : "Min %"]
                    : [value, name]
                }
                labelFormatter={(label) => `Income: Rp${formatIDR(label)}`}
              />
  
              {/* Two guide lines for the bracket band */}
              <Line type="monotone" dataKey="maxPct" name="Max %" stroke="#E35D33" dot={false} />
              <Line type="monotone" dataKey="minPct" name="Min %" stroke="#94a3b8" dot={false} />
  
              {/* Your income marker */}
              <ReferenceLine
                x={Math.min(Math.max(totalIncome, 0), DOMAIN_MAX)}
                stroke="#E35D33"
                strokeDasharray="4 4"
                ifOverflow="extendDomain"
              />
              <ReferenceDot
                x={Math.min(Math.max(totalIncome, 0), DOMAIN_MAX)}
                y={pct}
                r={5}
                fill="#E35D33"
                stroke="none"
                ifOverflow="discard"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }