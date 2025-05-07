import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskList from "../../components/TaskList";
import { getTasks, searchTasks } from "../../api/tasks";
import { toast } from "react-toastify";
import { FaAnglesLeft } from "react-icons/fa6";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch tasks");
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleSearch = async () => {
    try {
      const data = await searchTasks({ search: searchTerm });
      setTasks(data);
    } catch (error) {
      toast.error("Search failed");
    }
  };

  const handleDelete = async (taskId) => {
    // Implement delete functionality
    toast.success("Task deleted successfully");
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  if (loading) {
    return <p className="text-gray-600">Loading...</p>;
  }

  return (
    <div className="p-4">
      <p className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2"
        >
          <FaAnglesLeft className="inline" />
          <span className=" text-blue-600 hover:text-blue-800 transition-colors">Go to Dashboard</span>
        </Link>
      </p>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Tasks</h1>
        <Link
          to="/tasks/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create Task
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
      </div>

      <TaskList tasks={tasks} onDelete={handleDelete} />
    </div>
  );
};

export default Tasks;
