import { supabase } from '@/lib/supabase'
import { ArrowLeft, Download, TrendingUp, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { PlanSummary } from '@/components/PlanSummary'
import type { IpoWithAnalysis } from '@/lib/types'

async function getAllIpos() {
  const { data: ipos } = await supabase
    .from('ipo_basic')
    .select('*')
    .order('created_at', { ascending: false })

  if (!ipos) return []

  const iposWithAnalysis: IpoWithAnalysis[] = await Promise.all(
    ipos.map(async (ipo) => {
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
    })
  )

  return iposWithAnalysis
}

export default async function PlanPage() {
  const ipos = await getAllIpos()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回按钮 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-[28px] sm:text-4xl font-bold text-gray-900 mb-3">
            申购计划
          </h1>
          <p className="text-[15px] sm:text-lg text-gray-600">
            基于您的资金配置和风险偏好，为您生成智能申购计划
          </p>
        </div>

        {/* 提示信息 */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[14px] text-blue-900">
                请先在 <Link href="/capital" className="font-semibold underline">资金配置</Link> 页面设置您的投资资金和风险偏好，然后刷新此页面查看推荐。
              </p>
            </div>
          </div>
        </div>

        {/* 申购计划汇总 */}
        <PlanSummary ipos={ipos} />
      </div>
    </div>
  )
}

