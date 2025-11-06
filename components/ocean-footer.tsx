export function OceanFooter() {
  return (
    <footer className="relative mt-20 bg-gradient-to-b from-[#001a33] via-[#002147] to-[#00264d] text-white overflow-hidden">
      {/* Animated waves */}
      <div className="absolute top-0 left-0 right-0 h-24 -translate-y-full">
        <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="url(#wave-gradient)" />
          <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#001a33" stopOpacity="0" />
              <stop offset="100%" stopColor="#001a33" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

      {/* Animated depth effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-400/10 to-transparent animate-pulse" style={{ animationDuration: '8s' }} />

      {/* Content */}
      <div className="relative z-10 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <p className="text-blue-200 text-sm">
            © 2024 AnchorMarianas. All rights reserved.
          </p>
          <p className="text-blue-300/60 text-xs">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}
