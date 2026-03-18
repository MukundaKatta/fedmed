import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export type Hospital = { id: string; name: string; location: string; patients: number; data_quality: number; status: 'online' | 'offline' | 'syncing'; last_sync: string; contribution_score: number; created_at: string }
export type FederatedRun = { id: string; model_name: string; task: string; status: 'running' | 'completed' | 'failed' | 'queued'; rounds_completed: number; total_rounds: number; global_accuracy: number; participating_sites: number; privacy_budget_used: number; start_time: string; created_at: string }
export type SitePerformance = { id: string; run_id: string; hospital_id: string; local_accuracy: number; local_loss: number; samples_used: number; contribution_weight: number; created_at: string }
export type DataQualityMetric = { id: string; hospital_id: string; completeness: number; consistency: number; timeliness: number; accuracy: number; overall_score: number; last_assessed: string; created_at: string }
export type ComplianceRecord = { id: string; hospital_id: string; regulation: string; status: 'compliant' | 'non_compliant' | 'pending_review'; last_audit: string; next_audit: string; findings: number; created_at: string }
