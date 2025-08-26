import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost, updatePost } from "../redux/postsSlice";
import { toast } from "sonner";
import Confirmation from "../ui/Modal/Confirmation";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  const [editingPostId, setEditingPostId] = useState(null);
  const [editData, setEditData] = useState({ title: "" });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleEditStart = (post) => {
    setEditingPostId(post._id);
    setEditData({ title: post.title });
  };

  const handleEditCancel = () => {
    setEditingPostId(null);
    toast.info("Edit Cancelled");
    setEditData({ title: "" });
  };

  const handleEditSave = (id) => {
    dispatch(updatePost({ id, data: editData }))
      .unwrap()
      .then(() => {
        handleEditCancel();
        toast.success("Edit Saved");
      });
  };
  
  const handleDeleteConfirmed = () => {
    dispatch(deletePost(postToDelete));
    toast.info("Task Deleted");
    setConfirmOpen(false);
    setPostToDelete(null);
  };

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">All Tasks</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts available.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post._id}
              className="bg-white p-4 rounded shadow-inner border-black flex justify-between items-start flex-wrap"
            >
              <div className="flex-1">
                {editingPostId === post._id ? (
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <>
                    <strong className="text-lg font-medium">
                      {post.title}
                    </strong>
                    <p className="mt-1 text-gray-700">{post.description}</p>
                  </>
                )}
              </div>

              <div className="ml-4 flex space-x-2 mt-2">
                {editingPostId === post._id ? (
                  <>
                    <button
                      onClick={() => handleEditSave(post._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setPostToDelete(post._id);
                        setConfirmOpen(true);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditStart(post)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <Confirmation
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirmed}
      />
    </div>
  );
};

export default PostList;
