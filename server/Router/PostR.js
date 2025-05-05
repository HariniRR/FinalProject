const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, likePost, addComment, deletePost } = require("../Controller/PostC");

router.post("/", createPost);
router.get("/", getAllPosts);
router.put("/like/:id", likePost);
router.put("/comment/:id", addComment);
router.delete("/:id", deletePost);

module.exports = router;
