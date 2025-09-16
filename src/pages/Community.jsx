import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [errors, setErrors] = useState({});

  const sessionId = localStorage.getItem("truthroom_session");

  //************Fetch public posts**************/
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/posts/public`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  //**********Fetch comments for each Post*********/
  useEffect(() => {
    posts.forEach((post) => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/comments/${post._id}`)
        .then((res) => {
          setComments((prev) => ({ ...prev, [post._id]: res.data }));
        })
        .catch((err) => console.error("Error fetching comments:", err));
    });
  }, [posts]);

  //***************Handle Comment****************/
  const handleCommentChange = (postId, text) => {
    setNewComments((prev) => ({ ...prev, [postId]: text }));
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const storedId = localStorage.getItem("truthroom_session");

      await axios.post(`${import.meta.env.VITE_API_URL}/comments`, {
        text: newComments[postId],
        postId,
        sessionId: storedId,
      });

      setComments((prev) => ({
        ...prev,
        [postId]: "", // reset input after success
      }));
    } catch (err) {
      console.error("Failed to add comment:", err);
      const reason = err?.response?.data?.reason || "Something went wrong";
      setErrors((prev) => ({ ...prev, [postId]: reason }));
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const storedId = localStorage.getItem("truthroom_session");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${commentId}`,
        {
          data: { sessionId: storedId },
        }
      );

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((c) => c._id !== commentId),
      }));
    } catch (err) {
      console.error("Failed to delete comment:", err);
      alert("You can only delete your own comment");
    }
  };

  //***************Handle Like***************/
  const handleToggleLike = async (postId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/toggle-like`,
        { sessionId },
        { headers: { "Cache-Control": "no-cache" } } // prevent 304
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: res.data.likes,
                likedBy: res.data.liked
                  ? [...(post.likedBy || []), sessionId]
                  : post.likedBy.filter((id) => id !== sessionId),
              }
            : post
        )
      );
    } catch (err) {
      console.error("Toggle like failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-400 p-6">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 mt-10">
        <h1 className="text-2xl font-bold mb-6">🌍 Community Feed</h1>

        {posts.map((post) => {
          const liked = post.likedBy?.includes(sessionId);

          return (
            <div
              key={post._id}
              className="bg-white shadow p-4 rounded-xl mb-6 border border-gray-200"
            >
              <p className="text-gray-800 mb-2 whitespace-pre-wrap">
                {post.text}
              </p>
              {post.responseAI && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-2 mb-2 rounded">
                  <p className="text-sm text-blue-800">
                    🤖 AI Response: {post.responseAI}
                  </p>
                </div>
              )}
              <p className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </p>

              {/* ✅ Like/Unlike button */}
              <button
                onClick={() => handleToggleLike(post._id)}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                {liked ? "💖 Unlike" : "🤍 Like"} {post.likes}
              </button>

              <hr className="my-4" />

              <div>
                <h3 className="font-semibold text-sm mb-2">💬 Comments</h3>
                {(comments[post._id] || []).map((comment) => (
                  <div
                    key={comment._id}
                    className="text-sm text-gray-700 border-b border-gray-100 py-1"
                  >
                    <span>{comment.text}</span>
                    {comment.sessionId === sessionId && ( // only show delete button for owner's comments
                      <button
                        onClick={() =>
                          handleDeleteComment(post._id, comment._id)
                        }
                        className="text-red-500 text-xs hover:underline ml-2"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
                <textarea
                  placeholder="Add a comment..."
                  value={newComments[post._id] || ""}
                  onChange={(e) =>
                    handleCommentChange(post._id, e.target.value)
                  }
                  className="w-full border rounded p-2 mt-2 text-sm resize-none"
                  rows={2}
                />
                {errors[post._id] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[post._id]}
                  </p>
                )}
                <button
                  onClick={() => handleCommentSubmit(post._id)}
                  className="mt-2 bg-indigo-600 text-white px-4 py-1 text-sm rounded hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </div>
          );
        })}

        {posts.length === 0 && (
          <p className="text-center text-gray-500">No public posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Community;
