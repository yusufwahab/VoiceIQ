import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './views/LandingPage'
import SignInPage from './views/SignInPage'
import SignUpPage from './views/SignUpPage'
import DashboardView from './views/DashboardView'
import AnalyticsView from './views/AnalyticsView'
import InboxView from './views/InboxView'
import ProfileView from './views/ProfileView'

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem('voiceiq_auth') === 'true'
  return isAuth ? children : <Navigate to="/signin" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardView /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsView /></ProtectedRoute>} />
        <Route path="/inbox" element={<ProtectedRoute><InboxView /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
