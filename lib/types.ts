// 数据库类型定义
export interface Database {
  public: {
    Tables: {
      ipo_basic: {
        Row: IpoBasic
        Insert: Omit<IpoBasic, 'id' | 'created_at'>
        Update: Partial<Omit<IpoBasic, 'id' | 'created_at'>>
      }
      ipo_analysis: {
        Row: IpoAnalysis
        Insert: Omit<IpoAnalysis, 'id' | 'created_at'>
        Update: Partial<Omit<IpoAnalysis, 'id' | 'created_at'>>
      }
    }
  }
}

// IPO 基础信息
export interface IpoBasic {
  id: number
  stock_cd: string
  stock_nm: string
  price_min: number | null
  price_max: number | null
  price_range_raw: string | null
  underwriter: string | null
  ref_company: string | null
  issue_pe_low: number | null
  issue_pe_high: number | null
  issue_pe_range_raw: string | null
  apply_end_dt: string | null
  prospectus_url: string | null
  raw_payload: any
  created_at: string
}

// AI 分析结果
export interface IpoAnalysis {
  id: number
  stock_cd: string
  rating: number | null
  suggestion: string | null
  risk: string | null
  raw_ai_text: string
  model: string | null
  created_at: string
}

// 组合类型：IPO + AI 分析
export interface IpoWithAnalysis extends IpoBasic {
  analysis?: IpoAnalysis
}

