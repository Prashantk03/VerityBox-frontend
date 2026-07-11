import { motion } from "framer-motion";
import { FiGlobe, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function EmptyFeed() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-24 text-center"
    >
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-10">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/10">
          <FiGlobe className="text-indigo-400" size={40} />
        </div>

        <h2 className="text-3xl font-bold text-white">
          No Community Posts Yet
        </h2>

        <p className="mt-4 text-slate-400 leading-7">
          Be the first person to share an anonymous thought and help
          build a supportive community.
        </p>

        <button
          onClick={() => navigate("/post")}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-white font-medium hover:scale-105 transition"
        >
          Share Your First Thought
          <FiArrowRight />
        </button>
      </div>
    </motion.section>
  );
}