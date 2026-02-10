'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

interface RecommendationBadgeProps {
  stockCd: string
  priceMin: number | null
  priceMax: number | null
  aiRating: number | null
}

export function RecommendationBadge({ stockCd, priceMin, priceMax, aiRating }: RecommendationBadgeProps) {
  const [recommendation, setRecommendation] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 从 localStorage 获取用户配置
    const configStr = localStorage.getItem('user_capital_config')
    if (!configStr || !priceMin || !priceMax) {
      setLoading(false)
      return
    }

    const config = JSON.parse(configStr)
    
    // 计算推荐
    const result = calculateRecommendation(config, { priceMin, priceMax, aiRating })
    setRecommendation(result)
    setLoading(false)
  }, [stockCd, priceMin, priceMax, aiRating])

  if (loading || !recommendation) {
    return null
  }

  if (!recommendation.should_apply) {
    return (
      <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              {recommendation.reason}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'from-green-500 to-emerald-600'
      case 'medium': return 'from-blue-500 to-cyan-600'
      case 'high': return 'from-orange-500 to-red-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="mt-3 p-4 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${getRiskColor(recommendation.risk_level)} text-white flex-shrink-0`}>
          <TrendingUp className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-[14px] font-semibold text-gray-900">💰 智能推荐</h4>
            <span className="text-[11px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
              {recommendation.confidence}% 置信度
            </span>
          </div>
          
          <div className="space-y-1.5 mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[13px] text-gray-600">推荐申购：</span>
              <span className="text-[16px] font-bold text-blue-600">
                {recommendation.recommended_lots} 手
              </span>
              <span className="text-[12px] text-gray-500">
                (≈ HK$ {recommendation.recommended_amount.toLocaleString()})
              </span>
            </div>
          </div>
          
          <p className="text-[12px] text-gray-600 leading-relaxed">
            {recommendation.reason}
          </p>
        </div>
      </div>
    </div>
  )
}

// 简化的推荐计算逻辑（客户端版本）
function calculateRecommendation(config: any, ipo: any) {
  const { total_capital, available_capital, risk_preference, max_single_ipo_ratio, min_ai_rating } = config
  const { priceMin, priceMax, aiRating } = ipo

  // 风险配置
  const riskProfiles: any = {
    conservative: { min_rating: 7, max_ratio: 15, multiplier: 0.8 },
    moderate: { min_rating: 5, max_ratio: 20, multiplier: 1.0 },
    aggressive: { min_rating: 4, max_ratio: 30, multiplier: 1.2 },
  }

  const profile = riskProfiles[risk_preference] || riskProfiles.moderate

  // 检查评分
  if (!aiRating || aiRating < profile.min_rating) {
    return {
      should_apply: false,
      reason: `AI 评分 ${aiRating || '未知'} 低于您的风险偏好要求`,
    }
  }

  // 计算推荐
  const avgPrice = (priceMin + priceMax) / 2
  const lotSize = 500
  const pricePerLot = avgPrice * lotSize

  const maxRatio = Math.min(max_single_ipo_ratio, profile.max_ratio)
  const maxInvestment = Math.min(
    total_capital * (maxRatio / 100),
    available_capital
  )

  let baseLots = Math.floor(maxInvestment / pricePerLot)
  
  // 根据评分调整
  const ratingMultiplier = aiRating >= 8 ? 1.0 : aiRating >= 6 ? 0.8 : 0.6
  const recommendedLots = Math.max(1, Math.floor(baseLots * ratingMultiplier * profile.multiplier))
  
  const recommendedAmount = recommendedLots * pricePerLot

  // 计算置信度
  const ratingConfidence = (aiRating / 10) * 60
  const priceRangeRatio = (priceMax - priceMin) / priceMax
  const priceConfidence = (1 - priceRangeRatio) * 40
  const confidence = Math.min(95, Math.round(ratingConfidence + priceConfidence))

  // 风险等级
  const capitalRatio = (recommendedAmount / total_capital) * 100
  let riskLevel = 'medium'
  if (aiRating >= 8 && capitalRatio <= 15) riskLevel = 'low'
  else if (capitalRatio > 25 || aiRating < 6) riskLevel = 'high'

  // 生成理由
  const riskNames: any = { conservative: '保守', moderate: '稳健', aggressive: '激进' }
  const reason = `AI 评分 ${aiRating}/10；占用总资金 ${capitalRatio.toFixed(1)}%；符合${riskNames[risk_preference]}型策略`

  return {
    should_apply: true,
    recommended_lots: recommendedLots,
    recommended_amount: Math.round(recommendedAmount),
    confidence,
    reason,
    risk_level: riskLevel,
  }
}

