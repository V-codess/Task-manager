import React, { useEffect, useState } from "react";
import "./styles.css";
import { AiOutlinePlus, AiOutlineFilter, AiOutlineDelete } from "react-icons/ai";

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  subTitle: string;
}
function Todo() {
  let date = new Date();
  const [model, openModel] = useState(false);
  const [task, setTask] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [sort, sorted] = useState(false);
  const [textBox, openTextBox] = useState(false);
  const [taskText, setTaskText] = useState("");
  const filterTask = () => {
    openModel(!model);
    if(textBox === true){
      openTextBox(false);
    }
  };
  const sorting = () => {
    let sortedAsced = [...task].sort((a, b) => a.name.localeCompare(b.name));
    setTask(sortedAsced);    
    openModel(!model);
    sorted(!sort);
  };
  const sortingDesc = () => {
    let sortedAsced = [...task].sort((a, b) => b.name.localeCompare(a.name));
    setTask(sortedAsced);
    openModel(!model);
    sorted(!sort);
  };
  const cateogrySort = () => {
    openModel(!model);
  };
  const openText = () => {
    openTextBox(!textBox);
  };
  const addTask = () => {
    if (taskText.trim()) {
      const newTask: Task = {
        id: task.length + 1,
        name: taskText,
        completed: false,
        subTitle: "new task",
      };
      const newTaskList = [...task, newTask];
      setTask(newTaskList);
      localStorage.setItem("tasks", JSON.stringify(newTaskList));
      setTaskText("");
      openTextBox(false);
    } else {
      console.log("Task cannot be empty");
    }
  };
  const deleteTask = (id: number) => {
  const updatedTasks = task.filter(t => t.id !== id);
  setTask(updatedTasks);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTask(JSON.parse(savedTasks));
    }
  }, []);
  return (
    <div className="mainContainer">
      <div>
        <h3 className="heading">TASK MANAGER</h3>
        <div className="iconButton">
          <h5 className="date">{date.toDateString()}</h5>
          <button onClick={() => filterTask()} className="button">
            <AiOutlineFilter size={20} />
          </button>
        </div>
      </div>
      {model === true ? (
        <div className="filterContainer">
          <p
            onClick={() => {
              sorting();
            }}
          >
            Sort a-z
          </p>
          <p
            onClick={() => {
              sortingDesc();
            }}
          >
            Sort z-a
          </p>
          <p
            onClick={() => {
              cateogrySort();
            }}
          >
            Sort by category
          </p>
        </div>
      ) : (
        <></>
      )}
      {textBox === true ? (
        <div className="textBoxContainer">
          <textarea
            value={taskText}
            className="textInput"
            placeholder="Your task"
            rows={5}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <div className="buttonContainerText">
            <button onClick={() => openText()} className="cancelButton">
              Cancel
            </button>
            <button onClick={addTask} className="okButton">
              Okay
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="todoContainer">
        {task.length === 0 ? <p style={{textAlign:"center"}}>No tasks...</p> :task.map((todo) => {
          return (
            <div className="taskCard" key={todo.id}>
              <h4>
                {todo.name.length > 20
                  ? `${todo.name.substring(0, 30)}...`
                  : todo.name}
              </h4>
                <button onClick={()=>deleteTask(todo.id)} className="deleteBtn"><AiOutlineDelete size={20} /></button>
            </div>
          );
        })}
      </div>
      <div className="buttonContainer">
        <button onClick={() => openText()} className="button">
          <div className="iconButton">
            <AiOutlinePlus />
            <p className="add">Add a task</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Todo;
