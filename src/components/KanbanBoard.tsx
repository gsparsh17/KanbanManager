import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Task, useTasks } from '../context/TaskContext';

interface KanbanBoardProps {
  onEditTask: (task: Task) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ onEditTask }) => {
  const { tasks, updateTask } = useTasks(); // Use tasks from context

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const task = tasks.find(t => t.id === draggableId);

    if (task && source.droppableId !== destination.droppableId) {
      const updatedTask = {
        ...task,
        status: destination.droppableId as 'Todo' | 'inProgress' | 'Completed',
      };
      updateTask(updatedTask);
    }
  };

  const columns = {
    todo: tasks.filter(t => t.status === 'Todo'),
    inProgress: tasks.filter(t => t.status === 'inProgress'),
    completed: tasks.filter(t => t.status === 'Completed'),
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row flex-wrap -mx-2">
        {Object.entries(columns).map(([status, columnTasks]) => (
          <div key={status} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <h2 className="text-xl font-bold mb-2 capitalize">
              {status.replace(/([A-Z])/g, ' $1').trim()}
            </h2>
            <Droppable droppableId={status}>
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gradient-to-br from-purple-100 to-pink-100 p-2 rounded-lg min-h-[200px] transition-all duration-300 border-2 border-transparent hover:border-purple-300 focus-within:border-purple-400"
                >
                  {columnTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2 p-2 bg-gradient-to-r from-white to-gray-50 shadow rounded-lg transition-all duration-300 hover:from-purple-50 hover:to-pink-50 transform hover:scale-105 border border-transparent hover:border-purple-200 focus-within:border-purple-300"
                        >
                          <h3 className="font-bold text-purple-700 text-sm md:text-base">{task.title}</h3>
                          <p className="text-xs md:text-sm text-gray-600">{task.description}</p>
                          <p className="text-xs text-pink-600">Due: {task.dueDate}</p>
                          <button
                            onClick={() => onEditTask(task)}
                            className="mt-2 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-xs font-bold py-1 px-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          >
                            Edit
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
