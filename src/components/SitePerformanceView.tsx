'use client'
import { useStore } from '@/lib/store'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
export default function SitePerformanceView() {
  const { sitePerf, hospitals } = useStore()
  const getHospName = (id: string) => hospitals.find(h => h.id === id)?.name?.split(' ')[0] || 'Unknown'
  const chartData = sitePerf.map(s => ({
    name: getHospName(s.hospital_id), accuracy: s.local_accuracy * 100, loss: s.local_loss * 100, weight: s.contribution_weight * 100,
  }))
  return (
    <div className="space-y-6 h-[calc(100vh-120px)] overflow-auto">
      <h2 className="text-lg font-bold">Model Performance Per Site</h2>
      <div className="glass p-4">
        <h3 className="text-sm font-semibold text-white/70 mb-4">LOCAL ACCURACY BY SITE</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
            <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
            <Legend />
            <Bar dataKey="accuracy" fill="#06b6d4" name="Accuracy %" radius={[4, 4, 0, 0]} />
            <Bar dataKey="weight" fill="#f59e0b" name="Contribution %" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="glass p-4">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10">
            <th className="text-left py-2 px-3 text-white/50 text-xs">Hospital</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Local Accuracy</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Local Loss</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Samples</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Weight</th>
          </tr></thead>
          <tbody>
            {sitePerf.map(s => (
              <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-2 px-3 font-medium">{hospitals.find(h => h.id === s.hospital_id)?.name}</td>
                <td className="py-2 px-3 text-center text-cyan-300">{(s.local_accuracy * 100).toFixed(1)}%</td>
                <td className="py-2 px-3 text-center text-amber-300">{s.local_loss.toFixed(3)}</td>
                <td className="py-2 px-3 text-center">{s.samples_used.toLocaleString()}</td>
                <td className="py-2 px-3 text-center text-blue-300">{(s.contribution_weight * 100).toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
