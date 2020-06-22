import React from 'react'
import './App.css'
import { AuthProvider } from './contexts/Auth'
import Routes from './routes/Routes'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App
