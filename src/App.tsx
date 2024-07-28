import { useEffect } from "react"
import UseAppContext from "./hooks/useAppContext"
import NavBar from "./components/Nav"
import { Outlet, useNavigate } from "react-router-dom"

function App() {
  const { token } = UseAppContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [])

  return (
    <main className='min-h-screen w-screen bg-slate-950 pt-14 '>
      <NavBar />
      <Outlet />
    </main>
  )
}

export default App
