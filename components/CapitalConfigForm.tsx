'use client'

import { useState } from 'react'
import { Save, TrendingUp, Shield, Target } from 'lucide-react'

interface CapitalConfigFormProps {
  onSave?: (config: any) => void
}

export function CapitalConfigForm({ onSave }: CapitalConfigFormProps) {
  const [config, setConfig] = useState({
    total_capital: 100000,
    available_capital: 80000,
    risk_preference: 'moderate' as 'conservative' | 'moderate' | 'aggressive',
    max_single_ipo_ratio: 20,
    min_ai_rating: 5,
  })

  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 保存到 localStorage
    localStorage.setItem('user_capital_config', JSON.stringify(config))
    
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    
    if (onSave) {
      onSave(config)
    }
  }

  const riskProfiles = [
    {
      value: 'conservative',
      label: '保守型',
      icon: <Shield className="w-5 h-5" />,
      description: '只推荐高评分新股，单只最多占用15%资金',
      color: 'from-green-500 to-emerald-600',
    },
    {
      value: 'moderate',
      label: '稳健型',
      icon: <Target className="w-5 h-5" />,
      description: '平衡风险与收益，单只最多占用20%资金',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      value: 'aggressive',
      label: '激进型',
      icon: <TrendingUp className="w-5 h-5" />,
      description: '追求高收益，单只最多占用30%资金',
      color: 'from-orange-500 to-red-600',
    },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 资金设置 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">资金设置</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              总资金（港币）
            </label>
            <input
              type="number"
              value={config.total_capital}
              onChange={(e) => setConfig({ ...config, total_capital: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px]"
              min="1000"
              step="1000"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              您的总投资资金
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              可用资金（港币）
            </label>
            <input
              type="number"
              value={config.available_capital}
              onChange={(e) => setConfig({ ...config, available_capital: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px]"
              min="0"
              max={config.total_capital}
              step="1000"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              当前可用于申购的资金
            </p>
          </div>
        </div>
      </div>

      {/* 风险偏好 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">风险偏好</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {riskProfiles.map((profile) => (
            <button
              key={profile.value}
              type="button"
              onClick={() => setConfig({ ...config, risk_preference: profile.value as any })}
              className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                config.risk_preference === profile.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${profile.color} text-white mb-3`}>
                {profile.icon}
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{profile.label}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{profile.description}</p>
              
              {config.risk_preference === profile.value && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 高级设置 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">高级设置</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              单只新股最大占比（%）
            </label>
            <input
              type="number"
              value={config.max_single_ipo_ratio}
              onChange={(e) => setConfig({ ...config, max_single_ipo_ratio: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px]"
              min="5"
              max="50"
              step="5"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              单只新股最多占用总资金的百分比
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              最低 AI 评分要求
            </label>
            <input
              type="number"
              value={config.min_ai_rating}
              onChange={(e) => setConfig({ ...config, min_ai_rating: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px]"
              min="1"
              max="10"
              step="1"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              只推荐评分达到此标准的新股
            </p>
          </div>
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="flex items-center justify-end gap-4">
        {saved && (
          <span className="text-green-600 text-sm font-medium">
            ✓ 配置已保存
          </span>
        )}
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
        >
          <Save className="w-5 h-5" />
          保存配置
        </button>
      </div>
    </form>
  )
}

