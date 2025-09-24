# TP FRONT ÉVALUATION


### Introduction
Quand on arrive sur le projet il y a presque aucun design pattern de présent. On est plutôt sur une architecture basée sur des composants (comme on trouve traditionnellement sur une application React ou même Angular). Il n'y a (pas encore) de séparation claire entre le modèle, la vue et le contrôler.

Ce document liste les designs pattern de la consigne, et pour chaque DP, on va analyser si on peut le mettre en place dans le projet, si on l'a fait (pourquoi on l'a fait et pourquoi c'était cohérent), si on ne peut pas le mettre en place et pourquoi. 


## Modifications réalisées 

Suite à l'analyse nous avons adapté le code pour qu'il respecte les paterns suivants :

### MVC 

Nous avons implémenté MVC dans notre application. Nous avons en conséquence une séparation claire des responsabilités.

#### 1. Le Model

Le modèle est définit dans useTasks.js juste avant le controller. :

```javascript
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
```


Il encapsule les tâches (PENDING/COMPLETED) et leurs règles métier avec les propriétés enabling qui définissent les actions autorisées.

#### 2. Le Controller
Le contrôleur est sous forme de hook personnalisé qui expose les fonctions addTask(), checkTask(), et deleteTask() pour manipuler les données et gérer les transitions d'état.


#### 3. Les Vues

La vue quant à elle est constituée des composants React taskContainer.jsx, TaskList.jsx, tsakItem.jsx, TaskInput.jsx, Header.jsx et Footer.jsx qui sont purement présentiels et reçoivent leurs données via props (structure de base).

#### 4. Flux de données

Le flux de données respecte notre pattern MVC : les interactions utilisateur dans les composants de vue déclenchent des callbacks (onAddTask, onCheckTask, onDeleteTask) qui appellent les fonctions du contrôleur dans useTasks.js, lesquelles mettent à jour l'état selon les règles du modèle, provoquant automatiquement le re-rendu des composants observateurs.

Cette architecture assure une séparation nette entre la logique métier (contrôleur/modèle dans useTasks.js) et l'affichage (composants dans le dossier components/) (donc super cohérent avec un MVC).


### Singleton

 ```ABSENT``` dans notre projet. Il n'y a pas d'endroit où il serait intéressant d'implémenter un singleton.

#### 2. Justification de l'absence
- **Pas de ressource unique** : Notre application n'a pas de ressource critique nécessitant une instance unique (pas de connexion DB, pas de logger global, etc.)
- **Simplicité** : L'état des tâches est local au composant `TaskContainer`, pas besoin d'un état global singleton.

### Abstract factory

#### 1. Présence
```ABSENT``` \
Pas présente dans le projet. 

#### 2. Compatibilité

Incompatibilité moyenne : il est intéressant pour créer des types de tâches différentes (urgent, low, doc etc...).

Mais bon cela peut être lourd à implémenter ici pour une application simple comme celle ci...


### COMMAND

#### 1. Présence
- Nous ne mettons pas en place le patern ```COMMAND```, car dans l'implementation demandé il n'est pas utile.

#### 2. Compatibilité

- Nous pourrions l'implémenter si par exemple nous voulions ajouter un système pour re ajouter les tâches que nous avons supprimé.

- Exemple d'implémentation : 

```
Suppression d'une tâche → Handler → Hook useTasks →  Ajout de la tâche dans une liste 

Bouton restaurer → Handler → Hook useTasks →  Re-render des composants observateurs avec les tâches
```

### Decorator

#### 1. Présence
Il est un peu présent : dans un props spreading avec {..props} notamment. Mais peut-être pas bien implémenté.

#### 2. Compatibilité
- On peut utiliser par exemple des décorateurs pour les tâches : un TaskDecorator avec UrgentTaskDecorator par exemple avec un style différent etc...


### Builder

#### 1. Présence
- Il est absent : les tâches sont toujours créées directement dans useTasks.

#### 2. Compatibilité
- Pas trop compatible selon nous. Les tâches sont des objets trop simple qui contiennent "seulement " un id du texte etc....
C'est un peu over engineering pour une application comme ça. Ce serait bien et utile si elle évolue (manipulation d'objet plus complexe par exemple) par la suite mais bon là c'est inutile...

Il vaut mieux rester dans une approche fonctionnelle simple à ce stade. 



### OBSERVER

Le pattern ```OBSERVER``` est présent à plusieurs endroits dans notre application :

#### 1. **Hooks React (useState)**
- Notre hook `useTasks` utilise `useState` qui implémente le pattern.
- Quand l'état des tâches change (via `setTasks`), tous les composants abonnés se re-rendent automatiquement.
- Les composants `TaskList`, `Footer` sont des "observateurs" de l'état des taches.

#### 2. **Props callback (événements)**

- Les props de callback type `onChange` (onAddTask, onCheckTask, onDeleteTask...)

#### 3. **Flux de données unidirectionnel**
```
Interaction utilisateur → Handler → Hook useTasks → State change → Re-render des composants observateurs
```


Ce pattern assure la réactivité de l'interface et la synchronisation des données.

### STATE

Le pattern ```STATE``` est implémenté dans notre application à travers une machine à états pour les tâches :

#### 1. **Définition des états dans useTasks.js**
```javascript
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
```

#### 2. **Transitions d'état**
- **PENDING → COMPLETED** : Via `checkTask()` quand l'utilisateur clique sur l'icone valider
- **COMPLETED → PENDING** : Via `checkTask()` pour "dé-compléter" une tâche
- **Validation des transitions** : Chaque état définit quelles actions sont autorisées (`enabling`)

#### 3. **Impact sur l'interface (TaskItem.jsx)**
```javascript
// Classes CSS conditionnelles basées sur l'état
const containerClass = task.state.completed 
  ? `${styles.container} ${styles.success}`
  : `${styles.container} ${styles.default}`;

// Boutons conditionnels basés sur l'état
{task.state.enabling.COMPLETE && (
  <button onClick={() => onCheck(task.id)}>Terminer</button>
)}
```



