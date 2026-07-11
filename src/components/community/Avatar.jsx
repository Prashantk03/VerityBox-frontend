export default function Avatar({ displayName, size = "md" }) {
  const emoji = displayName?.split(" ")[0] || "👤";

  const sizes = {
    sm: "w-10 h-10 text-xl",
    md: "w-14 h-14 text-3xl",
    lg: "w-16 h-16 text-4xl",
  };

  return (
    <div
      className={`
        ${sizes[size]}
        rounded-full
        bg-gradient-to-br
        from-indigo-500/20
        to-violet-500/20
        border border-indigo-500/20
        flex
        items-center
        justify-center
        shadow-lg
      `}
    >
      {emoji}
    </div>
  );
}