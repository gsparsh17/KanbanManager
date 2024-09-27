"use client";

import React, { useState } from "react";
import { Task } from "../types/task";
import { useTasks } from "../context/TaskContext";
import Modal from "./Modal";

interface TaskFormProps {
  task?: Task | null;
  onSubmit: () => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task = null, onClose }) => {
  const { addTask, updateTask } = useTasks();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<Task["status"]>(task?.status || "Todo");
  const [priority, setPriority] = useState<Task["priority"]>(task?.priority || "Medium");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      id: task ? task.id : Date.now().toString(),
      title,
      description,
      status,
      priority,
      dueDate,
    };

    if (task) {
      updateTask({
        ...newTask,
        status: newTask.status === "Todo" ? "Todo" :
                newTask.status === "inProgress" ? "inProgress" :
                "Completed",
        description: newTask.description || "",
        dueDate: newTask.dueDate || "",
      });
    } else {
      const { id, ...taskWithoutId } = newTask;
      addTask({
        ...taskWithoutId,
        status: newTask.status === "Todo" ? "Todo" :
                newTask.status === "inProgress" ? "inProgress" :
                "Completed",
        description: newTask.description || "",
        dueDate: newTask.dueDate || "",
      });
    }

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const getStatusGradient = (status: Task["status"]) => {
    switch (status) {
      case "Todo":
        return "from-indigo-400 to-blue-600";
      case "inProgress":
        return "from-amber-400 to-orange-600";
      case "Completed":
        return "from-emerald-400 to-green-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getPriorityGradient = (priority: Task["priority"]) => {
    switch (priority) {
      case "Low":
        return "from-teal-400 to-cyan-600";
      case "Medium":
        return "from-amber-400 to-orange-600";
      case "High":
        return "from-rose-400 to-red-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6 bg-gradient-to-br from-violet-100 to-fuchsia-100">
        <h2 className="text-2xl font-bold mb-4 text-indigo-800">
          {task ? "Edit Task" : "Create a New Task"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-indigo-700">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full p-2 border border-indigo-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-indigo-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full p-2 border border-indigo-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-indigo-700">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Task["status"])}
              className={`mt-1 w-full p-2 border border-indigo-300 rounded text-white font-semibold bg-gradient-to-r ${getStatusGradient(status)} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200`}
            >
              <option value="Todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-indigo-700">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task['priority'])}
              className={`mt-1 w-full p-2 border border-indigo-300 rounded text-white font-semibold bg-gradient-to-r ${getPriorityGradient(priority)} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200`}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-indigo-700">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 w-full p-2 border border-indigo-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
            >
              {task ? "Update Task" : "Add Task"}
            </button>
            <button
              type="button"
              className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 px-4 py-2 rounded hover:from-gray-400 hover:to-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-200"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TaskForm; 