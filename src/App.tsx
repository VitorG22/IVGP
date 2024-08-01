import UseAppContext from "./hooks/useAppContext"
import NavBar from "./components/Nav"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"

function App() {
  const { token } = UseAppContext()
  const navigate = useNavigate()
  console.log(token)
  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [])

  return (
    <>
      {token &&
        <main className='h-full w-screen'>
          <NavBar />
          <div className="h-[calc(100vh-3.5rem)] overflow-hidden w-screen mt-14">
            <Outlet />
          </div>
        </main>
      }
    </>
  )
}

export default App
