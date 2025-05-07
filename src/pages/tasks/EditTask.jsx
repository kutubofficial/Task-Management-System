import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../../components/TaskForm";
import { getTasks, updateTask } from "../../api/tasks";
import { toast } from "react-toastify";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const tasks = await getTasks();
        const foundTask = tasks?.find((t) => t._id === id);
        if (foundTask) {
          setTask({
            ...foundTask,
            assignedTo: foundTask.assignedTo._id,
            dueDate: new Date(foundTask.dueDate).toISOString().split("T")[0],
          });
        } else {
          toast.error("Task not found");
          navigate("/tasks");
        }
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch task");
        setLoading(false);
        navigate("/tasks");
      }
    };
    fetchTask();
  }, [id, navigate]);

  const handleSubmit = async (taskData) => {
    try {
      await updateTask(id, taskData);
      toast.success("Task updated successfully!");
      navigate("/tasks");
    } catch (error) {
      toast.error(error.message || "Failed to update task");
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading...</p>;
  }

  if (!task) {
    return <p className="text-red-500">Task not found</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Task</h1>
      <TaskForm initialValues={task} onSubmit={handleSubmit} isEditing={true} />
    </div>
  );
};

export default EditTask;
