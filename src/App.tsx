import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout, AdminLayout } from './layout'
import { HomePage, AboutPage, LoginPage, RegisterPage, PackagesPage, DestinationsPage, ContactPage, DashboardPage, BookingsPage, AdminPackagesPage, AdminFeedbacksPage } from '@zenra/pages'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useSelector } from 'react-redux'
import { RootState } from '@zenra/store'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return !isAuthenticated ? <Navigate to="/login" /> : <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
          <Route path="packages" element={<ProtectedRoute><AdminPackagesPage /></ProtectedRoute>} />
          <Route path="feedbacks" element={<ProtectedRoute><AdminFeedbacksPage /></ProtectedRoute>} />
        </Route>
      </Routes>
      <Toaster richColors closeButton />
    </BrowserRouter>
  )
}

export default App