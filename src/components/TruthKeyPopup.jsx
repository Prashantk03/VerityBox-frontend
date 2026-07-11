import { useSession } from "../context/sessionProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function TruthKeyPopup() {
  const { sessionId, showPopup, setShowPopup } = useSession();
  const navigate = useNavigate();

  if (!showPopup) return null;

  const copyKey = () => {
    navigator.clipboard.writeText(sessionId);
    toast.success("TruthKey copied successfully!");
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
            onClick={() => {
              setShowPopup(false);
              navigate("/identity");
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default TruthKeyPopup;
