import { useSession } from "../context/sessionProvider";

function TruthKeyPopup() {
  const { sessionId, showPopup, setShowPopup } = useSession();

  if (!showPopup) return null;

  const copyKey = () => {
    navigator.clipboard.writeText(sessionId);
    alert("TruthKey copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-lg font-bold mb-2">Your TruthKey</h2>
        <p className="font-mono bg-gray-100 p-2 rounded mb-4">{sessionId}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={copyKey}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Copy
          </button>
          <button
            onClick={() => setShowPopup(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TruthKeyPopup;
