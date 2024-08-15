import './App.css'
import { MenuAppBar } from './Components/Navbar'
import { MainPage } from './pages/ListaServicios/MainPage'
import { ServicioPadreProvider } from './Context/serviciosContext'

function App() {
  

  return (
    <>
    <ServicioPadreProvider>
    <MenuAppBar/>
    <MainPage/>
    </ServicioPadreProvider>
    </>
  )
}

export default App
