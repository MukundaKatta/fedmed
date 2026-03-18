'use client'
import { useStore } from '@/lib/store'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Cpu, Play, CheckCircle, Clock, XCircle } from 'lucide-react'
const statusConfig: Record<string, { icon: any; color: string; bg: string }> = {
  running: { icon: Play, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  completed: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  failed: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20' },
  queued: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/20' },
}
export default function TrainingOrchestrator() {
  const { runs } = useStore()
  const trainingCurve = Array.from({ length: 50 }, (_, i) => ({
    round: i + 1, accuracy: Math.min(0.95, 0.5 + (i / 50) * 0.4 + Math.random() * 0.02),
    loss: Math.max(0.1, 0.8 - (i / 50) * 0.6 + Math.random() * 0.03),
  }))
  return (
    <div className="space-y-6 h-[calc(100vh-120px)] overflow-auto">
      <div className="grid grid-cols-4 gap-4">
        <div className="glass p-4"><p className="text-xs text-white/50">Active Runs</p><p className="text-3xl font-bold text-blue-400">{runs.filter(r => r.status === 'running').length}</p></div>
        <div className="glass p-4"><p className="text-xs text-white/50">Completed</p><p className="text-3xl font-bold text-emerald-400">{runs.filter(r => r.status === 'completed').length}</p></div>
        <div className="glass p-4"><p className="text-xs text-white/50">Best Accuracy</p><p className="text-3xl font-bold text-cyan-400">{runs.length ? Math.max(...runs.filter(r => r.global_accuracy > 0).map(r => r.global_accuracy)).toFixed(1) + '%' : '-'}</p></div>
        <div className="glass p-4"><p className="text-xs text-white/50">Queued</p><p className="text-3xl font-bold text-amber-400">{runs.filter(r => r.status === 'queued').length}</p></div>
      </div>

      <div className="glass p-4">
        <h3 className="text-sm font-semibold text-white/70 mb-4">TRAINING CURVE - CardioRisk-FL</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={trainingCurve}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="round" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
            <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
            <Legend />
            <Line type="monotone" dataKey="accuracy" stroke="#06b6d4" strokeWidth={2} dot={false} name="Accuracy" />
            <Line type="monotone" dataKey="loss" stroke="#f59e0b" strokeWidth={2} dot={false} name="Loss" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {runs.map(run => {
        const config = statusConfig[run.status]
        const Icon = config.icon
        return (
          <div key={run.id} className="glass p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2"><Cpu className="w-5 h-5 text-cyan-400" /><div><p className="font-bold">{run.model_name}</p><p className="text-xs text-white/40">{run.task}</p></div></div>
              <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${config.bg} ${config.color}`}><Icon className="w-3 h-3" />{run.status}</span>
            </div>
            <div className="grid grid-cols-5 gap-3">
              <div className="p-2 rounded-lg bg-white/5"><p className="text-[10px] text-white/40">Progress</p><p className="text-sm font-bold text-cyan-300">{run.rounds_completed}/{run.total_rounds}</p>
                <div className="mt-1 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-cyan-500 rounded-full" style={{ width: `${(run.rounds_completed / run.total_rounds) * 100}%` }} /></div>
              </div>
              <div className="p-2 rounded-lg bg-white/5"><p className="text-[10px] text-white/40">Accuracy</p><p className="text-sm font-bold text-emerald-300">{run.global_accuracy > 0 ? (run.global_accuracy * 100).toFixed(1) + '%' : '-'}</p></div>
              <div className="p-2 rounded-lg bg-white/5"><p className="text-[10px] text-white/40">Sites</p><p className="text-sm font-bold text-blue-300">{run.participating_sites}</p></div>
              <div className="p-2 rounded-lg bg-white/5"><p className="text-[10px] text-white/40">Privacy Budget</p><p className="text-sm font-bold text-amber-300">{(run.privacy_budget_used * 100).toFixed(0)}%</p></div>
              <div className="p-2 rounded-lg bg-white/5"><p className="text-[10px] text-white/40">Started</p><p className="text-xs text-white/60">{new Date(run.start_time).toLocaleDateString()}</p></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
