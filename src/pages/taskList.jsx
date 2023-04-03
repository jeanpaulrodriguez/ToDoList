import React, { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case "toggle":
      return state.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );
    case "delete":
      return state.filter((task) => task.id !== action.id);
    default:
      throw new Error();
  }
}

export function TaskList() {
  const [tasks, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (text.trim()) {
      dispatch({ type: "add", text });
      setText("");
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">To Do List</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Add task..."
              className="border rounded-md py-2 px-3 w-full mr-2"
            />
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-600 text-blue-950 font-semibold py-2 px-4 rounded-lg"
            >
              Add
            </button>
          </div>
        </form>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch({ type: "toggle", id: task.id })}
                  className="mr-2"
                />
                <span
                  className={`${
                    task.completed ? "line-through text-gray-500" : ""
                  } font-medium`}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => dispatch({ type: "delete", id: task.id })}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}