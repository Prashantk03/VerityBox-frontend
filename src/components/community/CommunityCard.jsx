import { motion } from "framer-motion";
import { FiHeart, FiClock, FiMessageCircle, FiUser } from "react-icons/fi";

import CommentSection from "./CommentSection";
import Avatar from "./Avatar";
import formatTimeAgo from "../../utils/formatTimeAgo";
import { useNavigate } from "react-router-dom";

export default function CommunityCard({
  post,
  currentTime,
  sessionId,
  comments,
  sendingComments,
  newComments,
  errors,
  handleCommentChange,
  handleCommentSubmit,
  handleDeleteComment,
  handleToggleLike,
}) {
  const liked = post.liked;
  const totalComments = comments[post._id]?.length || 0;
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      className="mb-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              onClick={() => navigate(`/profile/${post.profileId}`)}
              className="h-16 w-16 rounded-full bg-indigo-500/20 flex items-center justify-center cursor-pointer "
            >
              <Avatar displayName={post.displayName} size="md" />
            </div>

            <div>
              <div
                onClick={() => navigate(`/profile/${post.profileId}`)}
                className="cursor-pointer"
              >
                <h3 className="font-bold text-xl text-indigo-100 hover:text-indigo-400 transition">
                  {post.displayName}
                </h3>
              </div>

              {post.reputation && (
                <p className="text-xs text-emerald-400 mt-1 font-medium">
                  {post.reputation.title}
                </p>
              )}

            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <FiClock />

            <p
              className="text-sm text-slate-400"
              title={new Date(post.createdAt).toLocaleString()}
            >
              {formatTimeAgo(post.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <section className="mb-8">
          <p className="text-white whitespace-pre-wrap leading-8 text-[15px]">
            {post.text}
          </p>
        </section>

        {/* AI Reflection */}
        {post.responseAI && (
          <section className="rounded-2xl border border-indigo-500/20 bg-slate-900/70 p-5 mb-8">
            <h4 className="text-indigo-400 font-semibold mb-3">
              AI Reflection
            </h4>

            <p className="text-slate-300 whitespace-pre-wrap leading-8">
              {post.responseAI}
            </p>
          </section>
        )}

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleToggleLike(post._id)}
            className={`flex items-center gap-2 rounded-xl px-5 py-2 transition-all
              ${
                liked
                  ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
          >
            <FiHeart className={liked ? "fill-pink-400" : ""} size={18} />

            <span className="font-medium">{post.likes}</span>
          </motion.button>

          <div className="flex items-center gap-2 text-slate-400">
            <FiMessageCircle />

            <span>
              {totalComments} {totalComments === 1 ? "Comment" : "Comments"}
            </span>
          </div>
        </div>

        {/* Comments */}
        <CommentSection
          post={post}
          comments={comments}
          sendingComments={sendingComments}
          sessionId={sessionId}
          newComments={newComments}
          errors={errors}
          handleCommentChange={handleCommentChange}
          handleCommentSubmit={handleCommentSubmit}
          handleDeleteComment={handleDeleteComment}
        />
      </div>
    </motion.article>
  );
}
