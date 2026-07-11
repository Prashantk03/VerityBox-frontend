import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function CreateIdentityButton({
  loading,
  onClick,
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      disabled={loading}
      className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 py-4 text-white font-semibold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-60"
    >
      <div className="flex justify-center items-center gap-2">
        {loading ? (
          <>
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Creating Identity...
          </>
        ) : (
          <>
            Create Identity
            <FiArrowRight />
          </>
        )}
      </div>
    </motion.button>
  );
}