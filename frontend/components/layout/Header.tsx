import Link from 'next/link';
import { FaFileExcel, FaPlus } from 'react-icons/fa';

interface HeaderProps {
  onExport: () => void;
}

const Header: React.FC<{ onExport: () => void }> = ({ onExport }) => {
  return (
    <div className="flex justify-between items-center bg-blue-600 text-white py-4 px-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold tracking-wide">📋 Task Management</h1>
      <div className="flex space-x-4">
        <button
          onClick={onExport}
          className="flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition"
        >
          📄 Export to Excel
        </button>
        <Link href="/create" legacyBehavior>
        <button className="flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition">
          ➕ Add New Task
        </button></Link>
        
      </div>
    </div>
  );
};

export default Header;
