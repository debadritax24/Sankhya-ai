"use client";

interface TopographicPatternProps {
  className?: string;
  opacity?: number;
  density?: "low" | "medium" | "high";
  color?: "navy" | "cyan" | "beige";
}

const colors = {
  navy: "#080D2B",
  cyan: "#58C4C0",
  beige: "#8D837A",
};

export function TopographicPattern({
  className = "",
  opacity = 0.06,
  density = "low",
  color = "navy",
}: TopographicPatternProps) {
  const strokeColor = colors[color];
  const strokeWidth = density === "high" ? 0.8 : density === "medium" ? 0.6 : 0.5;

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      {/* Outer contours */}
      <ellipse cx="600" cy="400" rx="580" ry="380" stroke={strokeColor} strokeWidth={strokeWidth} />
      <ellipse cx="600" cy="400" rx="520" ry="340" stroke={strokeColor} strokeWidth={strokeWidth} />
      <ellipse cx="600" cy="400" rx="460" ry="300" stroke={strokeColor} strokeWidth={strokeWidth} />
      <ellipse cx="600" cy="400" rx="400" ry="260" stroke={strokeColor} strokeWidth={strokeWidth} />
      <ellipse cx="600" cy="400" rx="340" ry="220" stroke={strokeColor} strokeWidth={strokeWidth} />
      <ellipse cx="600" cy="400" rx="280" ry="180" stroke={strokeColor} strokeWidth={strokeWidth} />
      <ellipse cx="600" cy="400" rx="220" ry="140" stroke={strokeColor} strokeWidth={strokeWidth} />
      <ellipse cx="600" cy="400" rx="160" ry="100" stroke={strokeColor} strokeWidth={strokeWidth} />
      <ellipse cx="600" cy="400" rx="100" ry="60" stroke={strokeColor} strokeWidth={strokeWidth} />
      <ellipse cx="600" cy="400" rx="50" ry="30" stroke={strokeColor} strokeWidth={strokeWidth} />

      {/* Offset contours */}
      <ellipse cx="580" cy="380" rx="450" ry="310" stroke={strokeColor} strokeWidth={strokeWidth * 0.8} transform="rotate(-5 580 380)" />
      <ellipse cx="620" cy="420" rx="380" ry="250" stroke={strokeColor} strokeWidth={strokeWidth * 0.8} transform="rotate(3 620 420)" />
      <ellipse cx="590" cy="410" rx="300" ry="190" stroke={strokeColor} strokeWidth={strokeWidth * 0.6} transform="rotate(-2 590 410)" />
      <ellipse cx="610" cy="390" rx="200" ry="130" stroke={strokeColor} strokeWidth={strokeWidth * 0.6} transform="rotate(4 610 390)" />

      {/* Flowing accent lines */}
      {density !== "low" && (
        <>
          <path d="M 0 200 Q 300 180 600 220 Q 900 260 1200 200" stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
          <path d="M 0 400 Q 300 380 600 420 Q 900 460 1200 400" stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
          <path d="M 0 600 Q 300 580 600 620 Q 900 660 1200 600" stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
        </>
      )}
    </svg>
  );
}
