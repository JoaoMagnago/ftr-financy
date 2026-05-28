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
    <div className="w-full px-12 py-4 border-b border-(--gray-200)">
      {isAuthenticated && (
        <div className="flex items-center justify-between w-full">
          <div
            className="items-center min-w-25 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src={logo} />
          </div>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button
                size="sm"
                className={isDashboardsPage ? 'text-primary font-semibold' : ''}
                variant={'link'}
              >
                Dashboards
              </Button>
            </Link>
            <Link to="/transactions">
              <Button
                size="sm"
                className={
                  isTransactionsPage ? 'text-primary  font-semibold' : ''
                }
                variant={'link'}
              >
                Transações
              </Button>
            </Link>
            <Link to="/categories">
              <Button
                size="sm"
                className={
                  isCategoriesPage ? 'text-primary  font-semibold' : ''
                }
                variant={'link'}
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
