'use client'
import { useStore } from '@/lib/store'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { Lock, Shield, Eye } from 'lucide-react'
export default function PrivacyAnalytics() {
  const { runs } = useStore()
  const budgetData = runs.filter(r => r.privacy_budget_used > 0).map(r => ({ name: r.model_name, budget: r.privacy_budget_used * 100, remaining: (1 - r.privacy_budget_used) * 100 }))
  const techniques = [{ name: 'Differential Privacy', value: 40 }, { name: 'Secure Aggregation', value: 30 }, { name: 'Homomorphic Enc.', value: 15 }, { name: 'Model Compression', value: 15 }]
  const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b']
  return (
    <div className="space-y-6 h-[calc(100vh-120px)] overflow-auto">
      <div className="grid grid-cols-3 gap-4">
        <div className="glass p-4"><p className="text-xs text-white/50">Privacy Techniques Active</p><p className="text-3xl font-bold text-cyan-400">4</p></div>
        <div className="glass p-4"><p className="text-xs text-white/50">Epsilon Budget (Avg)</p><p className="text-3xl font-bold text-emerald-400">{runs.filter(r => r.privacy_budget_used > 0).length ? (runs.filter(r => r.privacy_budget_used > 0).reduce((s, r) => s + r.privacy_budget_used, 0) / runs.filter(r => r.privacy_budget_used > 0).length * 100).toFixed(0) : 0}%</p></div>
        <div className="glass p-4"><p className="text-xs text-white/50">Data Never Leaves Site</p><p className="text-3xl font-bold text-emerald-400 flex items-center gap-2"><Shield className="w-6 h-6" />100%</p></div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="glass p-4">
          <h3 className="text-sm font-semibold text-white/70 mb-4">PRIVACY BUDGET USAGE</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              <Bar dataKey="budget" fill="#06b6d4" name="Used %" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="remaining" fill="rgba(255,255,255,0.1)" name="Remaining %" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass p-4">
          <h3 className="text-sm font-semibold text-white/70 mb-4">PRIVACY TECHNIQUES</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={techniques} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {techniques.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass p-4">
        <h3 className="text-sm font-semibold text-white/70 mb-4">PRIVACY GUARANTEES</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: 'Differential Privacy', desc: 'Epsilon-delta guarantees with noise calibration per round', status: 'Active' },
            { title: 'Secure Aggregation', desc: 'Cryptographic protocols ensure server never sees individual updates', status: 'Active' },
            { title: 'Homomorphic Encryption', desc: 'Computations on encrypted model gradients', status: 'Active' },
            { title: 'Audit Trail', desc: 'Complete logging of all data access and model interactions', status: 'Active' },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-xl bg-white/5 flex items-start gap-3">
              <Lock className="w-5 h-5 text-cyan-400 mt-0.5" />
              <div>
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
