/*
 * @Author: danteclericuzio
 * @Date: 2025-08-14 11:08:44
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-08-15 22:29:55
 */

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
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
const displayDay = (d) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // "Aug 1"
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);

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

const formatIDR = (n = 0) => Math.round(n).toLocaleString("id-ID");

/** Robust daily parser
 * Accepts: "Aug 1", "August 1", "Aug, 1", "August, 1" (comma optional), extra quotes/spaces
 * Returns: Date or null
 */
function parseDailyTimeLabel(raw) {
  if (!raw) return null;

  // normalize: remove quotes, commas -> space, collapse spaces, uppercase
  const s = String(raw)
    .replace(/["']/g, "")
    .replace(/,/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase(); // e.g. "AUGUST 1"

  const [monthToken, dayToken] = s.split(" ");
  if (!monthToken || !dayToken) return null;

  const MONTH = {
    JAN: 0, JANUARY: 0,
    FEB: 1, FEBRUARY: 1,
    MAR: 2, MARCH: 2,
    APR: 3, APRIL: 3,
    MAY: 4,
    JUN: 5, JUNE: 5,
    JUL: 6, JULY: 6,
    AUG: 7, AUGUST: 7,
    SEP: 8, SEPT: 8, SEPTEMBER: 8,
    OCT: 9, OCTOBER: 9,
    NOV: 10, NOVEMBER: 10,
    DEC: 11, DECEMBER: 11,
  };

  const m = MONTH[monthToken];
  const d = parseInt(dayToken, 10);
  if (m == null || !Number.isFinite(d) || d < 1 || d > 31) return null;

  const y = new Date().getFullYear();
  return new Date(y, m, d); // reliable cross-browser
}

// ==== MONTHLY NORMALIZATION (FULL MONTH NAMES) ====
const MONTHS_FULL = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

function normalizeMonthKey(s) {
  if (!s) return null;
  const t = String(s).trim().toUpperCase();
  const map = {
    JAN: "JANUARY",
    JANUARY: "JANUARY",
    FEB: "FEBRUARY",
    FEBRUARY: "FEBRUARY",
    MAR: "MARCH",
    MARCH: "MARCH",
    APR: "APRIL",
    APRIL: "APRIL",
    MAY: "MAY",
    JUN: "JUNE",
    JUNE: "JUNE",
    JUL: "JULY",
    JULY: "JULY",
    AUG: "AUGUST",
    AUGUST: "AUGUST",
    SEP: "SEPTEMBER",
    SEPT: "SEPTEMBER",
    SEPTEMBER: "SEPTEMBER",
    OCT: "OCTOBER",
    OCTOBER: "OCTOBER",
    NOV: "NOVEMBER",
    NOVEMBER: "NOVEMBER",
    DEC: "DECEMBER",
    DECEMBER: "DECEMBER",
  };
  return map[t] || null;
}

export function RupiahChart({ data, interval, loading, label1, label2, totalEarning }) {
  // Normalize to array
  const earningData = Array.isArray(data) ? data : data?.data ?? [];

  const chartData = useMemo(() => {
    if (interval === "daily") {
      // Anchor is always "today"
      const today = new Date();
      const monthStart = startOfMonth(today);

      // Parse incoming rows and aggregate by day, only for this month up to today
      const byDay = new Map(); // iso -> amount
      (earningData || []).forEach((item) => {
        const parsed = parseDailyTimeLabel(item?.time);
        if (!parsed) return;

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
      // aggregate API values by normalized full-month key
      const byMonth = Object.create(null);
      (earningData || []).forEach((it) => {
        const key = normalizeMonthKey(it?.time);
        if (!key) return;
        const amt = Number(it?.totalEarning) || 0;
        byMonth[key] = (byMonth[key] || 0) + amt;
      });

      return MONTHS_FULL.map((m) => ({
        time: m, // e.g., "JANUARY"
        totalEarning: byMonth[m] || 0,
        displayTime: m[0] + m.slice(1).toLowerCase(), // "January"
      }));
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
  const upperBound =
    Number.isFinite(upperBoundRaw) && upperBoundRaw > 0 ? upperBoundRaw : 1;

  if (loading) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="min-w-[500px] h-[400px] rounded bg-gray-200 animate-pulse" />
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="text-center text-gray-500 py-10">No data available</div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-[12px] mb-[30px]">
        <IoWalletOutline className="text-[45px]" />
        <div className="flex flex-col">
          <span className="text-[24px] md:text-[32px] font-medium">
            Rp.{formatIDR(totalEarning)}
          </span>
          <div className="flex items-center gap-[8px]">
            <span className="text-[12px] text-[#050507]">
              {interval === "monthly" ? label2 : label1}
            </span>
            <PiWarningCircleLight />
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
              tickFormatter={(value) =>
                `Rp${Math.round((Number(value) || 0) / 1000)}k`
              }
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

// ================== COMMISSION CHART ==================

const COMMISSION_START_PCT = 30;
const COMMISSION_STEP_INCOME = 1_000_000;
const COMMISSION_ZERO_AT = 30_000_000;

const DOMAIN_MAX = COMMISSION_ZERO_AT;

const formatAxisIDR = (n = 0) => {
  if (n >= 1_000_000) return `Rp${Math.round(n / 1_000_000)}M`;
  if (n >= 1_000) return `Rp${Math.round(n / 1_000)}K`;
  return `Rp${n}`;
};

// Commission ladder: start at 30%, drop 1% per Rp1,000,000 after the first million, floor at 0% from Rp30,000,000
function commissionPctFor(income) {
  const revenue = Number(income) || 0;
  if (revenue >= COMMISSION_ZERO_AT) return 0;
  if (revenue <= COMMISSION_STEP_INCOME) return COMMISSION_START_PCT;

  const stepsAboveFirstMillion = Math.floor(
    (revenue - COMMISSION_STEP_INCOME) / COMMISSION_STEP_INCOME
  );
  const pct = COMMISSION_START_PCT - stepsAboveFirstMillion;
  return pct > 0 ? pct : 0;
}

// Build line data in Rp1,000,000 steps to visualize the ladder
const bandData = Array.from(
  { length: DOMAIN_MAX / COMMISSION_STEP_INCOME + 1 },
  (_, idx) => {
    const income = idx * COMMISSION_STEP_INCOME;
    return {
      income,
      pct: commissionPctFor(income),
    };
  }
);

export function CommissionChart({ data, label1, label2 }) {
  const totalIncome = Number(data) || 0;
  const pct = commissionPctFor(totalIncome);
  const commissionAmount = (totalIncome * pct) / 100;
  const nett = totalIncome - commissionAmount;

  return (
    <div className="w-full">
      {/* Numbers summary */}
      <div className="flex gap-[12px] mb-[30px] items-center">
        <GrMoney className="text-[30px] md:text-[45px]" />
        <div className="flex flex-col">
          <span className="text-[18px] sm:text-[24px] md:text-[32px] font-medium">
            Rp.{formatIDR(totalIncome)}
          </span>
          <div className="flex items-center gap-[8px]">
            <span className="text-[10px] md:text-[12px] text-[#050507]">
              {label1}
            </span>
            <PiWarningCircleLight />
          </div>
        </div>
      </div>

      <div className="flex gap-[12px] mb-[30px]">
        <div className="flex flex-col ml-[50px] md:ml-[56px]">
          <span className="text-[18px] sm:text-[24px] md:text-[32px] font-medium">
            Rp.{formatIDR(nett)}
          </span>
          <div className="flex items-center gap-[8px]">
            <span className="text-[10px] md:text-[12px] text-[#050507]">
              {label2}
            </span>
            <PiWarningCircleLight />
          </div>
        </div>
      </div>

      <div className="mb-3 text-sm text-[#4D4C5C]">
        <div>
          Income:{" "}
          <span className="font-medium">Rp{formatIDR(totalIncome)}</span>
        </div>
        <div>
          Estimated commission:{" "}
          <span className="font-medium">{pct.toFixed(0)}%</span>{" "}
          (<span className="font-medium">Rp{formatIDR(commissionAmount)}</span>)
        </div>
      </div>

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={bandData}
            margin={{ top: 8, right: 20, left: 0, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="income"
              type="number"
              domain={[0, DOMAIN_MAX]}
              tickFormatter={formatAxisIDR}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={[0, COMMISSION_START_PCT + 2]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [
                `${Number(value).toFixed(0)}%`,
                "Commission %",
              ]}
              labelFormatter={(label) => `Income: Rp${formatIDR(label)}`}
            />

            {/* Commission ladder */}
            <Line
              type="stepAfter"
              dataKey="pct"
              name="Commission %"
              stroke="#E35D33"
              dot={false}
            />

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
