import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

export default function SuggestionCard({
  suggestion,
  onSelect,
  loading,
}) {
  const displayName = `${suggestion.emoji} ${suggestion.adjective} ${suggestion.noun}${
    suggestion.letter && suggestion.number
      ? ` • ${suggestion.letter}${suggestion.number}`
      : ""
  }`;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 transition"
    >
      <div className="text-center">

        <div className="text-5xl mb-3">
          {suggestion.emoji}
        </div>

        <h3 className="text-white font-semibold text-xl">
          {displayName}
        </h3>

      </div>

      <button
        disabled={loading}
        onClick={() => onSelect(suggestion)}
        className="mt-5 w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 transition text-white py-3 flex justify-center items-center gap-2 disabled:opacity-50"
      >
        <FiCheckCircle />

        {loading ? "Creating..." : "Use This"}
      </button>
    </motion.div>
  );
}