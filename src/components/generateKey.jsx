import { useSession } from "../context/sessionProvider";

function GenerateKeyButton() {
  const { generateTruthKey, sessionId } = useSession();

  if (sessionId) return null;

  return (
    <button
      onClick={generateTruthKey}
      className="bg-black hover:bg-gray-600 text-white py-1 px-2 rounded-2xl w-full"
    >
      Generate TruthKey
    </button>
  );
}

export default GenerateKeyButton;
