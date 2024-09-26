'use client';

import React, { useState } from 'react';
import TaskListPage from './tasks/page';  // Import your TaskListPage component
import KanbanBoard from '../components/KanbanBoard';  // Import your KanbanBoard component

export default function Home() {
  const [view, setView] = useState<'taskList' | 'kanban'>('taskList');  // State to switch between views

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
