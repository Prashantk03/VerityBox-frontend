import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IdentitySuccess() {
  const navigate = useNavigate();

  const displayName = localStorage.getItem("truthroom_display_name");

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full rounded-3xl border border-indigo-500/20 bg-white/5 backdrop-blur-xl p-10 text-center shadow-2xl"
      >
        <div className="text-7xl mb-6">🎉</div>

        <h1 className="text-4xl font-bold text-white">
          Welcome to VerityBox
        </h1>

        <p className="text-slate-400 mt-4">
          Your anonymous identity has been created successfully.
        </p>

        <div className="mt-8 rounded-2xl bg-slate-900 border border-slate-700 p-6">
          <p className="text-slate-400 mb-3">
            Your Anonymous Identity
          </p>

          <h2 className="text-3xl font-bold text-indigo-400 break-words">
            {displayName}
          </h2>
        </div>

        <p className="mt-8 text-slate-500">
          Redirecting to your home...
        </p>
      </motion.div>
    </main>
  );
}