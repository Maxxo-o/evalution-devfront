import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { TaskInput } from "./taskInput/taskInput";
import { TaskList } from "./taskList/taskList";
import { useTasks } from "../hooks/useTasks";

// Ce composant est utilisé pour afficher l'intégralité de la fonctionalité de Tache.
export const TaskContainer = () => {


  // responsabilité unique 
  // + single source of truth
  const { tasks, addTask, checkTask, deleteTask, completedTasksCount } = useTasks();

  return (
    <main>
      <Header />
      <TaskInput onAddTask={addTask} />
      <TaskList 
        tasks={tasks} 
        onCheckTask={checkTask}
        onDeleteTask={deleteTask}
      />
      <Footer completedTasksCount={completedTasksCount} />
    </main>
  );
};
