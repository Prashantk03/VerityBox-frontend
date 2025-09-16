import { useState, useEffect } from "react";
import axios from "axios";

export default function PostForm() {
  const [text, setText] = useState("");
  const [feedbackType, setFeedbackType] = useState("ai");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    let storedId = localStorage.getItem("truthroom_session");
    if (storedId) {
      setSessionId(storedId);
    } else {
      setSessionId("");
    }
  }, []);

  const submitPost = async () => {
    if (!sessionId){
      alert("You must generate your TruhtKey before posting to prevent from any Data Loss");
      return;
    }

    setLoading(true);
    setResponse("");
    setError("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/posts`, {
        text,
        feedbackType,
        sessionId,
        public: isPublic,
      });
      setResponse(res.data.responseAI || "No AI feedback.");
    } catch (err) {
      setError(err?.response?.data?.reason || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className="w-full border border-gray-400 p-3 rounded-lg"
        placeholder="Write your anonymous thought here..."
      />

      <div className="flex justify-between items-center">
        <label className="text-sm">
          Feedback Type:
          <select
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value)}
            className="ml-2 border p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 "
          >
            <option value="ai">AI Reflection</option>
            <option value="community">Community</option>
          </select>
        </label>
        <button
          onClick={submitPost}
          disabled={loading || !text}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-900 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
      <label className="flex items-center mt-2 space-x-2">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="form-checkbox h-4 w-4 text-gray-400"
        />
        <span className="text-sm">Make this post public?</span>
      </label>

      {error && <div className="text-black font-semibold">{error}</div>}
      {response && (
        <div className="p-4 mt-4 border-l-4 border-gray-400 bg-white rounded">
          <p className="font-semibold">AI Reflection:</p>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
