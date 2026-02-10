import Link from 'next/link'
import { Calendar, TrendingUp, Building2, ExternalLink } from 'lucide-react'
import { RatingBadge } from './RatingBadge'
import { RecommendationBadge } from './RecommendationBadge'
import { formatDate, formatPriceRange } from '@/lib/utils'
import type { IpoWithAnalysis } from '@/lib/types'

interface IpoCardProps {
  ipo: IpoWithAnalysis
}

export function IpoCard({ ipo }: IpoCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm transition-all hover:shadow-xl hover:border-blue-300">
      <Link href={`/ipos/${ipo.id}`} className="block">
        {/* 评分徽章 */}
        <div className="absolute top-4 right-4">
          <RatingBadge rating={ipo.analysis?.rating || null} size="sm" />
        </div>

        {/* 股票信息 */}
        <div className="mb-4 pr-20">
          <h3 className="text-[17px] leading-snug sm:text-xl font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2">
            {ipo.stock_nm}
          </h3>
          <p className="text-[13px] sm:text-sm text-gray-500 font-mono">{ipo.stock_cd}</p>
        </div>

        {/* 价格区间 */}
        <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center gap-2 text-[13px] sm:text-sm text-gray-600 mb-1">
            <TrendingUp className="w-4 h-4 flex-shrink-0" />
            <span>发行价区间</span>
          </div>
          <p className="text-[16px] sm:text-lg font-bold text-gray-900">
            {formatPriceRange(ipo.price_min, ipo.price_max)}
          </p>
        </div>

        {/* 详细信息 */}
        <div className="space-y-2 text-[13px] sm:text-sm">
          {ipo.apply_end_dt && (
            <div className="flex items-start gap-2 text-gray-600">
              <Calendar className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-1">申购截止：{formatDate(ipo.apply_end_dt)}</span>
            </div>
          )}

          {ipo.underwriter && (
            <div className="flex items-start gap-2 text-gray-600">
              <Building2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">保荐人：{ipo.underwriter}</span>
            </div>
          )}
        </div>

        {/* AI 建议预览 */}
        {ipo.analysis?.suggestion && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-[13px] leading-relaxed sm:text-sm text-gray-600 line-clamp-2">
              💡 {ipo.analysis.suggestion}
            </p>
          </div>
        )}

        {/* 查看详情提示 */}
        <div className="mt-4 flex items-center gap-1 text-blue-600 text-[13px] sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          <span>查看详情</span>
          <ExternalLink className="w-4 h-4" />
        </div>
      </Link>

      {/* 推荐徽章 */}
      <RecommendationBadge
        stockCd={ipo.stock_cd}
        priceMin={ipo.price_min}
        priceMax={ipo.price_max}
        aiRating={ipo.analysis?.rating || null}
      />
    </div>
  )
}

