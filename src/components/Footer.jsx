const Footer = () => {
  return (
    <footer className="w-full py-6 bg-gray-600 text-gray-300  ">
  <div className="px-4 text-center space-y-3">
    {/* Tagline */}
    <p className="text-sm">
      💬 VerityBox – Share your thoughts, reflect, and grow.
    </p>

    {/* Suggestion */}
    <p className="text-xs text-gray-400">
      💡 Got a suggestion?{" "}
      <a
        href="https://forms.gle/7WZ1pNunNanGyGmJA"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-indigo-400"
      >
        Tell us here
      </a>.
    </p>

    {/* Credits */}
    <p className="text-xs text-gray-500">
      © {new Date().getFullYear()} VerityBox. Crafted by Prashant.
    </p>
  </div>
</footer>
  );
};

export default Footer;
