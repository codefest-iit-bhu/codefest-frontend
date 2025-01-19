const GlitchText = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 250"
      className="w-full h-full"
    >
      <defs>
        {/* Glitch filters */}
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="3"
            stitchTiles="stitch"
          >
            <animate
              attributeName="baseFrequency"
              values="0.7;0.9;0.7"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
          <feBlend in2="SourceGraphic" mode="multiply" />
        </filter>

        <filter id="static-rgb-split">
          <feOffset in="SourceGraphic" dx="2" dy="0" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
          />
          <feOffset in="SourceGraphic" dx="-2" dy="0" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 1 0  0 0 1 0 0  0 0 0 0 0  0 0 0 1 0"
          />
        </filter>

        {/* Scanline gradient */}
        <linearGradient id="scanlines" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "rgba(0,0,0,0.3)" }} />
          <stop offset="50%" style={{ stopColor: "transparent" }} />
          <stop offset="100%" style={{ stopColor: "rgba(0,0,0,0.3)" }} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="500" height="250" fill="#111" />

      {/* Main text */}
      <text
        x="50%"
        y="50%"
        fontFamily="Minecraft"
        fontSize="48"
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        filter="url(#static-rgb-split)"
      >
        [CodeFest&apos;25]
        <animate
          attributeName="opacity"
          values="1;0.8;1"
          dur="0.1s"
          repeatCount="indefinite"
        />
      </text>

      {/* Noise overlay */}
      <rect width="500" height="250" filter="url(#noise)" opacity="0.1" />

      {/* Scanlines */}
      <rect width="500" height="250" fill="url(#scanlines)" opacity="0.1">
        <animate
          attributeName="y"
          values="0;250;0"
          dur="10s"
          repeatCount="indefinite"
        />
      </rect>

      {/* Random glitch blocks */}
      <rect width="500" height="10" fill="white" opacity="0.1">
        <animate
          attributeName="y"
          values="0;250;0"
          dur="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;0.1;0"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
};

export default GlitchText;
