/* eslint-disable @next/next/no-html-link-for-pages */
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ Ada Kesalahan</h2>
        
        <p className="text-gray-600 mb-2">
          <strong>Error:</strong> {error.message || 'Terjadi kesalahan tidak terduga'}
        </p>

        {error.digest && (
          <p className="text-sm text-gray-500 mb-4">
            Error ID: {error.digest}
          </p>
        )}

        <div className="bg-red-100 border border-red-300 rounded p-3 mb-6">
          <p className="text-sm text-red-800">
            💡 Kemungkinan masalah:
            <ul className="mt-2 list-disc list-inside space-y-1">

              <li>Environment variable DATABASE_URL tidak ter-set</li>
              <li>Migrations belum berjalan</li>
            </ul>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Coba Lagi
          </button>
          
          <a
            href="/"
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded text-center hover:bg-gray-400 transition"
          >
            Kembali
          </a>
        </div>
      </div>
    </div>
  )
}
