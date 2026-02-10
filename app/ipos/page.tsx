import { supabase } from '@/lib/supabase'
import { IpoCard } from '@/components/IpoCard'
import { EmptyState } from '@/components/LoadingStates'
import type { IpoWithAnalysis } from '@/lib/types'

async function getAllIpos() {
  // 获取所有 IPO
  const { data: ipos } = await supabase
    .from('ipo_basic')
    .select('*')
    .order('created_at', { ascending: false })

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

export default async function IposPage() {
  const ipos = await getAllIpos()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">所有 IPO</h1>
        <p className="text-gray-600">
          共 {ipos.length} 只新股，按发布时间倒序排列
        </p>
      </div>

      {/* IPO 列表 */}
      {ipos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ipos.map((ipo) => (
            <IpoCard key={ipo.id} ipo={ipo} />
          ))}
        </div>
      ) : (
        <EmptyState message="暂无 IPO 数据，请先运行数据抓取脚本" />
      )}
    </div>
  )
}

