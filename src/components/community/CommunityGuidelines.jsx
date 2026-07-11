import { motion } from "framer-motion";
import { FiHeart, FiLock, FiUsers } from "react-icons/fi";

const guidelines = [
  {
    icon: FiHeart,
    title: "Be Respectful",
    description:
      "Respond with empathy and kindness. Every story deserves understanding.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: FiLock,
    title: "Respect Anonymity",
    description:
      "Never ask for personal details. Privacy is the foundation of VerityBox.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: FiUsers,
    title: "Encourage Growth",
    description:
      "Offer thoughtful feedback that helps others reflect and move forward.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export default function CommunityGuidelines() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <div className="bg-gradient-to-r from-indigo-500/10 via-slate-900/40 to-cyan-500/10 backdrop-blur-md border border-white/10 rounded-3xl p-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-3xl">
            💙
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Community Guidelines
            </h2>

            <p className="text-slate-400 mt-1">
              Together we create a safe, supportive, and anonymous space.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guidelines.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-5`}
                >
                  <Icon className={item.color} size={24} />
                </div>

                <h3 className="text-white text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-sm mt-3 leading-7">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}