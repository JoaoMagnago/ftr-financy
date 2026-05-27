import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/auth'
import logoIcon from '@/assets/logo_icon.svg'
import { Button } from './ui/button'
import { Avatar } from './Avatar'

export const Header = () => {
  const { user, isAuthenticated } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  const isDashboardsPage = location.pathname === '/'
  const isTransactionsPage = location.pathname === '/transactions'
  const isCategoriesPage = location.pathname === '/categories'

  return (
    <div className="w-full px-16 pt-6">
      {isAuthenticated && (
        <div className="flex justify-between w-full">
          <div className="min-w-48">
            <img src={logoIcon} />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button
                size="sm"
                className="gap-2"
                variant={isDashboardsPage ? 'default' : 'ghost'}
              >
                Dashboards
              </Button>
            </Link>
            <Link to="/transactions">
              <Button
                size="sm"
                className="gap-2"
                variant={isTransactionsPage ? 'default' : 'ghost'}
              >
                Transações
              </Button>
            </Link>
            <Link to="/categories">
              <Button
                size="sm"
                className="gap-2"
                variant={isCategoriesPage ? 'default' : 'ghost'}
              >
                Categorias
              </Button>
            </Link>
          </div>
          <div onClick={() => navigate('/profile')}>
            <Avatar name={user?.name} />
          </div>
        </div>
      )}
    </div>
  )
}
