import styles from './NoResultsCard.module.scss';

const NoResultsCard = () => {
  return (
    <div className={styles.rootNoResults}>
      <div className={styles.card}>
        <img src="/not-found.svg" alt="No results found"/>
        <div className={styles.text}>
          <h2>No hay publicaciones que coincidan con tu búsqueda.</h2>
          <ul className={styles.suggestions}>
            <li>
              <strong>Revisa la ortografía</strong> de la palabra.
            </li>
            <li>
              <strong>Utiliza palabras</strong> más genéricas o menos palabras.
            </li>
            <li>
              <span className={styles.link}>Navega por las categorías</span> para encontrar un
              producto similar
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoResultsCard;
