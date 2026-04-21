export default function Loading() {
  return (
    <div className="min-h-screen bg-lpka-bg font-body flex flex-col items-center justify-center py-12 px-4 md:px-8 max-w-6xl mx-auto w-full space-y-12">
      
      <div className="text-center space-y-4 max-w-md w-full">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-lpka-primary mb-4">
          Loading
        </h1>
        <p className="text-xl text-gray-600">Memuat laporan internal...</p>
        <div className="space-y-3">
          <div className="h-3 bg-lpka-border/50 rounded-full overflow-hidden">
            <div className="progress-shimmer h-3 rounded-full w-full"></div>
          </div>
          <div className="h-3 bg-lpka-border/50 rounded-full overflow-hidden">
            <div className="progress-shimmer h-3 rounded-full w-full [animation-delay:0.4s]"></div>
          </div>
          <div className="h-3 bg-lpka-border/50 rounded-full overflow-hidden">
            <div className="progress-shimmer h-3 rounded-full w-full [animation-delay:0.8s]"></div>
          </div>
        </div>
        <div className="pt-12 border-t border-lpka-border/50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-lpka-primary mx-auto shadow-lg"></div>
        </div>
      </div>
    </div>
  )
}

