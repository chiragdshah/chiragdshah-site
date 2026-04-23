export function CornerWatermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-2 top-16 z-0 hidden opacity-[0.06] md:block"
    >
      <svg
        width="360"
        height="360"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke="#634832"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
          fill="none"
        >
          <path d="M 24 9 Q 15 13 7 16" />
          <path d="M 7 16 Q 15 19 24 23" />
        </g>
        <path
          d="M 24 9
             C 20 5.5, 14 5.5, 10 8
             C 6 10.5, 6 21.5, 10 24
             C 14 26.5, 20 26.5, 24 23"
          fill="none"
          stroke="#634832"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="9" r="2.8" fill="#8b4513" />
        <circle cx="7" cy="16" r="2.8" fill="#8b4513" />
        <circle cx="24" cy="23" r="2.8" fill="#8b4513" />
      </svg>
    </div>
  );
}
