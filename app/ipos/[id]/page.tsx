import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  Building2,
  FileText,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  BarChart3,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { RatingBadge } from '@/components/RatingBadge'
import { formatDate, formatPriceRange } from '@/lib/utils'

async function getIpoDetail(id: string) {
  // 获取 IPO 基础信息
  const { data: ipo } = await supabase
    .from('ipo_basic')
    .select('*')
    .eq('id', id)
    .single()

  if (!ipo) return null

  // 获取 AI 分析
  const { data: analysis } = await supabase
    .from('ipo_analysis')
    .select('*')
    .eq('stock_cd', ipo.stock_cd)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  return {
    ...ipo,
    analysis: analysis || undefined,
  }
}

export default async function IpoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const ipo = await getIpoDetail(id)

  if (!ipo) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回按钮 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/ipos"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回列表</span>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 标题区域 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {ipo.stock_nm}
              </h1>
              <p className="text-lg text-gray-500 font-mono">{ipo.stock_cd}</p>
            </div>
            <RatingBadge rating={ipo.analysis?.rating || null} size="lg" />
          </div>

          {/* 关键信息卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>发行价区间</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatPriceRange(ipo.price_min, ipo.price_max)}
              </p>
            </div>

            {ipo.issue_pe_low !== null && ipo.issue_pe_high !== null && (
              <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>发行市盈率</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {ipo.issue_pe_low} - {ipo.issue_pe_high}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 详细信息 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：基本信息 */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI 分析 */}
            {ipo.analysis && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  AI 智能分析
                </h2>

                {/* 投资建议 */}
                {ipo.analysis.suggestion && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      💡 投资建议
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {ipo.analysis.suggestion}
                    </p>
                  </div>
                )}

                {/* 风险提示 */}
                {ipo.analysis.risk && (
                  <div className="mb-6 p-4 bg-red-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      风险提示
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {ipo.analysis.risk}
                    </p>
                  </div>
                )}

                {/* 完整分析 */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    完整分析报告
                  </h3>
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {ipo.analysis.raw_ai_text}
                  </pre>
                  {ipo.analysis.model && (
                    <p className="text-xs text-gray-500 mt-4">
                      分析模型：{ipo.analysis.model}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 右侧：其他信息 */}
          <div className="space-y-6">
            {/* 申购信息 */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">申购信息</h3>
              <div className="space-y-4">
                {ipo.apply_end_dt && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">申购截止日期</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(ipo.apply_end_dt)}
                      </p>
                    </div>
                  </div>
                )}

                {ipo.underwriter && (
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">保荐人</p>
                      <p className="font-semibold text-gray-900">
                        {ipo.underwriter}
                      </p>
                    </div>
                  </div>
                )}

                {ipo.ref_company && (
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">对标公司</p>
                      <p className="font-semibold text-gray-900">
                        {ipo.ref_company}
                      </p>
                    </div>
                  </div>
                )}

                {ipo.prospectus_url && (
                  <a
                    href={ipo.prospectus_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <FileText className="w-5 h-5" />
                    <span>查看招股书</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* 数据来源 */}
            <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-600">
              <p className="mb-2">
                <strong>数据更新时间：</strong>
                <br />
                {formatDate(ipo.created_at)}
              </p>
              <p className="text-xs text-gray-500">
                数据来源：集思录 · AI 分析：Google Gemini
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

