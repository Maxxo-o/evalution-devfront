// Ce composant est utilisé pour afficher une tâche.
import styles from "./taskItem.module.css";
export const TaskItem = () => {
  return (
    <li className={`${styles.container} ${styles.default}`}>
      <div className={styles.item}>
        <div className={`${styles.id} ${styles.isDefault}`}>1</div>
        <div className={styles.contentDefault}>Tâche 1</div>
      </div>
      <div className={styles.actions}>
        <button className="button-primary">Terminer</button>
        <button className="button-primary">Supprimer</button>
      </div>
    </li>
  );
};
