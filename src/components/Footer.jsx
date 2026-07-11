const Footer = () => {
  return (
    <footer className="w-full py-8 bg-slate-950 border-t border-slate-800">
  <div className="px-4 text-center space-y-3">
    {/* Tagline */}
    <p className="text-sm text-slate-300">
      💬 VerityBox – Share your thoughts, reflect, and grow.
    </p>

    {/* Suggestion */}
    <p className="text-xs text-slate-400">
      💡 Got a suggestion?{" "}
      <a
        href="https://forms.gle/7WZ1pNunNanGyGmJA"
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-indigo-400 hover:text-indigo-300 transition"
      >
        Tell us here
      </a>.
    </p>

    {/* Credits */}
    <p className="text-xs text-slate-500">
      © {new Date().getFullYear()} VerityBox. Crafted by Prashant.
    </p>
  </div>
</footer>
  );
};

export default Footer;
