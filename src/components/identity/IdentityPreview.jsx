import { motion } from "framer-motion";
import { FiShield } from "react-icons/fi";

export default function IdentityPreview({
  emoji,
  adjective,
  noun,
  letter,
  number,
}) {
  const suffix =
    letter || number
      ? ` • ${letter.toUpperCase()}${number.padStart(2, "0")}`
      : "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-28"
    >
      <div className="rounded-3xl border border-indigo-500/20 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <div className="flex items-center gap-2 text-indigo-400 mb-6">
          <FiShield size={22} />
          <span className="font-semibold text-lg">
            Identity Preview
          </span>
        </div>

        <div className="rounded-2xl bg-slate-900/80 border border-slate-700 p-8 text-center">

          <motion.div
            key={emoji}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-7xl mb-5"
          >
            {emoji}
          </motion.div>

          <motion.h2
            key={`${adjective}-${noun}-${letter}-${number}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-white break-words"
          >
            {adjective} {noun}
            {suffix}
          </motion.h2>

          <p className="text-slate-400 mt-6 leading-7">
            This is how your anonymous identity will appear
            beside every post and comment in VerityBox.
          </p>
        </div>

        <div className="mt-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-4">
          <p className="text-indigo-300 text-sm leading-6">
            🔒 Your real identity is never shown.
            Only this anonymous identity is visible to the community.
          </p>
        </div>
      </div>
    </motion.div>
  );
}