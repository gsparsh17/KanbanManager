import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

interface TaskListProps {
  onEditTask: (task: import('../types/task').Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEditTask }) => {
  const { tasks, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div>
      <div className="mb-4 flex flex-wrap">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mr-2 mb-2 p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="mb-2 p-2 border rounded"
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>
      <ul className="space-y-4">
        {sortedTasks.map(task => (
          <li key={task.id} className="bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all duration-300 shadow rounded-lg p-4">
            <h3 className="font-bold text-lg text-purple-800">{task.title}</h3>
            <p className="text-gray-700">{task.description}</p>
            <p className="text-sm text-purple-600">Status: {task.status}</p>
            <p className="text-sm text-pink-600">Due Date: {task.dueDate}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => onEditTask({ ...task, status: task.status === 'Todo' ? 'Todo' : task.status === 'inProgress' ? 'inProgress' : 'Completed', priority: task.priority })}
                className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-1 px-2 rounded transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => updateTask({ ...task, status: 'Completed' })}
                className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-1 px-2 rounded transition-all duration-300"
              >
                Complete
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-bold py-1 px-2 rounded transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;