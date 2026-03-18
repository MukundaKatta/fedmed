'use client'
import { useStore } from '@/lib/store'
import { ClipboardCheck, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
const statusConfig: Record<string, { icon: any; color: string; bg: string }> = {
  compliant: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  pending_review: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  non_compliant: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20' },
}
export default function ComplianceDashboard() {
  const { compliance, hospitals } = useStore()
  const getHospName = (id: string) => hospitals.find(h => h.id === id)?.name || 'Unknown'
  const compliantCount = compliance.filter(c => c.status === 'compliant').length
  return (
    <div className="space-y-6 h-[calc(100vh-120px)] overflow-auto">
      <h2 className="text-lg font-bold">Compliance Dashboard</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="glass p-4"><p className="text-xs text-white/50">Total Audits</p><p className="text-3xl font-bold text-cyan-400">{compliance.length}</p></div>
        <div className="glass p-4"><p className="text-xs text-white/50">Compliant</p><p className="text-3xl font-bold text-emerald-400">{compliantCount}</p></div>
        <div className="glass p-4"><p className="text-xs text-white/50">Pending Review</p><p className="text-3xl font-bold text-amber-400">{compliance.filter(c => c.status === 'pending_review').length}</p></div>
        <div className="glass p-4"><p className="text-xs text-white/50">Non-Compliant</p><p className="text-3xl font-bold text-red-400">{compliance.filter(c => c.status === 'non_compliant').length}</p></div>
      </div>

      {/* Compliance Rate */}
      <div className="glass p-6">
        <h3 className="text-sm font-semibold text-white/70 mb-4">OVERALL COMPLIANCE RATE</h3>
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
              <circle cx="18" cy="18" r="16" fill="none" stroke="#06b6d4" strokeWidth="3" strokeDasharray={`${(compliantCount / compliance.length) * 100} ${100 - (compliantCount / compliance.length) * 100}`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-cyan-400">{((compliantCount / compliance.length) * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = compliance.filter(c => c.status === status).length
              const Icon = config.icon
              return (
                <div key={status} className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${config.color}`} />
                  <span className="text-sm text-white/60 capitalize w-32">{status.replace('_', ' ')}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${config.bg.replace('/20', '')}`} style={{ width: `${(count / compliance.length) * 100}%`, backgroundColor: config.color.replace('text-', '').includes('emerald') ? '#10b981' : config.color.includes('amber') ? '#f59e0b' : '#ef4444' }} />
                  </div>
                  <span className="text-xs text-white/40">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="glass p-4">
        <h3 className="text-sm font-semibold text-white/70 mb-4">COMPLIANCE RECORDS</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10">
            <th className="text-left py-2 px-3 text-white/50 text-xs">Hospital</th>
            <th className="text-left py-2 px-3 text-white/50 text-xs">Regulation</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Status</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Last Audit</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Next Audit</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Findings</th>
          </tr></thead>
          <tbody>
            {compliance.map(c => {
              const config = statusConfig[c.status]
              const Icon = config.icon
              return (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-2 px-3 font-medium">{getHospName(c.hospital_id)}</td>
                  <td className="py-2 px-3 text-xs">{c.regulation}</td>
                  <td className="py-2 px-3 text-center"><span className={`flex items-center gap-1 justify-center px-2 py-0.5 rounded-full text-[10px] ${config.bg} ${config.color}`}><Icon className="w-3 h-3" />{c.status.replace('_', ' ')}</span></td>
                  <td className="py-2 px-3 text-center text-xs text-white/50">{c.last_audit}</td>
                  <td className="py-2 px-3 text-center text-xs text-white/50">{c.next_audit}</td>
                  <td className="py-2 px-3 text-center"><span className={`${c.findings === 0 ? 'text-emerald-400' : c.findings <= 2 ? 'text-amber-400' : 'text-red-400'}`}>{c.findings}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
