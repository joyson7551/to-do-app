import React, { useEffect, useState } from "react";
import CreatePostForm from "./components/CreatePostForm";
import PostList from "./components/PostList";
import "./index.css";
import { Toaster } from 'sonner'

const App = () => {
  const [posts, setPosts] = useState([]);

  const refreshPosts = () => {
    fetch("http://localhost:5000/posts/request")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    
      <>
      <Toaster 
      position="top-center"
      expand={false}
      richColors
      />
      {/* responsive width */}
      <div className="mx-auto min-h-screen flex flex-col justify-center items-center p-6 bg-white">

      
      <h1 className="text-2xl font-bold mb-2 text-center">To-Do-List</h1>
      <CreatePostForm refreshPosts={refreshPosts} />
      <hr className="my-6" />
      <PostList posts={posts} refreshPosts={refreshPosts} />
    </div>
    </>
  );
};

export default App;