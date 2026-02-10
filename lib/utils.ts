import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 格式化日期
export function formatDate(dateString: string | null): string {
  if (!dateString) return '未知'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  } catch {
    return dateString
  }
}

// 格式化价格区间
export function formatPriceRange(min: number | null, max: number | null): string {
  if (min === null && max === null) return '未公布'
  if (min === max) return `HK$ ${min?.toFixed(2)}`
  return `HK$ ${min?.toFixed(2)} - ${max?.toFixed(2)}`
}

// 获取评分颜色
export function getRatingColor(rating: number | null): string {
  if (!rating) return 'text-gray-400'
  if (rating >= 8) return 'text-green-600'
  if (rating >= 6) return 'text-blue-600'
  if (rating >= 4) return 'text-yellow-600'
  return 'text-red-600'
}

// 获取评分背景色
export function getRatingBgColor(rating: number | null): string {
  if (!rating) return 'bg-gray-100'
  if (rating >= 8) return 'bg-green-100'
  if (rating >= 6) return 'bg-blue-100'
  if (rating >= 4) return 'bg-yellow-100'
  return 'bg-red-100'
}

