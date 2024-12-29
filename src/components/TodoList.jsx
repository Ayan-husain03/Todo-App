import React from "react";
import { useId } from "react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
import { BsFillSaveFill } from "react-icons/bs";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  //   adding task
  const addTask = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setTask([
      ...task,
      {
        id: Date.now(),
        text: input,
        completed: false,
      },
    ]);
    setInput("");
  };

  //   deleteTask
  const deleteTask = (id) => {
    const updatedTask = task.filter((task) => task.id !== id);
    setTask(updatedTask);
  };
  // editsave

  const saveEdit = () => {
    const saveTask = task.map((task) =>
      task.id == editId ? { ...task, text: editText } : task
    );
    setTask(saveTask);
    setEditId(null);
    setEditText("");
  };

  // complete Task
  const completeTask = (id) => {
    const completeTask = task.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTask(completeTask)
  };

  return (
    <div>
      <form className="flex justify-center mt-10" onSubmit={addTask}>
        <input
          type="text"
          className="input input-bordered"
          placeholder="type here.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary">Add</button>
      </form>
      <ul>
        {task.map((task) => (
          <li
            className={` ${
              task.completed ? "bg-green-300 line-through" : ""
            } bg-sky-300/50 p-3 text-xl my-5 md:w-1/2 w-[90%] rounded-md mx-auto flex items-center justify-between`}
            key={task.id}
          >
            {editId === task.id ? (
              <>
                <input
                  type="text"
                  className="input input-bordered"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div>
                  <button
                    className=" mx-2 btn text-xl text-white  btn-success"
                    onClick={saveEdit}
                  >
                    <BsFillSaveFill />
                  </button>
                  <button
                    className="btn text-xl"
                    onClick={() => setEditId(null)}
                  >
                    <FcCancel />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => completeTask(task.id)}
                  />
                  <span className="mx-3">{task.text}</span>
                </div>
                <div>
                  <button
                    className="mx-2 text-xl btn btn-warning"
                    onClick={() => {
                      setEditId(task.id), setEditText(task.text);
                    }}
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    className="btn text-xl btn-error"
                    onClick={() => deleteTask(task.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
9;
