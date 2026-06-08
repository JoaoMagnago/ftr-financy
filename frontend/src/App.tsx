import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Login } from './pages/Auth/Login'
import { Signup } from './pages/Auth/Signup'
import { useAuthStore } from './stores/auth'
import { Dashboard } from './pages/Dashboard'
import { Profile } from './pages/Profile'
import { Categories } from './pages/Categories'
import { Transactions } from './pages/Transactions'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Layout>
      <Routes>
        <Route
          path={'/'}
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/transactions'} element={<Transactions />} />
        <Route path={'/categories'} element={<Categories />} />
        <Route path={'/profile'} element={<Profile />} />
      </Routes>
    </Layout>
  )
}

export default App
