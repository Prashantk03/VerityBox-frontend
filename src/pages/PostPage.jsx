import PostForm from "../components/PostForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function PostPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              Share Your Thoughts
            </h1>

            <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Write anonymously. Receive thoughtful AI reflections
              or supportive feedback from the community.
            </p>
          </motion.div>

          <PostForm />

        </div>
      </main>

      <Footer />
    </>
  );
}
