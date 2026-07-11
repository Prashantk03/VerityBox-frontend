import { motion } from "framer-motion";

export default function CommunityHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
        <span className="text-4xl">🌍</span>
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
        Community
      </h1>

      <p className="mt-6 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-8">
        Read anonymous experiences, encourage others with kindness,
        and build a supportive community where everyone feels heard.
      </p>
    </motion.section>
  );
}