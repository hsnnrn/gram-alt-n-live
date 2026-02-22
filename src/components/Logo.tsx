export default function Logo({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Gold bar base */}
      <rect x="4" y="16" width="24" height="16" rx="2" fill="url(#goldGrad)" />
      <path d="M8 16L12 8H32L28 16H4Z" fill="url(#goldGradLight)" />
      <rect x="28" y="16" width="0" height="16" rx="0" fill="url(#goldGradDark)" />
      <path d="M28 16L32 8V24L28 32V16Z" fill="url(#goldGradDark)" opacity="0.7" />
      
      {/* Trend line */}
      <path d="M8 28L16 22L22 25L34 12" stroke="hsl(152, 60%, 40%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="34" cy="12" r="2.5" fill="hsl(152, 60%, 40%)" />
      
      {/* Arrow tip */}
      <path d="M30 10L34 12L32 16" stroke="hsl(152, 60%, 40%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      <defs>
        <linearGradient id="goldGrad" x1="4" y1="16" x2="28" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(43, 80%, 48%)" />
          <stop offset="1" stopColor="hsl(43, 80%, 38%)" />
        </linearGradient>
        <linearGradient id="goldGradLight" x1="8" y1="8" x2="28" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(43, 90%, 62%)" />
          <stop offset="1" stopColor="hsl(43, 80%, 50%)" />
        </linearGradient>
        <linearGradient id="goldGradDark" x1="28" y1="16" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(43, 80%, 38%)" />
          <stop offset="1" stopColor="hsl(43, 80%, 30%)" />
        </linearGradient>
      </defs>
    </svg>
  );
}