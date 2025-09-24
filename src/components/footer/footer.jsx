// Ce composant est utilisé pour afficher le champ de saisie de tâche.
import styles from "./footer.module.css";
export const Footer = ({ completedTasksCount }) => {
  return (
    <footer>
      <code className={styles.footer}>
        Le gestionnaire de tâches vous as permis de traiter {completedTasksCount} tâches depuis le
        début de son utilisation.
      </code>
    </footer>
  );
};
