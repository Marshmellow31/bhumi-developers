import React from "react";

interface LogoProps {
  className?: string;
  light?: boolean; // If true, renders dark text for light backgrounds. If false, renders white text for dark backgrounds.
}

export default function Logo({ className = "h-12 w-auto", light = false }: LogoProps) {
  // Color configuration
  const textColor = light ? "text-primary" : "text-white";
  const subtextColor = light ? "#4b5563" : "#d1d5db"; // Tailwind gray-600 vs gray-300
  const roofColor1 = light ? "#4b5563" : "#9ca3af"; // gray-600 vs gray-400
  const roofColor2 = light ? "#9ca3af" : "#4b5563"; // gray-400 vs gray-600

  return (
    <svg
      viewBox="0 0 160 80"
      className={`${className} ${textColor}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sleek architectural roof symbol */}
      <path
        d="M 10 20 L 80 6 L 150 20"
        stroke={roofColor1}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 22 25 L 80 13 L 138 25"
        stroke={roofColor2}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Stylized 'BHUMI' logo text using precise vector paths */}
      <g>
        {/* 'B' - Red vertical accent stem */}
        <rect x="10" y="32" width="10" height="24" fill="#ef4444" rx="0.5" />
        {/* 'B' - Black/White loops */}
        <path
          d="M 23 32 H 35 C 39.5 32 42.5 33.5 42.5 36.5 C 42.5 38.5 40.5 39.5 38 40 C 41.5 41 43.5 43 43.5 46.5 C 43.5 49.5 39.5 56 35 56 H 23 Z M 30 37 V 41 H 34 C 35 41 35.5 40.5 35.5 39 C 35.5 37.5 35 37 34 37 Z M 30 46 V 51 H 34 C 35 51 36 50.5 36 48.5 C 36 46.5 35 46 34 46 Z"
          fill="currentColor"
        />

        {/* 'H' */}
        <path
          d="M 48 32 H 56 V 41.5 H 65 V 32 H 73 V 56 H 65 V 47 H 56 V 56 H 48 Z"
          fill="currentColor"
        />

        {/* 'U' */}
        <path
          d="M 77 32 H 85 V 47.5 C 85 50.5 87 52 89.5 52 C 92 52 94 50.5 94 47.5 V 32 H 102 V 47.5 C 102 53 97 56 89.5 56 C 82 56 77 53 77 47.5 Z"
          fill="currentColor"
        />

        {/* 'M' */}
        <path
          d="M 106 32 H 115 L 121 42 L 127 32 H 136 V 56 H 129 V 40 L 122.5 49 H 119.5 L 113 40 V 56 H 106 Z"
          fill="currentColor"
        />

        {/* 'I' - Red dot */}
        <rect x="140" y="32" width="8" height="4.5" fill="#ef4444" rx="0.5" />
        {/* 'I' - Main stem */}
        <rect x="140" y="38" width="8" height="18" fill="currentColor" rx="0.5" />
      </g>

      {/* 'DEVELOPERS' in high-tech, widely spaced, clean typography */}
      <text
        x="80"
        y="72"
        textAnchor="middle"
        fill={subtextColor}
        fontSize="10.5"
        fontWeight="bold"
        letterSpacing="0.29em"
        fontFamily="var(--font-sans), system-ui, -apple-system, sans-serif"
      >
        DEVELOPERS
      </text>
    </svg>
  );
}
