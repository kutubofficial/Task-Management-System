import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTasks } from "../../api/tasks";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import PriorityChip from "../../components/PriorityChip";

const TaskDetails = () => {
  const { id } = useParams(); //capturing the single task targeting ID
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const tasks = await getTasks();
        const foundTask = tasks.find((t) => t._id === id);
        if (foundTask) {
          setTask(foundTask);
        } else {
          toast.error("Task not found");
        }
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch task");
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) {
    return <p className="text-gray-600">Loading...</p>;
  }

  if (!task) {
    return <p className="text-red-500">Task not found</p>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Details</h1>
        <Link
          to={`/tasks/edit/${task._id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Edit Task
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <h2 className="text-2xl font-semibold mb-4">{task.title}</h2>
            <p className="text-gray-700 mb-4">{task.description}</p>
          </div>

          <div>
            <p className="mb-3">
              <strong>Created By:</strong> {task.createdBy?.name || "Unknown"}
            </p>
            <p className="mb-3">
              <strong>Assigned To:</strong> {task.assignedTo?.name || "Unknown"}
            </p>
          </div>

          <div>
            <p className="mb-3">
              <strong>Due Date:</strong>{" "}
              {dayjs(task.dueDate).format("MMM D, YYYY")}
              {dayjs(task.dueDate).isBefore(dayjs()) &&
                task.status !== "completed" && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                    Overdue
                  </span>
                )}
            </p>
            <p className="mb-3">
              <strong>Priority:</strong>{" "}
              <PriorityChip priority={task.priority} />
            </p>
            <p className="mb-3">
              <strong>Status:</strong>
              <span
                className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : task.status === "in-progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {task.status}
              </span>
            </p>
          </div>

          <div className="col-span-2">
            <hr className="my-4 border-gray-200" />
            <p className="text-sm text-gray-500">
              Created: {dayjs(task.createdAt).format("MMM D, YYYY h:mm A")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
