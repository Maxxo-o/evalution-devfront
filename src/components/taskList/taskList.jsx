// Ce composant est utilisé pour afficher la liste des tâches.
import { TaskItem } from "../taskItem/taskItem";
import styles from "./taskList.module.css";
export const TaskList = ({ tasks, onCheckTask, onDeleteTask }) => {
  const pendingTasksCount = tasks.filter(task => !task.state.completed).length;
  
  return (
    <div className="box">
      <h2 className={styles.title}>Il reste {pendingTasksCount} tâches à traiter</h2>
      <ul className={styles.container}>
        {tasks.map((task, index) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            displayNumber={index + 1}
            onCheck={onCheckTask}
            onDelete={onDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
};
