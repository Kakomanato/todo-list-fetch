import { useState, useEffect } from "react";

const Lista = () => {
  const [newTask, setNewTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const createUser = () => {
    fetch("https://playground.4geeks.com/todo/users/kako", {
      method: 'POST',
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      retrieveTasks();
    })
    .catch((error) => console.error('Error creating user:', error));
  }

  const createTask = (e) => {
    if (e.key === 'Enter' && newTask.length > 0) {
      fetch("https://playground.4geeks.com/todo/todos/kako", {
        method: 'POST',
        body: JSON.stringify({
          label: newTask,
          is_done: false
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTaskList([...taskList, data]);
        setNewTask('');
      })
      .catch((error) => console.error('Error creating task:', error));
    }
  }

  const retrieveTasks = () => {
    fetch("https://playground.4geeks.com/todo/users/kako")
      .then((response) => response.json())
      .then((data) => setTaskList(data.todos || []))
      .catch((error) => console.error('Error retrieving tasks:', error));
  }

  const handleDeleteTask = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE"
    })
    .then((response) => {
      if (response.ok) {
        setTaskList(taskList.filter(task => task.id !== id));
      } else {
        console.error('Error deleting task:', response.statusText);
      }
    })
    .catch((error) => console.error('Error deleting task:', error));
  }

  const addTaskMessage = () => {
    return taskList.length === 0 ? 'No hay tareas pendientes, agregar tareas' : 'Agregar tarea';
  };

  const deleteUser = () => {
    fetch("https://playground.4geeks.com/todo/users/kako", {
      method: "DELETE"
    })
    .then((response) => {
      if (response.ok) {
        setTaskList([]);
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    })
    .catch((error) => console.error('Error deleting user:', error));
  }

  useEffect(() => {
    retrieveTasks();
  }, []);

  return (
    <>
      <div className="Buttons">
      <button onClick={createUser}>Crear usuario</button> 
      <button onClick={deleteUser}>Borrar todo</button>
      </div>
      <ul>
        <li>
          <input 
            type="text" 
            placeholder={addTaskMessage()} 
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
            onKeyDown={(e) => createTask(e)}
          />
        </li>
        {taskList && taskList.map((task) => (
          <li className="task" key={task.id}> 
            {task.label} 
            <i className="x-icon fas fa-xmark" onClick={() => handleDeleteTask(task.id)}></i>
          </li>
        ))}
        <li className="Footer">
          <strong>{taskList.length}</strong> tareas pendientes
        </li>
      </ul>
    </>
  );
};

export default Lista;
