// src/App.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem, deleteItem } from "./features/itemSlice";

const App = () => {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.items);

  const handleAdd = () => {
    if (!input.trim()) return;
    if (editId) {
      dispatch(updateItem({ id: editId, newData: { name: input } }));
      setEditId(null);
    } else {
      dispatch(addItem({ id: Date.now(), name: input }));
    }
    setInput("");
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setInput(name);
  };

  const handleDelete = id => {
    dispatch(deleteItem(id));
  };

  return (
    <div className="container w-1/2 mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold mb-5">CRUD App with Redux Toolkit</h1>
      <div className="mb-5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Enter item"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>
      <ul className="list-disc pl-5">
        {items ?items.map((item) => (
          <li key={item.id} className="flex justify-between mb-2">
            <span>{item.name}</span>
            <div>
              <button
                onClick={() => handleEdit(item.id, item.name)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        )): <p>No Item Found</p>}
      </ul>
    </div>
  );
};

export default App;
