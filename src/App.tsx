import './App.css'
import { ServiciosProvider } from './Context/serviciosContext'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/PageIndex/Home'
import { PageConfiguration } from './pages/ListaServicios/PageConfiguration'
import { PageError } from './pages/PageIndex/PageError'

function App() {
  

  return (
    <>
    <ServiciosProvider>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/configuración" element={<PageConfiguration/>} />
        <Route path="*" element={<PageError/>} />
       </Routes>
    </ServiciosProvider>
    </>
  )
}

export default App
