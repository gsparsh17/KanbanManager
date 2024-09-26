// src/components/TaskDropdown.tsx
import React, { useState } from 'react';
import { Task } from '../types/task';

interface TaskDropdownProps {
  task: Task;
  onStatusChange: (id: string, status: Task['status']) => void;
}

const TaskDropdown: React.FC<TaskDropdownProps> = ({ task, onStatusChange }) => {
  const [status, setStatus] = useState<Task['status']>(task.status);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Task['status'];
    setStatus(newStatus);
    onStatusChange(task.id, newStatus);
  };

  const getGradientClass = (status: Task['status']) => {
    switch (status) {
      case 'To Do':
        return 'bg-gradient-to-r from-red-400 to-red-600';
      case 'In Progress':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 'Completed':
        return 'bg-gradient-to-r from-green-400 to-green-600';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-600';
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      className={`p-2 border border-gray-300 rounded text-white font-semibold ${getGradientClass(status)}`}
    >
      <option value="To Do" className={getGradientClass('To Do')}>To Do</option>
      <option value="In Progress" className={getGradientClass('In Progress')}>In Progress</option>
      <option value="Completed" className={getGradientClass('Completed')}>Completed</option>
    </select>
  );
};

export default TaskDropdown;
