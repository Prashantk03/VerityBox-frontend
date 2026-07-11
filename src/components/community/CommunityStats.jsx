import { motion } from "framer-motion";
import { FiGlobe, FiHeart, FiMessageCircle } from "react-icons/fi";

const stats = [
  {
    icon: FiGlobe,
    color: "text-indigo-400",
    label: "Public Posts",
    key: "posts",
  },
  {
    icon: FiHeart,
    color: "text-pink-400",
    label: "Total Likes",
    key: "likes",
  },
  {
    icon: FiMessageCircle,
    color: "text-cyan-400",
    label: "Comments",
    key: "comments",
  },
];

export default function CommunityStats({
  totalPosts,
  totalLikes,
  totalComments,
}) {
  const values = {
    posts: totalPosts,
    likes: totalLikes,
    comments: totalComments,
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.key}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl"
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-5`}
            >
              <Icon className={stat.color} size={28} />
            </div>

            <h2 className="text-3xl font-bold text-white">
              {values[stat.key]}
            </h2>

            <p className="text-slate-400 mt-2">
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </motion.section>
  );
}