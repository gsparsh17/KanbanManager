// src/types/task.ts
export interface Task {
    id: string;
    title: string;
    description?: string; // Optional field
    status: 'Todo' | 'inProgress' | 'Completed';
    priority: 'Low' | 'Medium' | 'High';
    dueDate?: string; // Changed from Date to string
}
