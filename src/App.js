import "./app.css";
import { useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState(["test1", "test2", "test3"]);
  const [task, setTask] = useState("");

  const onInputChange = (event) => {
    setTask(event.target.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (task.length === 0) {
      return;
    }

    setTasks((tasks => {
      return [...tasks, task];
    }));

    setTask("");
  }

  const taskUp = (index) => {
    const newTasks = [...tasks];

    const temp = newTasks[index - 1];
    newTasks[index - 1] = newTasks[index];
    newTasks[index] = temp; 

    setTasks(newTasks);
  }

  const taskDown = (index) => {
    const newTasks = [...tasks];

    const temp = newTasks[index + 1];
    newTasks[index + 1] = newTasks[index];
    newTasks[index] = temp; 
    
    setTasks(newTasks);
  }

  const removeTask = (taskName) => {
    const filteredTasks = tasks.filter((task) => task !== taskName);
    
    setTasks(filteredTasks);
  }

  return (
    <form onSubmit={onSubmit}>
      <input value={task} onChange={onInputChange} />
      <button type="submit">add</button>

      <ul>
      {
        tasks.map((task, index) => (
          <li key={index}>
          {task}
          <button className="up" onClick={() => taskUp(index)} disabled={index === 0}>up</button>
          <button className="down" onClick={() => taskDown(index)} disabled={index === tasks.length - 1}>down</button>
          <button className="remove" onClick={() => removeTask(task)}>remove</button>
          </li>
        ))
      }
      </ul>
    </form>
  );
}
