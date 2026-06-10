import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Login } from './pages/Auth/Login'
import { Signup } from './pages/Auth/Signup'
import { useAuthStore } from './stores/auth'
import { Dashboard } from './pages/Dashboard'
import { Profile } from './pages/Profile'
import { Categories } from './pages/Categories'
import { Transactions } from './pages/Transactions'
import { ProtectedRoute } from './components/ProtectedRoute'
import { GuestRoute } from './components/GuestRoute'
import { NotFound } from './pages/NotFound'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <Layout>
      <Routes>
        <Route
          path={'/'}
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />

        <Route element={<GuestRoute />}>
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/transactions" element={<Transactions />} />

          <Route path="/categories" element={<Categories />} />

          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
