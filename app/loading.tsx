export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="space-y-2">
          <div className="h-8 bg-slate-300 rounded w-48 mx-auto animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-64 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

