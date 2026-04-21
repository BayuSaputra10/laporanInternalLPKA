import Link from "next/link"
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react"

interface SortableHeaderProps {
  label: string
  sortBy: string
  currentSortBy: string | null
  currentSortDir: 'asc' | 'desc' | null
  basePath: string
  otherParams?: string
  color?: 'green' | 'primary'
  className?: string
}

export default function SortableHeader({
  label,
  sortBy,
  currentSortBy,
  currentSortDir,
  basePath,
  otherParams = '',
  color = 'green',
  className = ''
}: SortableHeaderProps) {
  const getColorClasses = () => {
    if (color === 'primary') {
      return 'text-lpka-primary hover:text-lpka-primary/80'
    }
    return 'text-lpka-green hover:text-lpka-green/80'
  }

  const colors = getColorClasses()
  const isActive = currentSortBy === sortBy
  const nextDir = currentSortDir === 'desc' && isActive ? null : (isActive ? 'asc' : 'desc')

  let href = basePath
  if (nextDir) {
    href += `?sortBy=${sortBy}&sortDir=${nextDir}${otherParams ? `&${otherParams}` : ''}`
  } else {
    href += otherParams ? `?${otherParams}` : ''
  }

  const Icon = isActive 
    ? (currentSortDir === 'asc' ? ArrowUp : ArrowDown)
    : ArrowUpDown

  return (
    <th className={`px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider cursor-pointer group hover:bg-gray-50 transition-colors ${colors} ${className}`}>
      <Link href={href} className="flex items-center gap-1 group-hover:underline font-medium">
        {label}
        <Icon className={`w-4 h-4 opacity-70 group-hover:opacity-100 transition-all ${isActive ? 'opacity-100 scale-110' : ''}`} />
      </Link>
    </th>
  )
}

