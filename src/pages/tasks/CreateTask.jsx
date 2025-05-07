import React from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../../components/TaskForm";
import { createTask } from "../../api/tasks";
import { toast } from "react-toastify";

const CreateTask = () => {
  const navigate = useNavigate();
  // console.log("hey create")

  const handleSubmit = async (taskData) => {
    try {
      await createTask(taskData);
      toast.success("Task created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to create task");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Task</h1>
    <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateTask;
