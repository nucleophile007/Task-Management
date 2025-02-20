import Link from 'next/link';
import { FaTrashAlt, FaCog } from 'react-icons/fa';
import { Trash2, Edit3, Eye } from 'lucide-react'; // Sleek modern icons
import { Task } from '../../services/taskService';

interface TaskItemProps {
  task: Task;
  index: number;
  currentPage: number;
  tasksPerPage: number;
  handleDelete: (_id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index, currentPage, tasksPerPage, handleDelete }) => {
  const getStatusColorClass = (status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED') => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500';
      case 'IN_PROGRESS':
        return 'bg-blue-500';
      case 'COMPLETED':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <tr className="border-b border-gray-200 bg-white hover:bg-gray-50">
      {/* Fixed ID Calculation */}
      <td className="px-5 py-5 text-sm text-gray-700">
        {(currentPage - 1) * tasksPerPage + index + 1}
      </td>
      <td className="px-5 py-5 text-sm text-gray-700">{task.title}</td>
      <td className="px-5 py-5 text-sm flex items-center text-gray-700">
        <span className={`h-3 w-3 rounded-full mr-2 ${getStatusColorClass(task.status)}`}></span>
        {task.status}
      </td>
      <td className="px-6 py-4 text-sm">
        <div className="inline-flex space-x-2">
          {/* DETAILS Button */}
          <Link href={`/task/${task._id}`} legacyBehavior>
            <a
              className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-md flex items-center justify-center transition"
              title="View Details"
            >
              <Eye size={18} />
            </a>
          </Link>

          {/* DELETE Button */}
          <button
            onClick={() => handleDelete(task._id)}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md flex items-center justify-center transition"
            title="Delete Task"
          >
            <Trash2 size={18} />
          </button>

          {/* UPDATE Button */}
          <Link href={`/update/${task._id}`} legacyBehavior>
            <a
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md flex items-center justify-center transition"
              title="Edit Task"
            >
              <Edit3 size={18} />
            </a>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default TaskItem;
