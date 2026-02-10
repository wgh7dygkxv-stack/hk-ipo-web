import { Star } from 'lucide-react'
import { getRatingColor, getRatingBgColor } from '@/lib/utils'

interface RatingBadgeProps {
  rating: number | null
  size?: 'sm' | 'md' | 'lg'
}

export function RatingBadge({ rating, size = 'md' }: RatingBadgeProps) {
  if (!rating) {
    return (
      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-400 text-sm">
        <Star className="w-4 h-4" />
        <span>未评分</span>
      </div>
    )
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  }

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${getRatingBgColor(
        rating
      )} ${getRatingColor(rating)} ${sizeClasses[size]}`}
    >
      <Star className="w-4 h-4 fill-current" />
      <span>{rating}/10</span>
    </div>
  )
}

