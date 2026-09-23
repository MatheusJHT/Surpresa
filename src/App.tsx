import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/Login'
import { HomePage } from './pages/Home'
import { JourneyPage } from './pages/Journey'
import { PresentPage } from './pages/Present'
import { AdminPage } from './pages/Admin'
import { AdminRoute } from './components/AdminRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/jornada" element={<ProtectedRoute><JourneyPage /></ProtectedRoute>} />
      <Route path="/presente/:presentId" element={<ProtectedRoute><PresentPage /></ProtectedRoute>} />
      <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App