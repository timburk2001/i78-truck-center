import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AdminLogin from './pages/admin/AdminLogin'
import SetPassword from './pages/admin/SetPassword'
import MfaGate from './pages/admin/MfaGate'
import AdminLayout from './pages/admin/AdminLayout'
import SubmissionsPage from './pages/admin/SubmissionsPage'
import UsersPage from './pages/admin/UsersPage'
import RecipientsPage from './pages/admin/RecipientsPage'

function InviteRedirect() {
  const navigate = useNavigate()
  useEffect(() => {
    const hash = window.location.hash
    if (hash.includes('type=invite') && hash.includes('access_token=')) {
      navigate('/admin/set-password', { replace: true })
    }
  }, [navigate])
  return null
}

export default function App() {
  return (
    <>
      <InviteRedirect />
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/set-password" element={<SetPassword />} />
      <Route path="/admin/mfa" element={<MfaGate />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<SubmissionsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="recipients" element={<RecipientsPage />} />
      </Route>
    </Routes>
    </>
  )
}
