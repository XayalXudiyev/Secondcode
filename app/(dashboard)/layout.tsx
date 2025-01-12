export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Buraya navbar eklenebilir */}
      <main>{children}</main>
    </div>
  )
} 