import React from "react";

export function CircularProgressBar({ progress, size = 100, strokeWidth = 10 }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex items-center justify-center">
            <svg width={size} height={size}>
                <circle
                    className="text-gray-200"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-[#E35D33]"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="text-sm font-semibold"
                >
                    {progress}%
                </text>
            </svg>
        </div>
    );
}




export function HalfCircularProgressBar({ progress }) {
    const radius = 50;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
  
    // Arc path from left to right (180 to 0 degrees)
    const describeArc = (x, y, radius, startAngle, endAngle) => {
      const start = polarToCartesian(x, y, radius, endAngle);
      const end = polarToCartesian(x, y, radius, startAngle);
  
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
      return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(" ");
    };
  
    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      };
    };
  
    const arcPath = describeArc(radius, radius, normalizedRadius, 180, 0);
  
    return (
      <svg width={radius * 2} height={radius} viewBox={`0 0 ${radius * 2} ${radius}`}>
        {/* Background arc */}
        <path
          d={arcPath}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d={arcPath}
          fill="none"
          stroke="#E35D33"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-out"
        />
        {/* Centered percentage text */}
        <text
          x="50%"
          y="80%"
          textAnchor="middle"
          fill="#333"
          fontSize="14"
          fontWeight="bold"
        >
          {progress}%
        </text>
      </svg>
    );
  }
  