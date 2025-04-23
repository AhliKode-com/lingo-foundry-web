"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const formatRupiah = (num) =>
  "Rp " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export function RupiahChart({data}) {
  return (
    <div className="w-full overflow-x-auto">
        <div className="min-w-[500px] h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis
                    domain={[0, Math.max(...data.map((d) => d.amount)) + 500000]}
                    tickFormatter={(value) => `Rp${value / 1000}k`}
                    tick={{ fontSize: 12 }}
                />
                <Tooltip
                    formatter={(value) => formatRupiah(value)}
                    labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                    type="monotone"
                    dataKey="amount"
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
