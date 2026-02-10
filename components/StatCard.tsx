interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
}

export function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm active:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white">
          {icon}
        </div>
        {trend && (
          <div
            className={`text-[13px] sm:text-sm font-medium ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </div>
        )}
      </div>
      <h3 className="text-[13px] sm:text-sm text-gray-600 mb-1.5">{title}</h3>
      <p className="text-[26px] sm:text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

