import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAllUsers } from "../api/auth";
import dayjs from "dayjs";

const TaskForm = ({ initialValues, onSubmit, isEditing }) => {
  const [users, setUsers] = useState([]);
  // console.log("TaskForm is rendering");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(); //getting all users data from backed...
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .max(100, "Title must be 100 characters or less"),
    description: Yup.string()
      .required("Description is required")
      .max(500, "Description must be 500 characters or less"),
    dueDate: Yup.date()
      .required("Due date is required")
      .min(dayjs().startOf("day"), "Due date must be in the future"),
    priority: Yup.string()
      .required("Priority is required")
      .oneOf(["low", "medium", "high"]),
    assignedTo: Yup.string().required("Assignee is required"),
    status: isEditing
      ? Yup.string()
          .required("Status is required")
          .oneOf(["pending", "in-progress", "completed"])
      : null,
  });

  const formik = useFormik({
    initialValues: initialValues || {
      //creating tasks from users
      title: "",
      description: "",
      dueDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
      priority: "medium",
      assignedTo: "",
      status: "pending",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      // console.log(onsubmit(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
          )}
        </div>

        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.description}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
            Due Date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            value={formik?.values?.dueDate}
            onChange={formik.handleChange}
          />
          {formik.touched.dueDate && formik.errors.dueDate && (
            <p className="mt-1 text-sm text-red-600">{formik?.errors.dueDate}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            value={formik?.values.priority}
            onChange={formik.handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {formik.touched.priority && formik.errors.priority && (
            <p className="mt-1 text-sm text-red-600">
              {formik?.errors.priority}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="assignedTo"
            className="block text-sm font-medium text-gray-700"
          >
            Assign To
          </label>
          <select
            id="assignedTo"
            name="assignedTo"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            value={formik?.values.assignedTo}
            onChange={formik.handleChange}
          >
            <option value="">Select a user</option>
            {users?.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
          {formik?.touched.assignedTo && formik?.errors.assignedTo && (
            <p className="mt-1 text-sm text-red-600">
              {formik?.errors.assignedTo}
            </p>
          )}
        </div>

        {isEditing && (
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              value={formik?.values.status}
              onChange={formik.handleChange}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {formik?.touched.status && formik.errors.status && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.status}
              </p>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isEditing ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
