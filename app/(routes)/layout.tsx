import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
} 