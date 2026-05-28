import { useAuthStore } from '@/stores/auth'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated && <Navbar />}
      <main className={`mx-auto ${isAuthenticated ? 'p-12' : 'px-16 py-4'}`}>
        {children}
      </main>
    </div>
  )
}
