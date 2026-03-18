'use client'
import { useStore } from '@/lib/store'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
export default function DataQualityMonitor() {
  const { quality, hospitals } = useStore()
  const getHospName = (id: string) => hospitals.find(h => h.id === id)?.name || 'Unknown'
  const radarData = ['Completeness', 'Consistency', 'Timeliness', 'Accuracy'].map(dim => {
    const key = dim.toLowerCase() as keyof typeof quality[0]
    const entry: Record<string, any> = { dimension: dim }
    quality.slice(0, 4).forEach(q => { entry[getHospName(q.hospital_id).split(' ')[0]] = (q[key] as number) * 100 })
    return entry
  })
  const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b']
  return (
    <div className="space-y-6 h-[calc(100vh-120px)] overflow-auto">
      <h2 className="text-lg font-bold">Data Quality Monitoring</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="glass p-4">
          <h3 className="text-sm font-semibold text-white/70 mb-4">QUALITY DIMENSIONS BY SITE</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
              <PolarRadiusAxis tick={false} domain={[0, 100]} />
              {quality.slice(0, 4).map((q, i) => (
                <Radar key={q.id} dataKey={getHospName(q.hospital_id).split(' ')[0]} stroke={colors[i]} fill={colors[i]} fillOpacity={0.1} />
              ))}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass p-4">
          <h3 className="text-sm font-semibold text-white/70 mb-4">OVERALL QUALITY SCORES</h3>
          <div className="space-y-3">
            {quality.map(q => (
              <div key={q.id} className="flex items-center gap-3">
                <span className="text-xs text-white/50 w-40 truncate">{getHospName(q.hospital_id)}</span>
                <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${q.overall_score >= 0.9 ? 'bg-emerald-500' : q.overall_score >= 0.8 ? 'bg-cyan-500' : 'bg-amber-500'}`} style={{ width: `${q.overall_score * 100}%` }} />
                </div>
                <span className="text-sm font-bold text-white/70">{(q.overall_score * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="glass p-4">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10">
            <th className="text-left py-2 px-3 text-white/50 text-xs">Hospital</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Completeness</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Consistency</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Timeliness</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Accuracy</th>
            <th className="text-center py-2 px-3 text-white/50 text-xs">Overall</th>
          </tr></thead>
          <tbody>
            {quality.map(q => (
              <tr key={q.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-2 px-3 font-medium">{getHospName(q.hospital_id)}</td>
                {[q.completeness, q.consistency, q.timeliness, q.accuracy].map((v, i) => (
                  <td key={i} className={`py-2 px-3 text-center ${v >= 0.9 ? 'text-emerald-300' : v >= 0.8 ? 'text-cyan-300' : 'text-amber-300'}`}>{(v * 100).toFixed(0)}%</td>
                ))}
                <td className="py-2 px-3 text-center font-bold text-cyan-300">{(q.overall_score * 100).toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
