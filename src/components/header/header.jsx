// Ce composant est utilisé pour afficher l'en-tête de l'application.
import styles from "./header.module.css";
import reactLogo from "../../assets/react.svg"; // Chemin vers le logo React
export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <img src={reactLogo} alt='Logo React' width={50} height={50} />
        <div>
          <h1>Gestionnaire de tâches</h1>
          <div className='color-gray'>
            <code>Gérer vos tâches efficacement</code>
          </div>
        </div>
      </div>
      <code className='color-primary'>V1.0</code>
    </div>
  );
};
