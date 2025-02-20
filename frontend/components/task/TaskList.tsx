import { Task } from '../../services/taskService';
import TaskItem from './TaskItem';
import { useState } from "react";

interface TaskListProps {
  tasks: Task[];
  handleDelete: (id: string) => void;
  currentPage: number;
  tasksPerPage: number;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, handleDelete, currentPage, tasksPerPage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filtered tasks logic (Fixed status comparison)
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "" || task.status.toLowerCase() === statusFilter.toLowerCase(); // ✅ Case-insensitive comparison
    return matchesSearch && matchesStatus;
  });
  return (
    <div className="overflow-hidden rounded-xl shadow-md bg-gray-900 text-gray-200">
    <div className="flex justify-between items-center gap-14 mb-4">
  <input
    type="text"
    placeholder="Search by title..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border px-3 py-2 rounded-md w-1/2"
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border px-3 py-2 rounded-md w-1/2"
  >
    <option value="">All</option>
    <option value="Pending">Pending</option>
    <option value="Done">Done</option>
  </select>
</div>
    <table className="min-w-full border-collapse">
      {/* Table Header */}
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="px-6 py-4 text-left text-sm font-semibold uppercase border-b border-gray-700">ID</th>
          <th className="px-6 py-4 text-left text-sm font-semibold uppercase border-b border-gray-700">Title</th>
          <th className="px-6 py-4 text-left text-sm font-semibold uppercase border-b border-gray-700">Status</th>
          <th className="px-6 py-4 text-left text-sm font-semibold uppercase border-b border-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <TaskItem
                key={task._id}
                task={task}
                index={index}
                currentPage={currentPage}
                tasksPerPage={tasksPerPage}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
    </table>
    </div>
  );
};

export default TaskList;
