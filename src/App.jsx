import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from "./Pages/Login"
import Dashboard from './Pages/Dashboard'
import CreateTicket from './Pages/CreateTicket'
import AgentDashboard from './Pages/AgentDashboard'


const App = () => {
  return (
    <div>
  

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="/agentdashboard" element={<AgentDashboard />} />
      </Routes>

    </div>
  )
}

export default App
