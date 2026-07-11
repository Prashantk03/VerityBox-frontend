import SuggestionCard from "./SuggestionCard";

export default function SuggestionList({
  suggestions,
  onSelect,
  loading,
}) {
  if (!suggestions.length) return null;

  return (
    <div className="mt-10">

      <div className="text-center mb-8">

        <h2 className="text-2xl text-red-400 font-bold">
          Identity Already Exists
        </h2>

        <p className="text-slate-400 mt-2">
          Don't worry ❤️
          Choose one of these available identities.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {suggestions.map((item, index) => (
          <SuggestionCard
            key={index}
            suggestion={item}
            onSelect={onSelect}
            loading={loading}
          />
        ))}

      </div>

    </div>
  );
}