'use client';

import { useEffect, useState, useCallback } from 'react';
import TaskService, { Task } from '../services/taskService';
import TaskList from '../components/task/TaskList';
import ConfirmModal from '../components/modals/ConfirmModal';
import Pagination from '../components/ui/Pagination';
import Header from '@/components/layout/Header';
import LoadingDots from '@/components/ui/LoadingDots';
import { utils, writeFile } from 'xlsx';

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await TaskService.getTasks();
        setTasks(tasksData);
        console.log("this is tasks data"+tasksData);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = (_id: string) => {
    setTaskToDelete(_id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (taskToDelete !== null) {
      try {
        await TaskService.deleteTask(taskToDelete);
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskToDelete));
        setShowModal(false);

        setCurrentPage(prevPage => {
          const newTotalPages = Math.ceil((tasks.length - 1) / tasksPerPage);
          return prevPage > newTotalPages ? newTotalPages : prevPage;
        });
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };

  const exportToExcel = useCallback(() => {
    const formattedTasks = tasks.map((task, index) => ({
      ID: index + 1,
      Title: task.title,
      Description: task.description,
      Status: task.status,
    }));
    const ws = utils.json_to_sheet(formattedTasks);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Tasks");
    writeFile(wb, "tasks.xlsx");
  }, [tasks]);
  
  
  // Pagination logic
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {!loading && <Header onExport={exportToExcel} />}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingDots />
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden mt-6 w-full max-w-4xl p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg shadow-lg">
  Your Tasks
</h2>


          <TaskList 
              tasks={tasks} 
              handleDelete={handleDelete} 
              currentPage={currentPage} 
              tasksPerPage={tasksPerPage} 
            />

          {tasks.length > tasksPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
      <ConfirmModal show={showModal} onClose={closeModal} onConfirm={confirmDelete} />
    </div>
  );
};

export default Home;
