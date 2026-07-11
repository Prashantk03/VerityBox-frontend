import { motion } from "framer-motion";
import { emojis } from "../../data/identityData";

export default function EmojiPicker({ emoji, setEmoji }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-white mb-4">
        🌟 Pick Your Symbol
      </h2>

      <div className="grid grid-cols-5 gap-3">
        {emojis.map((item) => (
          <motion.button
            key={item}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setEmoji(item)}
            className={`h-14 w-14 rounded-2xl text-2xl transition-all duration-300
              ${
                emoji === item
                  ? "bg-indigo-500 shadow-lg shadow-indigo-500/40 border-2 border-indigo-300"
                  : "bg-slate-800 border border-slate-700 hover:bg-slate-700"
              }`}
          >
            {item}
          </motion.button>
        ))}
      </div>

      <p className="text-slate-400 text-sm mt-3">
        This emoji will appear beside your anonymous identity.
      </p>
    </div>
  );
}