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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">CRUD App with Redux Toolkit</h1>
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-3 text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter item"
          />
          <button
            onClick={handleAdd}
            className="ml-3 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <ul className="space-y-4">
          {items.length > 0 ? items.map((item) => (
            <li key={item.id} className="flex justify-between items-center bg-gray-50 rounded-lg p-4 shadow-sm">
              <span className="text-lg text-gray-800">{item.name}</span>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(item.id, item.name)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Delete
                </button>
              </div>
            </li>
          )) : <p className="text-center text-gray-500">No items found</p>}
        </ul>
      </div>
    </div>
  );
};

export default App;
