import { motion } from "framer-motion";
import { FiActivity } from "react-icons/fi";

export default function FeedHeader() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
    >
      {/* Left */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Latest Community Thoughts
        </h2>

        <p className="mt-3 text-slate-400 max-w-2xl leading-7">
          Explore anonymous stories from people around the world. Read,
          support, and remind someone that they are not alone.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 self-start md:self-auto rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>

          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>

        <FiActivity className="text-emerald-300" size={18} />

        <span className="text-sm font-medium text-emerald-300">
          Live Community Feed
        </span>
      </div>
    </motion.section>
  );
}