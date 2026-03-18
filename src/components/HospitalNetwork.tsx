'use client'
import { useStore } from '@/lib/store'
import { Building2, Wifi, WifiOff, RefreshCw } from 'lucide-react'
const statusConfig: Record<string, { icon: any; color: string; bg: string }> = {
  online: { icon: Wifi, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  offline: { icon: WifiOff, color: 'text-red-400', bg: 'bg-red-500/20' },
  syncing: { icon: RefreshCw, color: 'text-amber-400', bg: 'bg-amber-500/20' },
}
export default function HospitalNetwork() {
  const { hospitals } = useStore()
  const onlineCount = hospitals.filter(h => h.status === 'online').length
  const totalPatients = hospitals.reduce((s, h) => s + h.patients, 0)
  return (
    <div className="space-y-6 h-[calc(100vh-120px)] overflow-auto">
      <div className="grid grid-cols-4 gap-4">
        <div className="glass p-4"><p className="text-xs text-white/50">Hospital Sites</p><p className="text-3xl font-bold text-cyan-400">{hospitals.length}</p></div>
        <div className="glass p-4"><p className="text-xs text-white/50">Online</p><p className="text-3xl font-bold text-emerald-400">{onlineCount}</p></div>
        <div className="glass p-4"><p className="text-xs text-white/50">Total Patients</p><p className="text-3xl font-bold text-blue-400">{(totalPatients / 1000).toFixed(0)}K</p></div>
        <div className="glass p-4"><p className="text-xs text-white/50">Avg Data Quality</p><p className="text-3xl font-bold text-amber-400">{((hospitals.reduce((s, h) => s + h.data_quality, 0) / hospitals.length) * 100).toFixed(0)}%</p></div>
      </div>

      {/* Network Map Visualization */}
      <div className="glass p-6">
        <h3 className="text-sm font-semibold text-white/70 mb-4">HOSPITAL NETWORK MAP</h3>
        <div className="relative h-64">
          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center z-10">
            <span className="text-xs font-bold text-cyan-300">FedMed</span>
          </div>
          {/* Hospital nodes */}
          {hospitals.map((h, i) => {
            const angle = (i / hospitals.length) * Math.PI * 2
            const x = 50 + Math.cos(angle) * 35
            const y = 50 + Math.sin(angle) * 35
            const config = statusConfig[h.status]
            const Icon = config.icon
            return (
              <div key={h.id}>
                {/* Connection line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`} stroke={h.status === 'online' ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.1)'} strokeWidth="2" strokeDasharray={h.status === 'syncing' ? '5,5' : undefined} />
                </svg>
                <div className="absolute -translate-x-1/2 -translate-y-1/2 z-20" style={{ left: `${x}%`, top: `${y}%` }}>
                  <div className={`w-12 h-12 rounded-full ${config.bg} border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <p className="text-[9px] text-white/50 text-center mt-1 max-w-[80px] truncate">{h.name.split(' ')[0]}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hospital List */}
      <div className="glass p-4">
        <h3 className="text-sm font-semibold text-white/70 mb-4">HOSPITAL DETAILS</h3>
        <div className="space-y-3">
          {hospitals.map(h => {
            const config = statusConfig[h.status]
            const Icon = config.icon
            return (
              <div key={h.id} className="p-4 rounded-xl bg-white/5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center`}><Building2 className={`w-5 h-5 ${config.color}`} /></div>
                <div className="flex-1">
                  <p className="font-medium">{h.name}</p>
                  <p className="text-xs text-white/40">{h.location}</p>
                </div>
                <div className="text-center px-4"><p className="text-[10px] text-white/40">Patients</p><p className="text-sm font-bold text-cyan-300">{(h.patients / 1000).toFixed(0)}K</p></div>
                <div className="text-center px-4"><p className="text-[10px] text-white/40">Quality</p><p className="text-sm font-bold text-emerald-300">{(h.data_quality * 100).toFixed(0)}%</p></div>
                <div className="text-center px-4"><p className="text-[10px] text-white/40">Contrib.</p><p className="text-sm font-bold text-amber-300">{(h.contribution_score * 100).toFixed(0)}%</p></div>
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] ${config.bg} ${config.color}`}><Icon className="w-3 h-3" />{h.status}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
