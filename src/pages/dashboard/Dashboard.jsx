import React, { useState, useEffect } from "react";
import TaskList from "../../components/TaskList";
import { getDashboardTasks } from "../../api/tasks";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [tasks, setTasks] = useState({
    assignedTasks: [],
    createdTasks: [],
    overdueTasks: [],
    completedTasks: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardTasks = async () => {
      try {
        const data = await getDashboardTasks();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch dashboard tasks");
        setLoading(false);
      }
    };
    fetchDashboardTasks();
  }, []);

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-row justify-between md:flex-row md:justify-between mb-6">
        <h1 className="text-2xl mt-3 md:text-3xl font-bold mb-4 md:mb-0">
          Dashboard
        </h1>
        <div className="flex flex-col sm:flex-row gap-1 md:gap-9">
          <Link to={"/tasks/create"} className="mb-2 sm:mb-0">
            <span className="text-blue-600 hover:text-blue-800 capitalize transition-colors flex items-center">
              <IoIosAddCircleOutline className="inline mr-1" /> create new task
            </span>
          </Link>
          <Link to={"/tasks"}>
            <span className="text-blue-600 hover:text-blue-800 ml-3 transition-colors">
              See all Tasks
            </span>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow mb-6">
        <div className="flex  border-b">
          <button
            onClick={() => handleTabChange(0)}
            className={`px-4 py-2 font-medium ${
              tabValue === 0
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Assigned Tasks
          </button>
          <button
            onClick={() => handleTabChange(1)}
            className={`px-4 py-2 font-medium ${
              tabValue === 1
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Created Tasks
          </button>
          <button
            onClick={() => handleTabChange(2)}
            className={`px-4 py-2 font-medium ${
              tabValue === 2
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Overdue Tasks
          </button>
          <button
            onClick={() => handleTabChange(3)}
            className={`px-4 py-2 font-medium ${
              tabValue === 3
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Completed Tasks
          </button>
        </div>
      </div>

      {tabValue === 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Tasks Assigned to You ({tasks?.assignedTasks?.length})
          </h2>
          <TaskList tasks={tasks?.assignedTasks} showActions={false} />
        </>
      )}

      {tabValue === 1 && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Tasks Created by You ({tasks?.createdTasks?.length})
          </h2>
          <TaskList tasks={tasks.createdTasks} />
        </>
      )}

      {tabValue === 2 && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Overdue Tasks ({tasks.overdueTasks?.length})
          </h2>
          <TaskList tasks={tasks.overdueTasks} showActions={false} />
        </>
      )}

      {tabValue === 3 && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Completed Tasks ({tasks.completedTasks?.length || 0})
          </h2>
          <TaskList tasks={tasks.completedTasks} showActions={false} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
