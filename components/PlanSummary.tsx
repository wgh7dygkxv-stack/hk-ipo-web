'use client'

import { useEffect, useState } from 'react'
import { Download, TrendingUp, AlertCircle, CheckCircle, DollarSign } from 'lucide-react'
import type { IpoWithAnalysis } from '@/lib/types'

interface PlanSummaryProps {
  ipos: IpoWithAnalysis[]
}

interface PlanItem {
  ipo: IpoWithAnalysis
  recommendation: any
}

export function PlanSummary({ ipos }: PlanSummaryProps) {
  const [planItems, setPlanItems] = useState<PlanItem[]>([])
  const [config, setConfig] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 从 localStorage 获取配置
    const configStr = localStorage.getItem('user_capital_config')
    if (!configStr) {
      setLoading(false)
      return
    }

    const userConfig = JSON.parse(configStr)
    setConfig(userConfig)

    // 为每个 IPO 计算推荐
    const items: PlanItem[] = []
    for (const ipo of ipos) {
      if (!ipo.price_min || !ipo.price_max) continue
      
      const recommendation = calculateRecommendation(userConfig, {
        priceMin: ipo.price_min,
        priceMax: ipo.price_max,
        aiRating: ipo.analysis?.rating || null,
      })

      if (recommendation.should_apply) {
        items.push({ ipo, recommendation })
      }
    }

    setPlanItems(items)
    setLoading(false)
  }, [ipos])

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">正在生成申购计划...</p>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">未配置资金信息</h3>
        <p className="text-gray-600 mb-6">
          请先设置您的投资资金和风险偏好
        </p>
        <a
          href="/capital"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          前往配置
        </a>
      </div>
    )
  }

  const totalAmount = planItems.reduce((sum, item) => sum + item.recommendation.recommended_amount, 0)
  const capitalUsageRatio = (totalAmount / config.total_capital) * 100

  const handleExport = () => {
    const csv = [
      ['股票代码', '股票名称', 'AI评分', '推荐手数', '推荐金额(HKD)', '置信度', '风险等级', '推荐理由'],
      ...planItems.map(item => [
        item.ipo.stock_cd,
        item.ipo.stock_nm,
        item.ipo.analysis?.rating || '-',
        item.recommendation.recommended_lots,
        item.recommendation.recommended_amount,
        `${item.recommendation.confidence}%`,
        item.recommendation.risk_level,
        item.recommendation.reason,
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `IPO申购计划_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* 汇总信息 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-sm text-gray-600">推荐申购</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{planItems.length} 只</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-sm text-gray-600">预计投入</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            HK$ {totalAmount.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-sm text-gray-600">资金使用率</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {capitalUsageRatio.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* 导出按钮 */}
      {planItems.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            导出为 CSV
          </button>
        </div>
      )}

      {/* 申购列表 */}
      {planItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无推荐</h3>
          <p className="text-gray-600">
            当前没有符合您风险偏好的新股，请调整配置或等待新股上市
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">股票信息</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">AI评分</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">推荐手数</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">推荐金额</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">置信度</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">风险</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {planItems.map((item) => (
                  <tr key={item.ipo.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{item.ipo.stock_nm}</p>
                        <p className="text-sm text-gray-500 font-mono">{item.ipo.stock_cd}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                        {item.ipo.analysis?.rating || '-'}/10
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-gray-900">
                        {item.recommendation.recommended_lots} 手
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-gray-900">
                        HK$ {item.recommendation.recommended_amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-600">
                        {item.recommendation.confidence}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.recommendation.risk_level === 'low' ? 'bg-green-100 text-green-700' :
                        item.recommendation.risk_level === 'medium' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.recommendation.risk_level === 'low' ? '低' :
                         item.recommendation.risk_level === 'medium' ? '中' : '高'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// 推荐计算逻辑（与 RecommendationBadge 相同）
function calculateRecommendation(config: any, ipo: any) {
  const { total_capital, available_capital, risk_preference, max_single_ipo_ratio, min_ai_rating } = config
  const { priceMin, priceMax, aiRating } = ipo

  const riskProfiles: any = {
    conservative: { min_rating: 7, max_ratio: 15, multiplier: 0.8 },
    moderate: { min_rating: 5, max_ratio: 20, multiplier: 1.0 },
    aggressive: { min_rating: 4, max_ratio: 30, multiplier: 1.2 },
  }

  const profile = riskProfiles[risk_preference] || riskProfiles.moderate

  if (!aiRating || aiRating < profile.min_rating) {
    return {
      should_apply: false,
      reason: `AI 评分 ${aiRating || '未知'} 低于您的风险偏好要求`,
    }
  }

  const avgPrice = (priceMin + priceMax) / 2
  const lotSize = 500
  const pricePerLot = avgPrice * lotSize

  const maxRatio = Math.min(max_single_ipo_ratio, profile.max_ratio)
  const maxInvestment = Math.min(
    total_capital * (maxRatio / 100),
    available_capital
  )

  let baseLots = Math.floor(maxInvestment / pricePerLot)
  
  const ratingMultiplier = aiRating >= 8 ? 1.0 : aiRating >= 6 ? 0.8 : 0.6
  const recommendedLots = Math.max(1, Math.floor(baseLots * ratingMultiplier * profile.multiplier))
  
  const recommendedAmount = recommendedLots * pricePerLot

  const ratingConfidence = (aiRating / 10) * 60
  const priceRangeRatio = (priceMax - priceMin) / priceMax
  const priceConfidence = (1 - priceRangeRatio) * 40
  const confidence = Math.min(95, Math.round(ratingConfidence + priceConfidence))

  const capitalRatio = (recommendedAmount / total_capital) * 100
  let riskLevel = 'medium'
  if (aiRating >= 8 && capitalRatio <= 15) riskLevel = 'low'
  else if (capitalRatio > 25 || aiRating < 6) riskLevel = 'high'

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

