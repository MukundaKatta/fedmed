import { create } from 'zustand'
import type { Hospital, FederatedRun, SitePerformance, DataQualityMetric, ComplianceRecord } from './supabase'

type Tab = 'network' | 'training' | 'privacy' | 'performance' | 'quality' | 'compliance'

interface FedMedState {
  activeTab: Tab; setActiveTab: (t: Tab) => void
  hospitals: Hospital[]; setHospitals: (h: Hospital[]) => void
  runs: FederatedRun[]; setRuns: (r: FederatedRun[]) => void
  sitePerf: SitePerformance[]; setSitePerf: (s: SitePerformance[]) => void
  quality: DataQualityMetric[]; setQuality: (q: DataQualityMetric[]) => void
  compliance: ComplianceRecord[]; setCompliance: (c: ComplianceRecord[]) => void
}

export const useStore = create<FedMedState>((set) => ({
  activeTab: 'network', setActiveTab: (activeTab) => set({ activeTab }),
  hospitals: [], setHospitals: (hospitals) => set({ hospitals }),
  runs: [], setRuns: (runs) => set({ runs }),
  sitePerf: [], setSitePerf: (sitePerf) => set({ sitePerf }),
  quality: [], setQuality: (quality) => set({ quality }),
  compliance: [], setCompliance: (compliance) => set({ compliance }),
}))
