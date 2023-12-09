import { useState, useRef } from "react"

const useBusqueda = () => {
  const [busqueda, setBusqueda] = useState('')
  const ultimaBusqueda = useRef('')
  const debounce = useRef()

  const actualizarBusqueda = ({busqueda}) => {
    if(ultimaBusqueda.current === busqueda) return
    ultimaBusqueda.current = busqueda
    setBusqueda(busqueda)
  }

  const debunceTyping = ({target}) => {
    clearTimeout(debounce.current)
    debounce.current = setTimeout(() => {actualizarBusqueda({ busqueda: target.value})}, 500)
  }

  return {busqueda, actualizarBusqueda, debunceTyping}
}

export default useBusqueda