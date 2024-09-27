"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types/task'; // Import from types

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id'>) => Promise<void>; // Adjust return type to Promise<void>
    updateTask: (task: Task) => Promise<void>; // Adjust return type to Promise<void>
    deleteTask: (id: string) => Promise<void>;
    error: string | null;
    setError: (error: string | null) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

    const addTask = async (task: Omit<Task, 'id'>) => {
        try {
            const response = await fetch('http://localhost:5000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: uuidv4(), // Call uuidv4() to get a unique ID
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    dueDate: task.dueDate,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            const newTask = await response.json();
            setTasks([...tasks, newTask]);
        } catch (err) {
            setError("Error adding task");
        }
    };

    const updateTask = async (task: Task) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    dueDate: task.dueDate,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            const updatedTask = await response.json();
            setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        } catch (err) {
            setError("Error updating task");
        }
    };

    const deleteTask = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            setError("Error deleting task");
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, error, setError }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};
