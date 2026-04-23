export function Banner() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-neutral-800 p-8">
      <div className="max-w-[820px] text-center font-body text-sm text-neutral-300">
        <p className="text-neutral-100">
          LinkedIn banner — 1584 × 396.
        </p>
        <p className="mt-2">
          To export: open DevTools → Elements → right-click the{" "}
          <code className="rounded bg-neutral-700 px-1">#banner</code> node →
          "Capture node screenshot".
        </p>
      </div>
      <div
        id="banner"
        className="bg-variant-bold relative overflow-hidden"
        style={{ width: 1584, height: 396 }}
      >
        <div className="absolute inset-y-0 left-[460px] right-[500px] flex flex-col justify-center">
          <p className="font-hero text-[60px] leading-none text-brown">
            applied polymath
          </p>
          <p className="mt-3 font-body text-[15px] text-brown/60">
            /əˈplīd ˈpä-lē-ˌmath/{" "}
            <span className="ml-2 italic">n.</span>
          </p>
          <p className="mt-6 font-body text-[26px] leading-snug text-brown/85">
            one who{" "}
            <span className="relative inline-block">
              <span className="text-brown/40 line-through decoration-brown-accent/70">
                collects
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rotate-[-4deg] font-hand text-[26px] text-brown-accent"
              >
                connects
              </span>
            </span>{" "}
            disparate domains to build working systems.
          </p>
          <svg
            aria-hidden
            className="mt-5 h-3 w-[170px] text-brown-accent/55"
            viewBox="0 0 170 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 4 7 Q 32 2, 58 7 T 112 7 T 166 5"
              stroke="currentColor"
              strokeWidth={1.4}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <p className="mt-3 font-hand text-[20px] italic leading-snug text-brown/70">
            Working across business, technology, and the philosophy of both.
          </p>
        </div>

        <svg
          aria-hidden
          className="absolute right-[60px] top-1/2 -translate-y-1/2"
          width={400}
          height={300}
          viewBox="0 0 440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            stroke="#634832"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <rect x={6} y={20} width={150} height={46} rx={1} />
            <rect x={6} y={137} width={150} height={46} rx={1} />
            <rect x={6} y={254} width={150} height={46} rx={1} />
            <rect x={300} y={137} width={134} height={46} rx={1} />

            <path d="M 156 43 L 210 43 L 210 160" />
            <path d="M 156 160 L 210 160" />
            <path d="M 156 277 L 210 277 L 210 160" />

            <path d="M 210 160 L 295 160" />
            <path d="M 289 155 L 295 160 L 289 165" />

            <path
              d="M 230 113 Q 240 105 252 108"
              strokeDasharray="3 3"
              strokeWidth={1}
              opacity={0.55}
            />
          </g>

          <g
            fontFamily="'Architects Daughter', cursive"
            fill="#634832"
            textAnchor="middle"
          >
            <text x={81} y={50} fontSize={17}>
              BUSINESS
            </text>
            <text x={81} y={167} fontSize={17}>
              TECHNOLOGY
            </text>
            <text x={81} y={284} fontSize={17}>
              PHILOSOPHY
            </text>
            <text x={367} y={167} fontSize={17}>
              SYSTEMS
            </text>
            <text
              x={249}
              y={103}
              fontSize={13}
              fontStyle="italic"
              fill="#8b4513"
              opacity={0.85}
            >
              connected
            </text>
            <text x={-6} y={12} fontSize={13} textAnchor="start" opacity={0.7}>
              // three axes
            </text>
          </g>

          <g
            stroke="#634832"
            strokeWidth={0.9}
            fill="none"
            opacity={0.7}
          >
            <path d="M 6 315 L 6 310" />
            <path d="M 434 315 L 434 310" />
            <path d="M 6 312 L 434 312" />
          </g>
        </svg>
      </div>
    </div>
  );
}
