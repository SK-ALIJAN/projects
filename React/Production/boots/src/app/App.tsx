import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppProviders from './AppProviders'
import AppRoutes from '../routes/AppRoutes'
import ErrorBoundary from '../components/feedback/error/ErrorBoundary'

function App() {

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppProviders>
          <AppRoutes />
        </AppProviders>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
