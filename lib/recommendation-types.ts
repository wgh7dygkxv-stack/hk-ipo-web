// 推荐相关类型定义
export interface UserCapitalConfig {
  id?: number
  user_id: string
  total_capital: number
  available_capital: number
  risk_preference: 'conservative' | 'moderate' | 'aggressive'
  max_single_ipo_ratio: number
  min_ai_rating: number
  created_at?: string
  updated_at?: string
}

export interface IpoRecommendation {
  id?: number
  user_id: string
  stock_cd: string
  recommended_lots: number
  recommended_amount: number
  confidence_score: number
  reason: string
  risk_level: 'low' | 'medium' | 'high'
  created_at?: string
}

export interface RecommendationResult {
  stock_cd: string
  recommended_lots: number
  recommended_amount: number
  confidence: number
  reason: string
  risk_level: 'low' | 'medium' | 'high'
  should_apply: boolean
  price_per_lot?: number
  max_investment?: number
}

