export default function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 animate-pulse"
        >
          <div className="h-5 w-40 rounded bg-slate-700 mb-6"></div>

          <div className="space-y-3">
            <div className="h-4 rounded bg-slate-700"></div>
            <div className="h-4 rounded bg-slate-700"></div>
            <div className="h-4 w-3/4 rounded bg-slate-700"></div>
          </div>

          <div className="mt-8 h-24 rounded-2xl bg-slate-800"></div>

          <div className="mt-8 flex gap-4">
            <div className="h-10 w-28 rounded-xl bg-slate-700"></div>
            <div className="h-10 w-28 rounded-xl bg-slate-700"></div>
          </div>
        </div>
      ))}
    </div>
  );
}