import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/postsSlice";
import { toast } from "sonner";

const CreatePostForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost(formData))
      .unwrap()
      .then(() => {
        toast.success("Task added successfully!");
        setFormData({ title: "", description: "" });
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-lg drop-shadow-lg border-2 border-gray-200 w-full max-w-[600px]"
    >
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-1">
          Task Name
        </label>
        <input
          type="text"
          name="title"
          placeholder="Add tasks..."
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 drop-shadow border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-2/6 px-4 py-2 drop-shadow  bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
