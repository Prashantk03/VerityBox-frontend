import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiTrash2, FiMessageCircle } from "react-icons/fi";
import formatTimeAgo from "../../utils/formatTimeAgo";
import { useNavigate } from "react-router-dom";

export default function CommentSection({
  post,
  comments,
  sessionId,
  sendingComments,
  newComments,
  errors,
  handleCommentChange,
  handleCommentSubmit,
  handleDeleteComment,
}) {
  const postComments = comments[post._id] || [];
  const navigate = useNavigate();

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
          <FiMessageCircle className="text-indigo-400" />
          Comments
        </h3>

        <span className="text-sm text-slate-400">
          {postComments.length}{" "}
          {postComments.length === 1 ? "Comment" : "Comments"}
        </span>
      </div>

      {/* Empty State */}
      {postComments.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6 text-center">
          <div className="text-3xl mb-3">💬</div>

          <h4 className="text-white font-semibold">No comments yet</h4>

          <p className="text-slate-400 text-sm mt-2">
            Be the first person to encourage or support this anonymous user.
          </p>
        </div>
      )}

      {/* Comment List */}
      <AnimatePresence>
        {postComments.map((comment) => (
          <motion.div
            key={comment._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`border rounded-2xl p-4 mb-3 transition-all ${
              comment.optimistic
                ? "bg-slate-900/40 border-indigo-500/40 opacity-80"
                : "bg-slate-900/70 border-slate-700"
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p
                    onClick={() => navigate(`/profile/${comment.profileId}`)}
                    className="cursor-pointer text-indigo-100 hover:text-indigo-400 transition"
                  >
                    {comment.displayName}
                  </p>

                  <span
                    className="text-xs text-slate-500"
                    title={new Date(comment.createdAt).toLocaleString()}
                  >
                    • {formatTimeAgo(comment.createdAt)}
                  </span>
                </div>

                <p className="text-slate-200 whitespace-pre-wrap leading-7">
                  {comment.text}
                </p>
                {comment.optimistic && (
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                    <span className="animate-pulse">⏳</span>
                    Sending...
                  </div>
                )}
              </div>

              {comment.isOwner && (
                <button
                  onClick={() => handleDeleteComment(post._id, comment._id)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Input */}
      <div className="mt-6">
        <textarea
          rows={3}
          placeholder="Write something supportive..."
          value={newComments[post._id] || ""}
          onChange={(e) => handleCommentChange(post._id, e.target.value)}
          className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 text-white placeholder:text-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {errors[post._id] && (
          <p className="text-red-400 text-sm mt-2">{errors[post._id]}</p>
        )}

        <div className="flex justify-end mt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={sendingComments[post._id]}
            onClick={() => handleCommentSubmit(post._id)}
            className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white shadow-lg transition-all ${
              sendingComments[post._id]
                ? "bg-slate-600 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-blue-500 hover:shadow-indigo-500/20"
            }`}
          >
            <FiSend size={18} />

            {sendingComments[post._id] ? "Sending..." : "Send"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
