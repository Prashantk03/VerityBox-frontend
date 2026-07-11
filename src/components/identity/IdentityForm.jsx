import { adjectives, nouns } from "../../data/identityData";

export default function IdentityForm({
  adjective,
  setAdjective,
  noun,
  setNoun,
  letter,
  setLetter,
  number,
  setNumber,
}) {
  const handleLetterChange = (e) => {
    const value = e.target.value.toUpperCase();

    if (/^[A-Z]?$/.test(value)) {
      setLetter(value);
    }
  };

  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 2) {
      setNumber(value);
    }
  };

  return (
    <div className="space-y-7">

      {/* Adjective */}
      <div>
        <label className="block text-white font-medium mb-2">
          Choose an Adjective
        </label>

        <select
          value={adjective}
          onChange={(e) => setAdjective(e.target.value)}
          className="w-full rounded-xl bg-slate-900 border border-slate-700 text-white p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          {adjectives.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      {/* Noun */}
      <div>
        <label className="block text-white font-medium mb-2">
          Choose a Noun
        </label>

        <select
          value={noun}
          onChange={(e) => setNoun(e.target.value)}
          className="w-full rounded-xl bg-slate-900 border border-slate-700 text-white p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          {nouns.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      {/* Custom ID */}
      <div>
        <label className="block text-white font-medium mb-2">
          Custom ID (Optional)
        </label>

        <div className="flex gap-4">

          <input
            type="text"
            maxLength={1}
            placeholder="P"
            value={letter}
            onChange={handleLetterChange}
            className="w-20 rounded-xl bg-slate-900 border border-slate-700 text-center text-white p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="text"
            maxLength={2}
            placeholder="03"
            value={number}
            onChange={handleNumberChange}
            className="w-24 rounded-xl bg-slate-900 border border-slate-700 text-center text-white p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

        </div>

        <p className="text-slate-400 text-sm mt-2">
          Example: P03, A17, K25
        </p>
      </div>

    </div>
  );
}