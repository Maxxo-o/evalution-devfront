import { useState } from "react";

// MODELS
const possibleTaskStates = Object.freeze({
  PENDING: {
    value: 0,
    completed: false,
    label: "En cours",
    cssClass: "task-pending",
    enabling: {
      COMPLETE: true,
      DELETE: true,
      EDIT: true,
    },
  },
  COMPLETED: {
    value: 1,
    completed: true,
    label: "Terminée", 
    cssClass: "task-completed",
    enabling: {
      COMPLETE: false,
      DELETE: true,
      EDIT: false,
    },
  },
});

// CONTROLLER
export const useTasks = (initialTasks = []) => {
  const [tasks, setTasks] = useState([...initialTasks]);
  const [nextId, setNextId] = useState(1);
  
  // un FACTORY PATTERN
  const createTask = (text) => ({
    id: nextId,
    text: text.trim(),
    state: possibleTaskStates.PENDING,  // État initial comme possibleStates.ON
    createdAt: new Date(),
    completedAt: null
  });

  function addTask(taskText) {
    if (!taskText?.trim()) return;
    
    const newTask = createTask(taskText);
    setTasks(prev => [...prev, newTask]);
    setNextId(prev => prev + 1);
  }

  // STATE MACHINE ?? 
  function checkTask(taskId) {
    setTasks(prev => 
      prev.map(task => {
        if (task.id !== taskId) return task;
        
        // Validation des transitions (comme votre switch)
        switch (task.state.value) {
          case possibleTaskStates.PENDING.value:
            if (!task.state.enabling.COMPLETE) {
              throw new Error("Cannot complete task in current state");
            }
            return {
              ...task,
              state: possibleTaskStates.COMPLETED,
              completedAt: new Date()
            };
            
          case possibleTaskStates.COMPLETED.value:
            // Permettre de "dé-compléter" (retour à PENDING)
            return {
              ...task,
              state: possibleTaskStates.PENDING,
              completedAt: null
            };
            
          default:
            throw new Error("Invalid task state value");
        }
      })
    );
  }

  function deleteTask(taskId) {
    const taskToDelete = tasks.find(task => task.id === taskId);
    
    if (!taskToDelete) {
      throw new Error("Task not found");
    }
    
    if (!taskToDelete.state.enabling.DELETE) {
      throw new Error("Cannot delete task in current state");
    }
    
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }

  // Calculer le nombre de tâches complétées
  const completedTasksCount = tasks.filter(task => task.state.completed).length;

  // Interface similaire à votre return
  return { 
    tasks, 
    addTask, 
    checkTask, 
    deleteTask,
    completedTasksCount,
    // États pour l'UI (comme vos enabling)
    possibleTaskStates  // Exposé pour l'usage dans les composants
  };
};