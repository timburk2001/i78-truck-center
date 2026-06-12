import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AdminLogin from './pages/admin/AdminLogin'
import SetPassword from './pages/admin/SetPassword'
import AdminLayout from './pages/admin/AdminLayout'
import SubmissionsPage from './pages/admin/SubmissionsPage'
import UsersPage from './pages/admin/UsersPage'
import RecipientsPage from './pages/admin/RecipientsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/set-password" element={<SetPassword />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<SubmissionsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="recipients" element={<RecipientsPage />} />
      </Route>
    </Routes>
  )
}
