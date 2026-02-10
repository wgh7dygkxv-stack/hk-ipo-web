import Link from 'next/link'
import { ArrowRight, TrendingUp, Brain, Bell, Shield } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { StatCard } from '@/components/StatCard'
import { IpoCard } from '@/components/IpoCard'
import type { IpoWithAnalysis } from '@/lib/types'

async function getStats() {
  // 获取统计数据
  const { count: totalIpos } = await supabase
    .from('ipo_basic')
    .select('*', { count: 'exact', head: true })

  const { data: analyses } = await supabase
    .from('ipo_analysis')
    .select('rating')
    .not('rating', 'is', null)

  const avgRating = analyses && analyses.length > 0
    ? (analyses.reduce((sum, a) => sum + (a.rating || 0), 0) / analyses.length).toFixed(1)
    : '0.0'

  // 获取本周新增（简化版：最近7天）
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const { count: weeklyIpos } = await supabase
    .from('ipo_basic')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString())

  return {
    totalIpos: totalIpos || 0,
    avgRating,
    weeklyIpos: weeklyIpos || 0,
  }
}

async function getLatestIpos() {
  // 获取最新的 3 条 IPO 及其分析
  const { data: ipos } = await supabase
    .from('ipo_basic')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  if (!ipos) return []

  // 为每个 IPO 获取最新的分析
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

export default async function Home() {
  const stats = await getStats()
  const latestIpos = await getLatestIpos()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-[28px] leading-tight sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              AI 驱动的香港新股
              <br />
              <span className="text-yellow-300">智能分析平台</span>
            </h1>
            <p className="text-[15px] leading-relaxed sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 px-2">
              实时追踪香港 IPO，AI 智能评分，助您把握投资机会
            </p>
            <Link
              href="/ipos"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold text-[15px] sm:text-lg hover:bg-blue-50 transition-all active:scale-95 shadow-lg"
            >
              查看所有 IPO
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 -mt-8 sm:-mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <StatCard
            title="累计新股"
            value={stats.totalIpos}
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatCard
            title="平均 AI 评分"
            value={stats.avgRating}
            icon={<Brain className="w-6 h-6" />}
          />
          <StatCard
            title="本周新增"
            value={stats.weeklyIpos}
            icon={<Bell className="w-6 h-6" />}
            trend={{ value: '+12%', isPositive: true }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h2 className="text-[22px] sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
          为什么选择我们？
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center p-5 sm:p-6">
            <div className="inline-flex p-3 sm:p-4 bg-blue-100 rounded-full mb-3 sm:mb-4">
              <Brain className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h3 className="text-[17px] sm:text-xl font-semibold mb-2 text-gray-900">AI 智能分析</h3>
            <p className="text-[14px] leading-relaxed sm:text-base text-gray-600">
              基于 Google Gemini 的深度学习模型，综合分析招股书、市场数据，给出专业评分
            </p>
          </div>
          <div className="text-center p-5 sm:p-6">
            <div className="inline-flex p-3 sm:p-4 bg-purple-100 rounded-full mb-3 sm:mb-4">
              <Bell className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <h3 className="text-[17px] sm:text-xl font-semibold mb-2 text-gray-900">实时推送</h3>
            <p className="text-[14px] leading-relaxed sm:text-base text-gray-600">
              新股上市第一时间通知，不错过任何投资机会
            </p>
          </div>
          <div className="text-center p-5 sm:p-6">
            <div className="inline-flex p-3 sm:p-4 bg-green-100 rounded-full mb-3 sm:mb-4">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h3 className="text-[17px] sm:text-xl font-semibold mb-2 text-gray-900">风险提示</h3>
            <p className="text-[14px] leading-relaxed sm:text-base text-gray-600">
              详细的风险分析和投资建议，帮助您做出明智决策
            </p>
          </div>
        </div>
      </section>

      {/* Latest IPOs Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-[22px] sm:text-3xl font-bold text-gray-900">最新 IPO</h2>
            <Link
              href="/ipos"
              className="flex items-center gap-1.5 text-blue-600 active:text-blue-700 font-medium text-[14px] sm:text-base"
            >
              查看全部
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>

          {latestIpos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {latestIpos.map((ipo) => (
                <IpoCard key={ipo.id} ipo={ipo} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-[14px] sm:text-base">暂无 IPO 数据，请先运行数据抓取脚本</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
