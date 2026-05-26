import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Login } from './pages/Auth/Login'
import { Signup } from './pages/Auth/Signup'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<Login />} />
        <Route path={'/signup'} element={<Signup />} />
      </Routes>
    </Layout>
  )
}

export default App
