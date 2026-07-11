import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFeather } from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-black flex flex-col items-center">
        <div className="flex-1 flex flex-col items-center mt-6 p-6 ">
          <div className="flex-1 w-full">
            {/* Hero Section */}
            <section className="min-h-[80vh] flex items-center justify-center px-6">
              <div className="max-w-5xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center items-center gap-3 mb-6"
                >
                  {/* <FiFeather className="text-indigo-400" size={40} /> */}
                  <span className="text-2xl md:text-4xl font-medium text-gray-300">
                    VerityBox
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                >
                  Share What You
                  <br />
                  Can't Say Out Loud
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
                >
                  A safe place to express your thoughts anonymously, receive
                  thoughtful AI reflections, and connect with a supportive
                  community.
                </motion.p>

                <motion.div
                  className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <button
                    onClick={() => navigate("/post")}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold hover:scale-105 transition-all"
                  >
                    Start Sharing
                  </button>

                  <button className="px-8 py-4 rounded-xl border border-gray-500 text-white hover:bg-white/10 transition">
                    Learn More
                  </button>
                </motion.div>
              </div>
            </section>

            {/* Feature Cards */}
            <section className="max-w-6xl mx-auto px-6 py-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    🧠 AI Reflection
                  </h3>
                  <p className="text-gray-300">
                    Receive calm, thoughtful reflections on your posts. Not
                    advice. Just perspective.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    🔒 Anonymous
                  </h3>
                  <p className="text-gray-300">
                    No account required. No identity attached. Just honest
                    thoughts.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    🔑 TruthKey
                  </h3>
                  <p className="text-gray-300">
                    Restore access to your journal anytime without creating an
                    account.
                  </p>
                </div>
              </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 pb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                Why VerityBox?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-xl">
                  <h3 className="font-bold text-xl text-white mb-2">
                    No Accounts
                  </h3>
                  <p className="text-gray-300">
                    Start writing instantly without signup friction.
                  </p>
                </div>

                <div className="bg-white/5 p-6 rounded-xl">
                  <h3 className="font-bold text-xl text-white mb-2">
                    Community Support
                  </h3>
                  <p className="text-gray-300">
                    Receive thoughtful feedback from others who understand.
                  </p>
                </div>

                <div className="bg-white/5 p-6 rounded-xl">
                  <h3 className="font-bold text-xl text-white mb-2">
                    Safe Environment
                  </h3>
                  <p className="text-gray-300">
                    AI moderation helps keep discussions respectful.
                  </p>
                </div>

                <div className="bg-white/5 p-6 rounded-xl">
                  <h3 className="font-bold text-xl text-white mb-2">
                    Data Recovery
                  </h3>
                  <p className="text-gray-300">
                    TruthKey helps protect your anonymous journal from loss.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
