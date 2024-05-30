import { useState } from "react";

const Todos = () => {
  const [newTask, setNewTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const handlePressKey = (e) => {
    if (e.key === 'Enter' && newTask.trim()) {
      setTaskList([...taskList, newTask.trim()]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    setTaskList(taskList.filter((_, i) => i !== index));
  };

  return (
    <>
      <h1>todos</h1>
      <ul>
        <li>
          <input 
            type="text" 
            placeholder="Añadir tarea" 
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
            onKeyDown={handlePressKey}
          />
        </li>
        {taskList.map((task, index) => (
          <li className = "task" key={index}> 
            {task} 
            <i className="x-icon fas fa-xmark" onClick={() => handleDeleteTask(index)}></i>
          </li>
        ))}
        <li className="Footer">
          <strong>{taskList.length}</strong> tareas pendientes
        </li>
      </ul>
    </>
  );
};

export default Todos;
