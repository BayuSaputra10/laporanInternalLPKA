import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalCount: number
  pageSize: number
  basePath: string
  color?: 'green' | 'primary' | 'purple'
}

export default function Pagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  basePath,
  color = 'green'
}: PaginationProps) {
  const getColorClasses = () => {
    if (color === 'primary') {
      return {
        bg: 'bg-lpka-primary hover:bg-lpka-primary/90',
        text: 'text-lpka-primary',
        bgHover: 'hover:bg-lpka-primary/10',
        border: 'border-lpka-primary/20'
      }
    }
    if (color === 'purple') {
      return {
        bg: 'bg-purple-600 hover:bg-purple-500',
        text: 'text-purple-600',
        bgHover: 'hover:bg-purple-50',
        border: 'border-purple-200'
      }
    }
    return {
      bg: 'bg-lpka-green hover:bg-lpka-green/90',
      text: 'text-lpka-green',
      bgHover: 'hover:bg-lpka-green/10',
      border: 'border-lpka-green/20'
    }
  }

  const colors = getColorClasses()
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalCount)

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 px-4 sm:px-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
      <div className="text-sm text-gray-700 mb-4 sm:mb-0">
        Showing <span className="font-semibold text-gray-900">{startItem}</span> to{' '}
        <span className="font-semibold text-gray-900">{endItem}</span> of{' '}
        <span className="font-semibold text-gray-900">{totalCount}</span> results
      </div>

      <nav className="flex items-center justify-center sm:justify-end gap-2">
        <Link
          href={`${basePath}?page=${Math.max(1, currentPage - 1)}`}
          className={`group flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${colors.bgHover} ${colors.text} border ${colors.border} hover:shadow-md ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Previous
        </Link>

        {getPageNumbers().map((page) => (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={`px-3 py-2 rounded-lg font-semibold transition-all ${
              page === currentPage
                ? `${colors.bg} ${colors.text} shadow-md -translate-y-0.5`
                : `${colors.bgHover} ${colors.text} border ${colors.border} hover:shadow-md`
            }`}
          >
            {page}
          </Link>
        ))}

        {currentPage + 2 < totalPages && (
          <>
            <MoreHorizontal className={`w-5 h-5 ${colors.text}`} />
            <Link
              href={`${basePath}?page=${totalPages}`}
              className={`px-3 py-2 rounded-lg font-medium transition-all ${colors.bgHover} ${colors.text} border ${colors.border} hover:shadow-md`}
            >
              {totalPages}
            </Link>
          </>
        )}

        <Link
          href={`${basePath}?page=${Math.min(totalPages, currentPage + 1)}`}
          className={`group flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${colors.bgHover} ${colors.text} border ${colors.border} hover:shadow-md ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </nav>
    </div>
  )
}

