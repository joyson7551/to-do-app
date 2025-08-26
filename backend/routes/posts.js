const router = require("express").Router();
const Post = require("../model/posts");


// router.post("/request", async (req, res) => {
//   const { title, description } = req.body;
//   const newPost = new Post({ title, description });
//   const savePost = await newPost.save();
//   const allPosts = await Post.find();

//   res.json({
//     success: true,
//     data: { 
    
//       created: savePost,
//       all: allPosts,
//     },
//   });
// });

router.post("/request", async (req, res) => {
  const { title, description } = req.body;

  try {
    const newPost = new Post({ title, description });
    const savedPost = await newPost.save();

    // Return only the created post object
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
});

router.get("/request", async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

router.get("/request/:postid", async (req, res) => {
  try {
    const { postid } = req.params;

    const post = await Post.findById(postid)
      .select("title description createdAt updatedAt")
      .lean();

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
        code: "POST_NOT_FOUND",
      });
    }

    res.set("Cache-Control", "public, max-age=3600");

    res.json({
      status: "success",
      data: post,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        status: "error",
        message: "Invalid post ID format",
        code: "INVALID_ID",
      });
    }

    console.error("GET Post Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      code: "SERVER_ERROR",
    });
  }
});


router.patch("/request/:postid", async (req, res) => {
  const { postid } = req.params;
  const { title, description } = req.body;

  const update = await Post.findByIdAndUpdate(
    postid,
    { $set: { title, description } },
    { $new: false }
  );
  const allPosts = await Post.find();

  res.json({ Status: "Updated sucessfully", Updated: update, Posts: allPosts });
});


router.delete("/request/:postid", async (req, res) => {
  const { postid } = req.params;
  const deleted = await Post.findByIdAndDelete(postid);

  res.json({
    Response:
      "post deleted successfully, the file will no longer available on our database",
    deleted_post: deleted,
  });
});

module.exports = router;
