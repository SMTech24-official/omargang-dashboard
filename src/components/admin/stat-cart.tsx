import type { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string
  icon: ReactNode
  iconBg: string
}

export default function StatCard({ title, value, icon, iconBg }: StatCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-1 text-2xl font-bold">{value}</h3>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-md ${iconBg}`}>{icon}</div>
      </div>
    </div>
  )
}
