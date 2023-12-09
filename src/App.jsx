import useBusqueda from './hooks/useBusqueda'
import usePeliculas from './hooks/usePeliculas'
import './App.css'
import { Peliculas } from './components/Peliculas'

function App() {
  const {busqueda, actualizarBusqueda, debunceTyping } = useBusqueda()
  const {peliculas, cargando, error} = usePeliculas({busqueda})

  const controlarSubmit = (event) => {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const busqueda = formData.get('busqueda')
    actualizarBusqueda({busqueda})
  }

  return (
    <>
      <header>
        <h1>Buscador de peliculas</h1> 
        <form onSubmit={controlarSubmit} style={{display: 'flex', justifyContent: 'center'}}>
          <input onChange={debunceTyping} name='busqueda' type="text" />
          <button style={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}} type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        {cargando && <p>Cargando...</p>}
        {!cargando && error && <p>{error}</p>}
        {!cargando && !error && peliculas.length >= 0 && <Peliculas peliculas={peliculas}/>}
      </main>
    </>
  )
}

export default App
