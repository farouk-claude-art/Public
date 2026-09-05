export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block font-serif leading-none ${className}`}>
      <span className="font-semibold tracking-tight text-encre">Art</span>
      <span className="text-terracotta">&rsquo;</span>
      <span className="font-semibold tracking-tight text-terracotta">p</span>
      <span className="font-semibold tracking-tight text-encre">éro</span>
      {/* coup de pinceau sous le mot */}
      <svg
        viewBox="0 0 120 8"
        aria-hidden
        className="absolute -bottom-[0.16em] left-0 w-full text-ocre"
        preserveAspectRatio="none"
      >
        <path
          d="M2 5.5C22 1.5 44 7.5 62 4c16-2.6 34 1 56-1.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
