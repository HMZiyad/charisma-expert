import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import OTPVerify from './pages/OTPVerify'
import SetNewPassword from './pages/SetNewPassword'

import OfficerLayout from './layouts/OfficerLayout'
import OfficerDashboard from './pages/dashboard/OfficerDashboard'
import CreateIncidentReport from './pages/dashboard/CreateIncidentReport'
import CreateSearchWarrant from './pages/dashboard/CreateSearchWarrant'
import CreateArrestWarrant from './pages/dashboard/CreateArrestWarrant'
import DocumentHistory from './pages/dashboard/DocumentHistory'
import GeneratedDocument from './pages/dashboard/GeneratedDocument'
import OfficerProfile from './pages/dashboard/OfficerProfile'

import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'
import AdminLogin from './pages/admin/AdminLogin'
import AdminProtectedRoute from './components/AdminProtectedRoute'

import Billing from './pages/admin/Billing'

import DatasetManagement from './pages/admin/DatasetManagement'

import ActivityMonitor from './pages/admin/ActivityMonitor'

import ContentManagement from './pages/admin/ContentManagement'

import Settings from './pages/admin/Settings'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OTPVerify />} />
        <Route path="/reset-password" element={<SetNewPassword />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <OfficerLayout />
          </ProtectedRoute>
        }>
          <Route index element={<OfficerDashboard />} />
          <Route path="create/incident-report" element={<CreateIncidentReport />} />
          <Route path="create/search-warrant" element={<CreateSearchWarrant />} />
          <Route path="create/arrest-warrant" element={<CreateArrestWarrant />} />
          <Route path="history" element={<DocumentHistory />} />
          <Route path="document/:id" element={<GeneratedDocument />} />
          <Route path="profile" element={<OfficerProfile />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="billing" element={<Billing />} />
          <Route path="datasets" element={<DatasetManagement />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="activity" element={<ActivityMonitor />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
