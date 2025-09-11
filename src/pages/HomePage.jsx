import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFeather } from "react-icons/fi";
import RestoreKey from "../components/RestoreKey";
import GenerateKeyButton from "../components/generateKey";
import { useSession } from "../context/sessionProvider";

export default function Home() {
  const navigate = useNavigate();
  const { sessionId } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-6 flex flex-col items-center">
      <nav className="flex justify-between items-center mb-6 px-4 space-x-4">
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/journal")}
            className="hover:text-purple-400 transition"
          >
            My Journal
          </button>
          <button
            onClick={() => navigate("/community")}
            className="hover:text-purple-400 transition"
          >
            Community
          </button>
        </div>
        {!sessionId && (
          <>
            <div className="flex items-center space-x-2">
              <GenerateKeyButton />
            </div>
            <div className="flex items-center space-x-2">
              <RestoreKey />
            </div>
          </>
        )}
      </nav>

      {/* Logo + Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center space-x-3 mt-10 mb-6"
      >
        <FiFeather size={36} className="text-purple-300" />
        <h1 className="text-4xl font-bold tracking-tight">VerityBox</h1>
      </motion.div>

      {/* Tagline + CTA */}
      <motion.p
        className="text-lg text-center max-w-2xl mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Share your raw, unfiltered thoughts, Or want to share about your ups and
        downs in life, Anonymously. Let AI reflect back with calm, kind insight
        and also get a great community feedback to help each other.
      </motion.p>

      <motion.button
        onClick={() => navigate("/post")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-lg font-semibold transition mb-12"
      >
        Start Sharing
      </motion.button>

      {/* Info Sections */}
      <section className="max-w-4xl w-full space-y-10 text-left">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-purple-300">
            🧠 How It Works
          </h2>
          <p className="text-gray-200">
            You write anonymously. Before saving your post, VerityBox scans it
            for safety (no names, threats, or hate). If clean, GPT-3.5 generates
            a personal reflection — not advice, just insight. And also a great
            community of peoples can share their feedback for each other.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2 text-purple-300">
            🔒 Why Anonymous?
          </h2>
          <p className="text-gray-200">
            Because honesty is hard when you're being watched. We believe the
            most real, vulnerable thoughts come when you're unfiltered. No
            identity. No shame. Just truth — and support.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2 text-purple-300">
            ⚖️ Is It Safe?
          </h2>
          <p className="text-gray-200">
            Yes. VerityBox uses AI moderation to block any doxxing, hate speech,
            or harmful content. You stay 100% anonymous — and we still keep it
            secure and respectful.
          </p>
        </div>
      </section>
    </div>
  );
}
