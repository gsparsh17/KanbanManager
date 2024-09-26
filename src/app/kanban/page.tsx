const KanbanBoardPage = () => {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Kanban Board</h1>
        <div className="flex space-x-4">
          <div className="bg-gray-100 shadow-md rounded p-4 w-1/3">
            <h2 className="font-semibold mb-2">To Do</h2>
            <p>No tasks available.</p>
          </div>
          <div className="bg-gray-100 shadow-md rounded p-4 w-1/3">
            <h2 className="font-semibold mb-2">In Progress</h2>
            <p>No tasks available.</p>
          </div>
          <div className="bg-gray-100 shadow-md rounded p-4 w-1/3">
            <h2 className="font-semibold mb-2">Completed</h2>
            <p>No tasks available.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default KanbanBoardPage;
  