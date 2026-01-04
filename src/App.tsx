import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminLayout } from './layout'
import { LoginPage, RegisterPage, AdminEmployeePage, EmployeeLoginPage, AdminEmployeeLeavReq } from '@zenra/pages'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useSelector } from 'react-redux'
import { RootState } from '@zenra/store'
import { RequestListPage } from './pages/admin/EmployeReq/RequestListPage'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return !isAuthenticated ? <Navigate to="/login" /> : <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/employee-login" element={<EmployeeLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="employees" element={<ProtectedRoute><AdminEmployeePage /></ProtectedRoute>} />
          <Route path="leave-requests" element={<ProtectedRoute><AdminEmployeeLeavReq /></ProtectedRoute>} />
          <Route path="leave-acceptance" element={<ProtectedRoute><RequestListPage /></ProtectedRoute>} />
        </Route>
      </Routes>
      <Toaster richColors closeButton />
    </BrowserRouter>
  )
}

export default App