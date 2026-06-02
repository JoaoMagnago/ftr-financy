import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/auth'
import { Button } from './ui/button'
import { Avatar } from './Avatar'

import logo from '@/assets/logo.svg'

export const Navbar = () => {
  const { user, isAuthenticated } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  const isDashboardsPage = location.pathname === '/'
  const isTransactionsPage = location.pathname === '/transactions'
  const isCategoriesPage = location.pathname === '/categories'

  return (
    <div className="w-full px-12 py-4 border-b border-(--gray-200) sticky top-0 z-50 bg-background">
      {isAuthenticated && (
        <div className="flex items-center justify-between w-full">
          <div
            className="items-center min-w-25 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src={logo} />
          </div>

          <div className="flex items-center gap-4">
            <Button
              asChild
              size="sm"
              variant="link"
              className={isDashboardsPage ? 'font-semibold text-primary' : ''}
            >
              <Link to="/">Dashboards</Link>
            </Button>

            <Button
              asChild
              size="sm"
              variant="link"
              className={isTransactionsPage ? 'font-semibold text-primary' : ''}
            >
              <Link to="/transactions">Transações</Link>
            </Button>

            <Button
              asChild
              size="sm"
              variant="link"
              className={isCategoriesPage ? 'font-semibold text-primary' : ''}
            >
              <Link to="/categories">Categorias</Link>
            </Button>
          </div>

          <div onClick={() => navigate('/profile')}>
            <Avatar name={user?.name} />
          </div>
        </div>
      )}
    </div>
  )
}
