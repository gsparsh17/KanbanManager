'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TaskListPage from './tasks/page';  // Import your TaskListPage component
import KanbanBoard from '../components/KanbanBoard';  // Import your KanbanBoard component

export default function Home() {
  const [view] = useState<'taskList' | 'kanban'>('taskList');  // State to switch between views
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // State to track authentication
  const router = useRouter();  // Next.js router for redirection

  useEffect(() => {
    // Check if the JWT token exists in localStorage (or cookies if you're using that)
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Redirect to login if no token found
      router.push('/login');
    } else {
      // You can optionally verify the token with your backend here
      setIsAuthenticated(true);  // Set as authenticated if token exists
    }
  }, [router]);

  if (!isAuthenticated) {
    return <p>Loading...</p>;  // Show a loading state while checking authentication
  }

  return (
    <div className="w-full bg-gradient-to-r dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
      {/* Render the selected view */}
      <div>
        {view === 'taskList' && <TaskListPage />}
        {view === 'kanban' && (
          <KanbanBoard
            tasks={[]} // Pass the tasks array from your state or context
            onEditTask={(task) => {/* Handle edit task */}}
            onUpdateTask={(task) => {/* Handle update task */}}
          />
        )}
      </div>
    </div>
  );
}
