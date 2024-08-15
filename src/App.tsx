import './App.css'
import { MenuAppBar } from './Components/Navbar'
import { MainPage } from './pages/ListaServicios/MainPage'
import { ServiciosProvider } from './Context/serviciosContext'

function App() {
  

  return (
    <>
    <ServiciosProvider>
    <MenuAppBar/>
    <MainPage/>
    </ServiciosProvider>
    </>
  )
}

export default App
