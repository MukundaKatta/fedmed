import type { Hospital, FederatedRun, SitePerformance, DataQualityMetric, ComplianceRecord } from './supabase'

export const mockHospitals: Hospital[] = [
  { id: '1', name: 'Memorial General Hospital', location: 'New York, NY', patients: 45000, data_quality: 0.92, status: 'online', last_sync: '2026-03-17T08:30:00Z', contribution_score: 0.95, created_at: '2025-01-01T10:00:00Z' },
  { id: '2', name: 'Pacific Medical Center', location: 'San Francisco, CA', patients: 32000, data_quality: 0.88, status: 'online', last_sync: '2026-03-17T08:15:00Z', contribution_score: 0.88, created_at: '2025-01-15T10:00:00Z' },
  { id: '3', name: 'Midwest Regional Health', location: 'Chicago, IL', patients: 28000, data_quality: 0.85, status: 'syncing', last_sync: '2026-03-17T07:45:00Z', contribution_score: 0.82, created_at: '2025-02-01T10:00:00Z' },
  { id: '4', name: 'Southern University Hospital', location: 'Houston, TX', patients: 38000, data_quality: 0.90, status: 'online', last_sync: '2026-03-17T08:00:00Z', contribution_score: 0.91, created_at: '2025-02-15T10:00:00Z' },
  { id: '5', name: 'Northeast Health System', location: 'Boston, MA', patients: 25000, data_quality: 0.94, status: 'online', last_sync: '2026-03-17T08:20:00Z', contribution_score: 0.93, created_at: '2025-03-01T10:00:00Z' },
  { id: '6', name: 'Mountain View Clinic', location: 'Denver, CO', patients: 15000, data_quality: 0.78, status: 'offline', last_sync: '2026-03-16T18:00:00Z', contribution_score: 0.72, created_at: '2025-03-15T10:00:00Z' },
]

export const mockRuns: FederatedRun[] = [
  { id: '1', model_name: 'CardioRisk-FL', task: 'Cardiovascular Risk Prediction', status: 'running', rounds_completed: 45, total_rounds: 100, global_accuracy: 0.892, participating_sites: 5, privacy_budget_used: 0.35, start_time: '2026-03-15T10:00:00Z', created_at: '2026-03-15T10:00:00Z' },
  { id: '2', model_name: 'DiabetesType-FL', task: 'Diabetes Classification', status: 'completed', rounds_completed: 100, total_rounds: 100, global_accuracy: 0.934, participating_sites: 6, privacy_budget_used: 0.68, start_time: '2026-03-01T10:00:00Z', created_at: '2026-03-01T10:00:00Z' },
  { id: '3', model_name: 'SepsisPredict-FL', task: 'Sepsis Early Detection', status: 'completed', rounds_completed: 80, total_rounds: 80, global_accuracy: 0.856, participating_sites: 4, privacy_budget_used: 0.52, start_time: '2026-02-15T10:00:00Z', created_at: '2026-02-15T10:00:00Z' },
  { id: '4', model_name: 'RadiologyAI-FL', task: 'Chest X-Ray Classification', status: 'queued', rounds_completed: 0, total_rounds: 120, global_accuracy: 0, participating_sites: 6, privacy_budget_used: 0, start_time: '2026-03-18T10:00:00Z', created_at: '2026-03-17T10:00:00Z' },
]

export const mockSitePerf: SitePerformance[] = [
  { id: '1', run_id: '1', hospital_id: '1', local_accuracy: 0.905, local_loss: 0.215, samples_used: 12000, contribution_weight: 0.28, created_at: '2026-03-17T10:00:00Z' },
  { id: '2', run_id: '1', hospital_id: '2', local_accuracy: 0.882, local_loss: 0.248, samples_used: 8500, contribution_weight: 0.20, created_at: '2026-03-17T10:00:00Z' },
  { id: '3', run_id: '1', hospital_id: '3', local_accuracy: 0.871, local_loss: 0.268, samples_used: 7200, contribution_weight: 0.17, created_at: '2026-03-17T10:00:00Z' },
  { id: '4', run_id: '1', hospital_id: '4', local_accuracy: 0.898, local_loss: 0.225, samples_used: 10000, contribution_weight: 0.23, created_at: '2026-03-17T10:00:00Z' },
  { id: '5', run_id: '1', hospital_id: '5', local_accuracy: 0.912, local_loss: 0.198, samples_used: 6800, contribution_weight: 0.12, created_at: '2026-03-17T10:00:00Z' },
]

export const mockQuality: DataQualityMetric[] = [
  { id: '1', hospital_id: '1', completeness: 0.95, consistency: 0.92, timeliness: 0.88, accuracy: 0.93, overall_score: 0.92, last_assessed: '2026-03-15', created_at: '2026-03-15T10:00:00Z' },
  { id: '2', hospital_id: '2', completeness: 0.90, consistency: 0.88, timeliness: 0.85, accuracy: 0.89, overall_score: 0.88, last_assessed: '2026-03-15', created_at: '2026-03-15T10:00:00Z' },
  { id: '3', hospital_id: '3', completeness: 0.85, consistency: 0.82, timeliness: 0.90, accuracy: 0.84, overall_score: 0.85, last_assessed: '2026-03-14', created_at: '2026-03-14T10:00:00Z' },
  { id: '4', hospital_id: '4', completeness: 0.92, consistency: 0.90, timeliness: 0.87, accuracy: 0.91, overall_score: 0.90, last_assessed: '2026-03-15', created_at: '2026-03-15T10:00:00Z' },
  { id: '5', hospital_id: '5', completeness: 0.96, consistency: 0.94, timeliness: 0.92, accuracy: 0.95, overall_score: 0.94, last_assessed: '2026-03-15', created_at: '2026-03-15T10:00:00Z' },
  { id: '6', hospital_id: '6', completeness: 0.78, consistency: 0.75, timeliness: 0.80, accuracy: 0.79, overall_score: 0.78, last_assessed: '2026-03-12', created_at: '2026-03-12T10:00:00Z' },
]

export const mockCompliance: ComplianceRecord[] = [
  { id: '1', hospital_id: '1', regulation: 'HIPAA', status: 'compliant', last_audit: '2026-01-15', next_audit: '2026-07-15', findings: 0, created_at: '2026-01-15T10:00:00Z' },
  { id: '2', hospital_id: '1', regulation: 'GDPR', status: 'compliant', last_audit: '2026-02-01', next_audit: '2026-08-01', findings: 1, created_at: '2026-02-01T10:00:00Z' },
  { id: '3', hospital_id: '2', regulation: 'HIPAA', status: 'compliant', last_audit: '2026-01-20', next_audit: '2026-07-20', findings: 0, created_at: '2026-01-20T10:00:00Z' },
  { id: '4', hospital_id: '3', regulation: 'HIPAA', status: 'pending_review', last_audit: '2025-12-01', next_audit: '2026-06-01', findings: 2, created_at: '2025-12-01T10:00:00Z' },
  { id: '5', hospital_id: '6', regulation: 'HIPAA', status: 'non_compliant', last_audit: '2025-11-15', next_audit: '2026-05-15', findings: 5, created_at: '2025-11-15T10:00:00Z' },
]
