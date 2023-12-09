import { useCallback } from "react"
import {  useState, useEffect } from "react"

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT
const API_KEY = import.meta.env.VITE_API_KEY

const ERROR_MESSAGES = {
  "Too many results.": 'Demasiadas coincidencias',
  "Incorrect IMDb ID.": 'Primero debes introducir el nombre de una película',
}

const usePeliculas = ({ busqueda }) => {
  const [peliculas, setPeliculas] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState()
  

  const buscarPeliculas = useCallback(async ({ nombre }) => {
    const url = new URL(`${ENDPOINT}`)
    url.searchParams.set('apikey', API_KEY)
    url.searchParams.set('s', nombre)

    try {
      setCargando(true)
      const response = await fetch(url)
      const json = await response.json()
      
      if(json.Response === 'False') throw new Error(ERROR_MESSAGES[json.Error])
      
      setError(null)
      setPeliculas(json.Search)
    } catch(tryError) {
      setError(tryError.message)
    } finally {
      setCargando(false)
    }
  },[])

  useEffect(() => {
    buscarPeliculas({nombre: busqueda})
  }, [busqueda, buscarPeliculas])

  return {peliculas, error, cargando}
}

export default usePeliculas