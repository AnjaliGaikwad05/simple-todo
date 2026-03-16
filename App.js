import { useState } from "react";
import "./styles.css";

export default function App() {
  const [list, setList] = useState([{ id: 1, text: "test" }]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  // validation
  const validate = (value) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "Task cannot be empty";
    }

    if (trimmed.length < 3) {
      return "Task must be at least 3 characters";
    }

    if (list.some((item) => item.text.toLowerCase() === trimmed.toLowerCase())) {
      return "Task already exists";
    }

    return "";
  };

  const handleSubmit = () => {
    const validationError = validate(task);

    if (validationError) {
      setError(validationError);
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: task.trim()
    };

    setList((prev) => [newTodo, ...prev]);
    setTask("");
    setError("");
  };

  const removeTodo = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTodo = (id, value) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, text: value } : item
      )
    );
  };

  return (
    <div className="container">
      <div className="todo-card">
        <h1>Todo List</h1>

        <div className="input-section">
          <input
            type="text"
            value={task}
            placeholder="Enter a task..."
            onChange={(e) => {
              setTask(e.target.value);
              if (error) setError("");
            }}
          />

          <button onClick={handleSubmit}>Add</button>
        </div>

        {error && <p className="error">{error}</p>}

        <ul className="todo-list">
          {list.map((item) => (
            <li key={item.id} className="todo-item">
              {editingId === item.id ? (
                <input
                  value={item.text}
                  onChange={(e) => updateTodo(item.id, e.target.value)}
                />
              ) : (
                <span>{item.text}</span>
              )}

              <div className="actions">
                <button
                  onClick={() =>
                    setEditingId(editingId === item.id ? null : item.id)
                  }
                >
                  {editingId === item.id ? "Save" : "Edit"}
                </button>

                <button onClick={() => removeTodo(item.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}