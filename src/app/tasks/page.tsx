"use client";

import { useState, useEffect } from 'react';
import TaskForm from '../../components/TaskForm';
import { useTasks, Task } from '../../context/TaskContext';
import KanbanBoard from '../../components/KanbanBoard';
import TaskList from '../../components/TaskList';
import { useTheme } from 'next-themes';
import { toast } from 'react-toastify';

const TaskListPage = () => {
  const { tasks, addTask, updateTask, deleteTask, error, setError } = useTasks();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [activeView, setActiveView] = useState('list'); // 'list' or 'kanban'
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Simulating loading effect
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    addTask(task);
    setIsFormVisible(false);
    console.log('Adding task'); // Add this line
    toast.success('Task added successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleUpdateTask = (task: Task) => {
    updateTask(task);
    setIsFormVisible(false);
    setEditingTask(null);
    toast.success('Task updated successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast.success('Task deleted successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormVisible(true);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Ensure the theme is applied correctly
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-purple-900 dark:via-pink-900 dark:to-red-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out w-full ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900'
        : 'bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200'
    }`}>
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 md:mb-0 animate-fade-in-down bg-clip-text text-transparent ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-400 to-pink-600'
              : 'bg-gradient-to-r from-purple-600 to-blue-600'
          }`}>Task Management</h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
            }`}
          >
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {error && (
          <div className={`border-l-4 p-4 md:p-6 mb-6 rounded-lg shadow-md animate-fade-in ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-red-900 to-pink-900 border-red-700 text-red-100'
              : 'bg-gradient-to-r from-red-100 to-pink-100 border-red-500 text-red-700'
          }`} role="alert">
            <p className="font-bold text-lg mb-2">Error</p>
            <p>{error}</p>
            <button 
              onClick={() => setError(null)}
              className="absolute top-0 right-0 mt-4 mr-4 text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="mb-8 flex flex-wrap items-center justify-center space-x-2 md:space-x-4">
          <button
            onClick={() => setActiveView('list')}
            className={`mb-2 px-4 py-2 md:px-8 md:py-4 rounded-full font-bold text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
              activeView === 'list'
                ? theme === 'dark'
                  ? 'bg-gradient-to-r from-indigo-700 to-purple-700 shadow-lg'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                : theme === 'dark'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                : 'bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setActiveView('kanban')}
            className={`mb-2 px-4 py-2 md:px-8 md:py-4 rounded-full font-bold text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
              activeView === 'kanban'
                ? theme === 'dark'
                  ? 'bg-gradient-to-r from-purple-700 to-pink-700 shadow-lg'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                : theme === 'dark'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                : 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500'
            }`}
          >
            Kanban View
          </button>
          <button
            onClick={() => {
              setEditingTask(null);
              setIsFormVisible(true);
            }}
            className={`mb-2 px-4 py-2 md:px-8 md:py-4 rounded-full font-bold text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700'
                : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600'
            }`}
          >
            Add New Task
          </button>
        </div>

        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center animate-fade-in z-50" id="my-modal">
            <div className={`relative p-4 md:p-8 w-full max-w-md m-auto rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-800 via-indigo-900 to-purple-900'
                : 'bg-gradient-to-br from-violet-400 to-pink-200'
            }`}>
              <button
                onClick={() => {
                  setIsFormVisible(false);
                  setEditingTask(null);
                }}
                className={`absolute top-0 right-0 mt-4 mr-4 transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <TaskForm
                onClose={() => {
                  setIsFormVisible(false);
                  setEditingTask(null);
                }}
               // onSubmit={editingTask ? handleUpdateTask : handleAddTask}
               // task={editingTask ? { ...editingTask, priority: editingTask.priority ?? 'Medium' } : null}
              />
            </div>
          </div>
        )}

        <div className={`rounded-lg shadow-2xl p-4 md:p-8 transition-all duration-300 ease-in-out hover:shadow-3xl ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 via-indigo-900 to-purple-900'
            : 'bg-gradient-to-br from-violet-400 to-pink-200'
        }`}>
         // {activeView === 'list' ? (
            <TaskList onEditTask={handleEditTask} />
          ) : (
            <KanbanBoard 
              tasks={tasks} 
              onEditTask={handleEditTask} 
              onUpdateTask={handleUpdateTask} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;