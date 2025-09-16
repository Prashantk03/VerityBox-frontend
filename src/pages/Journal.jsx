import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Journal() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const sessionId = localStorage.getItem("truthroom_session");
    if (!sessionId) {
      setError("No session found.");
      setLoading(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/posts/session/${sessionId}`)
      .then((res) => {
        setPosts(res.data || []);
      })
      .catch(() => {
        setError("Failed to load journal posts.");
      })
      .finally(() => setLoading(false));
  }, []);

  //*****************Delete Logic*****************/
  const handleDelete = async (postId) => {
    const sessionId = localStorage.getItem("truthroom_session");
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        data: { sessionId },
      });
      
      setPosts(posts.filter((post) => post._id !== postId));
      alert("Post deleted successfully");
    } catch (err) {
      setError("Failed to delete post.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-400 p-6">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-6 ">
        <h2 className="text-2xl font-bold mb-4 text-center">🧠 Your Journal</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="text-gray-600 text-center">No posts yet.</p>
        )}

        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
            >
              <p className="text-sm text-gray-500 mb-2">
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <p className="font-medium">{post.text}</p>
              {post.responseAI && (
                <div className="mt-3 p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                  <p className="font-semibold text-sm text-blue-700">
                    AI Reflection:
                  </p>
                  <p className="text-sm">{post.responseAI}</p>
                </div>
              )}
              <button
                onClick={() => handleDelete(post._id)}
                className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
