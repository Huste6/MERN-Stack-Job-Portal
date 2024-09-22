import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/login'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import CompanyAdmin from './components/admin/CompanyAdmin'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetupData from './components/admin/CompanySetupData'
import JobsAdmin from './components/admin/JobsAdmin'
import CreateJob from './components/admin/CreateJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import ProtectedRouteUser from './components/ProtectedRouteUser'
import EditJob from './components/admin/EditJob'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/description/:id',
    element: <ProtectedRouteUser><JobDescription /></ProtectedRouteUser>
  },
  {
    path: '/brower',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <ProtectedRouteUser><Profile /></ProtectedRouteUser>
  },
  //admin route
  {
    path: '/admin/companies',
    element: <ProtectedRoute><CompanyAdmin /></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><CreateCompany /></ProtectedRoute>
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoute><CompanySetupData /></ProtectedRoute>
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><JobsAdmin /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id',
    element: <ProtectedRoute><EditJob /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><CreateJob /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App