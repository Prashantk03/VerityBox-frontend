import { useSession } from "../context/sessionProvider";

function GenerateKeyButton() {
  const { generateTruthKey, sessionId } = useSession();

  if (sessionId) return null;

  return (
    <button
      onClick={generateTruthKey}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      Generate TruthKey
    </button>
  );
}

export default GenerateKeyButton;
