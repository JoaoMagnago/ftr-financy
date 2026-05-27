import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div>
      <h1>Profile</h1>
      <Button variant="outline" className="mt-4" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}
