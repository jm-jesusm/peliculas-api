import styles from './peliculas.module.css'

export const Peliculas = ({peliculas}) => (
  <section className={styles.grid__layout}>
    {peliculas.map((pelicula) => (
      <div key={pelicula.imdbID} className={styles.card}>
        <img src={pelicula.Poster} alt="" />
        <p>{pelicula.Title}</p>
        <p>{pelicula.Year}</p>
      </div>
    ))}
</section>
)