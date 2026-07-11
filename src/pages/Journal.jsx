import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

export default function Journal() {
  const navigate = useNavigate();
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
      toast.success("Post deleted successfully");
    } catch (err) {
      setError("Failed to delete post.");
      toast.error("Failed to delete post.");
      console.error(err);
    }
  };

  return (
  <>
    <Navbar />

    <main className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            📖 Your Journal
          </h1>

          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            Every anonymous thought you've shared is safely stored here.
            Reflect on your journey, revisit AI insights, and continue growing.
          </p>

          {!loading && !error && posts.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-3">
                <p className="text-2xl font-bold text-white">
                  {posts.length}
                </p>
                <p className="text-sm text-slate-400">
                  Journal Entries
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-3">
                <p className="text-2xl font-bold text-white">
                  {posts.filter((post) => post.responseAI).length}
                </p>
                <p className="text-sm text-slate-400">
                  AI Reflections
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-20">

            <div className="text-6xl mb-6">📭</div>

            <h2 className="text-3xl font-bold text-white">
              No Journal Entries Yet
            </h2>

            <p className="text-slate-400 mt-4 max-w-lg mx-auto">
              Start sharing your thoughts anonymously.
              Every reflection you receive will appear here.
            </p>

            <button
              onClick={() => navigate("/post")}
              className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold hover:scale-105 transition"
            >
              Write Your First Thought
            </button>

          </div>
        )}

        {/* Journal Cards */}
        {!loading && !error && posts.length > 0 && (
          <div className="space-y-8">

            {posts.map((post) => (

              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-6 md:p-8"
              >

                {/* Date */}
                <p className="text-sm text-slate-400 mb-6">
                  🕒{" "}
                  {new Date(post.createdAt).toLocaleString("en-US", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </p>

                {/* Thought */}
                <div className="mb-6">
                  <h3 className="text-indigo-400 font-semibold mb-3">
                    Your Thought
                  </h3>

                  <p className="text-white leading-8 whitespace-pre-wrap">
                    {post.text}
                  </p>
                </div>

                {/* AI Reflection */}
                {post.responseAI && (
                  <div className="rounded-2xl bg-slate-900/60 border border-indigo-500/20 p-5">

                    <p className="text-indigo-400 font-semibold mb-3">
                      AI Reflection
                    </p>

                    <p className="text-slate-300 leading-8 whitespace-pre-wrap">
                      {post.responseAI}
                    </p>

                  </div>
                )}

                {/* Delete */}
                <button
                  onClick={() => handleDelete(post._id)}
                  className="mt-6 px-6 py-2 rounded-xl border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition"
                >
                  Delete Entry
                </button>

              </motion.div>

            ))}

          </div>
        )}
      </div>
    </main>

    <Footer />
  </>
);
}
