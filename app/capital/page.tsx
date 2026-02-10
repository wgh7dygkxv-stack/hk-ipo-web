import { CapitalConfigForm } from '@/components/CapitalConfigForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CapitalConfigPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回按钮 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-[28px] sm:text-4xl font-bold text-gray-900 mb-3">
            资金配置
          </h1>
          <p className="text-[15px] sm:text-lg text-gray-600">
            设置您的投资资金和风险偏好，获取个性化的申购推荐
          </p>
        </div>

        {/* 配置表单 */}
        <CapitalConfigForm />

        {/* 说明 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 温馨提示</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• 配置保存在浏览器本地，不会上传到服务器</li>
            <li>• 推荐结果仅供参考，投资需谨慎</li>
            <li>• 建议根据实际情况调整风险偏好</li>
            <li>• 可随时修改配置并重新生成推荐</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

