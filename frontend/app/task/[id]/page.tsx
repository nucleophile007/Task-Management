"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import TaskService, { Task } from "../../../services/taskService";

const TaskDetail = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await TaskService.getTaskById(id);
        setTask(data);
      } catch (err) {
        setError("Failed to fetch task data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!task) return <p className="text-center text-gray-500">Task not found</p>;
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-xl shadow-xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-100">Task Details</h2>
        <div className="space-y-4 text-gray-300">
          <p className="text-lg">
            <strong className="text-gray-400">Title:</strong> {task.title}
          </p>
  
          {/* Description Section */}
          <div className="relative">
            <p className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-900 px-10 text-gray-400 text-xl font-semibold">
              Description
            </p>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md min-h-[50px] max-h-[300px] overflow-auto break-words">
              <p className="text-lg text-gray-200">{task.description}</p>
            </div>
          </div>
  
          <p className="text-lg">
            <strong className="text-gray-400">Status:</strong>{" "}
            <span className={`px-3 py-1 rounded-lg ${task.status === "COMPLETED" ? "bg-green-600 text-white" : "bg-yellow-500 text-white"}`}>
              {task.status}
            </span>
          </p>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => router.push("/")}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Back
          </button>
          <button
            onClick={() => router.push(`/update/${id}`)}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Edit Task
          </button>
        </div>
      </div>
    </div>
  );
  
  
  
  
};

export default TaskDetail;
