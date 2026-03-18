'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { mockHospitals, mockRuns, mockSitePerf, mockQuality, mockCompliance } from '@/lib/mock-data'
import HospitalNetwork from '@/components/HospitalNetwork'
import TrainingOrchestrator from '@/components/TrainingOrchestrator'
import PrivacyAnalytics from '@/components/PrivacyAnalytics'
import SitePerformanceView from '@/components/SitePerformanceView'
import DataQualityMonitor from '@/components/DataQualityMonitor'
import ComplianceDashboard from '@/components/ComplianceDashboard'
import { Shield, Building2, Cpu, Lock, BarChart3, Database, ClipboardCheck } from 'lucide-react'

const tabs = [
  { id: 'network' as const, label: 'Network', icon: Building2 },
  { id: 'training' as const, label: 'Training', icon: Cpu },
  { id: 'privacy' as const, label: 'Privacy', icon: Lock },
  { id: 'performance' as const, label: 'Performance', icon: BarChart3 },
  { id: 'quality' as const, label: 'Data Quality', icon: Database },
  { id: 'compliance' as const, label: 'Compliance', icon: ClipboardCheck },
]

export default function Home() {
  const { activeTab, setActiveTab, setHospitals, setRuns, setSitePerf, setQuality, setCompliance } = useStore()

  useEffect(() => {
    setHospitals(mockHospitals); setRuns(mockRuns); setSitePerf(mockSitePerf); setQuality(mockQuality); setCompliance(mockCompliance)
  }, [setHospitals, setRuns, setSitePerf, setQuality, setCompliance])

  const renderTab = () => {
    switch (activeTab) {
      case 'network': return <HospitalNetwork />
      case 'training': return <TrainingOrchestrator />
      case 'privacy': return <PrivacyAnalytics />
      case 'performance': return <SitePerformanceView />
      case 'quality': return <DataQualityMonitor />
      case 'compliance': return <ComplianceDashboard />
    }
  }

  return (
    <div className="min-h-screen">
      <header className="glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">FedMed</h1>
            <p className="text-[10px] text-white/40">Federated Learning for Healthcare</p>
          </div>
        </div>
        <nav className="flex gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-white/50 hover:bg-white/5'
              }`}>
              <Icon className="w-4 h-4" /><span className="hidden xl:inline">{label}</span>
            </button>
          ))}
        </nav>
      </header>
      <main className="p-6">{renderTab()}</main>
    </div>
  )
}
